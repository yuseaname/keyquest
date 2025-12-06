/**
 * Game Store - Central state management for KeyQuest
 * Uses Zustand for lightweight, performant state management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  User,
  Character,
  GameUIState,
  ScreenType,
  Notification,
  ModalState,
  DailyQuest,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

// ============================================
// GAME STORE INTERFACE
// ============================================

interface GameStore {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Character state
  currentCharacter: Character | null;
  characters: Character[];
  
  // UI state
  ui: GameUIState;
  
  // Daily quests
  dailyQuests: DailyQuest[];
  
  // User actions
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // Character actions
  setCurrentCharacter: (character: Character | null) => void;
  setCharacters: (characters: Character[]) => void;
  addCharacter: (character: Character) => void;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  deleteCharacter: (characterId: string) => void;
  
  // UI actions
  setScreen: (screen: ScreenType) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  
  // Quest actions
  setDailyQuests: (quests: DailyQuest[]) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  completeQuest: (questId: string) => void;
}

// ============================================
// DEFAULT VALUES
// ============================================

const defaultUIState: GameUIState = {
  currentScreen: 'home',
  isLoading: false,
  error: null,
  notifications: [],
  modal: null,
};

// ============================================
// GAME STORE IMPLEMENTATION
// ============================================

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        currentCharacter: null,
        characters: [],
        ui: defaultUIState,
        dailyQuests: [],

        // User actions
        setUser: (user) => set({ 
          user, 
          isAuthenticated: user !== null 
        }),
        
        logout: () => set({
          user: null,
          isAuthenticated: false,
          currentCharacter: null,
          characters: [],
          ui: defaultUIState,
        }),

        // Character actions
        setCurrentCharacter: (character) => set({ currentCharacter: character }),
        
        setCharacters: (characters) => set({ characters }),
        
        addCharacter: (character) => set((state) => ({
          characters: [...state.characters, character],
        })),
        
        updateCharacter: (characterId, updates) => set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId ? { ...char, ...updates } : char
          ),
          currentCharacter: state.currentCharacter?.id === characterId
            ? { ...state.currentCharacter, ...updates }
            : state.currentCharacter,
        })),
        
        deleteCharacter: (characterId) => set((state) => ({
          characters: state.characters.filter((char) => char.id !== characterId),
          currentCharacter: state.currentCharacter?.id === characterId
            ? null
            : state.currentCharacter,
        })),

        // UI actions
        setScreen: (screen) => set((state) => ({
          ui: { ...state.ui, currentScreen: screen },
        })),
        
        setLoading: (isLoading) => set((state) => ({
          ui: { ...state.ui, isLoading },
        })),
        
        setError: (error) => set((state) => ({
          ui: { ...state.ui, error },
        })),
        
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: uuidv4(),
            timestamp: new Date(),
          };
          
          set((state) => ({
            ui: {
              ...state.ui,
              notifications: [...state.ui.notifications, newNotification],
            },
          }));
          
          // Auto-remove notification after duration
          if (notification.duration > 0) {
            setTimeout(() => {
              get().removeNotification(newNotification.id);
            }, notification.duration);
          }
        },
        
        removeNotification: (id) => set((state) => ({
          ui: {
            ...state.ui,
            notifications: state.ui.notifications.filter((n) => n.id !== id),
          },
        })),
        
        clearNotifications: () => set((state) => ({
          ui: { ...state.ui, notifications: [] },
        })),
        
        openModal: (modal) => set((state) => ({
          ui: { ...state.ui, modal },
        })),
        
        closeModal: () => set((state) => ({
          ui: { ...state.ui, modal: null },
        })),

        // Quest actions
        setDailyQuests: (quests) => set({ dailyQuests: quests }),
        
        updateQuestProgress: (questId, progress) => set((state) => ({
          dailyQuests: state.dailyQuests.map((quest) =>
            quest.id === questId
              ? { ...quest, progress, isCompleted: progress >= quest.target }
              : quest
          ),
        })),
        
        completeQuest: (questId) => set((state) => ({
          dailyQuests: state.dailyQuests.map((quest) =>
            quest.id === questId
              ? { ...quest, isCompleted: true }
              : quest
          ),
        })),
      }),
      {
        name: 'keyquest-game-storage',
        partialize: (state) => ({
          user: state.user,
          characters: state.characters,
          currentCharacter: state.currentCharacter,
        }),
      }
    ),
    { name: 'GameStore' }
  )
);
