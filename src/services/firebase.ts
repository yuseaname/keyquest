/**
 * Firebase Configuration
 * Initialize Firebase services for authentication and database
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, Auth } from 'firebase/auth';
import { 
  getFirestore, 
  Firestore,
  enableIndexedDbPersistence
} from 'firebase/firestore';

// Check if Firebase is properly configured
const isFirebaseConfigured = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your-api-key-here';

// Firebase configuration - Replace with your Firebase project config
// Get these values from Firebase Console > Project Settings > General
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'demo-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'demo-app-id',
};

// Initialize Firebase only if configured
let app: ReturnType<typeof initializeApp> | undefined;
if (!isFirebaseConfigured) {
  console.warn('?? Firebase not configured - running in offline mode. Cloud features disabled.');
  app = undefined;
} else {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.warn('?? Firebase initialization failed - running in offline mode:', error);
    app = undefined;
  }
}

// Initialize Firebase services only if app was initialized successfully
let auth: Auth | null = null;
let db: Firestore | null = null;

if (app && isFirebaseConfigured) {
  try {
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Enable offline persistence
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence enabled in first tab only');
      } else if (err.code === 'unimplemented') {
        console.warn('Browser does not support offline persistence');
      }
    });
  } catch (error) {
    console.warn('?? Failed to initialize Firebase services:', error);
    auth = null;
    db = null;
  }
}

export { auth, db };

/**
 * Sign in anonymously - called automatically on app load
 */
export async function signInAnonymousUser(): Promise<string> {
  if (!auth || !isFirebaseConfigured) {
    console.log('?? Running in offline mode - using local storage only');
    return 'offline-user';
  }
  
  try {
    const userCredential = await signInAnonymously(auth);
    console.log('? Anonymous user signed in:', userCredential.user.uid);
    return userCredential.user.uid;
  } catch (error) {
    console.error('? Error signing in anonymously:', error);
    throw error;
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (uid: string | null) => void): () => void {
  if (!auth || !isFirebaseConfigured) {
    callback('offline-user');
    return () => {};
  }
  
  return onAuthStateChanged(auth, (user) => {
    callback(user ? user.uid : null);
  });
}

/**
 * Get current user ID
 */
export function getCurrentUserId(): string | null {
  if (!auth || !isFirebaseConfigured) {
    return 'offline-user';
  }
  return auth.currentUser?.uid || null;
}

/**
 * Check if user is signed in
 */
export function isSignedIn(): boolean {
  if (!auth || !isFirebaseConfigured) {
    return true; // Always signed in for offline mode
  }
  return auth.currentUser !== null;
}
