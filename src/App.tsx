import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChoicePanel } from './components/ChoicePanel';
import { EffectsBar } from './components/EffectsBar';
import { EndingsMenu } from './components/EndingsMenu';
import { EndingModal } from './components/EndingModal';
import { HUD } from './components/HUD';
import { HousingMenu } from './components/HousingMenu';
import { InventoryPanel } from './components/InventoryPanel';
import { JobBoard } from './components/JobBoard';
import { Header } from './components/Header';
import { HackerCelebration } from './components/HackerCelebration';
import { PetMenu } from './components/PetMenu';
import { RelationshipMenu } from './components/RelationshipMenu';
import { ResultModal } from './components/ResultModal';
import { ShopPanel } from './components/ShopPanel';
import { StoryPanel } from './components/StoryPanel';
import { StartScreen } from './components/StartScreen';
import { TransportationMenu } from './components/TransportationMenu';
import { TypingPanel } from './components/TypingPanel';
import { GameProvider, useGame } from './context/GameContext';
import { chapters, endings, housingOptions, lessons, vehicles } from './data';
import { Lesson, TypingResult } from './types/game';

function GameScreen() {
  const {
    currentChapterId,
    currentLesson,
    completedLessons,
    unlockedChapters,
    money,
    lifetimeStats,
    happiness,
    energy,
    skill,
    housingId,
    ownedVehicles,
    ownedItems,
    ownedPets,
    flags,
    chosenFlags,
    lessonChoices,
    difficultyModifier,
    bonuses,
    relationships,
    activeChoiceNodeId,
    getChoiceNodeById,
    canSatisfy,
    makeChoice,
    chooseLessonChoice,
    chapterProgress,
    selectLesson,
    completeLesson,
    buyItem,
    buyVehicle,
    adoptPet,
    changeHousing,
    resetGame,
  } = useGame();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState<TypingResult | null>(null);
  const [modalLesson, setModalLesson] = useState<Lesson | null>(null);
  const [passed, setPassed] = useState(false);
  const [earned, setEarned] = useState(0);
  const [unlockedChapter, setUnlockedChapter] = useState<number | undefined>();
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [endingOpen, setEndingOpen] = useState(false);
  const [activeEndingId, setActiveEndingId] = useState<string | undefined>();
  const [goalTargets, setGoalTargets] = useState({ accuracy: currentLesson.goalAccuracy, wpm: currentLesson.goalWpm });
  const [showHackerPopup, setShowHackerPopup] = useState(false);
  const [hackerContext, setHackerContext] = useState<'lesson' | 'job'>('lesson');
  const handleCloseCelebration = useCallback(() => {
    setShowHackerPopup(false);
  }, []);

  const currentChapter = chapters.find((c) => c.id === currentChapterId) ?? chapters[0];
  const currentHousing = housingOptions.find((h) => h.id === housingId);
  const activeVehicle = vehicles.find((v) => ownedVehicles.includes(v.id));
  const activeChoice = getChoiceNodeById(activeChoiceNodeId);
  const effectiveGoalAccuracy = Math.max(1, Math.min(100, currentLesson.goalAccuracy + difficultyModifier));
  const effectiveGoalWpm = Math.max(1, currentLesson.goalWpm + difficultyModifier);

  const jobs = useMemo(() => lessons.filter((lesson) => lesson.type === 'job'), []);

  const nextSuggestedLesson = useMemo(() => {
    const core = lessons.find(
      (lesson) =>
        lesson.type !== 'job' &&
        unlockedChapters.includes(lesson.chapterId) &&
        !completedLessons[lesson.id]?.passed
    );

    if (core) return core;

    const job = lessons.find(
      (lesson) =>
        lesson.type === 'job' &&
        unlockedChapters.includes(lesson.chapterId) &&
        !completedLessons[lesson.id]?.passed
    );

    return job ?? currentLesson;
  }, [unlockedChapters, completedLessons, currentLesson]);

  const handleComplete = (result: TypingResult) => {
    const outcome = completeLesson(currentLesson, result);
    setModalResult(result);
    setModalLesson(currentLesson);
    setPassed(outcome.passed);
    setEarned(outcome.earned);
    setUnlockedChapter(outcome.unlockedChapter);
    setGoalTargets({ accuracy: outcome.goalAccuracy, wpm: outcome.goalWpm });
    if (outcome.passed) {
      setHackerContext(currentLesson.type === 'job' ? 'job' : 'lesson');
      setShowHackerPopup(true);
    } else {
      handleCloseCelebration();
    }
    setModalOpen(true);
  };

  const handleNext = () => {
    if (modalLesson?.choices && passed && !lessonChoices[modalLesson.id]) {
      setStatusMessage('Pick a story path before continuing.');
      return;
    }
    if (!nextSuggestedLesson) return;
    const res = selectLesson(nextSuggestedLesson.id);
    if (!res?.success) {
      setStatusMessage(res?.reason ?? 'Cannot start lesson yet.');
      return;
    }
    setModalOpen(false);
  };

  const handleSelectLesson = (id: string) => {
    const res = selectLesson(id);
    if (!res?.success) {
      setStatusMessage(res?.reason ?? 'Cannot start lesson.');
    } else {
      setStatusMessage('');
    }
  };

  const handleResetGame = () => {
    const confirmed =
      typeof window === 'undefined' ? true : window.confirm('Reset progress? This will erase your saved game.');
    if (!confirmed) return;
    resetGame();
    setModalOpen(false);
    setEndingOpen(false);
    setActiveEndingId(undefined);
    setModalLesson(null);
    setModalResult(null);
    handleCloseCelebration();
    setStatusMessage('Progress reset. Fresh start!');
  };

  const handleLessonChoice = (choiceId: string) => {
    if (!modalLesson) return;
    const result = chooseLessonChoice(modalLesson, choiceId);
    if (!result.applied) {
      setStatusMessage(result.reason ?? 'Could not apply choice.');
    } else {
      setStatusMessage('Path locked in. Story updated.');
    }
  };

  const progress = chapterProgress(currentChapterId);

  const discoveredEnding = useMemo(() => endings.find((ending) => flags[ending.id]), [flags]);
  const selectedLessonChoice = modalLesson ? lessonChoices[modalLesson.id] : undefined;

  useEffect(() => {
    if (discoveredEnding && discoveredEnding.id !== activeEndingId) {
      setActiveEndingId(discoveredEnding.id);
      setEndingOpen(true);
    }
  }, [discoveredEnding, activeEndingId]);

  useEffect(() => {
    if (!modalOpen) {
      handleCloseCelebration();
    }
  }, [modalOpen, handleCloseCelebration]);


  return (
    <div className="app-shell">
      <HUD
        money={money}
        currentChapterId={currentChapterId}
        lifetimeStats={lifetimeStats}
        happiness={happiness}
        energy={energy}
        skill={skill}
        housingName={currentHousing?.name ?? 'Unknown'}
        vehicleName={activeVehicle?.name ?? 'Walking'}
      />

      <EffectsBar
        accuracyBonus={bonuses.accuracyBonus}
        wpmBonus={bonuses.wpmBonus}
        payoutMultiplier={bonuses.payoutMultiplier}
      />

      <main className="content-grid">
        <StoryPanel
          chapter={currentChapter}
          lesson={currentLesson}
          progress={progress}
          completedLessons={completedLessons}
          chosenFlags={chosenFlags}
        />
        <TypingPanel
          lesson={currentLesson}
          onComplete={handleComplete}
          goalAccuracy={effectiveGoalAccuracy}
          goalWpm={effectiveGoalWpm}
          hints={currentLesson.hints}
        />
      </main>

      <div className="content-grid secondary-grid">
        <ChoicePanel node={activeChoice} onChoose={(optionId) => makeChoice(optionId)} canSatisfy={canSatisfy} />
        <JobBoard
          jobs={jobs}
          unlockedChapters={unlockedChapters}
          completedLessons={completedLessons}
          canSatisfy={canSatisfy}
          onSelect={(id) => handleSelectLesson(id)}
        />
      </div>

      <div className="bottom-bar">
        <div>
          <p className="eyebrow">Flow</p>
          <p className="muted small">Finish the current lesson or pick a gig from the board.</p>
        </div>
        <div className="button-row">
          <button className="secondary" onClick={() => handleSelectLesson(currentLesson.id)}>Stay Here</button>
          <button className="primary" onClick={handleNext}>Next lesson/job</button>
        </div>
      </div>

      {statusMessage && <p className="muted small">{statusMessage}</p>}

      <div className="content-grid tertiary-grid">
        <ShopPanel money={money} ownedItems={ownedItems} onBuy={buyItem} />
        <InventoryPanel
          ownedItems={ownedItems}
          ownedPets={ownedPets}
          ownedVehicles={ownedVehicles}
          housingId={housingId}
        />
      </div>

      <div className="content-grid tertiary-grid">
        <TransportationMenu ownedVehicles={ownedVehicles} onBuy={buyVehicle} />
        <PetMenu ownedPets={ownedPets} onAdopt={adoptPet} />
      </div>

      <div className="content-grid tertiary-grid">
        <HousingMenu currentHousingId={housingId} onChange={changeHousing} />
        <RelationshipMenu relationshipLevels={relationships} />
      </div>

      <EndingsMenu flags={flags} />

      <section className="panel">
        <div className="panel-header">
          <p className="eyebrow">Game Options</p>
          <h3>Progress Control</h3>
        </div>
        <p className="muted small">Game auto-saves to your device. Reset wipes the save and restarts from chapter 1.</p>
        <div className="button-row" style={{ marginTop: 8 }}>
          <button className="secondary" onClick={handleResetGame}>Reset Game / Start Over</button>
        </div>
      </section>

      <ResultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lesson={modalLesson}
        result={modalResult}
        passed={passed}
        earned={earned}
        unlockedChapter={unlockedChapter}
        choices={modalLesson?.choices}
        onChoiceSelected={handleLessonChoice}
        selectedChoiceId={selectedLessonChoice}
        requireChoice={passed && Boolean(modalLesson?.choices) && !selectedLessonChoice}
        goalAccuracy={goalTargets.accuracy}
        goalWpm={goalTargets.wpm}
      />

      <EndingModal
        open={endingOpen}
        ending={endings.find((e) => e.id === activeEndingId)}
        onClose={() => setEndingOpen(false)}
      />

      <HackerCelebration
        visible={showHackerPopup}
        context={hackerContext}
        onClose={handleCloseCelebration}
      />
    </div>
  );
}

function GameContainer() {
  const { hasStarted, startGame } = useGame();
  if (!hasStarted) {
    return (
      <div className="app-shell">
        <StartScreen onStart={startGame} />
      </div>
    );
  }
  return <GameScreen />;
}

export function App() {
  return (
    <GameProvider>
      <div className="app-root">
        <Header />
        <div className="app-body">
          <GameContainer />
        </div>
      </div>
    </GameProvider>
  );
}
