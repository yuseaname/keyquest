import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from 'react';
import {
  chapters,
  choices,
  getChoiceNode,
  getLessonsForChapter,
  housingOptions,
  items,
  lessons,
  pets,
  relationships,
  vehicles,
  endings,
} from '../data';
import { CompletedLesson, GameState, Lesson, Requirement, Reward, TypingResult } from '../types/game';
import { clearSavedGame, loadGame, saveGame } from '../utils/gamePersistence';

interface GameContextValue extends GameState {
  currentLesson: Lesson;
  currentChapterName: string;
  bonuses: { accuracyBonus: number; wpmBonus: number; payoutMultiplier: number };
  chapterProgress: (chapterId: number) => { completed: number; total: number };
  selectLesson: (lessonId: string) => { success: boolean; reason?: string };
  completeLesson: (
    lesson: Lesson,
    result: TypingResult
  ) => {
    passed: boolean;
    earned: number;
    unlockedChapter?: number;
    effectiveAccuracy: number;
    effectiveWpm: number;
    goalAccuracy: number;
    goalWpm: number;
  };
  makeChoice: (optionId: string, nodeId?: string) => { applied: boolean; reason?: string };
  setActiveChoiceNode: (id?: string) => void;
  canSatisfy: (requirements?: Requirement[]) => boolean;
  buyItem: (itemId: string) => { success: boolean; reason?: string };
  buyVehicle: (vehicleId: string) => { success: boolean; reason?: string };
  adoptPet: (petId: string) => { success: boolean; reason?: string };
  changeHousing: (housingId: string) => { success: boolean; reason?: string };
  getChoiceNodeById: (id?: string) => ReturnType<typeof getChoiceNode>;
  earnMoney: (amount: number) => void;
  spendMoney: (amount: number) => { success: boolean; reason?: string };
  unlockChapter: (id: number) => void;
  addItemToInventory: (itemId: string) => void;
  setVehicle: (vehicleId: string) => void;
  upgradeHousing: (housingId: string) => { success: boolean; reason?: string };
  recordTypingResult: (result: TypingResult) => void;
  resetGame: () => void;
  startGame: () => void;
  chooseLessonChoice: (lesson: Lesson, choiceId: string) => { applied: boolean; reason?: string };
}

type Action =
  | { type: 'SELECT_LESSON'; lessonId: string }
  | { type: 'COMPLETE_LESSON'; lesson: Lesson; result: TypingResult; earned: number; passed: boolean }
  | { type: 'ADVANCE_CHAPTER'; chapterId: number }
  | { type: 'SET_CHOICE_NODE'; id?: string }
  | { type: 'APPLY_REWARDS'; rewards: Requirement[] }
  | { type: 'SET_FLAG'; flag: string }
  | { type: 'BUY_ITEM'; itemId: string }
  | { type: 'BUY_VEHICLE'; vehicleId: string }
  | { type: 'ADOPT_PET'; petId: string }
  | { type: 'CHANGE_HOUSING'; housingId: string }
  | { type: 'APPLY_STATE'; state: Partial<GameState> }
  | { type: 'SET_LESSON_CHOICE'; lessonId: string; choiceId: string }
  | { type: 'START_GAME'; entryLessonId: string }
  | { type: 'RESET_GAME' };

function createDefaultRelationships() {
  return relationships.reduce<Record<string, { level: number; progress: number }>>((acc, partner) => {
    acc[partner.id] = { level: 0, progress: 0 };
    return acc;
  }, {});
}

const defaultHousing = housingOptions[0]?.id ?? 'apt-small';
const defaultLessonId = lessons[0].id;

function createInitialState(): GameState {
  return {
    money: 0,
    happiness: 50,
    energy: 70,
    skill: 0,
    currentChapterId: 0,
    unlockedChapters: [0],
    currentLessonId: defaultLessonId,
    lifetimeStats: {
      totalCharsTyped: 0,
      correctChars: 0,
      sessionsCompleted: 0,
      totalTimeMs: 0,
      bestAccuracy: 0,
      bestWpm: 0,
    },
    completedLessons: {},
    ownedItems: ['starter-laptop'],
    ownedVehicles: ['walk'],
    ownedPets: [],
    housingId: defaultHousing,
    relationships: createDefaultRelationships(),
    flags: {},
    activeChoiceNodeId: choices[0]?.id,
    hasStarted: false,
    chosenFlags: [],
    lessonChoices: {},
    difficultyModifier: 0,
  };
}

const initialState: GameState = createInitialState();

function hasRequirements(state: GameState, requirements?: Requirement[]) {
  if (!requirements || requirements.length === 0) return true;
  return requirements.every((req) => {
    switch (req.type) {
      case 'item':
        return state.ownedItems.includes(req.itemId);
      case 'vehicle':
        return state.ownedVehicles.includes(req.vehicleId);
      case 'pet':
        return state.ownedPets.includes(req.petId);
      case 'relationship':
        return (state.relationships[req.partnerId]?.level ?? 0) >= req.level;
      case 'stat':
        if (req.stat === 'happiness') return state.happiness >= req.min;
        if (req.stat === 'energy') return state.energy >= req.min;
        if (req.stat === 'skill') return state.skill >= req.min;
        return true;
      case 'chapterUnlocked':
        return state.unlockedChapters.includes(req.chapterId);
      case 'flag':
        return Boolean(state.flags[req.flag]);
      case 'money':
        return state.money >= req.amount;
      default:
        return true;
    }
  });
}

function applyRewards(state: GameState, rewards?: Reward[]) {
  if (!rewards) return state;
  let nextState = { ...state };
  rewards.forEach((reward) => {
    switch (reward.type) {
      case 'money':
        nextState.money += reward.amount;
        break;
      case 'item':
        if (!nextState.ownedItems.includes(reward.itemId)) nextState.ownedItems = [...nextState.ownedItems, reward.itemId];
        break;
      case 'vehicle':
        if (!nextState.ownedVehicles.includes(reward.vehicleId)) nextState.ownedVehicles = [...nextState.ownedVehicles, reward.vehicleId];
        break;
      case 'pet':
        if (!nextState.ownedPets.includes(reward.petId)) nextState.ownedPets = [...nextState.ownedPets, reward.petId];
        break;
      case 'relationship': {
        const partner = nextState.relationships[reward.partnerId] ?? { level: 0, progress: 0 };
        nextState.relationships = {
          ...nextState.relationships,
          [reward.partnerId]: {
            ...partner,
            level: Math.max(0, partner.level + reward.delta),
          },
        };
        break;
      }
      case 'stat':
        if (reward.stat === 'happiness') nextState.happiness = Math.max(0, nextState.happiness + reward.delta);
        if (reward.stat === 'energy') nextState.energy = Math.max(0, nextState.energy + reward.delta);
        if (reward.stat === 'skill') nextState.skill = Math.max(0, nextState.skill + reward.delta);
        break;
      case 'flag':
        nextState.flags = { ...nextState.flags, [reward.flag]: true };
        break;
      default:
        break;
    }
  });
  return nextState;
}

function clampStat(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function evaluateEndings(state: GameState) {
  let next = { ...state };
  endings.forEach((ending) => {
    if (next.flags[ending.id]) return;
    if (hasRequirements(next, ending.conditions)) {
      next = { ...next, flags: { ...next.flags, [ending.id]: true } };
    }
  });
  return next;
}

function hydrateState(saved?: GameState | null): GameState {
  const base = createInitialState();
  if (!saved) return base;

  const hydrated: GameState = {
    ...base,
    ...saved,
    unlockedChapters: saved.unlockedChapters ?? base.unlockedChapters,
    lifetimeStats: { ...base.lifetimeStats, ...(saved.lifetimeStats ?? {}) },
    completedLessons: { ...base.completedLessons, ...(saved.completedLessons ?? {}) },
    ownedItems: saved.ownedItems ?? base.ownedItems,
    ownedVehicles: saved.ownedVehicles ?? base.ownedVehicles,
    ownedPets: saved.ownedPets ?? base.ownedPets,
    relationships: { ...base.relationships, ...(saved.relationships ?? {}) },
    flags: { ...base.flags, ...(saved.flags ?? {}) },
    currentLessonId: saved.currentLessonId ?? base.currentLessonId,
    housingId: saved.housingId ?? base.housingId,
    activeChoiceNodeId: saved.activeChoiceNodeId ?? base.activeChoiceNodeId,
    hasStarted: saved?.hasStarted !== undefined ? saved.hasStarted : Boolean(saved),
    chosenFlags: saved.chosenFlags ?? base.chosenFlags,
    lessonChoices: { ...base.lessonChoices, ...(saved.lessonChoices ?? {}) },
    difficultyModifier: saved.difficultyModifier ?? base.difficultyModifier,
  };

  if (!lessons.some((lesson) => lesson.id === hydrated.currentLessonId)) {
    hydrated.currentLessonId = base.currentLessonId;
  }
  if (!chapters.some((chapter) => chapter.id === hydrated.currentChapterId)) {
    hydrated.currentChapterId = base.currentChapterId;
  }

  return evaluateEndings(hydrated);
}

function initGameState(): GameState {
  if (typeof window === 'undefined') return initialState;
  const saved = loadGame();
  return hydrateState(saved);
}

function getBonuses(state: GameState) {
  const itemAcc = state.ownedItems
    .map((id) => items.find((i) => i.id === id)?.effects.accuracyBonus ?? 0)
    .reduce((a, b) => a + b, 0);
  const itemWpm = state.ownedItems
    .map((id) => items.find((i) => i.id === id)?.effects.wpmBonus ?? 0)
    .reduce((a, b) => a + b, 0);
  const itemPayout = state.ownedItems
    .map((id) => items.find((i) => i.id === id)?.effects.payoutMultiplier ?? 1)
    .reduce((a, b) => a * b, 1);

  const petAcc = state.ownedPets
    .map((id) => pets.find((p) => p.id === id)?.effects.accuracyBonus ?? 0)
    .reduce((a, b) => a + b, 0);
  const petWpm = state.ownedPets
    .map((id) => pets.find((p) => p.id === id)?.effects.wpmBonus ?? 0)
    .reduce((a, b) => a + b, 0);

  return {
    accuracyBonus: itemAcc + petAcc,
    wpmBonus: itemWpm + petWpm,
    payoutMultiplier: itemPayout,
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SELECT_LESSON':
      return { ...state, currentLessonId: action.lessonId };
    case 'COMPLETE_LESSON': {
      const { lesson, result, earned, passed } = action;
      const completed: Record<string, CompletedLesson> = {
        ...state.completedLessons,
        [lesson.id]: {
          result,
          payout: earned,
          passed,
          completedAt: Date.now(),
        },
      };
      const updatedLifetime = {
        totalCharsTyped: state.lifetimeStats.totalCharsTyped + result.total,
        correctChars: state.lifetimeStats.correctChars + result.correct,
        sessionsCompleted: state.lifetimeStats.sessionsCompleted + 1,
        totalTimeMs: state.lifetimeStats.totalTimeMs + result.timeMs,
        bestAccuracy: Math.max(state.lifetimeStats.bestAccuracy, result.accuracy),
        bestWpm: Math.max(state.lifetimeStats.bestWpm, result.wpm),
      };

      // Unlock next chapter when 70% of non-job lessons are completed (not necessarily passed)
      // This allows progression even if player struggles with some lessons
      const nonJobLessons = lessons.filter((l) => l.chapterId === lesson.chapterId && l.type !== 'job');
      const completedCount = nonJobLessons.filter((l) => completed[l.id]).length;
      const completionRate = nonJobLessons.length > 0 ? completedCount / nonJobLessons.length : 0;
      const nextChapterId = lesson.chapterId + 1;
      const shouldUnlockNext =
        completionRate >= 0.7 &&
        chapters.some((chapter) => chapter.id === nextChapterId) &&
        !state.unlockedChapters.includes(nextChapterId);

      const energyDelta = passed ? -5 : -7;
      const happinessDelta = passed ? 2 : -2;
      const skillDelta = Math.max(0, Math.round((result.accuracy + result.wpm) / 100));

      let nextState: GameState = {
        ...state,
        money: state.money + earned,
        currentChapterId: shouldUnlockNext ? nextChapterId : Math.max(state.currentChapterId, lesson.chapterId),
        unlockedChapters: shouldUnlockNext ? [...state.unlockedChapters, nextChapterId] : state.unlockedChapters,
        currentLessonId: lesson.id,
        lifetimeStats: updatedLifetime,
        completedLessons: completed,
        energy: Math.max(0, state.energy + energyDelta),
        happiness: Math.max(0, state.happiness + happinessDelta),
        skill: state.skill + skillDelta,
      };

      if (lesson.rewards) {
        nextState = applyRewards(nextState, lesson.rewards);
      }

      nextState = evaluateEndings(nextState);
      return nextState;
    }
    case 'ADVANCE_CHAPTER':
      if (state.unlockedChapters.includes(action.chapterId)) {
        return { ...state, currentChapterId: action.chapterId };
      }
      return state;
    case 'SET_CHOICE_NODE':
      return { ...state, activeChoiceNodeId: action.id };
    case 'SET_LESSON_CHOICE': {
      const existingLessonStatus = state.completedLessons[action.lessonId];
      return {
        ...state,
        lessonChoices: { ...state.lessonChoices, [action.lessonId]: action.choiceId },
        completedLessons: existingLessonStatus
          ? {
              ...state.completedLessons,
              [action.lessonId]: { ...existingLessonStatus, selectedChoiceId: action.choiceId },
            }
          : state.completedLessons,
      };
    }
    case 'START_GAME': {
      const unlocked = state.unlockedChapters.includes(0) ? state.unlockedChapters : [0, ...state.unlockedChapters];
      return {
        ...state,
        hasStarted: true,
        currentChapterId: 0,
        unlockedChapters: unlocked,
        currentLessonId: action.entryLessonId,
      };
    }
    case 'BUY_ITEM':
      if (state.ownedItems.includes(action.itemId)) return state;
      return {
        ...state,
        ownedItems: [...state.ownedItems, action.itemId],
      };
    case 'BUY_VEHICLE':
      if (state.ownedVehicles.includes(action.vehicleId)) return state;
      return {
        ...state,
        ownedVehicles: [...state.ownedVehicles, action.vehicleId],
      };
    case 'ADOPT_PET':
      if (state.ownedPets.includes(action.petId)) return state;
      return {
        ...state,
        ownedPets: [...state.ownedPets, action.petId],
      };
    case 'CHANGE_HOUSING':
      return { ...state, housingId: action.housingId };
    case 'SET_FLAG':
      return { ...state, flags: { ...state.flags, [action.flag]: true } };
    case 'APPLY_STATE': {
      const mergedFlags = action.state.flags ? { ...state.flags, ...action.state.flags } : state.flags;
      const mergedRelationships = action.state.relationships
        ? { ...state.relationships, ...action.state.relationships }
        : state.relationships;
      const mergedLessonChoices = action.state.lessonChoices
        ? { ...state.lessonChoices, ...action.state.lessonChoices }
        : state.lessonChoices;
      const mergedChosenFlags = action.state.chosenFlags
        ? Array.from(new Set([...state.chosenFlags, ...action.state.chosenFlags]))
        : state.chosenFlags;

      return evaluateEndings({
        ...state,
        ...action.state,
        flags: mergedFlags,
        relationships: mergedRelationships,
        lessonChoices: mergedLessonChoices,
        chosenFlags: mergedChosenFlags,
      });
    }
    case 'RESET_GAME':
      return createInitialState();
    default:
      return state;
  }
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, initGameState);
  const bonuses = useMemo(() => getBonuses(state), [state]);

  useEffect(() => {
    saveGame(state);
  }, [state]);

  const currentLesson = useMemo(() => {
    return lessons.find((lesson) => lesson.id === state.currentLessonId) ?? lessons[0];
  }, [state.currentLessonId]);

  const currentChapterName = useMemo(() => {
    return chapters.find((c) => c.id === state.currentChapterId)?.name ?? 'Chapter';
  }, [state.currentChapterId]);

  const selectLesson = (lessonId: string) => {
    const nextLesson = lessons.find((lesson) => lesson.id === lessonId);
    if (!nextLesson) return { success: false, reason: 'Lesson missing' };
    if (!state.unlockedChapters.includes(nextLesson.chapterId)) {
      return { success: false, reason: 'Chapter locked' };
    }
    if (!hasRequirements(state, nextLesson.requirements)) {
      return { success: false, reason: 'Requirements not met' };
    }
    dispatch({ type: 'SELECT_LESSON', lessonId: nextLesson.id });
    dispatch({ type: 'ADVANCE_CHAPTER', chapterId: nextLesson.chapterId });
    return { success: true };
  };

  const chapterProgress = (chapterId: number) => {
    const chapterLessons = getLessonsForChapter(chapterId).filter((l) => l.type !== 'job');
    const completed = chapterLessons.filter((l) => state.completedLessons[l.id]?.passed).length;
    return { completed, total: chapterLessons.length };
  };

  const completeLesson = (lesson: Lesson, result: TypingResult) => {
    const effectiveAccuracy = Math.min(100, result.accuracy + bonuses.accuracyBonus);
    const effectiveWpm = result.wpm + bonuses.wpmBonus;
    const accuracyGoal = Math.max(1, Math.min(100, lesson.goalAccuracy + state.difficultyModifier));
    const wpmGoal = Math.max(1, lesson.goalWpm + state.difficultyModifier);
    const passed = effectiveAccuracy >= accuracyGoal && effectiveWpm >= wpmGoal;
    const earned = Math.max(
      0,
      Math.round((passed ? lesson.payout : Math.floor(lesson.payout * 0.25)) * (bonuses.payoutMultiplier || 1))
    );

    dispatch({ type: 'COMPLETE_LESSON', lesson, result, earned, passed });

    // Unlock next chapter check mirrors reducer - checks if 70% of lessons are completed
    const nonJobLessons = lessons.filter((l) => l.chapterId === lesson.chapterId && l.type !== 'job');
    const completedLessons = nonJobLessons.filter((l) => {
      const info = l.id === lesson.id ? { result } : state.completedLessons[l.id];
      return Boolean(info);
    });
    const completionRate = nonJobLessons.length > 0 ? completedLessons.length / nonJobLessons.length : 0;
    const nextChapterId = lesson.chapterId + 1;
    const unlockedChapter =
      completionRate >= 0.7 &&
      chapters.some((chapter) => chapter.id === nextChapterId) &&
      !state.unlockedChapters.includes(nextChapterId)
        ? nextChapterId
        : undefined;

    return { passed, earned, unlockedChapter, effectiveAccuracy, effectiveWpm, goalAccuracy: accuracyGoal, goalWpm: wpmGoal };
  };

  const chooseLessonChoice = (lesson: Lesson, choiceId: string) => {
    if (!lesson.choices || lesson.choices.length !== 2) {
      return { applied: false, reason: 'No choices for this lesson' };
    }
    if (state.lessonChoices[lesson.id]) {
      return { applied: false, reason: 'Choice already made' };
    }

    const choice = lesson.choices.find((opt) => opt.id === choiceId);
    if (!choice) {
      return { applied: false, reason: 'Choice not found' };
    }

    const effects = choice.effects ?? {};
    const nextLessonChoices = { ...state.lessonChoices, [lesson.id]: choice.id };
    const updatedCompletedLessons = state.completedLessons[lesson.id]
      ? {
          ...state.completedLessons,
          [lesson.id]: { ...state.completedLessons[lesson.id], selectedChoiceId: choice.id },
        }
      : state.completedLessons;

    dispatch({
      type: 'APPLY_STATE',
      state: {
        money: Math.max(0, state.money + (effects.moneyChange ?? 0)),
        happiness: clampStat(state.happiness + (effects.happinessChange ?? 0)),
        energy: clampStat(state.energy + (effects.energyChange ?? 0)),
        skill: Math.max(0, state.skill + (effects.skillChange ?? 0)),
        difficultyModifier: clampStat(state.difficultyModifier + (effects.difficultyModifier ?? 0), -15, 25),
        chosenFlags: choice.storyFlag ? [...state.chosenFlags, choice.storyFlag] : state.chosenFlags,
        lessonChoices: nextLessonChoices,
        completedLessons: updatedCompletedLessons,
      },
    });

    return { applied: true };
  };

  const makeChoice = (optionId: string, nodeId?: string) => {
    const node = getChoiceNode(nodeId ?? state.activeChoiceNodeId);
    if (!node) return { applied: false, reason: 'No active choice' };
    const option = node.options.find((opt) => opt.id === optionId);
    if (!option) return { applied: false, reason: 'Option not found' };
    if (!hasRequirements(state, option.requirements)) {
      return { applied: false, reason: 'Requirements not met' };
    }

    let nextState = applyRewards(state, option.rewards);
    if (option.endingFlag) {
      nextState = { ...nextState, flags: { ...nextState.flags, [option.endingFlag]: true } };
    }
    nextState = evaluateEndings(nextState);
    dispatch({ type: 'APPLY_STATE', state: nextState });

    if (option.triggersLessonId) {
      selectLesson(option.triggersLessonId);
    }
    if (option.nextNodeId) {
      dispatch({ type: 'SET_CHOICE_NODE', id: option.nextNodeId });
    }
    return { applied: true };
  };

  const startGame = () => {
    const entryLessonId = chapters.find((c) => c.id === 0)?.entryLessonId ?? lessons[0].id;
    dispatch({ type: 'START_GAME', entryLessonId });
    dispatch({ type: 'SELECT_LESSON', lessonId: entryLessonId });
  };

  const buyItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return { success: false, reason: 'Item missing' };
    if (state.ownedItems.includes(itemId)) return { success: false, reason: 'Already owned' };
    if (!hasRequirements(state, item.requirements)) return { success: false, reason: 'Requirements not met' };
    if (state.money < item.cost) return { success: false, reason: 'Not enough cash' };

    dispatch({ type: 'BUY_ITEM', itemId });
    dispatch({ type: 'APPLY_STATE', state: { money: state.money - item.cost } });
    return { success: true };
  };

  const buyVehicle = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return { success: false, reason: 'Vehicle missing' };
    if (state.ownedVehicles.includes(vehicleId)) return { success: false, reason: 'Already owned' };
    if (state.money < vehicle.cost) return { success: false, reason: 'Not enough cash' };
    dispatch({ type: 'BUY_VEHICLE', vehicleId });
    dispatch({ type: 'APPLY_STATE', state: { money: state.money - vehicle.cost } });
    return { success: true };
  };

  const adoptPet = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    if (!pet) return { success: false, reason: 'Pet missing' };
    if (state.ownedPets.includes(petId)) return { success: false, reason: 'Already adopted' };
    if (state.money < pet.cost) return { success: false, reason: 'Not enough cash' };
    dispatch({ type: 'ADOPT_PET', petId });
    dispatch({ type: 'APPLY_STATE', state: { money: state.money - pet.cost } });
    return { success: true };
  };

  const changeHousing = (housingId: string) => {
    const housing = housingOptions.find((h) => h.id === housingId);
    if (!housing) return { success: false, reason: 'Housing missing' };
    if (state.housingId === housingId) return { success: false, reason: 'Already living here' };
    if (state.money < housing.cost) return { success: false, reason: 'Not enough cash' };
    dispatch({ type: 'CHANGE_HOUSING', housingId });
    dispatch({ type: 'APPLY_STATE', state: { money: state.money - housing.cost } });
    if (housing.endingFlag) {
      dispatch({ type: 'SET_FLAG', flag: housing.endingFlag });
    }
    return { success: true };
  };

  const setActiveChoiceNode = (id?: string) => dispatch({ type: 'SET_CHOICE_NODE', id });
  const resetGame = () => {
    clearSavedGame();
    dispatch({ type: 'RESET_GAME' });
  };

  const value = useMemo(
    () => ({
      ...state,
      currentLesson,
      currentChapterName,
      bonuses,
      chapterProgress,
      selectLesson,
      completeLesson,
      chooseLessonChoice,
      makeChoice,
      setActiveChoiceNode,
      buyItem,
      buyVehicle,
      adoptPet,
      changeHousing,
      canSatisfy: (reqs?: Requirement[]) => hasRequirements(state, reqs),
      getChoiceNodeById: getChoiceNode,
      earnMoney: (amount: number) => dispatch({ type: 'APPLY_STATE', state: { money: state.money + Math.max(0, amount) } }),
      spendMoney: (amount: number) => {
        if (state.money < amount) return { success: false, reason: 'Not enough cash' };
        dispatch({ type: 'APPLY_STATE', state: { money: state.money - amount } });
        return { success: true };
      },
      unlockChapter: (id: number) => dispatch({ type: 'ADVANCE_CHAPTER', chapterId: id }),
      addItemToInventory: (itemId: string) => dispatch({ type: 'BUY_ITEM', itemId }),
      setVehicle: (vehicleId: string) => dispatch({ type: 'BUY_VEHICLE', vehicleId }),
      upgradeHousing: (housingId: string) => changeHousing(housingId),
      recordTypingResult: (res: TypingResult) =>
        dispatch({
          type: 'APPLY_STATE',
          state: {
            lifetimeStats: {
              ...state.lifetimeStats,
              totalCharsTyped: state.lifetimeStats.totalCharsTyped + res.total,
              correctChars: state.lifetimeStats.correctChars + res.correct,
              sessionsCompleted: state.lifetimeStats.sessionsCompleted + 1,
              totalTimeMs: state.lifetimeStats.totalTimeMs + res.timeMs,
              bestAccuracy: Math.max(state.lifetimeStats.bestAccuracy, res.accuracy),
              bestWpm: Math.max(state.lifetimeStats.bestWpm, res.wpm),
            },
          },
        }),
      resetGame,
      startGame,
    }),
    [state, currentLesson, currentChapterName, bonuses]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
