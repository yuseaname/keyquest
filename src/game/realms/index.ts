/**
 * Realm Definitions
 * Mock data for all game realms with enemies and rewards
 */

import type { Realm, Enemy } from '@/types';

// ============================================
// ENEMIES
// ============================================

const fireEnemies: Enemy[] = [
  {
    id: 'fire-imp',
    name: 'Fire Imp',
    description: 'A mischievous creature of living flame',
    type: 'minion',
    maxHealth: 50,
    damage: 8,
    attackSpeed: 2.5,
    imageUrl: '/enemies/fire-imp.png',
    lootTable: [
      { itemId: 'ember-shard', dropChance: 0.3 },
      { itemId: 'minor-health-potion', dropChance: 0.1 },
    ],
    experienceReward: 25,
  },
  {
    id: 'lava-hound',
    name: 'Lava Hound',
    description: 'A fierce beast born from molten rock',
    type: 'minion',
    maxHealth: 75,
    damage: 12,
    attackSpeed: 2.0,
    imageUrl: '/enemies/lava-hound.png',
    lootTable: [
      { itemId: 'molten-fang', dropChance: 0.2 },
      { itemId: 'fire-essence', dropChance: 0.15 },
    ],
    experienceReward: 40,
  },
  {
    id: 'magma-golem',
    name: 'Magma Golem',
    description: 'A towering construct of hardite rock',
    type: 'elite',
    maxHealth: 150,
    damage: 20,
    attackSpeed: 3.5,
    imageUrl: '/enemies/magma-golem.png',
    abilities: [
      {
        name: 'Molten Armor',
        description: 'Reduces damage taken by 25%',
        effect: 'damage-reduction',
        trigger: 'health-threshold',
        triggerValue: 50,
      },
    ],
    lootTable: [
      { itemId: 'golem-core', dropChance: 0.4 },
      { itemId: 'rare-fire-crystal', dropChance: 0.1 },
    ],
    experienceReward: 80,
  },
];

const fireBoss: Enemy = {
  id: 'inferno-lord',
  name: 'Inferno Lord Pyraxis',
  description: 'The ancient ruler of the Fire Caverns, wreathed in eternal flame',
  type: 'boss',
  maxHealth: 500,
  damage: 35,
  attackSpeed: 4.0,
  imageUrl: '/enemies/inferno-lord.png',
  abilities: [
    {
      name: 'Flame Wave',
      description: 'Unleashes a wave of fire, dealing 50 damage',
      effect: 'aoe-damage',
      trigger: 'time-interval',
      triggerValue: 15,
    },
    {
      name: 'Enrage',
      description: 'Attack speed increases by 50% below 25% health',
      effect: 'speed-boost',
      trigger: 'health-threshold',
      triggerValue: 25,
    },
  ],
  lootTable: [
    { itemId: 'pyraxis-crown', dropChance: 0.1 },
    { itemId: 'legendary-fire-staff', dropChance: 0.05 },
    { itemId: 'inferno-essence', dropChance: 0.8 },
  ],
  experienceReward: 300,
};

const frostEnemies: Enemy[] = [
  {
    id: 'frost-sprite',
    name: 'Frost Sprite',
    description: 'A tiny being of crystallized ice',
    type: 'minion',
    maxHealth: 40,
    damage: 6,
    attackSpeed: 2.0,
    imageUrl: '/enemies/frost-sprite.png',
    lootTable: [
      { itemId: 'ice-shard', dropChance: 0.35 },
    ],
    experienceReward: 20,
  },
  {
    id: 'snow-wolf',
    name: 'Snow Wolf',
    description: 'A fierce predator of the frozen wastes',
    type: 'minion',
    maxHealth: 65,
    damage: 10,
    attackSpeed: 1.8,
    imageUrl: '/enemies/snow-wolf.png',
    lootTable: [
      { itemId: 'wolf-pelt', dropChance: 0.25 },
      { itemId: 'frost-fang', dropChance: 0.15 },
    ],
    experienceReward: 35,
  },
  {
    id: 'ice-elemental',
    name: 'Ice Elemental',
    description: 'A powerful spirit of pure cold',
    type: 'elite',
    maxHealth: 120,
    damage: 18,
    attackSpeed: 3.0,
    imageUrl: '/enemies/ice-elemental.png',
    abilities: [
      {
        name: 'Frost Nova',
        description: 'Slows player typing speed by 20%',
        effect: 'slow',
        trigger: 'health-threshold',
        triggerValue: 60,
      },
    ],
    lootTable: [
      { itemId: 'elemental-core', dropChance: 0.35 },
      { itemId: 'frozen-tear', dropChance: 0.2 },
    ],
    experienceReward: 70,
  },
];

const frostBoss: Enemy = {
  id: 'frost-queen',
  name: 'Frost Queen Glaciana',
  description: 'The immortal ruler of Frost Vale, beautiful and deadly',
  type: 'boss',
  maxHealth: 450,
  damage: 30,
  attackSpeed: 3.5,
  imageUrl: '/enemies/frost-queen.png',
  abilities: [
    {
      name: 'Blizzard',
      description: 'Creates a blizzard that reduces accuracy by 10%',
      effect: 'debuff',
      trigger: 'time-interval',
      triggerValue: 20,
    },
    {
      name: 'Ice Shield',
      description: 'Becomes immune to damage for 3 seconds',
      effect: 'immunity',
      trigger: 'health-threshold',
      triggerValue: 40,
    },
  ],
  lootTable: [
    { itemId: 'glaciana-tiara', dropChance: 0.1 },
    { itemId: 'legendary-frost-blade', dropChance: 0.05 },
    { itemId: 'eternal-ice', dropChance: 0.75 },
  ],
  experienceReward: 280,
};

const shadowEnemies: Enemy[] = [
  {
    id: 'shadow-wisp',
    name: 'Shadow Wisp',
    description: 'A fragment of darkness given form',
    type: 'minion',
    maxHealth: 35,
    damage: 10,
    attackSpeed: 1.5,
    imageUrl: '/enemies/shadow-wisp.png',
    lootTable: [
      { itemId: 'shadow-essence', dropChance: 0.4 },
    ],
    experienceReward: 30,
  },
  {
    id: 'cursed-scholar',
    name: 'Cursed Scholar',
    description: 'A seeker of forbidden knowledge, forever bound to the library',
    type: 'minion',
    maxHealth: 55,
    damage: 14,
    attackSpeed: 2.5,
    imageUrl: '/enemies/cursed-scholar.png',
    lootTable: [
      { itemId: 'ancient-tome', dropChance: 0.2 },
      { itemId: 'dark-ink', dropChance: 0.3 },
    ],
    experienceReward: 45,
  },
  {
    id: 'nightmare-stalker',
    name: 'Nightmare Stalker',
    description: 'A creature that feeds on fear and doubt',
    type: 'elite',
    maxHealth: 130,
    damage: 22,
    attackSpeed: 2.8,
    imageUrl: '/enemies/nightmare-stalker.png',
    abilities: [
      {
        name: 'Terror',
        description: 'Mistakes deal 50% more combo damage',
        effect: 'debuff',
        trigger: 'random',
        triggerValue: 0.15,
      },
    ],
    lootTable: [
      { itemId: 'nightmare-shard', dropChance: 0.3 },
      { itemId: 'fear-essence', dropChance: 0.25 },
    ],
    experienceReward: 85,
  },
];

const shadowBoss: Enemy = {
  id: 'void-librarian',
  name: 'The Void Librarian',
  description: 'Keeper of all forbidden texts, master of the shadow library',
  type: 'boss',
  maxHealth: 550,
  damage: 40,
  attackSpeed: 4.5,
  imageUrl: '/enemies/void-librarian.png',
  abilities: [
    {
      name: 'Word Scramble',
      description: 'Scrambles the current word, requiring re-typing',
      effect: 'word-scramble',
      trigger: 'time-interval',
      triggerValue: 25,
    },
    {
      name: 'Knowledge Drain',
      description: 'Steals 20% of current combo bonus',
      effect: 'combo-drain',
      trigger: 'health-threshold',
      triggerValue: 50,
    },
  ],
  lootTable: [
    { itemId: 'librarian-robes', dropChance: 0.1 },
    { itemId: 'legendary-void-tome', dropChance: 0.05 },
    { itemId: 'void-ink', dropChance: 0.7 },
  ],
  experienceReward: 350,
};

// ============================================
// REALMS
// ============================================

export const REALMS: Realm[] = [
  {
    id: 'fire-caverns-1',
    name: 'Fire Caverns',
    description: 'The burning depths where flame creatures dwell. A perfect starting ground for aspiring heroes.',
    theme: 'fire-caverns',
    difficulty: 3,
    requiredLevel: 1,
    backgroundUrl: '/realms/fire-caverns-bg.jpg',
    musicTrack: '/music/fire-caverns.mp3',
    enemies: fireEnemies,
    boss: fireBoss,
    rewards: {
      experienceBonus: 150,
      goldReward: 50,
      guaranteedItems: ['fire-token'],
      possibleItems: [
        { itemId: 'fire-sword', dropChance: 0.1 },
        { itemId: 'ember-armor', dropChance: 0.08 },
      ],
    },
    wordPool: {
      easy: ['fire', 'burn', 'heat', 'ash', 'red', 'hot', 'glow', 'warm'],
      medium: ['flames', 'ember', 'blaze', 'scorch', 'ignite', 'molten'],
      hard: ['combustion', 'incinerate', 'conflagration', 'pyroclastic'],
      special: ['inferno', 'blaze', 'pyraxis'],
    },
  },
  {
    id: 'frost-vale-1',
    name: 'Frost Vale',
    description: 'An eternal winter wonderland where the cold never relents. Test your precision against the chill.',
    theme: 'frost-vale',
    difficulty: 4,
    requiredLevel: 5,
    backgroundUrl: '/realms/frost-vale-bg.jpg',
    musicTrack: '/music/frost-vale.mp3',
    enemies: frostEnemies,
    boss: frostBoss,
    rewards: {
      experienceBonus: 200,
      goldReward: 75,
      guaranteedItems: ['frost-token'],
      possibleItems: [
        { itemId: 'ice-blade', dropChance: 0.12 },
        { itemId: 'frozen-armor', dropChance: 0.1 },
      ],
    },
    wordPool: {
      easy: ['ice', 'cold', 'snow', 'chill', 'frost', 'sleet'],
      medium: ['frozen', 'winter', 'glacier', 'blizzard', 'arctic'],
      hard: ['crystallize', 'hypothermia', 'permafrost', 'avalanche'],
      special: ['frostbite', 'glaciana', 'shatter'],
    },
  },
  {
    id: 'shadow-library-1',
    name: 'Shadow Library',
    description: 'Ancient halls filled with forbidden knowledge. Only the most precise typists survive its trials.',
    theme: 'shadow-library',
    difficulty: 6,
    requiredLevel: 10,
    backgroundUrl: '/realms/shadow-library-bg.jpg',
    musicTrack: '/music/shadow-library.mp3',
    enemies: shadowEnemies,
    boss: shadowBoss,
    rewards: {
      experienceBonus: 300,
      goldReward: 100,
      guaranteedItems: ['shadow-token'],
      possibleItems: [
        { itemId: 'void-staff', dropChance: 0.15 },
        { itemId: 'shadow-cloak', dropChance: 0.12 },
      ],
    },
    wordPool: {
      easy: ['book', 'read', 'page', 'dark', 'word', 'ink', 'text'],
      medium: ['scroll', 'wisdom', 'ancient', 'mystery', 'shadow', 'secret'],
      hard: ['manuscript', 'encyclopedia', 'bibliography', 'literature'],
      special: ['darkness', 'void', 'librarian'],
    },
  },
  {
    id: 'cyber-nexus-1',
    name: 'Cyber Nexus',
    description: 'A digital dimension where data is power. The Technomancer\'s domain awaits.',
    theme: 'cyber-nexus',
    difficulty: 8,
    requiredLevel: 15,
    backgroundUrl: '/realms/cyber-nexus-bg.jpg',
    musicTrack: '/music/cyber-nexus.mp3',
    enemies: [
      {
        id: 'data-drone',
        name: 'Data Drone',
        description: 'An automated defense program',
        type: 'minion',
        maxHealth: 60,
        damage: 15,
        attackSpeed: 1.5,
        imageUrl: '/enemies/data-drone.png',
        lootTable: [{ itemId: 'data-chip', dropChance: 0.4 }],
        experienceReward: 50,
      },
      {
        id: 'viral-entity',
        name: 'Viral Entity',
        description: 'A malicious program that corrupts all it touches',
        type: 'elite',
        maxHealth: 180,
        damage: 28,
        attackSpeed: 2.2,
        imageUrl: '/enemies/viral-entity.png',
        abilities: [
          {
            name: 'Corrupt',
            description: 'Scrambles 2 random letters in the current word',
            effect: 'word-corrupt',
            trigger: 'random',
            triggerValue: 0.1,
          },
        ],
        lootTable: [{ itemId: 'viral-code', dropChance: 0.35 }],
        experienceReward: 100,
      },
    ],
    boss: {
      id: 'system-core',
      name: 'SYSTEM_CORE.exe',
      description: 'The central AI that controls the Cyber Nexus',
      type: 'boss',
      maxHealth: 700,
      damage: 45,
      attackSpeed: 3.0,
      imageUrl: '/enemies/system-core.png',
      abilities: [
        {
          name: 'Firewall',
          description: 'Creates a shield that must be typed through',
          effect: 'shield',
          trigger: 'health-threshold',
          triggerValue: 75,
        },
        {
          name: 'System Overload',
          description: 'Doubles word speed for 5 seconds',
          effect: 'speed-increase',
          trigger: 'health-threshold',
          triggerValue: 25,
        },
      ],
      lootTable: [
        { itemId: 'core-processor', dropChance: 0.1 },
        { itemId: 'legendary-neural-link', dropChance: 0.05 },
      ],
      experienceReward: 500,
    },
    rewards: {
      experienceBonus: 500,
      goldReward: 200,
      guaranteedItems: ['cyber-token'],
      possibleItems: [
        { itemId: 'tech-blade', dropChance: 0.18 },
        { itemId: 'digital-armor', dropChance: 0.15 },
      ],
    },
    wordPool: {
      easy: ['code', 'data', 'byte', 'wire', 'chip', 'node', 'link'],
      medium: ['system', 'network', 'digital', 'circuit', 'program', 'binary'],
      hard: ['algorithm', 'encryption', 'cybernetic', 'microprocessor'],
      special: ['override', 'execute', 'compile', 'system'],
    },
  },
];

/**
 * Get a realm by ID
 */
export function getRealm(realmId: string): Realm | undefined {
  return REALMS.find((r) => r.id === realmId);
}

/**
 * Get realms available for a given level
 */
export function getAvailableRealms(characterLevel: number): Realm[] {
  return REALMS.filter((r) => r.requiredLevel <= characterLevel);
}

/**
 * Get realms by difficulty range
 */
export function getRealmsByDifficulty(minDifficulty: number, maxDifficulty: number): Realm[] {
  return REALMS.filter((r) => r.difficulty >= minDifficulty && r.difficulty <= maxDifficulty);
}
