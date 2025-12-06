/**
 * Combat Store - State management for battle system
 * Handles all combat-related state including typing, damage, and abilities
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  CombatState,
  Enemy,
  Realm,
  Character,
  ActiveEffect,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { generateWordQueue } from '@/game/engine/wordGenerator';

// ============================================
// COMBAT STORE INTERFACE
// ============================================

interface CombatStore {
  // Combat state
  combat: CombatState | null;
  isInCombat: boolean;
  
  // Combat lifecycle
  initializeCombat: (realm: Realm, character: Character) => void;
  startCombat: () => void;
  pauseCombat: () => void;
  resumeCombat: () => void;
  endCombat: (result: 'victory' | 'defeat') => void;
  resetCombat: () => void;
  
  // Typing actions
  setCurrentWord: (word: string) => void;
  updateTypedText: (text: string) => void;
  completeWord: () => void;
  registerMistake: () => void;
  
  // Combat stats
  updateWPM: (wpm: number) => void;
  updateAccuracy: (accuracy: number) => void;
  incrementCombo: () => void;
  resetCombo: () => void;
  
  // Damage system
  dealDamageToEnemy: (damage: number) => void;
  takeDamage: (damage: number) => void;
  healCharacter: (amount: number) => void;
  
  // Enemy management
  setNextEnemy: (enemy: Enemy) => void;
  defeatCurrentEnemy: () => void;
  
  // Ability system
  activateAbility: (abilityId: string) => void;
  deactivateAbility: (abilityId: string) => void;
  startAbilityCooldown: (abilityId: string, duration: number) => void;
  updateCooldowns: (deltaTime: number) => void;
  incrementPassiveStacks: (amount?: number) => void;
  resetPassiveStacks: () => void;
  
  // Effects
  addActiveEffect: (effect: Omit<ActiveEffect, 'id'>) => void;
  removeActiveEffect: (effectId: string) => void;
  updateEffectDurations: (deltaTime: number) => void;
  
  // Word queue
  addWordsToQueue: (words: string[]) => void;
  getNextWord: () => string | null;
}

// ============================================
// INITIAL COMBAT STATE FACTORY
// ============================================

const createInitialCombatState = (
  realm: Realm,
  character: Character
): CombatState => {
  // Generate initial word queue based on realm difficulty
  const initialWordCount = 50; // Generate 50 words to start
  const wordQueue = generateWordQueue(initialWordCount, realm.difficulty, realm);
  
  return {
    id: uuidv4(),
    status: 'preparing',
    realm,
    currentEnemy: realm.enemies[0],
    enemyCurrentHealth: realm.enemies[0].maxHealth,
    character,
    characterCurrentHealth: character.stats.maxHealth,
    
    currentWord: '',
    typedText: '',
    wordQueue,
    
    wordsCompleted: 0,
    totalCharactersTyped: 0,
    correctCharacters: 0,
    mistakes: 0,
    combo: 0,
    maxCombo: 0,
    
    currentWPM: 0,
    currentAccuracy: 100,
    
    abilityStates: character.abilities.map((ability) => ({
      abilityId: ability.id,
      isOnCooldown: false,
      cooldownRemaining: 0,
      isActive: false,
    })),
    passiveStacks: 0,
    
    battleStartTime: 0,
    lastWordTime: 0,
    
    activeEffects: [],
  };
};

// ============================================
// COMBAT STORE IMPLEMENTATION
// ============================================

export const useCombatStore = create<CombatStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      combat: null,
      isInCombat: false,

      // Combat lifecycle
      initializeCombat: (realm, character) => {
        const combatState = createInitialCombatState(realm, character);
        set({ combat: combatState, isInCombat: false });
      },

      startCombat: () => set((state) => ({
        isInCombat: true,
        combat: state.combat ? {
          ...state.combat,
          status: 'active',
          battleStartTime: Date.now(),
          lastWordTime: Date.now(),
        } : null,
      })),

      pauseCombat: () => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          status: 'paused',
        } : null,
      })),

      resumeCombat: () => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          status: 'active',
        } : null,
      })),

      endCombat: (result) => set((state) => ({
        isInCombat: false,
        combat: state.combat ? {
          ...state.combat,
          status: result === 'victory' ? 'victory' : 'defeat',
        } : null,
      })),

      resetCombat: () => set({ combat: null, isInCombat: false }),

      // Typing actions
      setCurrentWord: (word) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          currentWord: word,
          typedText: '',
        } : null,
      })),

      updateTypedText: (text) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          typedText: text,
          totalCharactersTyped: state.combat.totalCharactersTyped + 1,
        } : null,
      })),

      completeWord: () => set((state) => {
        if (!state.combat) return state;
        
        const now = Date.now();
        const wordLength = state.combat.currentWord.length;
        
        return {
          combat: {
            ...state.combat,
            wordsCompleted: state.combat.wordsCompleted + 1,
            correctCharacters: state.combat.correctCharacters + wordLength,
            lastWordTime: now,
            typedText: '',
          },
        };
      }),

      registerMistake: () => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          mistakes: state.combat.mistakes + 1,
        } : null,
      })),

      // Combat stats
      updateWPM: (wpm) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          currentWPM: wpm,
        } : null,
      })),

      updateAccuracy: (accuracy) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          currentAccuracy: accuracy,
        } : null,
      })),

      incrementCombo: () => set((state) => {
        if (!state.combat) return state;
        const newCombo = state.combat.combo + 1;
        return {
          combat: {
            ...state.combat,
            combo: newCombo,
            maxCombo: Math.max(newCombo, state.combat.maxCombo),
          },
        };
      }),

      resetCombo: () => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          combo: 0,
        } : null,
      })),

      // Damage system
      dealDamageToEnemy: (damage) => set((state) => {
        if (!state.combat) return state;
        const newHealth = Math.max(0, state.combat.enemyCurrentHealth - damage);
        return {
          combat: {
            ...state.combat,
            enemyCurrentHealth: newHealth,
          },
        };
      }),

      takeDamage: (damage) => set((state) => {
        if (!state.combat) return state;
        const newHealth = Math.max(0, state.combat.characterCurrentHealth - damage);
        return {
          combat: {
            ...state.combat,
            characterCurrentHealth: newHealth,
          },
        };
      }),

      healCharacter: (amount) => set((state) => {
        if (!state.combat) return state;
        const maxHealth = state.combat.character.stats.maxHealth;
        const newHealth = Math.min(maxHealth, state.combat.characterCurrentHealth + amount);
        return {
          combat: {
            ...state.combat,
            characterCurrentHealth: newHealth,
          },
        };
      }),

      // Enemy management
      setNextEnemy: (enemy) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          currentEnemy: enemy,
          enemyCurrentHealth: enemy.maxHealth,
        } : null,
      })),

      defeatCurrentEnemy: () => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          enemyCurrentHealth: 0,
        } : null,
      })),

      // Ability system
      activateAbility: (abilityId) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          abilityStates: state.combat.abilityStates.map((as) =>
            as.abilityId === abilityId ? { ...as, isActive: true } : as
          ),
        } : null,
      })),

      deactivateAbility: (abilityId) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          abilityStates: state.combat.abilityStates.map((as) =>
            as.abilityId === abilityId ? { ...as, isActive: false } : as
          ),
        } : null,
      })),

      startAbilityCooldown: (abilityId, duration) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          abilityStates: state.combat.abilityStates.map((as) =>
            as.abilityId === abilityId
              ? { ...as, isOnCooldown: true, cooldownRemaining: duration }
              : as
          ),
        } : null,
      })),

      updateCooldowns: (deltaTime) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          abilityStates: state.combat.abilityStates.map((as) => {
            if (!as.isOnCooldown) return as;
            const newCooldown = Math.max(0, as.cooldownRemaining - deltaTime);
            return {
              ...as,
              cooldownRemaining: newCooldown,
              isOnCooldown: newCooldown > 0,
            };
          }),
        } : null,
      })),

      incrementPassiveStacks: (amount = 1) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          passiveStacks: state.combat.passiveStacks + amount,
        } : null,
      })),

      resetPassiveStacks: () => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          passiveStacks: 0,
        } : null,
      })),

      // Effects
      addActiveEffect: (effect) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          activeEffects: [
            ...state.combat.activeEffects,
            { ...effect, id: uuidv4() },
          ],
        } : null,
      })),

      removeActiveEffect: (effectId) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          activeEffects: state.combat.activeEffects.filter(
            (e) => e.id !== effectId
          ),
        } : null,
      })),

      updateEffectDurations: (deltaTime) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          activeEffects: state.combat.activeEffects
            .map((e) => ({
              ...e,
              remainingDuration: e.remainingDuration - deltaTime,
            }))
            .filter((e) => e.remainingDuration > 0),
        } : null,
      })),

      // Word queue
      addWordsToQueue: (words) => set((state) => ({
        combat: state.combat ? {
          ...state.combat,
          wordQueue: [...state.combat.wordQueue, ...words],
        } : null,
      })),

      getNextWord: () => {
        const state = get();
        if (!state.combat) {
          return null;
        }
        
        // If queue is empty, generate more words
        if (state.combat.wordQueue.length === 0) {
          const newWords = generateWordQueue(50, state.combat.realm.difficulty, state.combat.realm);
          set({
            combat: {
              ...state.combat,
              wordQueue: newWords,
            },
          });
          return newWords[0] || null;
        }
        
        // Get next word from queue
        const [nextWord, ...remainingWords] = state.combat.wordQueue;
        
        // Replenish queue when it gets low (below 10 words)
        let newQueue = remainingWords;
        if (remainingWords.length < 10) {
          const additionalWords = generateWordQueue(50, state.combat.realm.difficulty, state.combat.realm);
          newQueue = [...remainingWords, ...additionalWords];
        }
        
        set({
          combat: {
            ...state.combat,
            wordQueue: newQueue,
            currentWord: nextWord,
            typedText: '',
          },
        });
        
        return nextWord;
      },
    }),
    { name: 'CombatStore' }
  )
);
