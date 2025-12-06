/**
 * Leaderboard Types
 * Defines all leaderboard categories and player rankings
 */

export type LeaderboardCategory =
  | 'wpm'           // Highest WPM
  | 'accuracy'      // Best accuracy percentage
  | 'combo'         // Longest combo streak
  | 'xp'            // Total XP earned
  | 'boss-clears'   // Boss battles won
  | 'speed-run';    // Fastest realm completions

export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'all-time';

export interface LeaderboardEntry {
  uid: string;
  username: string;
  value: number;
  classType: string;
  rank: number;
  characterName?: string;
  avatarUrl?: string;
  title?: string;
  updatedAt: Date;
}

export interface PlayerRanking {
  category: LeaderboardCategory;
  period: LeaderboardPeriod;
  rank: number;
  value: number;
  totalPlayers: number;
  percentile: number; // Top X%
}

export interface LeaderboardReward {
  rank: number;
  rewards: CollectibleReward[];
  title?: string;
}

// ============================================
// COLLECTIBLES SYSTEM
// ============================================

export type CollectibleType =
  | 'skin'          // Character skins
  | 'ability-skin'  // Ability visual variants
  | 'monster-card'  // Monster collection cards
  | 'relic'         // Realm artifacts
  | 'title'         // Player titles
  | 'emote'         // Character emotes
  | 'frame'         // Profile/leaderboard frames
  | 'aura'          // Character auras/effects
  | 'mount';        // Cosmetic mounts

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Collectible {
  id: string;
  type: CollectibleType;
  name: string;
  description: string;
  rarity: Rarity;
  imageUrl: string;
  animationUrl?: string;
  classRestriction?: string; // null = any class can use
  category?: string; // e.g., "Fire Theme", "Seasonal"
  obtainMethod: string; // How to get it
  isLimited?: boolean; // Seasonal/event exclusive
}

export interface OwnedCollectible {
  collectibleId: string;
  obtainedAt: Date;
  isEquipped: boolean;
  isNew: boolean; // For "New!" badge in UI
}

export interface CollectibleReward {
  collectible: Collectible;
  dropChance: number; // 0-1
  guaranteed?: boolean;
}

export interface PlayerCollection {
  uid: string;
  skins: OwnedCollectible[];
  abilitySkins: OwnedCollectible[];
  monsterCards: OwnedCollectible[];
  relics: OwnedCollectible[];
  titles: OwnedCollectible[];
  emotes: OwnedCollectible[];
  frames: OwnedCollectible[];
  auras: OwnedCollectible[];
  mounts: OwnedCollectible[];
  totalCollected: number;
  totalPossible: number;
  completionPercentage: number;
}

// ============================================
// MISSIONS SYSTEM
// ============================================

export type MissionType = 'daily' | 'weekly' | 'realm' | 'boss' | 'achievement';

export type MissionObjectiveType =
  | 'type-words'        // Type X words
  | 'defeat-enemies'    // Defeat X enemies
  | 'accuracy-threshold' // Maintain X% accuracy
  | 'wpm-threshold'     // Reach X WPM
  | 'combo-reached'     // Achieve X combo
  | 'realm-completed'   // Complete specific realm
  | 'boss-defeated'     // Defeat specific boss
  | 'level-reached'     // Reach character level
  | 'class-specific';   // Complete with specific class

export interface MissionObjective {
  type: MissionObjectiveType;
  target: number;
  current: number;
  description: string;
}

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  objectives: MissionObjective[];
  rewards: MissionReward;
  expiresAt?: Date; // For daily/weekly missions
  isCompleted: boolean;
  isClaimed: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  iconUrl: string;
}

export interface MissionReward {
  experience: number;
  gold?: number;
  collectibles?: CollectibleReward[];
  title?: string;
}

// ============================================
// MONSTER CARDS
// ============================================

export interface MonsterCard {
  id: string;
  enemyId: string;
  name: string;
  description: string;
  lore: string;
  imageUrl: string;
  stats: {
    health: number;
    damage: number;
    attackSpeed: number;
  };
  weakness?: string;
  resistances?: string[];
  realmOrigin: string;
  rarity: Rarity;
  xpBonus?: number; // Bonus XP for having this card
}

// ============================================
// TITLES
// ============================================

export interface Title {
  id: string;
  name: string;
  description: string;
  requirement: string;
  color: string; // Hex color for display
  rarity: Rarity;
  iconUrl?: string;
}

// ============================================
// REWARDS CHEST
// ============================================

export interface RewardChest {
  id: string;
  type: 'common' | 'rare' | 'epic' | 'legendary' | 'seasonal';
  name: string;
  description: string;
  imageUrl: string;
  contents: CollectibleReward[];
  guaranteedRarity?: Rarity; // At least one of this rarity
}

// ============================================
// SEASONAL EVENTS
// ============================================

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  theme: string;
  exclusiveCollectibles: Collectible[];
  specialMissions: Mission[];
  leaderboardRewards: LeaderboardReward[];
  bannerUrl: string;
}
