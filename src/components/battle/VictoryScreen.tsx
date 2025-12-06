/**
 * Victory Screen Component
 * Displayed when player wins a battle
 */

import { motion } from 'framer-motion';
import { useCombatStore } from '@/store';

interface VictoryScreenProps {
  onContinue: () => void;
}

export function VictoryScreen({ onContinue }: VictoryScreenProps) {
  const { combat } = useCombatStore();

  if (!combat) return null;

  return (
    <div className="fixed inset-0 bg-kq-dark-950/95 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full mx-4"
      >
        {/* Victory Banner */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">??</div>
          <h1 className="font-display text-4xl text-kq-gold-400 mb-2 animate-glow">
            Victory!
          </h1>
          <p className="text-kq-dark-400">
            You have conquered {combat.realm.name}
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-kq-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-kq-dark-600 mb-6"
        >
          <h3 className="font-display text-lg text-white mb-4 text-center">
            Battle Results
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-primary-400 font-mono">
                {combat.currentWPM}
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Final WPM</p>
            </div>
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-nature-400 font-mono">
                {combat.currentAccuracy}%
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Accuracy</p>
            </div>
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-gold-400 font-mono">
                {combat.maxCombo}x
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Max Combo</p>
            </div>
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-tech-400 font-mono">
                {combat.wordsCompleted}
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Words Typed</p>
            </div>
          </div>

          {/* Rewards */}
          <div className="border-t border-kq-dark-700 pt-4">
            <h4 className="text-sm text-kq-dark-400 mb-3">Rewards</h4>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-kq-gold-400">
                  +{combat.realm.rewards.experienceBonus}
                </p>
                <p className="text-xs text-kq-dark-500">XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-kq-gold-300">
                  +{combat.realm.rewards.goldReward}
                </p>
                <p className="text-xs text-kq-dark-500">Gold</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onContinue}
          className="w-full py-4 bg-gradient-to-r from-kq-gold-500 to-kq-gold-600 text-kq-dark-900 font-display font-bold text-lg rounded-xl hover:from-kq-gold-400 hover:to-kq-gold-500 transition-all transform hover:scale-105"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
