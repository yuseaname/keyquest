/**
 * Typing Engine Hook
 * Core typing mechanics for the game
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useCombatStore } from '@/store';

interface TypingEngineState {
  currentWord: string;
  typedText: string;
  wpm: number;
  accuracy: number;
  combo: number;
  maxCombo: number;
  totalCorrect: number;
  totalTyped: number;
  mistakes: number;
}

interface TypingEngineReturn extends TypingEngineState {
  handleKeyPress: (key: string) => void;
  reset: () => void;
  setWord: (word: string) => void;
}

export function useTypingEngine(): TypingEngineReturn {
  const [state, setState] = useState<TypingEngineState>({
    currentWord: '',
    typedText: '',
    wpm: 0,
    accuracy: 100,
    combo: 0,
    maxCombo: 0,
    totalCorrect: 0,
    totalTyped: 0,
    mistakes: 0,
  });

  const startTimeRef = useRef<number>(0);
  const wordStartTimeRef = useRef<number>(0);
  const wordsTypedRef = useRef<number>(0);

  const {
    combat,
    completeWord,
    incrementCombo,
    resetCombo,
    registerMistake,
    updateWPM,
    updateAccuracy,
    getNextWord,
  } = useCombatStore();

  // Initialize with first word when combat starts
  useEffect(() => {
    if (combat?.status === 'active' && !state.currentWord) {
      const nextWord = getNextWord();
      if (nextWord) {
        setState(prev => ({ ...prev, currentWord: nextWord }));
        startTimeRef.current = Date.now();
        wordStartTimeRef.current = Date.now();
      }
    }
  }, [combat?.status, state.currentWord, getNextWord]);

  // Calculate WPM
  const calculateWPM = useCallback(() => {
    const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
    if (elapsedMinutes < 0.01) return 0; // Avoid division by very small numbers
    
    // Standard WPM calculation: (characters / 5) / minutes
    const wpm = Math.round((state.totalCorrect / 5) / elapsedMinutes);
    return Math.min(wpm, 999); // Cap at reasonable maximum
  }, [state.totalCorrect]);

  // Calculate accuracy
  const calculateAccuracy = useCallback(() => {
    if (state.totalTyped === 0) return 100;
    return Math.round((state.totalCorrect / state.totalTyped) * 100);
  }, [state.totalCorrect, state.totalTyped]);

  // Handle word completion
  const handleWordComplete = useCallback(() => {
    wordsTypedRef.current++;
    
    // Get next word from queue
    const nextWord = getNextWord();
    
    // Calculate damage based on speed and accuracy
    // Timing calculations for future WPM per-word tracking
    // const wordTime = Date.now() - wordStartTimeRef.current;
    // const wordWPM = (state.currentWord.length / 5) / (wordTime / 60000);
    
    // Update combat store
    completeWord();
    incrementCombo();
    
    // Update local state
    setState(prev => {
      const newWPM = calculateWPM();
      const newAccuracy = calculateAccuracy();
      
      // Update combat store with new stats
      updateWPM(newWPM);
      updateAccuracy(newAccuracy);
      
      return {
        ...prev,
        currentWord: nextWord || '',
        typedText: '',
        wpm: newWPM,
        accuracy: newAccuracy,
        combo: prev.combo + 1,
        maxCombo: Math.max(prev.maxCombo, prev.combo + 1),
      };
    });
    
    wordStartTimeRef.current = Date.now();
  }, [
    state.currentWord.length,
    completeWord,
    incrementCombo,
    updateWPM,
    updateAccuracy,
    calculateWPM,
    calculateAccuracy,
    getNextWord,
  ]);

  // Handle key press
  const handleKeyPress = useCallback((key: string) => {
    // Ignore non-character keys except backspace
    if (key.length > 1 && key !== 'Backspace') return;
    
    // Start timer on first keypress
    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
      wordStartTimeRef.current = Date.now();
    }

    setState(prev => {
      const { currentWord, typedText } = prev;
      
      // Handle backspace
      if (key === 'Backspace') {
        if (typedText.length === 0) return prev;
        return {
          ...prev,
          typedText: typedText.slice(0, -1),
        };
      }

      // Handle space - word completion
      if (key === ' ') {
        if (typedText === currentWord) {
          // Word is correct - will be handled by handleWordComplete
          setTimeout(() => handleWordComplete(), 0);
          return prev;
        }
        // Space pressed but word not complete - ignore or count as mistake
        return prev;
      }

      const expectedChar = currentWord[typedText.length];
      const isCorrect = key === expectedChar;
      
      // Update stats
      const newTypedText = typedText + key;
      const newTotalTyped = prev.totalTyped + 1;
      const newTotalCorrect = isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect;
      const newMistakes = isCorrect ? prev.mistakes : prev.mistakes + 1;

      // Handle mistake
      if (!isCorrect) {
        resetCombo();
        registerMistake();
      }

      // Check if word is complete
      if (newTypedText === currentWord) {
        // Auto-complete word (no space needed)
        setTimeout(() => handleWordComplete(), 50);
      }

      const newAccuracy = Math.round((newTotalCorrect / newTotalTyped) * 100);

      return {
        ...prev,
        typedText: newTypedText,
        totalTyped: newTotalTyped,
        totalCorrect: newTotalCorrect,
        mistakes: newMistakes,
        accuracy: newAccuracy,
        combo: isCorrect ? prev.combo : 0,
      };
    });
  }, [handleWordComplete, resetCombo, registerMistake]);

  // Reset the typing engine
  const reset = useCallback(() => {
    startTimeRef.current = 0;
    wordStartTimeRef.current = 0;
    wordsTypedRef.current = 0;
    
    setState({
      currentWord: '',
      typedText: '',
      wpm: 0,
      accuracy: 100,
      combo: 0,
      maxCombo: 0,
      totalCorrect: 0,
      totalTyped: 0,
      mistakes: 0,
    });
  }, []);

  // Set a new word manually
  const setWord = useCallback((word: string) => {
    wordStartTimeRef.current = Date.now();
    setState(prev => ({
      ...prev,
      currentWord: word,
      typedText: '',
    }));
  }, []);

  return {
    ...state,
    handleKeyPress,
    reset,
    setWord,
  };
}
