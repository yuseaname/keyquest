/**
 * Typing Zone Component
 * The central typing interface during combat
 */

import { motion, AnimatePresence } from 'framer-motion';

interface TypingZoneProps {
  currentWord: string;
  typedText: string;
  combo: number;
}

export function TypingZone({ currentWord, typedText, combo }: TypingZoneProps) {
  return (
    <div className="w-full max-w-lg">
      {/* Combo Display */}
      <AnimatePresence>
        {combo > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center mb-4"
          >
            <span className="text-kq-gold-400 font-display text-lg">
              {combo}x Combo!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Word Display */}
      <div className="bg-kq-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-kq-dark-600 shadow-2xl">
        <div className="text-center">
          {/* Current Word */}
          <div className="font-mono text-4xl tracking-wider mb-4">
            {currentWord.split('').map((char, index) => {
              const isTyped = index < typedText.length;
              const isCorrect = isTyped && typedText[index] === char;
              const isIncorrect = isTyped && typedText[index] !== char;
              const isCurrent = index === typedText.length;

              return (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    color: isCorrect
                      ? '#4ade80' // green
                      : isIncorrect
                      ? '#f87171' // red
                      : isCurrent
                      ? '#ffffff'
                      : '#64748b', // gray
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`inline-block ${
                    isIncorrect ? 'bg-kq-fire-500/30 rounded' : ''
                  } ${isCurrent ? 'border-b-2 border-kq-gold-400' : ''}`}
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Typed Text Preview */}
          <div className="h-8 text-kq-dark-500 font-mono text-sm">
            {typedText && (
              <span>
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Instruction */}
      <p className="text-center text-kq-dark-500 text-sm mt-4">
        Type the word above to attack!
      </p>
    </div>
  );
}
