import { Chapter } from '../types/game';

export const chapters: Chapter[] = [
  {
    id: 0,
    name: 'Chapter 0: Corporate Splashdown',
    summary: 'You baptized the CEO’s keyboard in espresso and got punted out of the building. Rent is glaring.',
    beats: [
      'HR email subject line: “RE: You???”',
      'Reply-all meme gets 143 laugh reacts, zero job offers.',
      'Laptop survives; savings do not. Hustle drills begin.',
    ],
    entryLessonId: 'cold-open',
  },
  {
    id: 1,
    name: 'Chapter 1: Finger Rehab',
    summary: 'Home row therapy, number row panic, and symbol stretching to keep the lights on.',
    beats: [
      'Pinkies unionize and demand ergonomic breaks.',
      'Number row practice = invoices = ramen upgrade.',
      'Symbols make you look “dev-ish” to clueless clients.',
    ],
    entryLessonId: 'home-row-hustle',
  },
  {
    id: 2,
    name: 'Chapter 2: HTML Gig Scramble',
    summary: 'Desperate clients pay you pocket change to babysit their tags and fix their chaos.',
    beats: [
      'Client thinks <div> is a vitamin supplement.',
      'Lists, buttons, and invoices become survival cash.',
      'Accessibility apparently equals “double pay, please.”',
    ],
    entryLessonId: 'html-headline',
  },
  {
    id: 3,
    name: 'Chapter 3: CSS Drama',
    summary: 'You learn to center things, fake confidence, and invoice anyone who says “make it pop.”',
    beats: [
      'Color pickers charge emotional rent.',
      'Flexbox = actual rent; Grid = emergency fund.',
      'Specificity scares clients, so you weaponize it.',
    ],
    entryLessonId: 'css-class-card',
  },
  {
    id: 4,
    name: 'Chapter 4: JavaScript Panic Mode',
    summary: 'Console logs, DOM duct tape, and promises you pray your clients forget.',
    beats: [
      '“Undefined” describes both your code and future.',
      'map vs forEach vs “ship it and don’t ask.”',
      'Charge extra for semicolons; they feel premium.',
    ],
    entryLessonId: 'js-console-fix',
  },
  {
    id: 5,
    name: 'Chapter 5: Life Endgame Shenanigans',
    summary: 'Choose your finale: woodland hermit, scrappy founder, or keyboard influencer with brand deals.',
    beats: [
      'Partners want stability; cat wants premium treats.',
      'Your car smells like stale coffee and ambition.',
      'Pick: ship product, start cult-like stream, or vanish into trees.',
    ],
    entryLessonId: 'life-balance-manifesto',
    endingFlags: ['ending-dream-home', 'ending-startup', 'ending-streamer'],
  },
];
