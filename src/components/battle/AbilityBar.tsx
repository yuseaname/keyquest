/**
 * Ability Bar Component
 * Shows active abilities and cooldowns during combat
 */

import { motion } from 'framer-motion';
import type { ActiveAbility, AbilityState } from '@/types';

interface AbilityBarProps {
  abilities: ActiveAbility[];
  abilityStates: AbilityState[];
}

export function AbilityBar({ abilities, abilityStates }: AbilityBarProps) {
  return (
    <div className="bg-kq-dark-800/80 backdrop-blur-sm rounded-xl p-4 border border-kq-dark-600">
      <h4 className="font-display text-sm text-kq-dark-400 mb-3">Abilities</h4>
      
      <div className="space-y-2">
        {abilities.map((ability) => {
          const state = abilityStates.find((s) => s.abilityId === ability.id);
          const isOnCooldown = state?.isOnCooldown || false;
          const isActive = state?.isActive || false;
          const cooldownPercent = state
            ? (state.cooldownRemaining / ability.cooldown) * 100
            : 0;

          return (
            <div
              key={ability.id}
              className={`relative overflow-hidden rounded-lg p-3 transition-colors ${
                isActive
                  ? 'bg-kq-gold-500/20 border border-kq-gold-500/50'
                  : isOnCooldown
                  ? 'bg-kq-dark-900/50'
                  : 'bg-kq-dark-700/50 hover:bg-kq-dark-700'
              }`}
            >
              {/* Cooldown Overlay */}
              {isOnCooldown && (
                <motion.div
                  className="absolute inset-0 bg-kq-dark-950/60"
                  initial={{ width: '100%' }}
                  animate={{ width: `${cooldownPercent}%` }}
                  transition={{ duration: 0.1 }}
                />
              )}

              <div className="relative flex items-center gap-3">
                {/* Ability Icon */}
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center text-lg ${
                    isOnCooldown
                      ? 'bg-kq-dark-700 text-kq-dark-500'
                      : 'bg-kq-gold-500/20 text-kq-gold-400'
                  }`}
                >
                  ?
                </div>

                {/* Ability Info */}
                <div className="flex-1 min-w-0">
                  <h5
                    className={`font-medium text-sm truncate ${
                      isOnCooldown ? 'text-kq-dark-500' : 'text-white'
                    }`}
                  >
                    {ability.name}
                  </h5>
                  <p className="text-xs text-kq-dark-500 truncate">
                    {ability.description}
                  </p>
                </div>

                {/* Cooldown Timer */}
                {isOnCooldown && state && (
                  <div className="text-kq-dark-400 font-mono text-sm">
                    {Math.ceil(state.cooldownRemaining)}s
                  </div>
                )}

                {/* Ready Indicator */}
                {!isOnCooldown && (
                  <div className="w-2 h-2 rounded-full bg-kq-nature-400 animate-pulse" />
                )}
              </div>

              {/* Trigger Info */}
              <div className="relative mt-2 text-xs text-kq-dark-500">
                {ability.trigger.type === 'word-streak' && (
                  <span>?? {ability.trigger.value} perfect words</span>
                )}
                {ability.trigger.type === 'typed-word' && (
                  <span>?? Type "{ability.trigger.value}"</span>
                )}
                {ability.trigger.type === 'manual' && (
                  <span>??? Activate manually</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {abilities.length === 0 && (
        <p className="text-kq-dark-500 text-sm text-center py-4">
          No abilities unlocked
        </p>
      )}
    </div>
  );
}
