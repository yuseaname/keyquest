/**
 * TypeScript interfaces for KeyQuest game data models
 * These define the core data structures used throughout the game
 */

// ============================================
// USER & CHARACTER MODELS
// ============================================

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  lastLogin: Date;
  settings: UserSettings;
  statistics: UserStatistics;
}

export interface UserSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  musicVolume: number;
  showWPM: boolean;
  showAccuracy: boolean;
  theme: 'dark' | 'light' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
}

export interface UserStatistics {
  totalWordsTyped: number;
  totalCharactersTyped: number;
  averageWPM: number;
  averageAccuracy: number;
  highestWPM: number;
  totalPlayTime: number; // in seconds
  battlesWon: number;
  battlesLost: number;
  realmsCompleted: number;
  bossesDefeated: number;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  classType: ClassType;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  stats: CharacterStats;
  abilities: ActiveAbility[];
  equippedItems: EquippedItems;
  inventory: InventoryItem[];
  unlockedRealms: string[];
  createdAt: Date;
}

export interface CharacterStats {
  // Base stats that level up
  precision: number;      // Accuracy bonus (0-100 base, can be enhanced)
  agility: number;        // WPM multiplier (0-100 base)
  mana: number;           // Ability cooldown reduction (0-100 base)
  fortitude: number;      // Mistake forgiveness (0-100 base)
  
  // Derived combat stats
  maxHealth: number;
  currentHealth: number;
  baseDamage: number;
  criticalChance: number;
  criticalMultiplier: number;
}

export interface EquippedItems {
  weapon?: Item;
  armor?: Item;
  accessory?: Item;
  mount?: Item; // Cosmetic only
}

export interface InventoryItem {
  item: Item;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: Rarity;
  stats?: Partial<CharacterStats>;
  iconUrl: string;
}

export type ItemType = 'weapon' | 'armor' | 'accessory' | 'mount' | 'consumable';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// ============================================
// CLASS SYSTEM MODELS
// ============================================

export type ClassType = 
  | 'blade-dancer' 
  | 'shadow-rogue' 
  | 'ember-mage' 
  | 'spirit-healer' 
  | 'technomancer';

export interface ClassDefinition {
  type: ClassType;
  name: string;
  description: string;
  playstyle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  iconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  passiveAbility: PassiveAbility;
  activeAbilities: ActiveAbility[];
  baseStats: CharacterStats;
}

export interface PassiveAbility {
  id: string;
  name: string;
  description: string;
  effect: PassiveEffect;
}

export interface PassiveEffect {
  type: PassiveEffectType;
  value: number;
  maxStacks?: number;
  condition?: string;
}

export type PassiveEffectType = 
  | 'damage-stack'           // Blade Dancer: Momentum Edge
  | 'critical-chance'        // Shadow Rogue: Critical Typing
  | 'burn-dot'              // Ember Mage: Ignition
  | 'accuracy-buffer'       // Spirit Healer: Harmony Flow
  | 'alternating-multiplier'; // Technomancer: Binary Rhythm

export interface ActiveAbility {
  id: string;
  name: string;
  description: string;
  trigger: AbilityTrigger;
  effect: AbilityEffect;
  cooldown: number; // in seconds
  iconUrl: string;
}

export interface AbilityTrigger {
  type: 'word-streak' | 'key-press' | 'typed-word' | 'manual' | 'auto';
  value?: string | number;
}

export interface AbilityEffect {
  type: AbilityEffectType;
  value: number;
  duration?: number; // in seconds
  target?: 'self' | 'enemy' | 'all-enemies';
}

export type AbilityEffectType = 
  | 'damage-boost'
  | 'speed-boost'
  | 'multiplier-damage'
  | 'invulnerability'
  | 'aoe-damage'
  | 'cooldown-reset'
  | 'mistake-fix'
  | 'slow-enemy'
  | 'stun'
  | 'heal';

// ============================================
// REALM & ENEMY MODELS
// ============================================

export interface Realm {
  id: string;
  name: string;
  description: string;
  theme: RealmTheme;
  difficulty: number; // 1-10
  requiredLevel: number;
  backgroundUrl: string;
  musicTrack: string;
  enemies: Enemy[];
  boss: Enemy;
  rewards: RealmRewards;
  wordPool: WordPool;
}

export type RealmTheme = 
  | 'fire-caverns'
  | 'frost-vale'
  | 'shadow-library'
  | 'crystal-peaks'
  | 'storm-citadel'
  | 'ancient-ruins'
  | 'cyber-nexus'
  | 'void-realm';

export interface Enemy {
  id: string;
  name: string;
  description: string;
  type: EnemyType;
  maxHealth: number;
  damage: number;
  attackSpeed: number; // attacks per second
  imageUrl: string;
  abilities?: EnemyAbility[];
  lootTable: LootDrop[];
  experienceReward: number;
}

export type EnemyType = 'minion' | 'elite' | 'boss';

export interface EnemyAbility {
  name: string;
  description: string;
  effect: string;
  trigger: 'health-threshold' | 'time-interval' | 'random';
  triggerValue: number;
}

export interface LootDrop {
  itemId: string;
  dropChance: number; // 0-1
}

export interface RealmRewards {
  experienceBonus: number;
  goldReward: number;
  guaranteedItems: string[];
  possibleItems: LootDrop[];
}

export interface WordPool {
  easy: string[];    // 3-4 letter words
  medium: string[];  // 5-7 letter words
  hard: string[];    // 8+ letter words
  special: string[]; // Ability trigger words
}

// ============================================
// COMBAT STATE MODELS
// ============================================

export interface CombatState {
  id: string;
  status: CombatStatus;
  realm: Realm;
  currentEnemy: Enemy;
  enemyCurrentHealth: number;
  character: Character;
  characterCurrentHealth: number;
  
  // Typing state
  currentWord: string;
  typedText: string;
  wordQueue: string[];
  
  // Combat metrics
  wordsCompleted: number;
  totalCharactersTyped: number;
  correctCharacters: number;
  mistakes: number;
  combo: number;
  maxCombo: number;
  
  // Real-time stats
  currentWPM: number;
  currentAccuracy: number;
  
  // Ability state
  abilityStates: AbilityState[];
  passiveStacks: number;
  
  // Timing
  battleStartTime: number;
  lastWordTime: number;
  
  // Effects
  activeEffects: ActiveEffect[];
}

export type CombatStatus = 
  | 'preparing'
  | 'active'
  | 'paused'
  | 'victory'
  | 'defeat';

export interface AbilityState {
  abilityId: string;
  isOnCooldown: boolean;
  cooldownRemaining: number;
  isActive: boolean;
  activeTimeRemaining?: number;
}

export interface ActiveEffect {
  id: string;
  type: AbilityEffectType;
  value: number;
  remainingDuration: number;
  source: 'player' | 'enemy';
}

// ============================================
// BATTLE LOG MODELS
// ============================================

export interface BattleLog {
  id: string;
  timestamp: Date;
  characterId: string;
  realmId: string;
  enemiesDefeated: EnemyDefeatRecord[];
  duration: number; // in seconds
  finalWPM: number;
  finalAccuracy: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  abilitiesUsed: AbilityUseRecord[];
  lootObtained: Item[];
  experienceGained: number;
  result: 'victory' | 'defeat' | 'fled';
}

export interface EnemyDefeatRecord {
  enemyId: string;
  enemyName: string;
  timeToDefeat: number;
  damageDealt: number;
}

export interface AbilityUseRecord {
  abilityId: string;
  abilityName: string;
  timesUsed: number;
  totalDamageFromAbility: number;
}

// ============================================
// UI STATE MODELS
// ============================================

export interface GameUIState {
  currentScreen: ScreenType;
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
  modal: ModalState | null;
}

export type ScreenType = 
  | 'home'
  | 'character-select'
  | 'character-create'
  | 'realm-select'
  | 'battle'
  | 'training'
  | 'inventory'
  | 'skill-tree'
  | 'settings'
  | 'leaderboard';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  duration: number;
  timestamp: Date;
}

export interface ModalState {
  type: string;
  data?: unknown;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// ============================================
// DAILY QUEST MODELS
// ============================================

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  target: number;
  progress: number;
  reward: QuestReward;
  expiresAt: Date;
  isCompleted: boolean;
}

export type QuestType = 
  | 'words-typed'
  | 'accuracy-threshold'
  | 'wpm-threshold'
  | 'enemies-defeated'
  | 'realm-completed'
  | 'abilities-used'
  | 'combo-reached';

export interface QuestReward {
  experience: number;
  gold?: number;
  items?: string[];
}

// Re-export collectibles types
export * from './collectibles';
