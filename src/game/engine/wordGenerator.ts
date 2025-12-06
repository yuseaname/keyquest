/**
 * Word Generator
 * Generates words for typing challenges based on difficulty and realm
 */

import type { WordPool, Realm } from '@/types';

// Default word pools for different difficulties
const DEFAULT_WORDS: WordPool = {
  easy: [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her',
    'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how',
    'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy',
    'did', 'own', 'say', 'she', 'too', 'use', 'dad', 'mom', 'big', 'end',
  ],
  medium: [
    'about', 'after', 'again', 'being', 'could', 'every', 'first', 'found',
    'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'point',
    'right', 'small', 'sound', 'spell', 'still', 'study', 'world', 'years',
    'think', 'three', 'water', 'where', 'which', 'words', 'would', 'write',
    'above', 'along', 'asked', 'began', 'below', 'black', 'bring', 'carry',
    'clean', 'close', 'comes', 'could', 'cross', 'don\'t', 'drink', 'earth',
  ],
  hard: [
    'absolutely', 'accomplish', 'acknowledge', 'acquisition', 'administration',
    'advertisement', 'approximately', 'architecture', 'automatically',
    'background', 'breakthrough', 'bureaucratic', 'cardiovascular', 'celebration',
    'characteristic', 'circumstances', 'collaboration', 'communication',
    'comprehensive', 'concentration', 'configuration', 'consciousness',
    'consideration', 'contemporary', 'contribution', 'controversial',
    'correspondence', 'demonstration', 'determination', 'disappointment',
    'discrimination', 'electromagnetic', 'encouragement', 'entertainment',
    'environmental', 'establishment', 'extraordinary', 'fundamentally',
  ],
  special: [
    'inferno', 'lightning', 'backstab', 'overclock', 'renewal', 'berserk',
    'critical', 'precision', 'velocity', 'momentum', 'harmony', 'ignition',
  ],
};

// Themed word pools for different realms
const REALM_WORDS: Record<string, Partial<WordPool>> = {
  'fire-caverns': {
    easy: ['fire', 'burn', 'heat', 'ash', 'coal', 'lava', 'red', 'hot'],
    medium: ['flames', 'ember', 'torch', 'blaze', 'molten', 'scorch', 'inferno'],
    hard: ['combustion', 'incinerate', 'conflagration', 'pyroclastic'],
    special: ['inferno', 'blaze', 'ignite'],
  },
  'frost-vale': {
    easy: ['ice', 'cold', 'snow', 'chill', 'freeze', 'frost'],
    medium: ['frozen', 'winter', 'glacier', 'blizzard', 'icicle'],
    hard: ['crystallize', 'hypothermia', 'permafrost', 'avalanche'],
    special: ['frostbite', 'shatter', 'freeze'],
  },
  'shadow-library': {
    easy: ['book', 'read', 'page', 'ink', 'word', 'dark', 'shade'],
    medium: ['scroll', 'wisdom', 'ancient', 'mystery', 'shadow', 'secret'],
    hard: ['manuscript', 'encyclopedia', 'bibliography', 'literature'],
    special: ['darkness', 'obscure', 'vanish'],
  },
  'cyber-nexus': {
    easy: ['code', 'data', 'byte', 'wire', 'chip', 'node'],
    medium: ['system', 'network', 'digital', 'circuit', 'program'],
    hard: ['algorithm', 'encryption', 'cybernetic', 'microprocessor'],
    special: ['override', 'execute', 'compile'],
  },
};

/**
 * Generate a queue of words for combat
 */
export function generateWordQueue(
  count: number,
  difficulty: number,
  realm?: Realm
): string[] {
  const words: string[] = [];
  const pool = getWordPool(realm);

  for (let i = 0; i < count; i++) {
    const word = selectWord(pool, difficulty);
    words.push(word);
  }

  return words;
}

/**
 * Get merged word pool for a realm
 */
function getWordPool(realm?: Realm): WordPool {
  if (!realm) return DEFAULT_WORDS;

  const realmSpecific = REALM_WORDS[realm.theme];
  if (!realmSpecific) return DEFAULT_WORDS;

  return {
    easy: [...DEFAULT_WORDS.easy, ...(realmSpecific.easy || [])],
    medium: [...DEFAULT_WORDS.medium, ...(realmSpecific.medium || [])],
    hard: [...DEFAULT_WORDS.hard, ...(realmSpecific.hard || [])],
    special: [...DEFAULT_WORDS.special, ...(realmSpecific.special || [])],
  };
}

/**
 * Select a word based on difficulty
 */
function selectWord(pool: WordPool, difficulty: number): string {
  // Determine which pool to draw from based on difficulty
  let targetPool: string[];
  const roll = Math.random();

  if (difficulty <= 3) {
    // Easy realms: mostly easy words
    targetPool = roll < 0.8 ? pool.easy : roll < 0.95 ? pool.medium : pool.hard;
  } else if (difficulty <= 6) {
    // Medium realms: mix of easy and medium
    targetPool = roll < 0.3 ? pool.easy : roll < 0.85 ? pool.medium : pool.hard;
  } else {
    // Hard realms: mostly medium and hard
    targetPool = roll < 0.1 ? pool.easy : roll < 0.6 ? pool.medium : pool.hard;
  }

  // Small chance for special ability trigger words
  if (Math.random() < 0.05) {
    targetPool = pool.special;
  }

  return targetPool[Math.floor(Math.random() * targetPool.length)];
}

/**
 * Generate a practice sentence
 */
export function generateSentence(wordCount: number, difficulty: number): string {
  const words = generateWordQueue(wordCount, difficulty);
  return words.join(' ');
}

/**
 * Check if a word is a special ability trigger
 */
export function isSpecialWord(word: string): boolean {
  return DEFAULT_WORDS.special.includes(word.toLowerCase());
}

/**
 * Get difficulty-appropriate word length range
 */
export function getWordLengthRange(difficulty: number): { min: number; max: number } {
  if (difficulty <= 3) {
    return { min: 2, max: 5 };
  } else if (difficulty <= 6) {
    return { min: 4, max: 8 };
  } else {
    return { min: 6, max: 15 };
  }
}
