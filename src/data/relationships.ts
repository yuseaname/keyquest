import { RelationshipPartner } from '../types/game';

export const relationships: RelationshipPartner[] = [
  {
    id: 'artist-partner',
    name: 'Riley (Rent-Stressed Illustrator)',
    occupation: 'Wants a portfolio, an audience, and rent money yesterday',
    milestones: [
      {
        level: 1,
        label: 'Coffee & CSS Date',
        lessonId: 'css-class-card',
        reward: { type: 'stat', stat: 'happiness', delta: 3 },
      },
      {
        level: 2,
        label: 'Portfolio Panic Launch',
        lessonId: 'css-job-hero-polish',
        reward: { type: 'flag', flag: 'artist-portfolio' },
        requirement: { type: 'item', itemId: 'ultra-monitor' },
      },
      {
        level: 3,
        label: 'Gallery Night Flex',
        lessonId: 'css-job-responsive-retainer',
        reward: { type: 'stat', stat: 'happiness', delta: 5 },
        requirement: { type: 'vehicle', vehicleId: 'good-car' },
      },
    ],
  },
  {
    id: 'dev-partner',
    name: 'Sam (Junior Dev + Meme Archivist)',
    occupation: 'Learning JS, roasting bad standups, sharing cursed repos',
    milestones: [
      {
        level: 1,
        label: 'Debug & Chill',
        lessonId: 'js-console-fix',
        reward: { type: 'stat', stat: 'skill', delta: 2 },
      },
      {
        level: 2,
        label: 'Ship the Widget Maybe',
        lessonId: 'js-job-startup-fix',
        reward: { type: 'flag', flag: 'shipped-widget' },
        requirement: { type: 'item', itemId: 'mech-keyboard' },
      },
      {
        level: 3,
        label: 'Demo Day Chaos',
        lessonId: 'js-job-dashboard',
        reward: { type: 'stat', stat: 'happiness', delta: 4 },
        requirement: { type: 'vehicle', vehicleId: 'nomad-van' },
      },
    ],
  },
];
