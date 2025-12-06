/**
 * Damage Calculator
 * Calculates combat damage based on WPM, accuracy, and class modifiers
 */

import type { Character, ClassType, CombatState } from '@/types';

interface DamageCalculationResult {
  baseDamage: number;
  wpmMultiplier: number;
  accuracyMultiplier: number;
  comboMultiplier: number;
  classMultiplier: number;
  passiveBonus: number;
  criticalHit: boolean;
  criticalMultiplier: number;
  totalDamage: number;
}

/**
 * Calculate damage for a completed word
 */
export function calculateDamage(
  character: Character,
  combatState: CombatState,
  wordLength: number
): DamageCalculationResult {
  // Base damage scales with word length
  const baseDamage = wordLength * 2 + character.stats.baseDamage;

  // WPM multiplier (1.0 at 60 WPM, scales up/down)
  const wpmMultiplier = Math.max(0.5, combatState.currentWPM / 60);

  // Accuracy multiplier (1.0 at 100%, reduces with mistakes)
  const accuracyMultiplier = Math.pow(combatState.currentAccuracy / 100, 2);

  // Combo multiplier (increases with streak)
  const comboMultiplier = 1 + (combatState.combo * 0.02); // +2% per combo

  // Class-specific multiplier
  const classMultiplier = getClassMultiplier(character.classType, combatState);

  // Passive ability bonus
  const passiveBonus = getPassiveBonus(character.classType, combatState);

  // Critical hit calculation
  const criticalRoll = Math.random();
  const criticalChance = character.stats.criticalChance / 100;
  const criticalHit = criticalRoll < criticalChance;
  const criticalMultiplier = criticalHit ? character.stats.criticalMultiplier : 1;

  // Calculate total damage
  const totalDamage = Math.floor(
    baseDamage *
    wpmMultiplier *
    accuracyMultiplier *
    comboMultiplier *
    classMultiplier *
    criticalMultiplier +
    passiveBonus
  );

  return {
    baseDamage,
    wpmMultiplier,
    accuracyMultiplier,
    comboMultiplier,
    classMultiplier,
    passiveBonus,
    criticalHit,
    criticalMultiplier,
    totalDamage: Math.max(1, totalDamage), // Minimum 1 damage
  };
}

/**
 * Get class-specific damage multiplier
 */
function getClassMultiplier(classType: ClassType, combatState: CombatState): number {
  switch (classType) {
    case 'blade-dancer':
      // Momentum Edge: Higher multiplier with stacks
      return 1 + (combatState.passiveStacks * 0.02);
    
    case 'shadow-rogue':
      // Base multiplier, crits handled separately
      return 1.0;
    
    case 'ember-mage':
      // Burn damage is DoT, base multiplier
      return 0.9; // Slightly lower burst, compensated by DoT
    
    case 'spirit-healer':
      // Lower damage, but consistent
      return 0.85;
    
    case 'technomancer':
      // Alternating pattern gives bonus (simplified)
      return 1.05;
    
    default:
      return 1.0;
  }
}

/**
 * Get passive ability bonus damage
 */
function getPassiveBonus(classType: ClassType, combatState: CombatState): number {
  switch (classType) {
    case 'blade-dancer':
      // Momentum Edge stacks convert to bonus damage
      return combatState.passiveStacks * 2;
    
    case 'shadow-rogue':
      // Critical Typing - bonus handled in crit calculation
      return 0;
    
    case 'ember-mage':
      // Ignition - burn stacks deal DoT damage
      return combatState.passiveStacks * 3;
    
    case 'spirit-healer':
      // Harmony Flow - accuracy buffer, no damage bonus
      return 0;
    
    case 'technomancer':
      // Binary Rhythm - alternating bonus
      return combatState.passiveStacks % 2 === 0 ? 5 : 0;
    
    default:
      return 0;
  }
}

/**
 * Calculate experience gained from defeating an enemy
 */
export function calculateExperience(
  enemyXP: number,
  accuracy: number,
  combatTime: number,
  characterLevel: number
): number {
  // Base XP from enemy
  let xp = enemyXP;

  // Accuracy bonus (up to +25% at 100% accuracy)
  xp *= 1 + (accuracy / 100) * 0.25;

  // Speed bonus (faster kills = more XP, diminishing returns)
  const speedBonus = Math.max(0.8, 2 - combatTime / 60);
  xp *= speedBonus;

  // Level penalty (reduced XP from lower level enemies)
  // This is a simplified version
  xp *= Math.max(0.5, 1 - (characterLevel - 1) * 0.05);

  return Math.floor(xp);
}

/**
 * Calculate gold earned from a battle
 */
export function calculateGold(
  baseGold: number,
  enemiesDefeated: number,
  accuracy: number
): number {
  let gold = baseGold * enemiesDefeated;
  
  // Accuracy bonus
  if (accuracy >= 95) {
    gold *= 1.5;
  } else if (accuracy >= 90) {
    gold *= 1.25;
  }

  return Math.floor(gold);
}
