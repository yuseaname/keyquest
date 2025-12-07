import { ChoiceNode } from '../types/game';

export const choices: ChoiceNode[] = [
  {
    id: 'cold-open-branch',
    chapterId: 0,
    title: 'Reply-All Fallout',
    narrative: 'Your inbox turns into a landfill of pity emails and mystery gig offers.',
    options: [
      {
        id: 'accept-gig',
        label: 'DM back the random giglord',
        outcomeText: 'You send a screenshot of your cleanest <li>. Payment promised: five bucks and “exposure.”',
        rewards: [
          { type: 'money', amount: 5 },
          { type: 'flag', flag: 'took-first-gig' },
        ],
        nextNodeId: 'intro-gear',
        triggersLessonId: 'html-list',
      },
      {
        id: 'ignore',
        label: 'Mute every notification',
        outcomeText: 'Peace returns. Hunger grows louder than Slack pings.',
        rewards: [{ type: 'stat', stat: 'happiness', delta: -2 }],
        nextNodeId: 'intro-gear',
      },
    ],
  },
  {
    id: 'intro-gear',
    chapterId: 1,
    title: 'Sticky Gear Debate',
    narrative: 'Trackpad is caramelized sugar. Keyboard squeaks like a haunted accordion.',
    options: [
      {
        id: 'buy-used',
        label: 'Buy the used mech keyboard ($120)',
        outcomeText: 'Clacks echo through the apartment; you feel 3% like a pro.',
        requirements: [{ type: 'stat', stat: 'happiness', min: 0 }],
        rewards: [
          { type: 'item', itemId: 'mech-keyboard' },
          { type: 'stat', stat: 'happiness', delta: 5 },
        ],
        nextNodeId: 'career-branch',
      },
      {
        id: 'stay-broken',
        label: 'Keep the sticky keys',
        outcomeText: 'Save money, lose morale, hope your spacebar doesn’t unionize.',
        rewards: [{ type: 'stat', stat: 'happiness', delta: -3 }],
        nextNodeId: 'career-branch',
      },
    ],
  },
  {
    id: 'career-branch',
    chapterId: 2,
    title: 'Pick Your Hustle',
    narrative: 'DM #1: CSS agency retainer. DM #2: JS startup on digital fire.',
    options: [
      {
        id: 'css-agency',
        label: 'Take the CSS agency retainer',
        outcomeText: 'You agree to polish 12 hero sections and pretend gradients are your kink.',
        rewards: [
          { type: 'flag', flag: 'path-css' },
          { type: 'money', amount: 25 },
        ],
        triggersLessonId: 'css-job-hero-polish',
        nextNodeId: 'branch-followup',
      },
      {
        id: 'js-firefighter',
        label: 'Fix the JS startup fire',
        outcomeText: 'Dashboard is down. They send you emojis instead of logs. You cry a little.',
        rewards: [
          { type: 'flag', flag: 'path-js' },
          { type: 'stat', stat: 'skill', delta: 2 },
        ],
        triggersLessonId: 'js-job-startup-fix',
        nextNodeId: 'branch-followup',
      },
    ],
  },
  {
    id: 'branch-followup',
    chapterId: 3,
    title: 'Double Down',
    narrative: 'Keep stacking design retainers or build a JS widget that hopefully prints rent?',
    options: [
      {
        id: 'css-retainer',
        label: 'Keep the CSS retainers',
        outcomeText: 'You ship three responsive variants and add “lead designer??” to your bio.',
        rewards: [
          { type: 'flag', flag: 'path-css-pro' },
          { type: 'money', amount: 40 },
        ],
        triggersLessonId: 'css-job-responsive-retainer',
      },
      {
        id: 'js-widget',
        label: 'Ship the JS widget',
        outcomeText: 'You promise a dashboard that loads before the next rent hike.',
        rewards: [
          { type: 'flag', flag: 'path-js-widget' },
          { type: 'stat', stat: 'skill', delta: 3 },
        ],
        triggersLessonId: 'js-job-dashboard',
      },
    ],
  },
];

export const getChoiceNode = (id?: string) =>
  choices.find((choice) => choice.id === id);
