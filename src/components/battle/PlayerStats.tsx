/**
 * Player Stats Component
 * Shows character health and stats during combat
 */

import { motion } from 'framer-motion';
import type { Character } from '@/types';

interface PlayerStatsProps {
  character: Character;
  currentHealth: number;
}

export function PlayerStats({ character, currentHealth }: PlayerStatsProps) {
  const healthPercent = (currentHealth / character.stats.maxHealth) * 100;
  const isLowHealth = healthPercent < 30;
  const isCriticalHealth = healthPercent < 15;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-kq-dark-800/80 backdrop-blur-sm rounded-xl p-4 border border-kq-dark-600"
    >
      {/* Character Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-kq-primary-500 to-kq-primary-700 flex items-center justify-center text-xl">
          {character.classType === 'blade-dancer' && '??'}
          {character.classType === 'shadow-rogue' && '???'}
          {character.classType === 'ember-mage' && '??'}
          {character.classType === 'spirit-healer' && '??'}
          {character.classType === 'technomancer' && '?'}
        </div>
        <div>
          <h4 className="font-display text-white">{character.name}</h4>
          <p className="text-kq-dark-400 text-xs capitalize">
            {character.classType.replace('-', ' ')} • Lv.{character.level}
          </p>
        </div>
      </div>

      {/* Health Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-kq-dark-400">HP</span>
          <span
            className={`font-mono ${
              isCriticalHealth
                ? 'text-kq-fire-400 animate-pulse'
                : isLowHealth
                ? 'text-kq-gold-400'
                : 'text-kq-nature-400'
            }`}
          >
            {currentHealth} / {character.stats.maxHealth}
          </span>
        </div>
        <div className="h-3 bg-kq-dark-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              isCriticalHealth
                ? 'bg-gradient-to-r from-kq-fire-600 to-kq-fire-400'
                : isLowHealth
                ? 'bg-gradient-to-r from-kq-gold-600 to-kq-gold-400'
                : 'bg-gradient-to-r from-kq-nature-600 to-kq-nature-400'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${healthPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-kq-dark-900/50 rounded p-2">
          <span className="text-kq-dark-400">Precision</span>
          <span className="float-right text-kq-primary-400">
            {character.stats.precision}
          </span>
        </div>
        <div className="bg-kq-dark-900/50 rounded p-2">
          <span className="text-kq-dark-400">Agility</span>
          <span className="float-right text-kq-gold-400">
            {character.stats.agility}
          </span>
        </div>
        <div className="bg-kq-dark-900/50 rounded p-2">
          <span className="text-kq-dark-400">Mana</span>
          <span className="float-right text-kq-tech-400">
            {character.stats.mana}
          </span>
        </div>
        <div className="bg-kq-dark-900/50 rounded p-2">
          <span className="text-kq-dark-400">Fortitude</span>
          <span className="float-right text-kq-nature-400">
            {character.stats.fortitude}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
