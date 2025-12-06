/**
 * Firebase Auth Hook
 * Manages anonymous authentication and cloud sync
 */

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store';
import {
  signInAnonymousUser,
  onAuthChange,
  getCurrentUserId,
} from '@/services/firebase';
import {
  createUserDocument,
  getUserDocument,
  updateLastLogin,
  saveCharacter,
} from '@/services/database';

interface UseFirebaseAuthReturn {
  isInitializing: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  error: string | null;
}

export function useFirebaseAuth(): UseFirebaseAuthReturn {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error] = useState<string | null>(null);

  const { setUser, currentCharacter } = useGameStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = async () => {
      try {
        // Check if already signed in
        let uid = getCurrentUserId();

        // If not signed in, sign in anonymously
        if (!uid) {
          try {
            uid = await signInAnonymousUser();
          } catch (signInError) {
            console.warn('?? Sign in failed, using offline mode:', signInError);
            uid = 'offline-user';
          }
        }

        // Only try to load from Firebase if we're not in offline mode
        let user = null;
        
        if (uid !== 'offline-user') {
          try {
            // Load or create user document
            user = await getUserDocument(uid);
            
            if (!user) {
              console.log('Creating new user document...');
              user = await createUserDocument(uid);
            } else {
              console.log('User document found, updating last login...');
              await updateLastLogin(uid).catch(() => {
                console.warn('Could not update last login - continuing anyway');
              });
            }
          } catch (dbError) {
            console.warn('?? Database error, falling back to offline mode:', dbError);
            uid = 'offline-user';
            user = await createUserDocument(uid);
          }
        } else {
          // Offline mode - create a basic user object
          console.log('?? Running in offline mode - creating local user');
          user = await createUserDocument(uid);
        }

        // Update store - always succeed
        setUser(user);
        setUserId(uid);
        setIsAuthenticated(true);
        setIsInitializing(false);

        console.log('? Auth initialized successfully');
      } catch (err) {
        console.error('? Unexpected error during auth initialization:', err);
        // Even if there's an error, allow offline mode to work
        try {
          const offlineUid = 'offline-user';
          const offlineUser = await createUserDocument(offlineUid);
          setUser(offlineUser);
          setUserId(offlineUid);
          setIsAuthenticated(true);
          setIsInitializing(false);
          console.log('?? Continuing in offline mode due to error');
        } catch (finalError) {
          // Last resort - just mark as initialized with minimal state
          console.error('? Critical error, proceeding with minimal state:', finalError);
          setUserId('offline-user');
          setIsAuthenticated(true);
          setIsInitializing(false);
        }
      }
    };

    // Initialize authentication
    initAuth();

    // Listen for auth state changes
    unsubscribe = onAuthChange(async (uid) => {
      if (uid) {
        setUserId(uid);
        setIsAuthenticated(true);
        
        // Load user data only if not offline
        if (uid !== 'offline-user') {
          const user = await getUserDocument(uid);
          if (user) {
            setUser(user);
          }
        }
      } else {
        setUserId(null);
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setUser]);

  // Auto-save character when it changes (skip in offline mode)
  useEffect(() => {
    if (!userId || !currentCharacter || userId === 'offline-user') return;

    const saveTimer = setTimeout(() => {
      saveCharacter(userId, currentCharacter).catch((err) => {
        console.error('Failed to auto-save character:', err);
      });
    }, 2000); // Debounce saves by 2 seconds

    return () => clearTimeout(saveTimer);
  }, [userId, currentCharacter]);

  return {
    isInitializing,
    isAuthenticated,
    userId,
    error,
  };
}
