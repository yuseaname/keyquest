/**
 * Training Grounds Page
 * Traditional typing practice with gamified progression
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTypingEngine } from '@/hooks/useTypingEngine';

type TrainingMode = 'words' | 'sentences' | 'code' | 'custom';
type Difficulty = 'easy' | 'medium' | 'hard';

const PRACTICE_WORDS = {
  easy: ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how'],
  medium: ['about', 'after', 'again', 'being', 'could', 'every', 'first', 'found', 'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'point', 'right', 'small', 'sound', 'spell'],
  hard: ['absolutely', 'accomplish', 'background', 'celebration', 'comfortable', 'development', 'environment', 'fundamental', 'imagination', 'information', 'maintenance', 'neighborhood', 'opportunity', 'performance', 'relationship', 'significant', 'temperature', 'understanding', 'unfortunately', 'vulnerability'],
};

const PRACTICE_SENTENCES = {
  easy: [
    'The quick brown fox jumps over the lazy dog.',
    'A journey of a thousand miles begins with a single step.',
    'To be or not to be, that is the question.',
  ],
  medium: [
    'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    'The only way to do great work is to love what you do.',
    'In the middle of difficulty lies opportunity.',
  ],
  hard: [
    'The fundamental cause of trouble in the world today is that the stupid are cocksure while the intelligent are full of doubt.',
    'Programming is the art of telling another human being what one wants the computer to do.',
    'The best time to plant a tree was twenty years ago. The second best time is now.',
  ],
};

export function TrainingPage() {
  const [mode, setMode] = useState<TrainingMode>('words');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [isTraining, setIsTraining] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [, setWordsCompleted] = useState(0);

  const {
    // currentWord,
    typedText,
    handleKeyPress,
    wpm,
    accuracy,
    combo,
    reset,
  } = useTypingEngine();

  // Generate new text based on mode and difficulty
  const generateText = useCallback(() => {
    if (mode === 'words') {
      const words = PRACTICE_WORDS[difficulty];
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setCurrentText(shuffled.slice(0, 10).join(' '));
    } else if (mode === 'sentences') {
      const sentences = PRACTICE_SENTENCES[difficulty];
      setCurrentText(sentences[Math.floor(Math.random() * sentences.length)]);
    }
  }, [mode, difficulty]);

  // Start training
  const startTraining = useCallback(() => {
    generateText();
    setIsTraining(true);
    setWordsCompleted(0);
    reset();
  }, [generateText, reset]);

  // Stop training
  const stopTraining = useCallback(() => {
    setIsTraining(false);
    setCurrentText('');
  }, []);

  // Handle keyboard input during training
  useEffect(() => {
    if (!isTraining) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopTraining();
        return;
      }
      handleKeyPress(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTraining, handleKeyPress, stopTraining]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-kq-gold-400 mb-1">Training Grounds</h1>
            <p className="text-kq-dark-400">Hone your typing skills</p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-kq-dark-700 text-white rounded-lg hover:bg-kq-dark-600 transition-colors"
          >
            ? Back
          </Link>
        </div>

        {!isTraining ? (
          <>
            {/* Training Mode Selection */}
            <div className="mb-8">
              <h2 className="font-display text-lg text-white mb-4">Training Mode</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'words', label: 'Words', icon: '??' },
                  { id: 'sentences', label: 'Sentences', icon: '??' },
                  { id: 'code', label: 'Code', icon: '??', disabled: true },
                  { id: 'custom', label: 'Custom', icon: '??', disabled: true },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => !m.disabled && setMode(m.id as TrainingMode)}
                    disabled={m.disabled}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      mode === m.id
                        ? 'border-kq-gold-500 bg-kq-dark-800'
                        : m.disabled
                        ? 'border-kq-dark-800 bg-kq-dark-800/30 opacity-50 cursor-not-allowed'
                        : 'border-kq-dark-700 bg-kq-dark-800/50 hover:border-kq-dark-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <p className="text-white font-medium">{m.label}</p>
                    {m.disabled && <p className="text-kq-dark-500 text-xs">Coming soon</p>}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <h2 className="font-display text-lg text-white mb-4">Difficulty</h2>
              <div className="flex gap-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 px-6 rounded-xl border-2 transition-all capitalize ${
                      difficulty === d
                        ? d === 'easy'
                          ? 'border-kq-nature-500 bg-kq-nature-500/10 text-kq-nature-400'
                          : d === 'medium'
                          ? 'border-kq-gold-500 bg-kq-gold-500/10 text-kq-gold-400'
                          : 'border-kq-fire-500 bg-kq-fire-500/10 text-kq-fire-400'
                        : 'border-kq-dark-700 bg-kq-dark-800/50 text-white hover:border-kq-dark-500'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={startTraining}
                className="px-12 py-4 bg-gradient-to-r from-kq-gold-500 to-kq-gold-600 text-kq-dark-900 font-display font-bold text-lg rounded-xl hover:from-kq-gold-400 hover:to-kq-gold-500 transition-all transform hover:scale-105"
              >
                Start Training
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Training Interface */}
            <div className="bg-kq-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-kq-dark-700">
              {/* Stats Bar */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-kq-primary-400 font-mono">{wpm}</p>
                  <p className="text-xs text-kq-dark-400">WPM</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-kq-nature-400 font-mono">{accuracy}%</p>
                  <p className="text-xs text-kq-dark-400">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-kq-gold-400 font-mono">{combo}x</p>
                  <p className="text-xs text-kq-dark-400">Combo</p>
                </div>
              </div>

              {/* Typing Area */}
              <div className="mb-8">
                <div className="bg-kq-dark-900 rounded-xl p-6 font-mono text-lg leading-relaxed">
                  {currentText.split('').map((char, index) => {
                    const isTyped = index < typedText.length;
                    const isCorrect = isTyped && typedText[index] === char;
                    const isIncorrect = isTyped && typedText[index] !== char;
                    const isCurrent = index === typedText.length;

                    return (
                      <span
                        key={index}
                        className={`${
                          isCorrect
                            ? 'text-kq-nature-400'
                            : isIncorrect
                            ? 'text-kq-fire-400 bg-kq-fire-500/20'
                            : isCurrent
                            ? 'text-white bg-kq-gold-500/30'
                            : 'text-kq-dark-400'
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
                <p className="text-center text-kq-dark-500 text-sm mt-4">
                  Press <kbd className="px-2 py-1 bg-kq-dark-700 rounded">ESC</kbd> to stop
                </p>
              </div>

              {/* Stop Button */}
              <div className="text-center">
                <button
                  onClick={stopTraining}
                  className="px-8 py-3 bg-kq-dark-700 text-white font-display rounded-xl hover:bg-kq-dark-600 transition-all"
                >
                  Stop Training
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
