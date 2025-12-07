import { Pet } from '../types/game';

export const pets: Pet[] = [
  {
    id: 'debug-cat',
    name: 'Debugger Cat (Judgy)',
    cost: 160,
    upkeep: 7,
    effects: { accuracyBonus: 1, motivationBonus: 2 },
  },
  {
    id: 'pair-pup',
    name: 'Pair-Programming Pup (Chews Cables)',
    cost: 240,
    upkeep: 10,
    effects: { wpmBonus: 1, motivationBonus: 3 },
  },
  {
    id: 'focus-fish',
    name: 'Focus Goldfish Named CAPSLOCK',
    cost: 70,
    upkeep: 3,
    effects: { accuracyBonus: 1 },
  },
];
