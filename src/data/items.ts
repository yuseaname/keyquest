import { Item } from '../types/game';

export const items: Item[] = [
  {
    id: 'starter-laptop',
    name: 'Refurb Laptop',
    type: 'laptop',
    cost: 0,
    effects: { wpmBonus: 0 },
  },
  {
    id: 'mech-keyboard',
    name: 'Clicky Keyboard',
    type: 'keyboard',
    cost: 180,
    effects: { accuracyBonus: 2, wpmBonus: 1 },
  },
  {
    id: 'ultra-monitor',
    name: 'Ultra-Wide Monitor',
    type: 'monitor',
    cost: 720,
    effects: { payoutMultiplier: 1.05 },
    requirements: [{ type: 'chapterUnlocked', chapterId: 2 }],
  },
  {
    id: 'barista-coffee',
    name: 'Barista Coffee Maker',
    type: 'coffee',
    cost: 320,
    effects: { wpmBonus: 1, accuracyBonus: 1 },
  },
  {
    id: 'pro-laptop',
    name: 'Pro Laptop',
    type: 'laptop',
    cost: 900,
    effects: { wpmBonus: 3, accuracyBonus: 1, payoutMultiplier: 1.08 },
    requirements: [{ type: 'chapterUnlocked', chapterId: 3 }],
  },
];
