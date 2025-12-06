/**
 * Class Definitions
 * Complete definitions for all 5 playable classes in KeyQuest
 */

import type { ClassDefinition, ClassType } from '@/types';

/**
 * Blade Dancer - Fast bursts, high WPM bonuses
 */
const bladeDancer: ClassDefinition = {
  type: 'blade-dancer',
  name: 'Blade Dancer',
  description: 'Swift warriors who channel their typing speed into devastating attacks. Masters of momentum and rapid strikes.',
  playstyle: 'Fast bursts, high WPM bonuses. Build momentum with consecutive perfect words.',
  difficulty: 'intermediate',
  iconUrl: '/classes/blade-dancer.png',
  primaryColor: '#ef4444', // Red
  secondaryColor: '#f97316', // Orange
  passiveAbility: {
    id: 'momentum-edge',
    name: 'Momentum Edge',
    description: 'Each correct word increases next attack damage by +2%, stacks up to 20 times (max +40% damage).',
    effect: {
      type: 'damage-stack',
      value: 2,
      maxStacks: 20,
      condition: 'correct-word',
    },
  },
  activeAbilities: [
    {
      id: 'slash-combo',
      name: 'Slash Combo',
      description: 'After 5 perfect words in a row, gain +30% damage for 3 seconds.',
      trigger: {
        type: 'word-streak',
        value: 5,
      },
      effect: {
        type: 'damage-boost',
        value: 30,
        duration: 3,
        target: 'self',
      },
      cooldown: 10,
      iconUrl: '/abilities/slash-combo.png',
    },
    {
      id: 'berserk',
      name: 'Berserk',
      description: 'Type "!" after a perfect run to gain +15% WPM bonus for 5 seconds.',
      trigger: {
        type: 'key-press',
        value: '!',
      },
      effect: {
        type: 'speed-boost',
        value: 15,
        duration: 5,
        target: 'self',
      },
      cooldown: 15,
      iconUrl: '/abilities/berserk.png',
    },
  ],
  baseStats: {
    precision: 40,
    agility: 60,
    mana: 30,
    fortitude: 35,
    maxHealth: 100,
    currentHealth: 100,
    baseDamage: 12,
    criticalChance: 10,
    criticalMultiplier: 1.5,
  },
};

/**
 * Shadow Rogue - Precision-heavy, rewards high accuracy
 */
const shadowRogue: ClassDefinition = {
  type: 'shadow-rogue',
  name: 'Shadow Rogue',
  description: 'Silent assassins who strike from the shadows. Precision typing rewards massive critical damage.',
  playstyle: 'Precision-heavy, rewards high accuracy and zero mistakes. Critical strikes deal massive damage.',
  difficulty: 'advanced',
  iconUrl: '/classes/shadow-rogue.png',
  primaryColor: '#8b5cf6', // Purple
  secondaryColor: '#6366f1', // Indigo
  passiveAbility: {
    id: 'critical-typing',
    name: 'Critical Typing',
    description: 'Every perfect word has a 10% chance to deal double damage (Critical Strike).',
    effect: {
      type: 'critical-chance',
      value: 10,
      condition: 'perfect-word',
    },
  },
  activeAbilities: [
    {
      id: 'backstab',
      name: 'Backstab',
      description: 'First typed word of the encounter deals 3× damage.',
      trigger: {
        type: 'auto',
      },
      effect: {
        type: 'multiplier-damage',
        value: 3,
        target: 'enemy',
      },
      cooldown: 0, // One-time per encounter
      iconUrl: '/abilities/backstab.png',
    },
    {
      id: 'smoke-veil',
      name: 'Smoke Veil',
      description: 'When you make a mistake, combo resets but gain 3-second invulnerability.',
      trigger: {
        type: 'auto',
      },
      effect: {
        type: 'invulnerability',
        value: 100,
        duration: 3,
        target: 'self',
      },
      cooldown: 20,
      iconUrl: '/abilities/smoke-veil.png',
    },
  ],
  baseStats: {
    precision: 65,
    agility: 50,
    mana: 35,
    fortitude: 25,
    maxHealth: 85,
    currentHealth: 85,
    baseDamage: 15,
    criticalChance: 20, // Higher base crit
    criticalMultiplier: 2.0,
  },
};

/**
 * Ember Mage - Long-form typing bursts + ramping damage
 */
const emberMage: ClassDefinition = {
  type: 'ember-mage',
  name: 'Ember Mage',
  description: 'Wielders of arcane fire who build power through sustained typing. Each letter fuels their burning fury.',
  playstyle: 'Long-form typing bursts + ramping damage. Build burn stacks for damage over time.',
  difficulty: 'intermediate',
  iconUrl: '/classes/ember-mage.png',
  primaryColor: '#f97316', // Orange
  secondaryColor: '#fbbf24', // Amber
  passiveAbility: {
    id: 'ignition',
    name: 'Ignition',
    description: 'Every 10 consecutive accurate letters adds a burn stack. Burn stacks deal damage over time to enemies.',
    effect: {
      type: 'burn-dot',
      value: 5, // Damage per stack per second
      maxStacks: 10,
      condition: 'consecutive-letters',
    },
  },
  activeAbilities: [
    {
      id: 'flame-surge',
      name: 'Flame Surge',
      description: 'Type "inferno" to unleash an AoE burst dealing 50 damage to all enemies.',
      trigger: {
        type: 'typed-word',
        value: 'inferno',
      },
      effect: {
        type: 'aoe-damage',
        value: 50,
        target: 'all-enemies',
      },
      cooldown: 25,
      iconUrl: '/abilities/flame-surge.png',
    },
    {
      id: 'mana-overload',
      name: 'Mana Overload',
      description: 'Temporarily removes all ability cooldowns for 5 seconds.',
      trigger: {
        type: 'manual',
      },
      effect: {
        type: 'cooldown-reset',
        value: 100,
        duration: 5,
        target: 'self',
      },
      cooldown: 45,
      iconUrl: '/abilities/mana-overload.png',
    },
  ],
  baseStats: {
    precision: 45,
    agility: 40,
    mana: 70,
    fortitude: 30,
    maxHealth: 80,
    currentHealth: 80,
    baseDamage: 10,
    criticalChance: 8,
    criticalMultiplier: 1.75,
  },
};

/**
 * Spirit Healer - Beginner-friendly accuracy buffs
 */
const spiritHealer: ClassDefinition = {
  type: 'spirit-healer',
  name: 'Spirit Healer',
  description: 'Gentle souls who draw power from harmony and balance. Forgiving to mistakes, rewarding to consistency.',
  playstyle: 'Beginner-friendly accuracy buffs. Mistakes are forgiven, and accuracy bonuses help maintain performance.',
  difficulty: 'beginner',
  iconUrl: '/classes/spirit-healer.png',
  primaryColor: '#22c55e', // Green
  secondaryColor: '#10b981', // Emerald
  passiveAbility: {
    id: 'harmony-flow',
    name: 'Harmony Flow',
    description: 'Accuracy below 90% automatically receives a +10% correction buffer, making it easier to maintain combos.',
    effect: {
      type: 'accuracy-buffer',
      value: 10,
      condition: 'accuracy-below-90',
    },
  },
  activeAbilities: [
    {
      id: 'renewal',
      name: 'Renewal',
      description: 'Fixes your last mistake without penalty, restoring combo streak.',
      trigger: {
        type: 'manual',
      },
      effect: {
        type: 'mistake-fix',
        value: 1,
        target: 'self',
      },
      cooldown: 12,
      iconUrl: '/abilities/renewal.png',
    },
    {
      id: 'calm-mind',
      name: 'Calm Mind',
      description: 'Slows enemy attacks by 30% for 8 seconds, giving you more time to type.',
      trigger: {
        type: 'manual',
      },
      effect: {
        type: 'slow-enemy',
        value: 30,
        duration: 8,
        target: 'enemy',
      },
      cooldown: 20,
      iconUrl: '/abilities/calm-mind.png',
    },
  ],
  baseStats: {
    precision: 55,
    agility: 35,
    mana: 50,
    fortitude: 60,
    maxHealth: 110,
    currentHealth: 110,
    baseDamage: 8,
    criticalChance: 5,
    criticalMultiplier: 1.25,
  },
};

/**
 * Technomancer - Advanced players; integrates combos and modifiers
 */
const technomancer: ClassDefinition = {
  type: 'technomancer',
  name: 'Technomancer',
  description: 'Masters of the digital realm who weave code into combat. Complex patterns unlock devastating power.',
  playstyle: 'Advanced players; alternating perfect/fast sequences give unique multipliers. Rewards rhythm and pattern.',
  difficulty: 'advanced',
  iconUrl: '/classes/technomancer.png',
  primaryColor: '#06b6d4', // Cyan
  secondaryColor: '#3b82f6', // Blue
  passiveAbility: {
    id: 'binary-rhythm',
    name: 'Binary Rhythm',
    description: 'Alternating between perfect accuracy and high-speed typing creates rhythm stacks that boost all damage.',
    effect: {
      type: 'alternating-multiplier',
      value: 5,
      maxStacks: 8,
      condition: 'alternating-pattern',
    },
  },
  activeAbilities: [
    {
      id: 'system-shock',
      name: 'System Shock',
      description: 'Type an 8-character code sequence to stun the enemy for 4 seconds.',
      trigger: {
        type: 'typed-word',
        value: 'override', // 8 characters
      },
      effect: {
        type: 'stun',
        value: 100,
        duration: 4,
        target: 'enemy',
      },
      cooldown: 30,
      iconUrl: '/abilities/system-shock.png',
    },
    {
      id: 'overclock',
      name: 'Overclock',
      description: 'Boost your typing speed calculation by +20% for 4 seconds.',
      trigger: {
        type: 'manual',
      },
      effect: {
        type: 'speed-boost',
        value: 20,
        duration: 4,
        target: 'self',
      },
      cooldown: 18,
      iconUrl: '/abilities/overclock.png',
    },
  ],
  baseStats: {
    precision: 50,
    agility: 55,
    mana: 55,
    fortitude: 35,
    maxHealth: 90,
    currentHealth: 90,
    baseDamage: 11,
    criticalChance: 12,
    criticalMultiplier: 1.6,
  },
};

/**
 * Map of all class definitions indexed by class type
 */
export const CLASS_DEFINITIONS: Record<ClassType, ClassDefinition> = {
  'blade-dancer': bladeDancer,
  'shadow-rogue': shadowRogue,
  'ember-mage': emberMage,
  'spirit-healer': spiritHealer,
  'technomancer': technomancer,
};

/**
 * Get a class definition by type
 */
export function getClassDefinition(classType: ClassType): ClassDefinition {
  return CLASS_DEFINITIONS[classType];
}

/**
 * Get all class definitions
 */
export function getAllClasses(): ClassDefinition[] {
  return Object.values(CLASS_DEFINITIONS);
}

/**
 * Get classes filtered by difficulty
 */
export function getClassesByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ClassDefinition[] {
  return getAllClasses().filter((c) => c.difficulty === difficulty);
}
