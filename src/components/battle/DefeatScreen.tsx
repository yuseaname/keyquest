/**
 * Defeat Screen Component
 * Displayed when player loses a battle
 */

import { motion } from 'framer-motion';
import { useCombatStore } from '@/store';

interface DefeatScreenProps {
  onRetry: () => void;
  onExit: () => void;
}

export function DefeatScreen({ onRetry, onExit }: DefeatScreenProps) {
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
        {/* Defeat Banner */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">??</div>
          <h1 className="font-display text-4xl text-kq-fire-400 mb-2">
            Defeated
          </h1>
          <p className="text-kq-dark-400">
            You were overwhelmed in {combat.realm.name}
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
            Battle Summary
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-primary-400 font-mono">
                {combat.currentWPM}
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">WPM</p>
            </div>
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-nature-400 font-mono">
                {combat.currentAccuracy}%
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Accuracy</p>
            </div>
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-fire-400 font-mono">
                {combat.mistakes}
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Mistakes</p>
            </div>
            <div className="bg-kq-dark-900/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-kq-tech-400 font-mono">
                {combat.wordsCompleted}
              </p>
              <p className="text-xs text-kq-dark-400 mt-1">Words Typed</p>
            </div>
          </div>

          {/* Tips */}
          <div className="border-t border-kq-dark-700 pt-4">
            <h4 className="text-sm text-kq-dark-400 mb-2">?? Tips</h4>
            <ul className="text-xs text-kq-dark-500 space-y-1">
              <li>• Focus on accuracy over speed to maintain combos</li>
              <li>• Use class abilities strategically for bonus damage</li>
              <li>• Train in the Training Grounds to improve WPM</li>
            </ul>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={onRetry}
            className="w-full py-4 bg-gradient-to-r from-kq-fire-500 to-kq-fire-600 text-white font-display font-bold text-lg rounded-xl hover:from-kq-fire-400 hover:to-kq-fire-500 transition-all"
          >
            Try Again
          </button>
          <button
            onClick={onExit}
            className="w-full py-3 bg-kq-dark-700 text-white font-display rounded-xl hover:bg-kq-dark-600 transition-all"
          >
            Return to Menu
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
