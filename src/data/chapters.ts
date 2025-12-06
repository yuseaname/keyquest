import { Chapter } from '../types/game';

export const chapters: Chapter[] = [
  {
    id: 0,
    name: 'Chapter 0: Cold Open',
    summary: 'You got fired for a coffee-soaked keyboard. Time to pivot into typing for rent.',
    beats: [
      'HR email subject: "about the keyboard situation..."',
      'Reply-all with a cat meme. CEO laughed… then cried.',
      'Laptop survived. Bank account did not. Hustle begins.',
    ],
    entryLessonId: 'cold-open',
  },
  {
    id: 1,
    name: 'Chapter 1: Typing Basics',
    summary: 'Rebuild your muscle memory. Home row, numbers, punctuation, and HTML skeletons.',
    beats: [
      'Your pinkies file a complaint. Home row unionizes.',
      'Numbers unlock invoices. Invoices unlock food.',
      'Symbols look like coding. Clients love confidence.',
    ],
    entryLessonId: 'home-row-hustle',
  },
  {
    id: 2,
    name: 'Chapter 2: HTML Micro-Jobs',
    summary: 'Tiny gigs from desperate clients who can barely spell <div>.',
    beats: [
      'Someone pays you to add <h1>. You accept.',
      'List items are the new gold coins.',
      'Accessibility? Fancy word for “paid twice”.',
    ],
    entryLessonId: 'html-headline',
  },
  {
    id: 3,
    name: 'Chapter 3: CSS Side Quests',
    summary: 'You learn the dark art of centering and charging for it.',
    beats: [
      'Color pickers are billable hours.',
      'Flexbox = rent. Grid = savings.',
      'Clients fear specificity. You wield it.',
    ],
    entryLessonId: 'css-class-card',
  },
  {
    id: 4,
    name: 'Chapter 4: JavaScript Bug Fixes',
    summary: 'Console logs, DOM tweaks, and promises you hope to keep.',
    beats: [
      'Undefined is more than a mood.',
      'map vs forEach vs “it works now”.',
      'You charge extra for semicolons.',
    ],
    entryLessonId: 'js-console-fix',
  },
  {
    id: 5,
    name: 'Chapter 5: Life Endgame',
    summary: 'Decide how the broke coder legend concludes: dream home, startup, or influencer.',
    beats: [
      'Partners ask for stability. Cats ask for treats.',
      'Your car smells like coffee and ambition.',
      'Will you ship a product or a vlog?',
    ],
    entryLessonId: 'life-balance-manifesto',
    endingFlags: ['ending-dream-home', 'ending-startup', 'ending-streamer'],
  },
];
