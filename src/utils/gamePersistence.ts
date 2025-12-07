import type { GameState } from '../types/game';

const SAVE_KEY = 'keyquest-rpg-save-v1';

function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const testKey = '__keyquest_save_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function saveGame(state: GameState): void {
  try {
    if (isLocalStorageAvailable()) {
      const serialized = JSON.stringify(state);
      window.localStorage.setItem(SAVE_KEY, serialized);
      return;
    }

    const serialized = encodeURIComponent(JSON.stringify(state));
    document.cookie = `${SAVE_KEY}=${serialized}; path=/; max-age=31536000`;
  } catch (err) {
    console.error('Failed to save game', err);
  }
}

export function loadGame(): GameState | null {
  try {
    if (isLocalStorageAvailable()) {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as GameState;
    }

    const match = document.cookie.split('; ').find((row) => row.startsWith(`${SAVE_KEY}=`));
    if (!match) return null;
    const raw = decodeURIComponent(match.split('=')[1]);
    return JSON.parse(raw) as GameState;
  } catch (err) {
    console.error('Failed to load game', err);
    return null;
  }
}

export function clearSavedGame(): void {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(SAVE_KEY);
    }
    document.cookie = `${SAVE_KEY}=; path=/; max-age=0`;
  } catch (err) {
    console.error('Failed to clear saved game', err);
  }
}

export function getSaveKey() {
  return SAVE_KEY;
}
