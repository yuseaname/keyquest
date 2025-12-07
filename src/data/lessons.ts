import { Hint, Lesson, LessonChoice } from '../types/game';

const baseLessons: Lesson[] = [
  {
    id: 'cold-open',
    chapterId: 0,
    type: 'story',
    title: 'Cold Open: Keyboard Crime Scene',
    description: 'Type your apology before security changes the Wi-Fi password.',
    snippet:
`I spilled coffee on the CEO's keyboard and replied-all with a meme.
Now I am broke, caffeinated, and desperate to code.`,
    goalAccuracy: 70,
    goalWpm: 5,
    payout: 5,
    flavor: 'Start typing to relive the chaos.',
    tags: ['intro', 'narrative'],
  },
  {
    id: 'home-row-hustle',
    chapterId: 1,
    type: 'drill',
    title: 'Home Row Hustle',
    description: 'Ease back in with home row loops and short words before anything fancy.',
    snippet:
`asdf jkl asdf jkl
sad lad fall all
code data lava
tag java salad`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 15,
    flavor: 'Focus on rhythm over speed.',
    tags: ['basics', 'letters', 'warmup'],
    difficulty: 'easy',
  },
  {
    id: 'numbers-911',
    chapterId: 1,
    type: 'drill',
    title: 'Numbers: Emergency Fund',
    description: 'Blend digits with short dev words so the number row feels natural.',
    snippet:
`code123 dev42 beta7
stack01 hero99 js24
save2 rent4 ship8`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 18,
    flavor: 'Stabilize your fingers on the home row between bursts.',
    tags: ['numbers', 'letters', 'mix'],
    difficulty: 'easy',
  },
  {
    id: 'symbol-sprinkle',
    chapterId: 1,
    type: 'drill',
    title: 'Symbols & Sighs',
    description: 'Start folding punctuation into tiny phrases—no more symbol spam.',
    snippet:
`code, rest, save.
debug! review? chill.
email_ready - check in.`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 18,
    flavor: 'Keep your wrists relaxed; symbols are reach-heavy.',
    tags: ['symbols', 'punctuation', 'letters'],
    difficulty: 'medium',
  },
  {
    id: 'symbol-warmup-2',
    chapterId: 1,
    type: 'drill',
    title: 'Symbol Warm-Up 2',
    description: 'Mix quotes, brackets, and math with real JS-style lines.',
    snippet:
`const score = 10;
items[0] = 'bean';
console.log("sip!");`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 20,
    flavor: 'Relax shoulders; these are lateral reaches.',
    tags: ['symbols', 'js', 'mix'],
    difficulty: 'medium',
  },
  {
    id: 'bracket-marathon',
    chapterId: 1,
    type: 'drill',
    title: 'Bracket Marathon',
    description: 'Short functions weave braces, brackets, and comparisons with clear text.',
    snippet:
`function brew() {
  const cups = [1, 2];
  if (cups[0] > 0) {
    return { ready: true };
  }
}`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 22,
    flavor: 'Aim for even pacing; open-close rhythm matters.',
    tags: ['symbols', 'brackets', 'js'],
    difficulty: 'hard',
  },
  {
    id: 'html-skeleton',
    chapterId: 1,
    type: 'drill',
    title: 'HTML Skeleton Practice',
    description: 'Lightweight HTML bones with friendly copy keep symbols mixed with words.',
    snippet:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>KeyQuest Warmup</title>
  </head>
  <body>
    <h1>Hello, KeyQuest!</h1>
    <p>Type calm, ship steady.</p>
  </body>
</html>`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 26,
    flavor: 'Keep indentation tidy; close what you open.',
    tags: ['html', 'structure', 'symbols', 'letters'],
    difficulty: 'hard',
  },
  {
    id: 'html-headline',
    chapterId: 2,
    type: 'drill',
    title: 'HTML Headline Help',
    description: 'A client wants a dramatic headline about your firing incident.',
    snippet: '<h1>Breaking: Fired for coffee spill, now typing for rent</h1>',
    goalAccuracy: 80,
    goalWpm: 12,
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
    goalAccuracy: 80,
    goalWpm: 12,
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
    payout: 55,
    flavor: 'Payout available only if accuracy goal is met.',
    tags: ['job', 'html'],
    requirements: [{ type: 'item', itemId: 'mech-keyboard' }],
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
    payout: 70,
    flavor: 'Small snippet, but precision matters.',
    tags: ['job', 'accessibility'],
    requirements: [{ type: 'vehicle', vehicleId: 'bike' }],
  },
  {
    id: 'job-on-site-fix',
    chapterId: 2,
    type: 'job',
    title: 'On-Site Fix',
    description: 'A café needs you to fix a broken list on their laptop. Travel required.',
    snippet:
`<ol>
  <li>Arrive quietly</li>
  <li>Don’t spill coffee</li>
  <li>Fix the list</li>
</ol>`,
    goalAccuracy: 93,
    goalWpm: 17,
    payout: 85,
    flavor: 'Bring your own keyboard.',
    tags: ['job', 'html'],
    requirements: [{ type: 'vehicle', vehicleId: 'bike' }],
  },
  // CSS chapter starters
  {
    id: 'css-class-card',
    chapterId: 3,
    type: 'drill',
    title: 'CSS Class Card',
    description: 'Type a tidy class-based card with styles applied inline.',
    snippet:
`<div class="card highlight">
  <h3 class="title">Freelance Flexbox</h3>
  <p class="muted">Centering is now billable.</p>
</div>`,
    goalAccuracy: 92,
    goalWpm: 18,
    payout: 35,
    tags: ['css', 'html'],
  },
  {
    id: 'css-flex-layout',
    chapterId: 3,
    type: 'drill',
    title: 'Flex Layout Snippet',
    description: 'Type a minimal flex layout with nav and hero text.',
    snippet:
`.nav { display: flex; gap: 12px; }
.hero { display: flex; align-items: center; justify-content: space-between; }
.cta { background: #f5c15c; color: #111; padding: 12px 16px; }`,
    goalAccuracy: 92,
    goalWpm: 19,
    payout: 38,
    tags: ['css'],
  },
  {
    id: 'css-job-hero-polish',
    chapterId: 3,
    type: 'job',
    title: 'CSS Job: Hero Polish',
    description: 'Polish a hero with gradients and responsive spacing for an agency client.',
    snippet:
`.hero { background: linear-gradient(135deg, #f5c15c, #f472b6); }
.hero h1 { font-size: clamp(2rem, 4vw, 3rem); margin: 0; }
.hero .cta { padding: 14px 18px; border-radius: 12px; }
@media (max-width: 640px) { .hero { padding: 32px 16px; } }`,
    goalAccuracy: 94,
    goalWpm: 20,
    payout: 120,
    tags: ['css', 'job'],
    requirements: [{ type: 'item', itemId: 'ultra-monitor' }],
  },
  {
    id: 'css-job-responsive-retainer',
    chapterId: 3,
    type: 'job',
    title: 'CSS Job: Responsive Retainer',
    description: 'Deliver three breakpoints for a client who pays on time (allegedly).',
    snippet:
`.grid { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }`,
    goalAccuracy: 95,
    goalWpm: 21,
    payout: 155,
    tags: ['css', 'job'],
    requirements: [{ type: 'vehicle', vehicleId: 'good-car' }],
  },
  // JS chapter starters
  {
    id: 'js-console-fix',
    chapterId: 4,
    type: 'drill',
    title: 'Console Debug',
    description: 'Fix a logging snippet without breaking quotes or braces.',
    snippet:
`function debugCoffee(spills) {
  console.log('Coffee spills today:', spills);
  return spills > 0 ? 'buy lid' : 'code on';
}`,
    goalAccuracy: 93,
    goalWpm: 20,
    payout: 42,
    tags: ['js'],
  },
  {
    id: 'js-dom-fix',
    chapterId: 4,
    type: 'drill',
    title: 'DOM Fix',
    description: 'Type a quick DOM query and event binding.',
    snippet:
`const btn = document.querySelector('.refill');
btn?.addEventListener('click', () => {
  alert('Coffee is life.');
});`,
    goalAccuracy: 93,
    goalWpm: 21,
    payout: 45,
    tags: ['js', 'dom'],
  },
  {
    id: 'js-job-startup-fix',
    chapterId: 4,
    type: 'job',
    title: 'JS Job: Startup Fix',
    description: 'Patch a production dashboard without breaking the investors demo.',
    snippet:
`async function loadStats() {
  const res = await fetch('/api/stats');
  if (!res.ok) throw new Error('no data');
  const data = await res.json();
  renderDashboard(data);
}`,
    goalAccuracy: 95,
    goalWpm: 22,
    payout: 165,
    tags: ['js', 'job'],
    requirements: [{ type: 'item', itemId: 'mech-keyboard' }],
  },
  {
    id: 'js-job-dashboard',
    chapterId: 4,
    type: 'job',
    title: 'JS Job: Dashboard Widget',
    description: 'Build a reusable widget with events and graceful error handling.',
    snippet:
`function createWidget(el) {
  const button = el.querySelector('.cta');
  button?.addEventListener('click', () => {
    button.textContent = 'Loading...';
    setTimeout(() => button.textContent = 'Done!', 800);
  });
}`,
    goalAccuracy: 95,
    goalWpm: 23,
    payout: 185,
    tags: ['js', 'job'],
    requirements: [{ type: 'vehicle', vehicleId: 'nomad-van' }],
  },
  // Life endgame story
  {
    id: 'life-balance-manifesto',
    chapterId: 5,
    type: 'story',
    title: 'Life Balance Manifesto',
    description: 'Reflect on whether you build products, relationships, or a farm.',
    snippet:
`Happiness = shipped features + shared meals + quiet mornings.
My dream home smells like coffee and eucalyptus.`,
    goalAccuracy: 85,
    goalWpm: 14,
    payout: 10,
    tags: ['story', 'ending'],
  },
];

const lessonExtras: Record<string, Partial<Lesson>> = {
  'cold-open': {
    narrative: 'You can either apologize quietly or turn the chaos into a calling card.',
    branchNarrative: [
      { flag: 'cold-open-risk', text: 'Owning the meme attracts risky clients who expect bravado.' },
      { flag: 'cold-open-reflect', text: 'Staying humble keeps the rumors down while you rebuild.' },
    ],
    hints: [
      { id: 'cold-open-lines', text: 'Keep both lines and punctuation exactly—line breaks count.' },
      { id: 'cold-open-apostrophe', text: 'Match every apostrophe and hyphen to avoid accuracy drops.' },
    ],
    choices: [
      {
        id: 'cold-open-risk',
        label: 'Spin the meme into a gig pitch',
        description: 'Broadcast that you fix HTML fast—coffee not included.',
        effects: { moneyChange: 5, happinessChange: 2, difficultyModifier: 1 },
        storyFlag: 'cold-open-risk',
      },
      {
        id: 'cold-open-reflect',
        label: 'Lay low and regroup',
        description: 'Apologize, breathe, and rebuild skill quietly.',
        effects: { happinessChange: 3, energyChange: 2, difficultyModifier: -1 },
        storyFlag: 'cold-open-reflect',
      },
    ] as const,
  },
  'home-row-hustle': {
    narrative: 'Muscle memory decides whether you sprint for cash or rehab in peace.',
    branchNarrative: [
      { flag: 'cold-open-risk', text: 'Clients from your meme stream expect proof you can deliver.' },
      { flag: 'cold-open-reflect', text: 'You keep a low profile, letting quiet reps rebuild trust.' },
    ],
    hints: [{ id: 'home-row-anchor', text: 'Anchor on F and J; glance down only between repetitions.' }],
    choices: [
      {
        id: 'home-row-gig',
        label: 'Stream your practice for tips',
        description: 'Prove you are back while a small audience watches.',
        effects: { moneyChange: 6, happinessChange: -1, difficultyModifier: 1 },
        storyFlag: 'home-row-gig',
      },
      {
        id: 'home-row-reset',
        label: 'Practice quietly',
        description: 'Mute notifications and focus on accuracy first.',
        effects: { happinessChange: 2, energyChange: 3, difficultyModifier: -1 },
        storyFlag: 'home-row-reset',
      },
    ] as const,
  },
  'html-headline': {
    narrative: 'First proper headline: do you sell drama or keep it honest?',
    branchNarrative: [
      { flag: 'home-row-gig', text: 'Your stream wants flair—clients expect a viral hook.' },
      { flag: 'home-row-reset', text: 'You lean into clarity and accessibility for anxious clients.' },
    ],
    hints: [{ id: 'html-headline-close', text: 'Close the <h1> tag and keep the headline text intact.' }],
    choices: [
      {
        id: 'headline-viral',
        label: 'Make it sensational',
        description: 'Lean into the scandal and promise drama.',
        effects: { moneyChange: 8, happinessChange: 1, difficultyModifier: 1 },
        storyFlag: 'headline-viral',
      },
      {
        id: 'headline-accessible',
        label: 'Keep it honest',
        description: 'Prioritize readability for nervous clients.',
        effects: { happinessChange: 3, energyChange: 1, difficultyModifier: -1 },
        storyFlag: 'headline-accessible',
      },
    ] as const,
  },
  'css-class-card': {
    narrative: 'Your CSS sets the tone for how clients see you.',
    branchNarrative: [
      { flag: 'headline-viral', text: 'Flashy headlines push you toward bold gradients and motion.' },
      { flag: 'headline-accessible', text: 'You favor breathable spacing and gentle colors.' },
    ],
    hints: [{ id: 'css-class-names', text: 'Match class names exactly; CSS is case-sensitive.' }],
    choices: [
      {
        id: 'css-flash',
        label: 'Style loud and flashy',
        description: 'Big gradients to impress the agency scout.',
        effects: { moneyChange: 10, happinessChange: -1, difficultyModifier: 1 },
        storyFlag: 'css-flash',
      },
      {
        id: 'css-grounded',
        label: 'Keep it grounded',
        description: 'Subtle styling and breathable spacing.',
        effects: { happinessChange: 2, energyChange: 2, difficultyModifier: -1 },
        storyFlag: 'css-grounded',
      },
    ] as const,
  },
  'js-console-fix': {
    narrative: 'Bug fixes either calm dashboards or spark new fires.',
    branchNarrative: [
      { flag: 'css-flash', text: 'Your reputation is fast and flashy—clients expect quick saves.' },
      { flag: 'css-grounded', text: 'Clients see you as reliable; they grant time to debug carefully.' },
    ],
    hints: [
      { id: 'js-console-quotes', text: 'Match every quote and brace; one missing character breaks the run.' },
    ],
    choices: [
      {
        id: 'js-firefight',
        label: 'Patch it live',
        description: 'Ship a hotfix in production to keep momentum.',
        effects: { moneyChange: 12, energyChange: -2, difficultyModifier: 2 },
        storyFlag: 'js-firefight',
      },
      {
        id: 'js-refactor',
        label: 'Refactor first',
        description: 'Add logs and slow down before shipping.',
        effects: { happinessChange: 2, difficultyModifier: -1, energyChange: 1 },
        storyFlag: 'js-refactor',
      },
    ] as const,
  },
  'job-landing-blurb': {
    narrative: 'A landing page client gives you one shot to impress.',
    hints: [
      { id: 'landing-indent', text: 'Preserve indentation and quotes; class names must match exactly.' },
    ],
    choices: [
      {
        id: 'landing-upsell',
        label: 'Upsell the blurb',
        description: 'Promise a retainer and extra polish.',
        effects: { moneyChange: 12, difficultyModifier: 1 },
        storyFlag: 'landing-upsell',
      },
      {
        id: 'landing-safe',
        label: 'Keep it conservative',
        description: 'Focus on accessibility and clean markup.',
        effects: { happinessChange: 2, energyChange: 1 },
        storyFlag: 'landing-safe',
      },
    ] as const,
  },
  'life-balance-manifesto': {
    narrative: 'You stand between the city hustle and the forest quiet.',
    branchNarrative: [
      { flag: 'js-firefight', text: 'Urgency has become your habit; even peace looks like a sprint.' },
      { flag: 'js-refactor', text: 'You crave slow mornings and reliable clients.' },
    ],
    hints: [{ id: 'life-lines', text: 'Keep the line breaks and punctuation; this is your manifesto.' }],
    choices: [
      {
        id: 'ending-offgrid',
        label: 'Chase the cabin',
        description: 'Double-down on the dream home in the woods.',
        effects: { happinessChange: 4, energyChange: 2 },
        storyFlag: 'ending-offgrid',
      },
      {
        id: 'ending-mentor',
        label: 'Mentor the city',
        description: 'Stay connected and teach others while saving up.',
        effects: { moneyChange: 10, difficultyModifier: 1 },
        storyFlag: 'ending-mentor',
      },
    ] as const,
  },
};

function generateDefaultChoices(lesson: Lesson): [LessonChoice, LessonChoice] {
  const bonusPay = Math.max(2, Math.round(lesson.payout * 0.05));
  return [
    {
      id: `${lesson.id}-push`,
      label: 'Push for speed',
      description: 'Chase a small bonus by moving fast on this lesson.',
      effects: { moneyChange: bonusPay, happinessChange: -1 },
      storyFlag: `${lesson.id}-push`,
    },
    {
      id: `${lesson.id}-steady`,
      label: 'Stay steady',
      description: 'Take it slow to protect energy and mood.',
      effects: { happinessChange: 2, energyChange: 3 },
      storyFlag: `${lesson.id}-steady`,
    },
  ];
}

function defaultHints(lesson: Lesson): Hint[] | undefined {
  const hints: Hint[] = [];
  if (lesson.tags?.includes('html')) {
    hints.push({ id: `${lesson.id}-hint-html`, text: 'Close your tags and respect indentation.' });
  } else if (lesson.tags?.includes('css')) {
    hints.push({ id: `${lesson.id}-hint-css`, text: 'Semicolons and braces must pair up; class names are case-sensitive.' });
  } else if (lesson.tags?.includes('js')) {
    hints.push({ id: `${lesson.id}-hint-js`, text: 'Match quotes, parentheses, and curly braces exactly.' });
  } else if (lesson.tags?.includes('symbols')) {
    hints.push({ id: `${lesson.id}-hint-symbols`, text: 'Breathe and repeat; symbols reward pacing over speed.' });
  }

  if (lesson.type === 'job') {
    hints.push({ id: `${lesson.id}-hint-job`, text: 'Payout only unlocks if you meet both accuracy and WPM goals.' });
  }

  if (lesson.type === 'story') {
    hints.push({ id: `${lesson.id}-hint-story`, text: 'Keep every character, space, and line break from the prompt.' });
  }

  return hints.length ? hints : undefined;
}

export const lessons: Lesson[] = baseLessons.map((lesson) => {
  const extras = lessonExtras[lesson.id] ?? {};
  const mergedChoices = (extras.choices as [LessonChoice, LessonChoice] | undefined) ?? generateDefaultChoices(lesson);
  const mergedHints = extras.hints ?? defaultHints(lesson);

  return {
    ...lesson,
    ...extras,
    choices: mergedChoices,
    hints: mergedHints,
  };
});

export const getLessonsForChapter = (chapterId: number) =>
  lessons.filter((lesson) => lesson.chapterId === chapterId);
