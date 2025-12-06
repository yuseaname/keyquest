import { Vehicle } from '../types/game';

export const vehicles: Vehicle[] = [
  { id: 'walk', name: 'Walking Shoes', tier: 0, cost: 0, upkeep: 0 },
  {
    id: 'bike',
    name: 'Used Bike',
    tier: 1,
    cost: 180,
    upkeep: 4,
    effects: { jobTags: ['local'] },
  },
  {
    id: 'cheap-car',
    name: '1998 Hatchback',
    tier: 2,
    cost: 1600,
    upkeep: 14,
    effects: { jobTags: ['on-site', 'delivery'] },
  },
  {
    id: 'good-car',
    name: 'Reliable Sedan',
    tier: 3,
    cost: 4200,
    upkeep: 28,
    effects: { jobTags: ['on-site', 'client-meeting'] },
  },
  {
    id: 'high-end-car',
    name: 'Electric Dream',
    tier: 4,
    cost: 12000,
    upkeep: 42,
    effects: { jobTags: ['premium'] },
  },
  {
    id: 'nomad-van',
    name: 'Converted Van',
    tier: 3,
    cost: 6800,
    upkeep: 32,
    effects: { jobTags: ['travel', 'remote'] },
  },
];
