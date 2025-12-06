import { RelationshipPartner } from '../types/game';

export const relationships: RelationshipPartner[] = [
  {
    id: 'artist-partner',
    name: 'Riley (Indie Artist)',
    occupation: 'Illustrator who wants a web portfolio',
    milestones: [
      {
        level: 1,
        label: 'Coffee & CSS',
        lessonId: 'css-class-card',
        reward: { type: 'stat', stat: 'happiness', delta: 3 },
      },
      {
        level: 2,
        label: 'Portfolio Launch',
        lessonId: 'css-job-hero-polish',
        reward: { type: 'flag', flag: 'artist-portfolio' },
        requirement: { type: 'item', itemId: 'ultra-monitor' },
      },
      {
        level: 3,
        label: 'Gallery Night',
        lessonId: 'css-job-responsive-retainer',
        reward: { type: 'stat', stat: 'happiness', delta: 5 },
        requirement: { type: 'vehicle', vehicleId: 'good-car' },
      },
    ],
  },
  {
    id: 'dev-partner',
    name: 'Sam (Junior Dev)',
    occupation: 'Learns JS, trades memes',
    milestones: [
      {
        level: 1,
        label: 'Debug Date',
        lessonId: 'js-console-fix',
        reward: { type: 'stat', stat: 'skill', delta: 2 },
      },
      {
        level: 2,
        label: 'Ship a Widget',
        lessonId: 'js-job-startup-fix',
        reward: { type: 'flag', flag: 'shipped-widget' },
        requirement: { type: 'item', itemId: 'mech-keyboard' },
      },
      {
        level: 3,
        label: 'Demo Day Together',
        lessonId: 'js-job-dashboard',
        reward: { type: 'stat', stat: 'happiness', delta: 4 },
        requirement: { type: 'vehicle', vehicleId: 'nomad-van' },
      },
    ],
  },
];
