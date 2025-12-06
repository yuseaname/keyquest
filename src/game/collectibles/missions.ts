/**
 * Missions Data
 * Daily, weekly, realm, boss, and achievement missions
 */

import type { Mission } from '@/types/collectibles';
import { MONSTER_CARDS, CHARACTER_SKINS, ABILITY_SKINS, RELICS } from './index';

// ============================================
// DAILY MISSIONS
// ============================================

export const DAILY_MISSIONS: Omit<Mission, 'expiresAt' | 'isCompleted' | 'isClaimed'>[] = [
  {
    id: 'daily-words-200',
    type: 'daily',
    title: 'Type 200 Words',
    description: 'Practice your typing by completing 200 words today.',
    objectives: [
      {
        type: 'type-words',
        target: 200,
        current: 0,
        description: 'Words typed: 0/200',
      },
    ],
    rewards: {
      experience: 100,
      gold: 50,
    },
    difficulty: 'easy',
    iconUrl: '/missions/daily-words.png',
  },
  {
    id: 'daily-accuracy-90',
    type: 'daily',
    title: 'Maintain 90% Accuracy',
    description: 'Complete any battle with 90% accuracy or higher.',
    objectives: [
      {
        type: 'accuracy-threshold',
        target: 90,
        current: 0,
        description: 'Accuracy: 0/90%',
      },
    ],
    rewards: {
      experience: 150,
      gold: 75,
    },
    difficulty: 'medium',
    iconUrl: '/missions/daily-accuracy.png',
  },
  {
    id: 'daily-enemies-3',
    type: 'daily',
    title: 'Defeat 3 Enemies',
    description: 'Win 3 battles against any enemies.',
    objectives: [
      {
        type: 'defeat-enemies',
        target: 3,
        current: 0,
        description: 'Enemies defeated: 0/3',
      },
    ],
    rewards: {
      experience: 200,
      gold: 100,
    },
    difficulty: 'easy',
    iconUrl: '/missions/daily-enemies.png',
  },
  {
    id: 'daily-combo-25',
    type: 'daily',
    title: 'Achieve 25 Combo',
    description: 'Type 25 consecutive words without mistakes.',
    objectives: [
      {
        type: 'combo-reached',
        target: 25,
        current: 0,
        description: 'Combo: 0/25',
      },
    ],
    rewards: {
      experience: 250,
      gold: 125,
      collectibles: [
        {
          collectible: MONSTER_CARDS[Math.floor(Math.random() * 3)] as any, // Random common card
          dropChance: 0.5,
        },
      ],
    },
    difficulty: 'medium',
    iconUrl: '/missions/daily-combo.png',
  },
  {
    id: 'daily-wpm-80',
    type: 'daily',
    title: 'Reach 80 WPM',
    description: 'Complete a battle with 80 words per minute or higher.',
    objectives: [
      {
        type: 'wpm-threshold',
        target: 80,
        current: 0,
        description: 'WPM: 0/80',
      },
    ],
    rewards: {
      experience: 300,
      gold: 150,
    },
    difficulty: 'hard',
    iconUrl: '/missions/daily-wpm.png',
  },
];

// ============================================
// WEEKLY MISSIONS
// ============================================

export const WEEKLY_MISSIONS: Omit<Mission, 'expiresAt' | 'isCompleted' | 'isClaimed'>[] = [
  {
    id: 'weekly-words-1000',
    type: 'weekly',
    title: 'Type 1,000 Words',
    description: 'Type a total of 1,000 words this week.',
    objectives: [
      {
        type: 'type-words',
        target: 1000,
        current: 0,
        description: 'Words typed: 0/1000',
      },
    ],
    rewards: {
      experience: 500,
      gold: 250,
      collectibles: [
        {
          collectible: CHARACTER_SKINS[0],
          dropChance: 0.1,
        },
      ],
    },
    difficulty: 'medium',
    iconUrl: '/missions/weekly-words.png',
  },
  {
    id: 'weekly-bosses-3',
    type: 'weekly',
    title: 'Defeat 3 Bosses',
    description: 'Defeat 3 boss enemies this week.',
    objectives: [
      {
        type: 'boss-defeated',
        target: 3,
        current: 0,
        description: 'Bosses defeated: 0/3',
      },
    ],
    rewards: {
      experience: 1000,
      gold: 500,
      collectibles: [
        {
          collectible: RELICS[0],
          dropChance: 0.2,
        },
      ],
    },
    difficulty: 'hard',
    iconUrl: '/missions/weekly-bosses.png',
  },
  {
    id: 'weekly-realms-2',
    type: 'weekly',
    title: 'Complete 2 Realms',
    description: 'Fully complete 2 different realms this week.',
    objectives: [
      {
        type: 'realm-completed',
        target: 2,
        current: 0,
        description: 'Realms completed: 0/2',
      },
    ],
    rewards: {
      experience: 750,
      gold: 375,
    },
    difficulty: 'medium',
    iconUrl: '/missions/weekly-realms.png',
  },
];

// ============================================
// REALM-SPECIFIC MISSIONS
// ============================================

export const REALM_MISSIONS: Mission[] = [
  // Fire Caverns
  {
    id: 'fire-caverns-perfect',
    type: 'realm',
    title: 'Flawless Fire Caverns',
    description: 'Complete Fire Caverns with 95% accuracy or higher.',
    objectives: [
      {
        type: 'realm-completed',
        target: 1,
        current: 0,
        description: 'Fire Caverns completed: 0/1',
      },
      {
        type: 'accuracy-threshold',
        target: 95,
        current: 0,
        description: 'Accuracy: 0/95%',
      },
    ],
    rewards: {
      experience: 500,
      gold: 300,
      collectibles: [
        {
          collectible: CHARACTER_SKINS[0], // Blaze Armor
          dropChance: 1.0,
          guaranteed: true,
        },
      ],
    },
    difficulty: 'hard',
    iconUrl: '/missions/fire-caverns-perfect.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'fire-caverns-speed',
    type: 'realm',
    title: 'Fire Caverns Speedrun',
    description: 'Complete Fire Caverns in under 5 minutes.',
    objectives: [
      {
        type: 'realm-completed',
        target: 1,
        current: 0,
        description: 'Fire Caverns completed: 0/1',
      },
    ],
    rewards: {
      experience: 750,
      gold: 500,
      title: 'Speedrunner',
      collectibles: [
        {
          collectible: RELICS[0], // Pyraxis Crown Fragment
          dropChance: 0.5,
        },
      ],
    },
    difficulty: 'legendary',
    iconUrl: '/missions/fire-caverns-speed.png',
    isCompleted: false,
    isClaimed: false,
  },
  
  // Frost Vale
  {
    id: 'frost-vale-no-damage',
    type: 'realm',
    title: 'Frozen Perfection',
    description: 'Complete Frost Vale without taking any damage.',
    objectives: [
      {
        type: 'realm-completed',
        target: 1,
        current: 0,
        description: 'Frost Vale completed: 0/1',
      },
    ],
    rewards: {
      experience: 1000,
      gold: 750,
      collectibles: [
        {
          collectible: CHARACTER_SKINS[1], // Frostbound Warrior
          dropChance: 1.0,
          guaranteed: true,
        },
        {
          collectible: RELICS[1], // Glaciana's Frozen Tear
          dropChance: 0.3,
        },
      ],
    },
    difficulty: 'legendary',
    iconUrl: '/missions/frost-vale-perfect.png',
    isCompleted: false,
    isClaimed: false,
  },
  
  // Shadow Library
  {
    id: 'shadow-library-perfect',
    type: 'realm',
    title: 'Shadow Scholar',
    description: 'Complete Shadow Library with 100% accuracy.',
    objectives: [
      {
        type: 'realm-completed',
        target: 1,
        current: 0,
        description: 'Shadow Library completed: 0/1',
      },
      {
        type: 'accuracy-threshold',
        target: 100,
        current: 0,
        description: 'Accuracy: 0/100%',
      },
    ],
    rewards: {
      experience: 1500,
      gold: 1000,
      collectibles: [
        {
          collectible: CHARACTER_SKINS[4], // Void Stalker
          dropChance: 1.0,
          guaranteed: true,
        },
        {
          collectible: RELICS[2], // Ancient Manuscript
          dropChance: 1.0,
          guaranteed: true,
        },
      ],
    },
    difficulty: 'legendary',
    iconUrl: '/missions/shadow-library-perfect.png',
    isCompleted: false,
    isClaimed: false,
  },
];

// ============================================
// BOSS MISSIONS
// ============================================

export const BOSS_MISSIONS: Mission[] = [
  {
    id: 'pyraxis-first-time',
    type: 'boss',
    title: 'Defeat Inferno Lord Pyraxis',
    description: 'Overcome the ruler of the Fire Caverns.',
    objectives: [
      {
        type: 'boss-defeated',
        target: 1,
        current: 0,
        description: 'Pyraxis defeated: 0/1',
      },
    ],
    rewards: {
      experience: 500,
      gold: 300,
      collectibles: [
        {
          collectible: MONSTER_CARDS[2] as any, // Inferno Lord card
          dropChance: 1.0,
          guaranteed: true,
        },
        {
          collectible: ABILITY_SKINS[1],// Frost Surge
          dropChance: 0.15,
        },
      ],
    },
    difficulty: 'hard',
    iconUrl: '/missions/boss-pyraxis.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'pyraxis-no-damage',
    type: 'boss',
    title: 'Pyraxis Perfection',
    description: 'Defeat Pyraxis without taking damage.',
    objectives: [
      {
        type: 'boss-defeated',
        target: 1,
        current: 0,
        description: 'Pyraxis defeated flawlessly: 0/1',
      },
    ],
    rewards: {
      experience: 1500,
      gold: 1000,
      collectibles: [
        {
          collectible: CHARACTER_SKINS[2], // Inferno Robes
          dropChance: 1.0,
          guaranteed: true,
        },
        {
          collectible: RELICS[0], // Pyraxis Crown Fragment
          dropChance: 1.0,
          guaranteed: true,
        },
      ],
    },
    difficulty: 'legendary',
    iconUrl: '/missions/boss-pyraxis-perfect.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'glaciana-first-time',
    type: 'boss',
    title: 'Defeat Frost Queen Glaciana',
    description: 'Break through the Frost Queen\'s icy defenses.',
    objectives: [
      {
        type: 'boss-defeated',
        target: 1,
        current: 0,
        description: 'Glaciana defeated: 0/1',
      },
    ],
    rewards: {
      experience: 600,
      gold: 350,
      collectibles: [
        {
          collectible: MONSTER_CARDS[4] as any, // Frost Queen card
          dropChance: 1.0,
          guaranteed: true,
        },
      ],
    },
    difficulty: 'hard',
    iconUrl: '/missions/boss-glaciana.png',
    isCompleted: false,
    isClaimed: false,
  },
];

// ============================================
// ACHIEVEMENT MISSIONS
// ============================================

export const ACHIEVEMENT_MISSIONS: Mission[] = [
  {
    id: 'achievement-level-20',
    type: 'achievement',
    title: 'Reach Level 20',
    description: 'Train your character to level 20.',
    objectives: [
      {
        type: 'level-reached',
        target: 20,
        current: 0,
        description: 'Level: 0/20',
      },
    ],
    rewards: {
      experience: 1000,
      gold: 500,
      collectibles: [
        {
          collectible: CHARACTER_SKINS[5], // Cherry Blossom Priestess
          dropChance: 1.0,
          guaranteed: true,
        },
      ],
    },
    difficulty: 'medium',
    iconUrl: '/missions/achievement-level-20.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'achievement-wpm-100',
    type: 'achievement',
    title: 'Reach 100 WPM',
    description: 'Type at 100 words per minute in any battle.',
    objectives: [
      {
        type: 'wpm-threshold',
        target: 100,
        current: 0,
        description: 'Highest WPM: 0/100',
      },
    ],
    rewards: {
      experience: 500,
      title: 'Swiftfinger',
    },
    difficulty: 'hard',
    iconUrl: '/missions/achievement-wpm-100.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'achievement-combo-100',
    type: 'achievement',
    title: 'Achieve 100 Combo',
    description: 'Type 100 consecutive words without mistakes.',
    objectives: [
      {
        type: 'combo-reached',
        target: 100,
        current: 0,
        description: 'Max combo: 0/100',
      },
    ],
    rewards: {
      experience: 1000,
      gold: 500,
      title: 'Combo King',
    },
    difficulty: 'legendary',
    iconUrl: '/missions/achievement-combo-100.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'achievement-bosses-10',
    type: 'achievement',
    title: 'Defeat 10 Bosses',
    description: 'Prove your strength by defeating 10 boss enemies.',
    objectives: [
      {
        type: 'boss-defeated',
        target: 10,
        current: 0,
        description: 'Bosses defeated: 0/10',
      },
    ],
    rewards: {
      experience: 2000,
      gold: 1000,
      title: 'Spellbreaker',
    },
    difficulty: 'hard',
    iconUrl: '/missions/achievement-bosses-10.png',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'achievement-all-cards',
    type: 'achievement',
    title: 'Collect All Monster Cards',
    description: 'Complete your monster card collection.',
    objectives: [
      {
        type: 'type-words',
        target: MONSTER_CARDS.length,
        current: 0,
        description: `Cards collected: 0/${MONSTER_CARDS.length}`,
      },
    ],
    rewards: {
      experience: 5000,
      gold: 2500,
      title: 'Completionist',
    },
    difficulty: 'legendary',
    iconUrl: '/missions/achievement-completionist.png',
    isCompleted: false,
    isClaimed: false,
  },
];

// Helper functions

export function getAllMissions(): Mission[] {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  const endOfWeek = new Date(now);
  endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  
  return [
    ...DAILY_MISSIONS.map(m => ({
      ...m,
      expiresAt: endOfDay,
      isCompleted: false,
      isClaimed: false,
    })),
    ...WEEKLY_MISSIONS.map(m => ({
      ...m,
      expiresAt: endOfWeek,
      isCompleted: false,
      isClaimed: false,
    })),
    ...REALM_MISSIONS,
    ...BOSS_MISSIONS,
    ...ACHIEVEMENT_MISSIONS,
  ];
}

export function getDailyMissions(): Mission[] {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  return DAILY_MISSIONS.map(m => ({
    ...m,
    expiresAt: endOfDay,
    isCompleted: false,
    isClaimed: false,
  }));
}

export function getWeeklyMissions(): Mission[] {
  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  
  return WEEKLY_MISSIONS.map(m => ({
    ...m,
    expiresAt: endOfWeek,
    isCompleted: false,
    isClaimed: false,
  }));
}
