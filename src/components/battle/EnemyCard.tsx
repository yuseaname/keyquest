/**
 * Enemy Card Component
 * Displays enemy information during combat
 */

import { motion } from 'framer-motion';
import type { Enemy } from '@/types';

interface EnemyCardProps {
  enemy: Enemy;
  currentHealth: number;
  maxHealth: number;
}

export function EnemyCard({ enemy, currentHealth, maxHealth }: EnemyCardProps) {
  const healthPercent = (currentHealth / maxHealth) * 100;
  const isLowHealth = healthPercent < 30;
  const isCriticalHealth = healthPercent < 10;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-kq-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-kq-dark-600"
    >
      {/* Enemy Type Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium uppercase ${
            enemy.type === 'boss'
              ? 'bg-kq-fire-500/20 text-kq-fire-400'
              : enemy.type === 'elite'
              ? 'bg-kq-shadow-500/20 text-kq-shadow-400'
              : 'bg-kq-dark-600 text-kq-dark-300'
          }`}
        >
          {enemy.type}
        </span>
        <span className="text-kq-gold-400 text-sm">
          +{enemy.experienceReward} XP
        </span>
      </div>

      {/* Enemy Portrait */}
      <div
        className={`w-full aspect-square bg-gradient-to-br from-kq-dark-700 to-kq-dark-800 rounded-xl mb-4 flex items-center justify-center text-6xl ${
          isCriticalHealth ? 'animate-shake' : ''
        }`}
      >
        {enemy.type === 'boss' ? '??' : enemy.type === 'elite' ? '??' : '??'}
      </div>

      {/* Enemy Name */}
      <h3 className="font-display text-xl text-white text-center mb-2">
        {enemy.name}
      </h3>
      <p className="text-kq-dark-400 text-sm text-center mb-4">
        {enemy.description}
      </p>

      {/* Health Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-kq-dark-400">Health</span>
          <span
            className={`font-mono ${
              isCriticalHealth
                ? 'text-kq-fire-400'
                : isLowHealth
                ? 'text-kq-gold-400'
                : 'text-kq-nature-400'
            }`}
          >
            {currentHealth} / {maxHealth}
          </span>
        </div>
        <div className="h-4 bg-kq-dark-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              isCriticalHealth
                ? 'bg-gradient-to-r from-kq-fire-600 to-kq-fire-400'
                : isLowHealth
                ? 'bg-gradient-to-r from-kq-gold-600 to-kq-gold-400'
                : 'bg-gradient-to-r from-kq-fire-600 to-kq-fire-400'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${healthPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Enemy Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-kq-dark-900/50 rounded-lg p-2">
          <p className="text-lg font-bold text-kq-fire-400">{enemy.damage}</p>
          <p className="text-xs text-kq-dark-400">Damage</p>
        </div>
        <div className="bg-kq-dark-900/50 rounded-lg p-2">
          <p className="text-lg font-bold text-kq-primary-400">
            {enemy.attackSpeed.toFixed(1)}s
          </p>
          <p className="text-xs text-kq-dark-400">Attack Speed</p>
        </div>
      </div>

      {/* Enemy Abilities */}
      {enemy.abilities && enemy.abilities.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-kq-dark-500 mb-2">Abilities:</p>
          <div className="space-y-1">
            {enemy.abilities.map((ability, index) => (
              <div
                key={index}
                className="text-xs bg-kq-dark-900/50 rounded p-2"
              >
                <span className="text-kq-shadow-400">{ability.name}</span>
                <span className="text-kq-dark-500"> - {ability.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
