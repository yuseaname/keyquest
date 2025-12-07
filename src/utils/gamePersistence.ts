import type { GameState } from '../types/game';

const SAVE_KEY = 'keyquest-rpg-save-v1';

function triggerSaveEvent(name: 'game:saving' | 'game:saved' | 'game:saveerror') {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new Event(name));
  } catch {
    // Ignore dispatch failures (non-browser environments)
  }
}

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
    triggerSaveEvent('game:saving');
    if (isLocalStorageAvailable()) {
      const serialized = JSON.stringify(state);
      window.localStorage.setItem(SAVE_KEY, serialized);
      triggerSaveEvent('game:saved');
      return;
    }

    const serialized = encodeURIComponent(JSON.stringify(state));
    document.cookie = `${SAVE_KEY}=${serialized}; path=/; max-age=31536000`;
    triggerSaveEvent('game:saved');
  } catch (err) {
    console.error('Failed to save game', err);
    triggerSaveEvent('game:saveerror');
  }
}

export function loadGame(): GameState | null {
  try {
    // Prefer localStorage but fall back to cookie; if we find a cookie and storage is available, rehydrate localStorage.
    let raw: string | null = null;
    if (isLocalStorageAvailable()) {
      raw = window.localStorage.getItem(SAVE_KEY);
    }

    if (!raw) {
      const match = document.cookie.split('; ').find((row) => row.startsWith(`${SAVE_KEY}=`));
      if (match) {
        raw = decodeURIComponent(match.split('=')[1]);
        if (raw && isLocalStorageAvailable()) {
          try {
            window.localStorage.setItem(SAVE_KEY, raw);
          } catch {
            // ignore write-back failures
          }
        }
      }
    }

    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch (err) {
    console.error('Failed to load game', err);
    clearSavedGame();
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
