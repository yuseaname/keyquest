export type LessonType = 'story' | 'drill' | 'job' | 'challenge';

export interface TypingResult {
  accuracy: number;
  wpm: number;
  errors: number;
  timeMs: number;
  completed: boolean;
  correct: number;
  total: number;
}

export interface Lesson {
  id: string;
  chapterId: number;
  type: LessonType;
  title: string;
  description: string;
  snippet: string;
  goalAccuracy: number;
  goalWpm: number;
  payout: number;
  flavor?: string;
  tags?: string[];
  requirements?: Requirement[];
  rewards?: Reward[];
}

export interface Chapter {
  id: number;
  name: string;
  summary: string;
  beats: string[];
  entryLessonId: string;
  endingFlags?: string[];
}

export type Requirement =
  | { type: 'item'; itemId: string }
  | { type: 'vehicle'; vehicleId: string }
  | { type: 'relationship'; partnerId: string; level: number }
  | { type: 'pet'; petId: string }
  | { type: 'stat'; stat: 'happiness' | 'energy' | 'skill'; min: number }
  | { type: 'chapterUnlocked'; chapterId: number }
  | { type: 'flag'; flag: string }
  | { type: 'money'; amount: number };

export type Reward =
  | { type: 'money'; amount: number }
  | { type: 'item'; itemId: string }
  | { type: 'vehicle'; vehicleId: string }
  | { type: 'pet'; petId: string }
  | { type: 'relationship'; partnerId: string; delta: number }
  | { type: 'stat'; stat: 'happiness' | 'energy' | 'skill'; delta: number }
  | { type: 'flag'; flag: string };

export interface ChoiceNode {
  id: string;
  chapterId: number;
  title: string;
  narrative: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  label: string;
  outcomeText: string;
  requirements?: Requirement[];
  rewards?: Reward[];
  nextNodeId?: string;
  triggersLessonId?: string;
  endingFlag?: string;
}

export interface Item {
  id: string;
  name: string;
  type: 'laptop' | 'keyboard' | 'monitor' | 'coffee';
  cost: number;
  requirements?: Requirement[];
  effects: {
    accuracyBonus?: number;
    wpmBonus?: number;
    payoutMultiplier?: number;
    unlockTags?: string[];
  };
}

export interface Vehicle {
  id: string;
  name: string;
  tier: number;
  cost: number;
  upkeep: number;
  requirements?: Requirement[];
  effects?: { jobTags?: string[] };
}

export interface Pet {
  id: string;
  name: string;
  cost: number;
  upkeep: number;
  effects: { accuracyBonus?: number; motivationBonus?: number; luckBonus?: number; wpmBonus?: number };
}

export interface Housing {
  id: string;
  name: string;
  tier: number;
  cost: number;
  upkeep: number;
  effects: { happinessBonus: number; energyRegen: number };
  endingFlag?: string;
}

export interface RelationshipPartner {
  id: string;
  name: string;
  occupation: string;
  milestones: RelationshipMilestone[];
}

export interface RelationshipMilestone {
  level: number;
  label: string;
  requirement?: Requirement;
  reward?: Reward;
  lessonId: string;
}

export interface Ending {
  id: string;
  title: string;
  description: string;
  conditions: Requirement[];
}

export interface LifetimeStats {
  totalCharsTyped: number;
  correctChars: number;
  sessionsCompleted: number;
  totalTimeMs: number;
  bestAccuracy: number;
  bestWpm: number;
}

export interface CompletedLesson {
  result: TypingResult;
  payout: number;
  passed: boolean;
  completedAt: number;
}

export interface GameState {
  money: number;
  happiness: number;
  energy: number;
  skill: number;
  currentChapterId: number;
  unlockedChapters: number[];
  currentLessonId: string;
  lifetimeStats: LifetimeStats;
  completedLessons: Record<string, CompletedLesson>;
  ownedItems: string[];
  ownedVehicles: string[];
  ownedPets: string[];
  housingId: string;
  relationships: Record<string, { level: number; progress: number }>;
  flags: Record<string, boolean>;
  activeChoiceNodeId?: string;
}
