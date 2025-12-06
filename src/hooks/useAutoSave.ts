/**
 * Auto-save Hook
 * Automatically saves character progress and battle results to Firebase
 */

import { useEffect, useRef } from 'react';
import { useGameStore, useCombatStore } from '@/store';
import { getCurrentUserId } from '@/services/firebase';
import { 
  saveCharacter, 
  saveBattleLog,
  updateUserStatistics,
  syncProgress,
} from '@/services/database';

/**
 * Hook to auto-save character progress
 */
export function useAutoSave() {
  const { currentCharacter } = useGameStore();
  const saveTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const uid = getCurrentUserId();
    if (!uid || !currentCharacter) return;

    // Clear previous timer
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    // Debounce saves by 2 seconds
    saveTimerRef.current = setTimeout(() => {
      saveCharacter(uid, currentCharacter)
        .then(() => console.log('?? Auto-saved character'))
        .catch((err) => console.error('Failed to auto-save:', err));
    }, 2000);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [currentCharacter]);

  return null;
}

/**
 * Hook to save battle results when combat ends
 */
export function useBattleSave() {
  const { combat } = useCombatStore();
  const { currentCharacter } = useGameStore();
  const previousStatusRef = useRef<string>('preparing');

  useEffect(() => {
    if (!combat || !currentCharacter) return;

    const uid = getCurrentUserId();
    if (!uid) return;

    // Check if battle just ended (status changed to victory or defeat)
    const isEnding = 
      (combat.status === 'victory' || combat.status === 'defeat') &&
      previousStatusRef.current === 'active';

    if (isEnding) {
      const battleDuration = (Date.now() - combat.battleStartTime) / 1000;
      
      // Calculate experience gained
      const experienceGained = combat.status === 'victory' 
        ? combat.realm.rewards.experienceBonus 
        : Math.floor(combat.realm.rewards.experienceBonus * 0.25); // 25% XP on defeat

      // Save battle log
      if (combat.status === 'victory' || combat.status === 'defeat') {
        saveBattleLog(uid, {
          characterId: currentCharacter.id,
          realmId: combat.realm.id,
          result: combat.status,
          wpm: combat.currentWPM,
          accuracy: combat.currentAccuracy,
          duration: battleDuration,
          experienceGained,
        }).catch((err) => console.error('Failed to save battle log:', err));
      }

      // Update user statistics
      updateUserStatistics(uid, {
        totalWordsTyped: combat.wordsCompleted,
        totalCharactersTyped: combat.totalCharactersTyped,
        highestWPM: Math.max(combat.currentWPM, 0),
        totalPlayTime: battleDuration,
      }).catch((err) => console.error('Failed to update stats:', err));

      console.log(`?? Battle ${combat.status} saved to cloud`);
    }

    previousStatusRef.current = combat.status;
  }, [combat, currentCharacter]);

  return null;
}

/**
 * Manual save function - useful for important moments
 */
export async function saveProgressNow(): Promise<void> {
  const uid = getCurrentUserId();
  if (!uid) {
    console.warn('Cannot save: User not authenticated');
    return;
  }

  const { currentCharacter, user } = useGameStore.getState();
  if (!currentCharacter) {
    console.warn('Cannot save: No character selected');
    return;
  }

  try {
    await syncProgress(uid, currentCharacter, user?.statistics || {});
    console.log('? Progress saved successfully');
  } catch (error) {
    console.error('? Failed to save progress:', error);
    throw error;
  }
}
