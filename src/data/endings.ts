import { Ending } from '../types/game';

export const endings: Ending[] = [
  {
    id: 'ending-dream-home',
    title: 'Cabin Wi-Fi Royalty',
    description: 'You build a countryside retreat with solar panels, three routers, and zero managers.',
    conditions: [
      { type: 'flag', flag: 'ending-dream-home' },
      { type: 'chapterUnlocked', chapterId: 5 },
    ],
  },
  {
    id: 'ending-startup',
    title: 'Bootstrap Boss',
    description: 'You ship a product, promote the cat to CTO, and pitch VCs with coffee stains on your slides.',
    conditions: [
      { type: 'flag', flag: 'shipped-widget' },
      { type: 'chapterUnlocked', chapterId: 4 },
    ],
  },
  {
    id: 'ending-streamer',
    title: 'Keyboard Stream Icon',
    description: 'You stream typing marathons, sell “I don’t spill coffee anymore” merch, and sleep between raids.',
    conditions: [
      { type: 'flag', flag: 'took-first-gig' },
      { type: 'stat', stat: 'happiness', min: 12 },
    ],
  },
  {
    id: 'ending-penthouse',
    title: 'Neon Penthouse Goblin',
    description: 'You stay downtown, ordering takeout with your pinky extended like the broke royalty you are.',
    conditions: [
      { type: 'flag', flag: 'ending-penthouse' },
      { type: 'stat', stat: 'happiness', min: 10 },
    ],
  },
  {
    id: 'ending-nomad',
    title: 'Wi-Fi Nomad Legend',
    description: 'Your van is an office, kitchen, and therapy session. Wi-Fi decides where sunsets happen.',
    conditions: [
      { type: 'flag', flag: 'ending-nomad' },
      { type: 'vehicle', vehicleId: 'nomad-van' },
    ],
  },
  {
    id: 'ending-workaholic',
    title: 'Overcaffeinated Workaholic',
    description: 'You hit every deadline, forget to sleep, but your bank account finally stops mocking you.',
    conditions: [
      { type: 'stat', stat: 'happiness', min: 0 },
      { type: 'stat', stat: 'skill', min: 20 },
      { type: 'money', amount: 5000 },
    ],
  },
];
