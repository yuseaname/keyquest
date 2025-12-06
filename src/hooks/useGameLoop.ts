/**
 * Game Loop Hook
 * Handles the main game update loop using requestAnimationFrame
 */

import { useRef, useCallback, useState } from 'react';
import { useCombatStore } from '@/store';

const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;

interface GameLoopState {
  isRunning: boolean;
  fps: number;
  deltaTime: number;
}

export function useGameLoop() {
  const [state, setState] = useState<GameLoopState>({
    isRunning: false,
    fps: 0,
    deltaTime: 0,
  });

  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const fpsCounterRef = useRef<number>(0);
  const fpsTimeRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);

  const { 
    updateCooldowns, 
    updateEffectDurations,
    combat 
  } = useCombatStore();

  // Main game loop
  const gameLoop = useCallback((currentTime: number) => {
    if (!isRunningRef.current) return;

    const deltaTime = currentTime - lastTimeRef.current;
    
    // Only update if enough time has passed (frame rate limiting)
    if (deltaTime >= FRAME_TIME) {
      const deltaSeconds = deltaTime / 1000;

      // Update game systems
      if (combat?.status === 'active') {
        // Update ability cooldowns
        updateCooldowns(deltaSeconds);
        
        // Update active effects
        updateEffectDurations(deltaSeconds);
        
        // TODO: Add enemy attack timing
        // TODO: Add passive ability triggers
      }

      // FPS counter
      fpsCounterRef.current++;
      if (currentTime - fpsTimeRef.current >= 1000) {
        setState(prev => ({
          ...prev,
          fps: fpsCounterRef.current,
          deltaTime: deltaSeconds,
        }));
        fpsCounterRef.current = 0;
        fpsTimeRef.current = currentTime;
      }

      lastTimeRef.current = currentTime;
    }

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [combat?.status, updateCooldowns, updateEffectDurations]);

  // Start the game loop
  const start = useCallback(() => {
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    lastTimeRef.current = performance.now();
    fpsTimeRef.current = performance.now();
    
    setState(prev => ({ ...prev, isRunning: true }));
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  // Stop the game loop
  const stop = useCallback(() => {
    isRunningRef.current = false;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  // Toggle the game loop
  const toggle = useCallback(() => {
    if (isRunningRef.current) {
      stop();
    } else {
      start();
    }
  }, [start, stop]);

  return {
    ...state,
    start,
    stop,
    toggle,
  };
}
