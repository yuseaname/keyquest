/**
 * Battle Page - Main combat screen
 * Where the typing gameplay happens
 */

import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCombatStore, useGameStore } from '@/store';
import { useTypingEngine } from '@/hooks/useTypingEngine';
import { useGameLoop } from '@/hooks/useGameLoop';
import { TypingZone } from '@/components/battle/TypingZone';
import { EnemyCard } from '@/components/battle/EnemyCard';
import { PlayerStats } from '@/components/battle/PlayerStats';
import { AbilityBar } from '@/components/battle/AbilityBar';
import { CombatLog } from '@/components/battle/CombatLog';
import { VictoryScreen } from '@/components/battle/VictoryScreen';
import { DefeatScreen } from '@/components/battle/DefeatScreen';

export function BattlePage() {
  const navigate = useNavigate();
  const { combat, isInCombat, startCombat, resetCombat } = useCombatStore();
  const { currentCharacter } = useGameStore();
  const [isPaused, setIsPaused] = useState(false);

  const {
    currentWord,
    typedText,
    handleKeyPress,
    wpm,
    accuracy,
    combo,
  } = useTypingEngine();

  const { start: startGameLoop, stop: stopGameLoop } = useGameLoop();

  // Initialize combat when page loads
  useEffect(() => {
    if (!combat || !currentCharacter) {
      navigate('/realm-select');
      return;
    }

    // Start combat after a brief delay
    const timer = setTimeout(() => {
      startCombat();
      startGameLoop();
    }, 1000);

    return () => {
      clearTimeout(timer);
      stopGameLoop();
    };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    if (!isInCombat || isPaused || combat?.status !== 'active') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to pause
      if (e.key === 'Escape') {
        setIsPaused(true);
        stopGameLoop();
        return;
      }

      handleKeyPress(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInCombat, isPaused, combat?.status, handleKeyPress]);

  // Handle resume from pause
  const handleResume = useCallback(() => {
    setIsPaused(false);
    startGameLoop();
  }, [startGameLoop]);

  // Handle flee/exit
  const handleFlee = useCallback(() => {
    resetCombat();
    navigate('/realm-select');
  }, [resetCombat, navigate]);

  // Handle victory continue
  const handleVictoryContinue = useCallback(() => {
    resetCombat();
    navigate('/');
  }, [resetCombat, navigate]);

  // Handle defeat retry
  const handleDefeatRetry = useCallback(() => {
    // Re-initialize with same realm
    if (combat?.realm && currentCharacter) {
      const { initializeCombat } = useCombatStore.getState();
      initializeCombat(combat.realm, currentCharacter);
      startCombat();
      startGameLoop();
    }
  }, [combat?.realm, currentCharacter, startCombat, startGameLoop]);

  // Loading state
  if (!combat) {
    return (
      <div className="min-h-screen bg-kq-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-kq-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-kq-dark-400">Loading battle...</p>
        </div>
      </div>
    );
  }

  // Victory screen
  if (combat.status === 'victory') {
    return <VictoryScreen onContinue={handleVictoryContinue} />;
  }

  // Defeat screen
  if (combat.status === 'defeat') {
    return <DefeatScreen onRetry={handleDefeatRetry} onExit={handleFlee} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 overflow-hidden">
      {/* Battle Arena */}
      <div className="h-screen flex flex-col p-4">
        {/* Top Bar - Realm Info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl text-kq-gold-400">{combat.realm.name}</h2>
            <p className="text-kq-dark-400 text-sm">
              Enemy {combat.wordsCompleted + 1} / {combat.realm.enemies.length + 1}
            </p>
          </div>
          <button
            onClick={() => {
              setIsPaused(true);
              stopGameLoop();
            }}
            className="px-4 py-2 bg-kq-dark-700 text-white rounded-lg hover:bg-kq-dark-600 transition-colors"
          >
            ?? Pause
          </button>
        </div>

        {/* Main Battle Area */}
        <div className="flex-1 grid lg:grid-cols-3 gap-6">
          {/* Left - Enemy Card */}
          <div className="lg:col-span-1">
            <EnemyCard
              enemy={combat.currentEnemy}
              currentHealth={combat.enemyCurrentHealth}
              maxHealth={combat.currentEnemy.maxHealth}
            />
          </div>

          {/* Center - Typing Zone */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <TypingZone
              currentWord={currentWord}
              typedText={typedText}
              combo={combo}
            />
            
            {/* Combat Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-kq-dark-800/50 rounded-lg p-3">
                <p className="text-2xl font-bold text-kq-primary-400 font-mono">{wpm}</p>
                <p className="text-xs text-kq-dark-400">WPM</p>
              </div>
              <div className="bg-kq-dark-800/50 rounded-lg p-3">
                <p className="text-2xl font-bold text-kq-nature-400 font-mono">{accuracy}%</p>
                <p className="text-xs text-kq-dark-400">Accuracy</p>
              </div>
              <div className="bg-kq-dark-800/50 rounded-lg p-3">
                <p className="text-2xl font-bold text-kq-gold-400 font-mono">{combo}x</p>
                <p className="text-xs text-kq-dark-400">Combo</p>
              </div>
            </div>
          </div>

          {/* Right - Player & Abilities */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <PlayerStats
              character={combat.character}
              currentHealth={combat.characterCurrentHealth}
            />
            <AbilityBar
              abilities={combat.character.abilities}
              abilityStates={combat.abilityStates}
            />
            <CombatLog />
          </div>
        </div>
      </div>

      {/* Pause Modal */}
      {isPaused && (
        <div className="fixed inset-0 bg-kq-dark-950/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-kq-dark-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-kq-dark-700">
            <h2 className="font-display text-2xl text-kq-gold-400 text-center mb-6">Paused</h2>
            <div className="space-y-4">
              <button
                onClick={handleResume}
                className="w-full py-3 bg-gradient-to-r from-kq-gold-500 to-kq-gold-600 text-kq-dark-900 font-display font-bold rounded-xl hover:from-kq-gold-400 hover:to-kq-gold-500 transition-all"
              >
                Resume
              </button>
              <button
                onClick={handleFlee}
                className="w-full py-3 bg-kq-dark-700 text-white font-display rounded-xl hover:bg-kq-dark-600 transition-all"
              >
                Flee Battle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
