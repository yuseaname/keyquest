/**
 * Firestore Database Service
 * Handles all database operations for user data, characters, and progress
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { User, Character, UserSettings, UserStatistics } from '@/types';

// Check if database is available
const isOfflineMode = !db;

// ============================================
// USER OPERATIONS
// ============================================

/**
 * Create a new user document in Firestore
 */
export async function createUserDocument(uid: string): Promise<User> {
  const user: User = {
    id: uid,
    username: `Typist_${uid.slice(0, 6)}`,
    email: '',
    createdAt: new Date(),
    lastLogin: new Date(),
    settings: {
      soundEnabled: true,
      musicEnabled: true,
      soundVolume: 80,
      musicVolume: 60,
      showWPM: true,
      showAccuracy: true,
      theme: 'dark',
      fontSize: 'medium',
    },
    statistics: {
      totalWordsTyped: 0,
      totalCharactersTyped: 0,
      averageWPM: 0,
      averageAccuracy: 100,
      highestWPM: 0,
      totalPlayTime: 0,
      battlesWon: 0,
      battlesLost: 0,
      realmsCompleted: 0,
      bossesDefeated: 0,
    },
  };

  if (!isOfflineMode && db) {
    await setDoc(doc(db, 'users', uid), {
      ...user,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
  }

  return user;
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(uid: string): Promise<User | null> {
  if (isOfflineMode || !db) {
    return null;
  }
  
  const userDoc = await getDoc(doc(db, 'users', uid));
  
  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return {
    ...data,
    id: uid,
    createdAt: (data.createdAt as Timestamp).toDate(),
    lastLogin: (data.lastLogin as Timestamp).toDate(),
  } as User;
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  uid: string, 
  settings: Partial<UserSettings>
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  await updateDoc(doc(db, 'users', uid), {
    settings,
  });
}

/**
 * Update user statistics
 */
export async function updateUserStatistics(
  uid: string,
  stats: Partial<UserStatistics>
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const updates: Record<string, any> = {};
  
  Object.entries(stats).forEach(([key, value]) => {
    updates[`statistics.${key}`] = value;
  });

  await updateDoc(doc(db, 'users', uid), updates);
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(uid: string): Promise<void> {
  if (isOfflineMode || !db) return;
  
  await updateDoc(doc(db, 'users', uid), {
    lastLogin: serverTimestamp(),
  });
}

// ============================================
// CHARACTER OPERATIONS
// ============================================

/**
 * Save character to Firestore
 */
export async function saveCharacter(uid: string, character: Character): Promise<void> {
  if (isOfflineMode || !db) return;
  
  await setDoc(doc(db, 'users', uid, 'characters', character.id), {
    ...character,
    createdAt: character.createdAt instanceof Date 
      ? Timestamp.fromDate(character.createdAt) 
      : serverTimestamp(),
    lastSaved: serverTimestamp(),
  });
}

/**
 * Get a specific character
 */
export async function getCharacter(uid: string, characterId: string): Promise<Character | null> {
  if (isOfflineMode || !db) return null;
  
  const charDoc = await getDoc(doc(db, 'users', uid, 'characters', characterId));
  
  if (!charDoc.exists()) {
    return null;
  }

  const data = charDoc.data();
  return {
    ...data,
    id: characterId,
    createdAt: (data.createdAt as Timestamp).toDate(),
  } as Character;
}

/**
 * Get all characters for a user
 */
export async function getAllCharacters(_uid: string): Promise<Character[]> {
  // Note: You'll need to use getDocs and collection for this
  // For now, returning empty array - implement when needed
  return [];
}

/**
 * Update character data
 */
export async function updateCharacter(
  uid: string,
  characterId: string,
  updates: Partial<Character>
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  await updateDoc(doc(db, 'users', uid, 'characters', characterId), {
    ...updates,
    lastSaved: serverTimestamp(),
  });
}

/**
 * Delete a character
 */
export async function deleteCharacter(uid: string, characterId: string): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const charRef = doc(db, 'users', uid, 'characters', characterId);
  await setDoc(charRef, { deleted: true, deletedAt: serverTimestamp() }, { merge: true });
}

/**
 * Update character level and experience
 */
export async function updateCharacterProgress(
  uid: string,
  characterId: string,
  experienceGained: number
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  await updateDoc(doc(db, 'users', uid, 'characters', characterId), {
    experience: increment(experienceGained),
    lastSaved: serverTimestamp(),
  });
}

// ============================================
// BATTLE LOG OPERATIONS
// ============================================

/**
 * Save battle results
 */
export async function saveBattleLog(
  uid: string,
  battleLog: {
    characterId: string;
    realmId: string;
    result: 'victory' | 'defeat';
    wpm: number;
    accuracy: number;
    duration: number;
    experienceGained: number;
  }
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const battleRef = doc(db, 'users', uid, 'battles', `${Date.now()}`);
  await setDoc(battleRef, {
    ...battleLog,
    timestamp: serverTimestamp(),
  });

  // Update user statistics
  const statUpdates: Partial<UserStatistics> = {
    battlesWon: battleLog.result === 'victory' ? 1 : 0,
    battlesLost: battleLog.result === 'defeat' ? 1 : 0,
  };

  await updateDoc(doc(db, 'users', uid), {
    'statistics.battlesWon': increment(statUpdates.battlesWon || 0),
    'statistics.battlesLost': increment(statUpdates.battlesLost || 0),
    'statistics.totalPlayTime': increment(battleLog.duration),
  });
}

// ============================================
// PROGRESS SYNC HELPER
// ============================================

/**
 * Sync all local state to Firebase
 * Call this periodically or on important events
 */
export async function syncProgress(
  uid: string,
  character: Character,
  stats: Partial<UserStatistics>
): Promise<void> {
  if (isOfflineMode || !db) {
    console.log('?? Offline mode - progress saved locally only');
    return;
  }
  
  try {
    // Save character
    await saveCharacter(uid, character);
    
    // Update statistics
    await updateUserStatistics(uid, stats);
    
    console.log('? Progress synced to cloud');
  } catch (error) {
    console.error('? Error syncing progress:', error);
    throw error;
  }
}

// ============================================
// LEADERBOARD OPERATIONS
// ============================================

import type { LeaderboardCategory, LeaderboardEntry } from '@/types/collectibles';
import { query, collection, orderBy, limit, getDocs, where } from 'firebase/firestore';

/**
 * Update player's leaderboard entry
 */
export async function updateLeaderboardEntry(
  uid: string,
  category: LeaderboardCategory,
  value: number,
  username: string,
  classType: string
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const leaderboardRef = doc(db, 'leaderboards', category, 'entries', uid);
  
  // Only update if new value is better than previous
  const currentDoc = await getDoc(leaderboardRef);
  
  if (!currentDoc.exists() || currentDoc.data().value < value) {
    await setDoc(leaderboardRef, {
      uid,
      username,
      value,
      classType,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
}

/**
 * Get top players for a leaderboard category
 */
export async function getLeaderboard(
  category: LeaderboardCategory,
  limitCount: number = 100
): Promise<LeaderboardEntry[]> {
  if (isOfflineMode || !db) return [];
  
  const entriesRef = collection(db, 'leaderboards', category, 'entries');
  const q = query(entriesRef, orderBy('value', 'desc'), limit(limitCount));
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc, index) => {
    const data = doc.data();
    return {
      uid: doc.id,
      username: data.username,
      value: data.value,
      classType: data.classType,
      rank: index + 1,
      characterName: data.characterName,
      avatarUrl: data.avatarUrl,
      title: data.title,
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  });
}

/**
 * Get player's rank in a leaderboard
 */
export async function getPlayerRank(
  uid: string,
  category: LeaderboardCategory
): Promise<number> {
  if (isOfflineMode || !db) return -1;
  
  const leaderboardRef = doc(db, 'leaderboards', category, 'entries', uid);
  const playerDoc = await getDoc(leaderboardRef);
  
  if (!playerDoc.exists()) return -1;
  
  const playerValue = playerDoc.data().value;
  
  // Count how many players have a higher value
  const entriesRef = collection(db, 'leaderboards', category, 'entries');
  const q = query(entriesRef, where('value', '>', playerValue));
  const snapshot = await getDocs(q);
  
  return snapshot.size + 1; // +1 because rank is 1-indexed
}

// ============================================
// COLLECTIBLES OPERATIONS
// ============================================

import type { OwnedCollectible, Mission } from '@/types/collectibles';

/**
 * Award collectible to player
 */
export async function awardCollectible(
  uid: string,
  collectibleId: string,
  collectibleType: string
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const collectiblesRef = doc(db, 'users', uid, 'collectibles', collectibleId);
  
  await setDoc(collectiblesRef, {
    collectibleId,
    type: collectibleType,
    obtainedAt: serverTimestamp(),
    isEquipped: false,
    isNew: true,
  });
  
  console.log(`? Awarded collectible: ${collectibleId}`);
}

/**
 * Get all collectibles owned by player
 */
export async function getPlayerCollectibles(uid: string): Promise<OwnedCollectible[]> {
  if (isOfflineMode || !db) return [];
  
  const collectiblesRef = collection(db, 'users', uid, 'collectibles');
  const snapshot = await getDocs(collectiblesRef);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      collectibleId: data.collectibleId,
      obtainedAt: data.obtainedAt?.toDate() || new Date(),
      isEquipped: data.isEquipped || false,
      isNew: data.isNew || false,
    };
  });
}

/**
 * Equip a collectible
 */
export async function equipCollectible(
  uid: string,
  collectibleId: string
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const collectibleRef = doc(db, 'users', uid, 'collectibles', collectibleId);
  
  await updateDoc(collectibleRef, {
    isEquipped: true,
    isNew: false,
  });
}

/**
 * Mark collectible as viewed (remove "New!" badge)
 */
export async function markCollectibleViewed(
  uid: string,
  collectibleId: string
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const collectibleRef = doc(db, 'users', uid, 'collectibles', collectibleId);
  
  await updateDoc(collectibleRef, {
    isNew: false,
  });
}

// ============================================
// MISSIONS OPERATIONS
// ============================================

/**
 * Save player's mission progress
 */
export async function saveMissionProgress(
  uid: string,
  mission: Mission
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const missionRef = doc(db, 'users', uid, 'missions', mission.id);
  
  await setDoc(missionRef, {
    ...mission,
    expiresAt: mission.expiresAt ? Timestamp.fromDate(mission.expiresAt) : null,
  }, { merge: true });
}

/**
 * Get all missions for a player
 */
export async function getPlayerMissions(uid: string): Promise<Mission[]> {
  if (isOfflineMode || !db) return [];
  
  const missionsRef = collection(db, 'users', uid, 'missions');
  const snapshot = await getDocs(missionsRef);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      expiresAt: data.expiresAt?.toDate(),
    } as Mission;
  });
}

/**
 * Claim mission rewards
 */
export async function claimMissionRewards(
  uid: string,
  missionId: string
): Promise<void> {
  if (isOfflineMode || !db) return;
  
  const missionRef = doc(db, 'users', uid, 'missions', missionId);
  
  await updateDoc(missionRef, {
    isClaimed: true,
  });
}
