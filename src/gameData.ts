export type LessonType = 'story' | 'drill' | 'job';

export interface TypingResult {
  accuracy: number;
  wpm: number;
  errors: number;
  timeMs: number;
  completed: boolean;
  correct: number;
  total: number;
}

export interface Lesson {
  id: string;
  chapterId: number;
  type: LessonType;
  title: string;
  description: string;
  snippet: string;
  goalAccuracy: number;
  goalWpm: number;
  payout: number;
  flavor?: string;
  tags?: string[];
}

export interface Chapter {
  id: number;
  name: string;
  summary: string;
  beats: string[];
}

export const chapters: Chapter[] = [
  {
    id: 0,
    name: 'Chapter 0: Cold Open',
    summary: 'You got fired for a coffee-soaked keyboard. Time to pivot hard into coding.',
    beats: [
      'HR email subject: "about the keyboard situation..."',
      'Reply-all with a cat meme. CEO laughed… then cried.',
      'Laptop survived. Bank account did not. Hustle begins.',
    ],
  },
  {
    id: 1,
    name: 'Chapter 1: Typing Basics',
    summary: 'Rebuild your muscle memory. Home row, numbers, and punctuation bootcamp.',
    beats: [
      'Your pinkies file a complaint. Home row unionizes.',
      'Numbers unlock invoices. Invoices unlock food.',
      'Symbols look like coding. Clients love confidence.',
    ],
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
  },
];

export const lessons: Lesson[] = [
  {
    id: 'cold-open',
    chapterId: 0,
    type: 'story',
    title: 'Cold Open: Keyboard Crime Scene',
    description: 'Type your apology before security changes the Wi-Fi password.',
    snippet:
`I spilled coffee on the CEO's keyboard and replied-all with a meme.
Now I am broke, caffeinated, and desperate to code.`,
    goalAccuracy: 80,
    goalWpm: 6,
    payout: 5,
    flavor: 'Start typing to relive the chaos.',
    tags: ['intro', 'narrative'],
  },
  {
    id: 'home-row-hustle',
    chapterId: 1,
    type: 'drill',
    title: 'Home Row Hustle',
    description: 'Rebuild the basics. Feel the bump on F and J. Breathe.',
    snippet: 'asdf jkl; asdf jkl; fj fj aj kl as lf jd ;l',
    goalAccuracy: 88,
    goalWpm: 14,
    payout: 15,
    flavor: 'Focus on rhythm over speed.',
    tags: ['basics', 'letters'],
  },
  {
    id: 'numbers-911',
    chapterId: 1,
    type: 'drill',
    title: 'Numbers: Emergency Fund',
    description: 'Invoices need digits. Practice the number row before rent is due.',
    snippet: '123 456 7890 404 500 200 808 650 1337',
    goalAccuracy: 85,
    goalWpm: 15,
    payout: 18,
    flavor: 'Stabilize your fingers on the home row between bursts.',
    tags: ['numbers'],
  },
  {
    id: 'symbol-sprinkle',
    chapterId: 1,
    type: 'drill',
    title: 'Symbols & Sighs',
    description: 'Semi-colons, brackets, and slashes: the seasoning of code.',
    snippet: '{} [] () <> /? ;: {} [] () <> /? ;:',
    goalAccuracy: 86,
    goalWpm: 13,
    payout: 18,
    flavor: 'Keep your wrists relaxed; symbols are reach-heavy.',
    tags: ['symbols', 'punctuation'],
  },
  {
    id: 'symbol-warmup-2',
    chapterId: 1,
    type: 'drill',
    title: 'Symbol Warm-Up 2',
    description: 'Advanced coding symbols for emails, money talk, and logical operators.',
    snippet: '@ $ % & + ++ && @@ $$ %% &&& +++',
    goalAccuracy: 85,
    goalWpm: 15,
    payout: 20,
    flavor: 'Relax shoulders; these are lateral reaches.',
    tags: ['symbols'],
  },
  {
    id: 'bracket-marathon',
    chapterId: 1,
    type: 'drill',
    title: 'Bracket Marathon',
    description: 'Chain parentheses, braces, brackets, and angle brackets without breaking form.',
    snippet: '{} () [] <> {()} [<>] {<[]>} ({}[])',
    goalAccuracy: 85,
    goalWpm: 16,
    payout: 22,
    flavor: 'Aim for even pacing; open-close rhythm matters.',
    tags: ['symbols', 'brackets'],
  },
  {
    id: 'html-skeleton',
    chapterId: 1,
    type: 'drill',
    title: 'HTML Skeleton Practice',
    description: 'Type the core HTML5 boilerplate from muscle memory.',
    snippet:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Broke Coder Typer</title>
  </head>
  <body></body>
</html>`,
    goalAccuracy: 85,
    goalWpm: 17,
    payout: 26,
    flavor: 'Keep indentation tidy; close what you open.',
    tags: ['html', 'structure'],
  },
  {
    id: 'html-headline',
    chapterId: 2,
    type: 'drill',
    title: 'HTML Headline Help',
    description: 'A client wants a dramatic headline about your firing incident.',
    snippet: '<h1>Breaking: Fired for coffee spill, now typing for rent</h1>',
    goalAccuracy: 90,
    goalWpm: 16,
    payout: 25,
    flavor: 'Keep brackets tight and close your tags.',
    tags: ['html', 'tags'],
  },
  {
    id: 'html-list',
    chapterId: 2,
    type: 'drill',
    title: 'Groceries & Gig List',
    description: 'Turn chaos into a neat list before the client panics.',
    snippet:
`<ul>
  <li>Find laptop</li>
  <li>Type quietly</li>
  <li>Invoice client</li>
</ul>`,
    goalAccuracy: 92,
    goalWpm: 17,
    payout: 30,
    flavor: 'Mind the indentation and closing tags.',
    tags: ['html', 'lists'],
  },
  {
    id: 'job-landing-blurb',
    chapterId: 2,
    type: 'job',
    title: 'Micro Job: Landing Blurb',
    description: 'Write a humble brag for a landing page hero section.',
    snippet:
`<div class="hero">
  <h2>Hire a broke coder</h2>
  <p>I build tidy HTML and only spill coffee on my own gear.</p>
</div>`,
    goalAccuracy: 93,
    goalWpm: 18,
    payout: 60,
    flavor: 'Payout available only if accuracy goal is met.',
    tags: ['job', 'html'],
  },
  {
    id: 'job-accessible-button',
    chapterId: 2,
    type: 'job',
    title: 'Micro Job: Accessible Button',
    description: 'Client wants an accessible coffee button with proper labeling.',
    snippet: '<button aria-label="order-coffee-safely">Refill Coffee</button>',
    goalAccuracy: 94,
    goalWpm: 18,
    payout: 65,
    flavor: 'Small snippet, but precision matters.',
    tags: ['job', 'accessibility'],
  },
];

export const getLessonsForChapter = (chapterId: number) =>
  lessons.filter((lesson) => lesson.chapterId === chapterId);
