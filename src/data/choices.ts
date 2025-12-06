import { ChoiceNode } from '../types/game';

export const choices: ChoiceNode[] = [
  {
    id: 'cold-open-branch',
    chapterId: 0,
    title: 'Reply-All Aftermath',
    narrative: 'Your inbox explodes. A stranger DMs: "I pay for HTML gigs."',
    options: [
      {
        id: 'accept-gig',
        label: 'Accept the random gig',
        outcomeText: 'You accept. Stranger sends a list and $5 promise.',
        rewards: [
          { type: 'money', amount: 5 },
          { type: 'flag', flag: 'took-first-gig' },
        ],
        nextNodeId: 'intro-gear',
        triggersLessonId: 'html-list',
      },
      {
        id: 'ignore',
        label: 'Ignore the stranger',
        outcomeText: 'Inbox quiets. Hunger does not.',
        rewards: [{ type: 'stat', stat: 'happiness', delta: -2 }],
        nextNodeId: 'intro-gear',
      },
    ],
  },
  {
    id: 'intro-gear',
    chapterId: 1,
    title: 'Do You Upgrade Gear?',
    narrative: 'Your trackpad is sticky. Keyboard squeaks. Do you buy used gear?',
    options: [
      {
        id: 'buy-used',
        label: 'Buy a used mech keyboard ($120)',
        outcomeText: 'Clacky happiness achieved.',
        requirements: [{ type: 'stat', stat: 'happiness', min: 0 }],
        rewards: [
          { type: 'item', itemId: 'mech-keyboard' },
          { type: 'stat', stat: 'happiness', delta: 5 },
        ],
        nextNodeId: 'career-branch',
      },
      {
        id: 'stay-broken',
        label: 'Stick with sticky keys',
        outcomeText: 'You save money but lose morale.',
        rewards: [{ type: 'stat', stat: 'happiness', delta: -3 }],
        nextNodeId: 'career-branch',
      },
    ],
  },
  {
    id: 'career-branch',
    chapterId: 2,
    title: 'Pick Your Hustle',
    narrative: 'You get two DMs: a CSS agency retainer, and a JS startup fire.',
    options: [
      {
        id: 'css-agency',
        label: 'Take the CSS agency retainer',
        outcomeText: 'You promise to polish hero sections for 12 clients.',
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
        outcomeText: 'Their dashboard crashed. You ask for logs; they send emojis.',
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
    narrative: 'Do you chase design retainers or ship a JS widget for passive income?',
    options: [
      {
        id: 'css-retainer',
        label: 'Keep the CSS retainers',
        outcomeText: 'You design three responsive variants and raise your rate.',
        rewards: [
          { type: 'flag', flag: 'path-css-pro' },
          { type: 'money', amount: 40 },
        ],
        triggersLessonId: 'css-job-responsive-retainer',
      },
      {
        id: 'js-widget',
        label: 'Ship the JS widget',
        outcomeText: 'You promise a dashboard that actually loads.',
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
