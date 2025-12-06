import { Ending } from '../types/game';

export const endings: Ending[] = [
  {
    id: 'ending-dream-home',
    title: 'Dream Home Achieved',
    description: 'You build a countryside retreat and code from your porch.',
    conditions: [
      { type: 'flag', flag: 'ending-dream-home' },
      { type: 'chapterUnlocked', chapterId: 5 },
    ],
  },
  {
    id: 'ending-startup',
    title: 'Bootstrapped Founder',
    description: 'You ship a product, hire a cat CTO, and raise seed funding.',
    conditions: [
      { type: 'flag', flag: 'shipped-widget' },
      { type: 'chapterUnlocked', chapterId: 4 },
    ],
  },
  {
    id: 'ending-streamer',
    title: 'Streamer Celebrity',
    description: 'You stream typing marathons and sell merch: “I don’t spill coffee anymore.”',
    conditions: [
      { type: 'flag', flag: 'took-first-gig' },
      { type: 'stat', stat: 'happiness', min: 12 },
    ],
  },
  {
    id: 'ending-penthouse',
    title: 'Urban Penthouse Pro',
    description: 'You stay in the city, surrounded by neon and endless takeout.',
    conditions: [
      { type: 'flag', flag: 'ending-penthouse' },
      { type: 'stat', stat: 'happiness', min: 10 },
    ],
  },
  {
    id: 'ending-nomad',
    title: 'Digital Nomad',
    description: 'Your van is your office. Wi-Fi and sunsets decide your schedule.',
    conditions: [
      { type: 'flag', flag: 'ending-nomad' },
      { type: 'vehicle', vehicleId: 'nomad-van' },
    ],
  },
  {
    id: 'ending-workaholic',
    title: 'Workaholic',
    description: 'You hit every deadline and forgot to sleep. But the money is nice.',
    conditions: [
      { type: 'stat', stat: 'happiness', min: 0 },
      { type: 'stat', stat: 'skill', min: 20 },
      { type: 'money', amount: 5000 },
    ],
  },
];
