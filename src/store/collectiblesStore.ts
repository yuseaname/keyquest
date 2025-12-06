/**
 * Collectibles Store
 * Manages player's collectibles, missions, and leaderboard data
 */

import { create } from 'zustand';
import type {
  OwnedCollectible,
  Mission,
  PlayerRanking,
  LeaderboardEntry,
  LeaderboardCategory,
} from '@/types/collectibles';

interface CollectiblesState {
  // Collectibles
  ownedCollectibles: OwnedCollectible[];
  equippedSkin: string | null;
  equippedFrame: string | null;
  equippedTitle: string | null;
  newCollectiblesCount: number;
  
  // Missions
  activeMissions: Mission[];
  completedMissions: string[]; // Mission IDs
  
  // Leaderboards
  playerRankings: PlayerRanking[];
  cachedLeaderboards: Map<LeaderboardCategory, LeaderboardEntry[]>;
  
  // Actions
  addCollectible: (collectible: OwnedCollectible) => void;
  equipSkin: (skinId: string) => void;
  equipFrame: (frameId: string) => void;
  equipTitle: (titleId: string) => void;
  markCollectibleViewed: (collectibleId: string) => void;
  
  updateMission: (mission: Mission) => void;
  completeMission: (missionId: string) => void;
  claimMissionReward: (missionId: string) => void;
  
  updatePlayerRanking: (ranking: PlayerRanking) => void;
  cacheLeaderboard: (category: LeaderboardCategory, entries: LeaderboardEntry[]) => void;
  
  resetStore: () => void;
}

const initialState = {
  ownedCollectibles: [],
  equippedSkin: null,
  equippedFrame: null,
  equippedTitle: null,
  newCollectiblesCount: 0,
  activeMissions: [],
  completedMissions: [],
  playerRankings: [],
  cachedLeaderboards: new Map(),
};

export const useCollectiblesStore = create<CollectiblesState>((set) => ({
  ...initialState,
  
  // ============================================
  // COLLECTIBLES ACTIONS
  // ============================================
  
  addCollectible: (collectible) => {
    set((state) => {
      // Check if already owned
      const exists = state.ownedCollectibles.some(
        c => c.collectibleId === collectible.collectibleId
      );
      
      if (exists) return state;
      
      return {
        ownedCollectibles: [...state.ownedCollectibles, collectible],
        newCollectiblesCount: state.newCollectiblesCount + (collectible.isNew ? 1 : 0),
      };
    });
  },
  
  equipSkin: (skinId) => {
    set({ equippedSkin: skinId });
    
    // Mark as equipped in owned collectibles
    set((state) => ({
      ownedCollectibles: state.ownedCollectibles.map(c =>
        c.collectibleId === skinId
          ? { ...c, isEquipped: true, isNew: false }
          : c
      ),
    }));
  },
  
  equipFrame: (frameId) => {
    set({ equippedFrame: frameId });
    
    set((state) => ({
      ownedCollectibles: state.ownedCollectibles.map(c =>
        c.collectibleId === frameId
          ? { ...c, isEquipped: true, isNew: false }
          : c
      ),
    }));
  },
  
  equipTitle: (titleId) => {
    set({ equippedTitle: titleId });
    
    set((state) => ({
      ownedCollectibles: state.ownedCollectibles.map(c =>
        c.collectibleId === titleId
          ? { ...c, isEquipped: true, isNew: false }
          : c
      ),
    }));
  },
  
  markCollectibleViewed: (collectibleId) => {
    set((state) => {
      const collectible = state.ownedCollectibles.find(c => c.collectibleId === collectibleId);
      const wasNew = collectible?.isNew || false;
      
      return {
        ownedCollectibles: state.ownedCollectibles.map(c =>
          c.collectibleId === collectibleId
            ? { ...c, isNew: false }
            : c
        ),
        newCollectiblesCount: wasNew 
          ? Math.max(0, state.newCollectiblesCount - 1)
          : state.newCollectiblesCount,
      };
    });
  },
  
  // ============================================
  // MISSIONS ACTIONS
  // ============================================
  
  updateMission: (mission) => {
    set((state) => {
      const existingIndex = state.activeMissions.findIndex(m => m.id === mission.id);
      
      if (existingIndex >= 0) {
        // Update existing mission
        const updated = [...state.activeMissions];
        updated[existingIndex] = mission;
        return { activeMissions: updated };
      } else {
        // Add new mission
        return { activeMissions: [...state.activeMissions, mission] };
      }
    });
  },
  
  completeMission: (missionId) => {
    set((state) => ({
      activeMissions: state.activeMissions.map(m =>
        m.id === missionId ? { ...m, isCompleted: true } : m
      ),
    }));
  },
  
  claimMissionReward: (missionId) => {
    set((state) => ({
      activeMissions: state.activeMissions.map(m =>
        m.id === missionId ? { ...m, isClaimed: true } : m
      ),
      completedMissions: [...state.completedMissions, missionId],
    }));
  },
  
  // ============================================
  // LEADERBOARD ACTIONS
  // ============================================
  
  updatePlayerRanking: (ranking) => {
    set((state) => {
      const existingIndex = state.playerRankings.findIndex(
        r => r.category === ranking.category && r.period === ranking.period
      );
      
      if (existingIndex >= 0) {
        const updated = [...state.playerRankings];
        updated[existingIndex] = ranking;
        return { playerRankings: updated };
      } else {
        return { playerRankings: [...state.playerRankings, ranking] };
      }
    });
  },
  
  cacheLeaderboard: (category, entries) => {
    set((state) => {
      const newCache = new Map(state.cachedLeaderboards);
      newCache.set(category, entries);
      return { cachedLeaderboards: newCache };
    });
  },
  
  // ============================================
  // RESET
  // ============================================
  
  resetStore: () => set(initialState),
}));

// Selectors
export const useOwnedCollectibles = () => useCollectiblesStore(state => state.ownedCollectibles);
export const useEquippedItems = () => useCollectiblesStore(state => ({
  skin: state.equippedSkin,
  frame: state.equippedFrame,
  title: state.equippedTitle,
}));
export const useActiveMissions = () => useCollectiblesStore(state => state.activeMissions);
export const usePlayerRankings = () => useCollectiblesStore(state => state.playerRankings);
