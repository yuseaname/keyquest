import { Hint, Lesson, LessonChoice } from '../types/game';

const baseLessons: Lesson[] = [
  {
    id: 'cold-open',
    chapterId: 0,
    type: 'story',
    title: 'Cold Open: Keyboard Crime Scene',
    description: 'Type the HR apology before security changes the Wi-Fi password and steals your favorite mug.',
    snippet:
`I baptized the CEO's keyboard in cold brew.
Security escorted me out with my succulent and ramen coupons.`,
    goalAccuracy: 70,
    goalWpm: 5,
    payout: 5,
    flavor: 'Breathe through the panic typing; tears are keyboard-safe... probably.',
    tags: ['intro', 'narrative'],
  },
  {
    id: 'home-row-hustle',
    chapterId: 1,
    type: 'drill',
    title: 'Home Row Hustle',
    description: 'Finger rehab time. Teach your pinkies they still draw a paycheck.',
    snippet:
`asdf jkl asdf jkl
sad lad fall all
code data lava
tag java salad`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 15,
    flavor: 'Treat the bumps on F and J like panic buttons guiding you home.',
    tags: ['basics', 'letters', 'warmup'],
    difficulty: 'easy',
  },
  {
    id: 'numbers-911',
    chapterId: 1,
    type: 'drill',
    title: 'Numbers: Emergency Fund',
    description: 'Your emergency fund is imaginary. Practice digits until invoices stop scaring you.',
    snippet:
`code123 dev42 beta7
stack01 hero99 js24
save2 rent4 ship8`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 18,
    flavor: 'Hover over home row between bursts so your fingers don’t stage a walkout.',
    tags: ['numbers', 'letters', 'mix'],
    difficulty: 'easy',
  },
  {
    id: 'symbol-sprinkle',
    chapterId: 1,
    type: 'drill',
    title: 'Symbols & Sighs',
    description: 'Fold punctuation into tiny phrases so your emails stop looking like ransom notes.',
    snippet:
`code, rest, save.
debug! review? chill.
email_ready - check in.`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 18,
    flavor: 'Symbols are wrist yoga; breathe and reach without launching your keyboard.',
    tags: ['symbols', 'punctuation', 'letters'],
    difficulty: 'medium',
  },
  {
    id: 'symbol-warmup-2',
    chapterId: 1,
    type: 'drill',
    title: 'Symbol Warm-Up 2',
    description: 'Quotes, brackets, money talk, and logic chaos all in one anxiety smoothie.',
    snippet:
`const score = 10;
items[0] = 'bean';
console.log("sip!");`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 20,
    flavor: 'Drop your shoulders like you just paid off rent; these are lateral stretches.',
    tags: ['symbols', 'js', 'mix'],
    difficulty: 'medium',
  },
  {
    id: 'bracket-marathon',
    chapterId: 1,
    type: 'drill',
    title: 'Bracket Marathon',
    description: 'Short functions weaving braces, brackets, and comparisons without summoning bugs.',
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
    flavor: 'Open-close like you mean it; the rhythm is your coffee mug heartbeat.',
    tags: ['symbols', 'brackets', 'js'],
    difficulty: 'hard',
  },
  {
    id: 'html-skeleton',
    chapterId: 1,
    type: 'drill',
    title: 'HTML Skeleton Practice',
    description: 'Type the HTML bones from memory so clients stop emailing “where is my head tag.”',
    snippet:
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Broke Coder Warmup</title>
  </head>
  <body>
    <h1>Hello, Broke Coder!</h1>
    <p>Type calm, ship steady.</p>
  </body>
</html>`,
    goalAccuracy: 75,
    goalWpm: 10,
    payout: 26,
    flavor: 'Indent like you’re being judged on a livestream; close whatever you open.',
    tags: ['html', 'structure', 'symbols', 'letters'],
    difficulty: 'hard',
  },
  {
    id: 'html-headline',
    chapterId: 2,
    type: 'drill',
    title: 'HTML Headline Help',
    description: 'Client wants a dramatic headline about your firing saga to boost their newsletter click rate.',
    snippet: '<h1>Breaking: Fired for coffee spill, now typing for rent</h1>',
    goalAccuracy: 80,
    goalWpm: 12,
    payout: 25,
    flavor: 'Keep brackets tight; drama is fine, broken tags are not.',
    tags: ['html', 'tags'],
  },
  {
    id: 'html-list',
    chapterId: 2,
    type: 'drill',
    title: 'Groceries & Gig List',
    description: 'Turn your chaotic to-do rant into a tidy list before the client hyperventilates.',
    snippet:
`<ul>
  <li>Find laptop</li>
  <li>Type quietly</li>
  <li>Invoice client</li>
</ul>`,
    goalAccuracy: 80,
    goalWpm: 12,
    payout: 30,
    flavor: 'Indentation is therapy. Don’t ghost your closing tags.',
    tags: ['html', 'lists'],
  },
  {
    id: 'job-landing-blurb',
    chapterId: 2,
    type: 'job',
    title: 'Micro Job: Landing Blurb',
    description: 'Write a humble bragging hero blurb for a client who pays in “visibility” and $55.',
    snippet:
`<div class="hero">
  <h2>Hire a broke coder</h2>
  <p>I build tidy HTML and only spill coffee on my own gear.</p>
</div>`,
    goalAccuracy: 93,
    goalWpm: 18,
    payout: 55,
    flavor: 'You only get the payout if every humble-brag character stays intact.',
    tags: ['job', 'html'],
    requirements: [{ type: 'item', itemId: 'mech-keyboard' }],
  },
  {
    id: 'job-accessible-button',
    chapterId: 2,
    type: 'job',
    title: 'Micro Job: Accessible Button',
    description: 'Client wants an accessible coffee button so their app stops roasting screen reader users.',
    snippet: '<button aria-label="order-coffee-safely">Refill Coffee</button>',
    goalAccuracy: 94,
    goalWpm: 18,
    payout: 70,
    flavor: 'Tiny snippet, huge karma. Miss one character and the tip evaporates.',
    tags: ['job', 'accessibility'],
    requirements: [{ type: 'vehicle', vehicleId: 'bike' }],
  },
  {
    id: 'job-on-site-fix',
    chapterId: 2,
    type: 'job',
    title: 'On-Site Fix',
    description: 'Local café needs their laptop list fixed before brunch mobs riot. Travel, awkward small talk, everything.',
    snippet:
`<ol>
  <li>Arrive quietly</li>
  <li>Don’t spill coffee</li>
  <li>Fix the list</li>
</ol>`,
    goalAccuracy: 93,
    goalWpm: 17,
    payout: 85,
    flavor: 'Bring your own keyboard; theirs still smells like burnt milk.',
    tags: ['job', 'html'],
    requirements: [{ type: 'vehicle', vehicleId: 'bike' }],
  },
  // CSS chapter starters
  {
    id: 'css-class-card',
    chapterId: 3,
    type: 'drill',
    title: 'CSS Class Card',
    description: 'Build a class-based card so the agency assumes you dream in Figma.',
    snippet:
`<div class="card highlight">
  <h3 class="title">Freelance Flexbox</h3>
  <p class="muted">Centering is now billable.</p>
</div>`,
    goalAccuracy: 92,
    goalWpm: 18,
    payout: 35,
    tags: ['css', 'html'],
    flavor: 'Keep class names pristine; the client zooms in on every stray space.',
  },
  {
    id: 'css-flex-layout',
    chapterId: 3,
    type: 'drill',
    title: 'Flex Layout Snippet',
    description: 'Type a minimal flex layout with nav and hero text before the PM says “make it snappier.”',
    snippet:
`.nav { display: flex; gap: 12px; }
.hero { display: flex; align-items: center; justify-content: space-between; }
.cta { background: #f5c15c; color: #111; padding: 12px 16px; }`,
    goalAccuracy: 92,
    goalWpm: 19,
    payout: 38,
    tags: ['css'],
    flavor: 'Match braces and spacing; flexbox is petty when you rush it.',
  },
  {
    id: 'css-job-hero-polish',
    chapterId: 3,
    type: 'job',
    title: 'CSS Job: Hero Polish',
    description: 'Polish a hero with gradients and responsive spacing for an agency that pays in tense voice notes.',
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
    flavor: 'Loop through the snippet slowly; responsive bits love to hide typos.',
  },
  {
    id: 'css-job-responsive-retainer',
    chapterId: 3,
    type: 'job',
    title: 'CSS Job: Responsive Retainer',
    description: 'Deliver three breakpoints for a client who swears they pay on time (sure, Jan).',
    snippet:
`.grid { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }`,
    goalAccuracy: 95,
    goalWpm: 21,
    payout: 155,
    tags: ['css', 'job'],
    requirements: [{ type: 'vehicle', vehicleId: 'good-car' }],
    flavor: 'Three breakpoints, zero excuses. Keep @media spacing exact.',
  },
  // JS chapter starters
  {
    id: 'js-console-fix',
    chapterId: 4,
    type: 'drill',
    title: 'Console Debug',
    description: 'Stabilize a logging snippet without yeeting quotes or braces into the void.',
    snippet:
`function debugCoffee(spills) {
  console.log('Coffee spills today:', spills);
  return spills > 0 ? 'buy lid' : 'code on';
}`,
    goalAccuracy: 93,
    goalWpm: 20,
    payout: 42,
    tags: ['js'],
    flavor: 'Console logs are your therapist—keep punctuation honest.',
  },
  {
    id: 'js-dom-fix',
    chapterId: 4,
    type: 'drill',
    title: 'DOM Fix',
    description: 'Type a DOM query and event binding before the product manager taps their watch.',
    snippet:
`const btn = document.querySelector('.refill');
btn?.addEventListener('click', () => {
  alert('Coffee is life.');
});`,
    goalAccuracy: 93,
    goalWpm: 21,
    payout: 45,
    tags: ['js', 'dom'],
    flavor: 'Match optional chaining and arrow syntax; sweaty hands welcome.',
  },
  {
    id: 'js-job-startup-fix',
    chapterId: 4,
    type: 'job',
    title: 'JS Job: Startup Fix',
    description: 'Patch a production dashboard while investors breathe down a shared Zoom call.',
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
    flavor: 'Async typos cost seed funding. Keep fetch, await, and braces tight.',
  },
  {
    id: 'js-job-dashboard',
    chapterId: 4,
    type: 'job',
    title: 'JS Job: Dashboard Widget',
    description: 'Build a reusable widget with events and fake it like “graceful error handling” is easy.',
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
    flavor: 'Timeouts, events, and quotes all matter; sweat carefully.',
  },
  // Life endgame story
  {
    id: 'life-balance-manifesto',
    chapterId: 5,
    type: 'story',
    title: 'Life Balance Manifesto',
    description: 'Reflect on whether you build products, relationships, or a solar-powered farm with suspicious chickens.',
    snippet:
`Happiness = shipped fixes + shared noodles + mornings without Slack.
My dream home smells like espresso, pine, and affordable property taxes.`,
    goalAccuracy: 85,
    goalWpm: 14,
    payout: 10,
    tags: ['story', 'ending'],
    flavor: 'Slow your breathing; this is the pep talk before the final hustle.',
  },
];

const lessonExtras: Record<string, Partial<Lesson>> = {
  'cold-open': {
    narrative: 'Decide whether to spin the coffee spill into branding or vanish under a hoodie.',
    branchNarrative: [
      { flag: 'cold-open-risk', text: 'Owning the meme attracts chaotic clients who pay in rush fees and trauma.' },
      { flag: 'cold-open-reflect', text: 'Staying humble keeps rumors quiet and sleep schedules possible.' },
    ],
    hints: [
      { id: 'cold-open-lines', text: 'Keep both lines and punctuation exactly—HR already screenshot it.' },
      { id: 'cold-open-apostrophe', text: 'Every apostrophe is rent money. Don’t drop them.' },
    ],
    choices: [
      {
        id: 'cold-open-risk',
        label: 'Spin the disaster into marketing',
        description: 'Tweet the meme, call it a “brand moment,” and invite unhinged clients.',
        effects: { moneyChange: 5, happinessChange: 2, difficultyModifier: 1 },
        storyFlag: 'cold-open-risk',
      },
      {
        id: 'cold-open-reflect',
        label: 'Lay low under a hoodie',
        description: 'Apologize sincerely, hydrate, and rebuild muscle memory quietly.',
        effects: { happinessChange: 3, energyChange: 2, difficultyModifier: -1 },
        storyFlag: 'cold-open-reflect',
      },
    ] as const,
  },
  'home-row-hustle': {
    narrative: 'Muscle memory decides whether you perform for the internet or heal in silence.',
    branchNarrative: [
      { flag: 'cold-open-risk', text: 'Your meme fans watch every stream demanding speed receipts.' },
      { flag: 'cold-open-reflect', text: 'Low profile means no hecklers, just the hum of your fridge.' },
    ],
    hints: [{ id: 'home-row-anchor', text: 'Anchor on F and J like they’re past-due bills; glance down only between sighs.' }],
    choices: [
      {
        id: 'home-row-gig',
        label: 'Livestream the drills',
        description: 'Turn your rehab into tip-jar content for bored internet strangers.',
        effects: { moneyChange: 6, happinessChange: -1, difficultyModifier: 1 },
        storyFlag: 'home-row-gig',
      },
      {
        id: 'home-row-reset',
        label: 'Practice off-camera',
        description: 'Mute everything, breathe, and focus on accuracy before ego.',
        effects: { happinessChange: 2, energyChange: 3, difficultyModifier: -1 },
        storyFlag: 'home-row-reset',
      },
    ] as const,
  },
  'html-headline': {
    narrative: 'Your first paying headline decides if you lean into scandal or trustworthiness.',
    branchNarrative: [
      { flag: 'home-row-gig', text: 'Stream viewers demand fireworks; clients expect viral hooks.' },
      { flag: 'home-row-reset', text: 'Quiet practice leads to clean, accessible copy that calms clients.' },
    ],
    hints: [{ id: 'html-headline-close', text: 'Close the <h1> tag like it owes you rent; no extra spaces.' }],
    choices: [
      {
        id: 'headline-viral',
        label: 'Write the scandal bait',
        description: 'Lean into drama, promise chaos, hope the client loves it.',
        effects: { moneyChange: 8, happinessChange: 1, difficultyModifier: 1 },
        storyFlag: 'headline-viral',
      },
      {
        id: 'headline-accessible',
        label: 'Keep it accessible',
        description: 'Focus on clarity and readability for nervous clients.',
        effects: { happinessChange: 3, energyChange: 1, difficultyModifier: -1 },
        storyFlag: 'headline-accessible',
      },
    ] as const,
  },
  'css-class-card': {
    narrative: 'Your CSS vibe tells clients if you’re a chaos goblin or a calm layout whisperer.',
    branchNarrative: [
      { flag: 'headline-viral', text: 'Flashy headlines demand gradients and motion sickness.' },
      { flag: 'headline-accessible', text: 'Calm headlines pair nicely with breathable spacing and muted palettes.' },
    ],
    hints: [{ id: 'css-class-names', text: 'Class names are drama queens—match every letter exactly.' }],
    choices: [
      {
        id: 'css-flash',
        label: 'Style it like a rave',
        description: 'Big gradients, bold fonts, pray the scout calls it “fresh.”',
        effects: { moneyChange: 10, happinessChange: -1, difficultyModifier: 1 },
        storyFlag: 'css-flash',
      },
      {
        id: 'css-grounded',
        label: 'Keep it breathable',
        description: 'Subtle styling, plenty of whitespace, zero migraines.',
        effects: { happinessChange: 2, energyChange: 2, difficultyModifier: -1 },
        storyFlag: 'css-grounded',
      },
    ] as const,
  },
  'js-console-fix': {
    narrative: 'Bug fixes decide if you’re a hotfix hero or the patient debugger.',
    branchNarrative: [
      { flag: 'css-flash', text: 'Flashy reputation = clients expect heroic hotfixes at midnight.' },
      { flag: 'css-grounded', text: 'Grounded reputation buys you time to test before shipping.' },
    ],
    hints: [
      { id: 'js-console-quotes', text: 'Quotes and braces are fragile; skip one and the bug laughs.' },
    ],
    choices: [
      {
        id: 'js-firefight',
        label: 'Ship the hotfix live',
        description: 'Brace yourself and deploy straight to prod for the adrenaline.',
        effects: { moneyChange: 12, energyChange: -2, difficultyModifier: 2 },
        storyFlag: 'js-firefight',
      },
      {
        id: 'js-refactor',
        label: 'Refactor first',
        description: 'Add logs, sip water, and push only when calm.',
        effects: { happinessChange: 2, difficultyModifier: -1, energyChange: 1 },
        storyFlag: 'js-refactor',
      },
    ] as const,
  },
  'job-landing-blurb': {
    narrative: 'This landing page blurb is your audition for gigs that pay more than ramen.',
    hints: [
      { id: 'landing-indent', text: 'Indentation and quotes must match exactly or the “exposure bucks” vanish.' },
    ],
    choices: [
      {
        id: 'landing-upsell',
        label: 'Upsell the blurb',
        description: 'Promise a retainer, extra polish, maybe a muted gradient.',
        effects: { moneyChange: 12, difficultyModifier: 1 },
        storyFlag: 'landing-upsell',
      },
      {
        id: 'landing-safe',
        label: 'Keep it cozy',
        description: 'Focus on accessibility, clean markup, and calm vibes.',
        effects: { happinessChange: 2, energyChange: 1 },
        storyFlag: 'landing-safe',
      },
    ] as const,
  },
  'life-balance-manifesto': {
    narrative: 'You’re wedged between city hustle, overdue invoices, and a fantasy cabin.',
    branchNarrative: [
      { flag: 'js-firefight', text: 'Speed addiction makes even peace feel like a sprint.' },
      { flag: 'js-refactor', text: 'Slow debugging rewired you for gentler mornings.' },
    ],
    hints: [{ id: 'life-lines', text: 'Keep line breaks and punctuation; treat this like therapy journaling.' }],
    choices: [
      {
        id: 'ending-offgrid',
        label: 'Chase the cabin dream',
        description: 'Double down on the forest fantasy and solar panels.',
        effects: { happinessChange: 4, energyChange: 2 },
        storyFlag: 'ending-offgrid',
      },
      {
        id: 'ending-mentor',
        label: 'Mentor the city gremlins',
        description: 'Stay downtown, teach other broke coders, stockpile cash.',
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
      label: 'Speed-run the snippet',
      description: 'Chase a tiny bonus by typing like rent is due in five minutes.',
      effects: { moneyChange: bonusPay, happinessChange: -1 },
      storyFlag: `${lesson.id}-push`,
    },
    {
      id: `${lesson.id}-steady`,
      label: 'Keep it cozy',
      description: 'Take it slow, protect your wrists, and actually breathe.',
      effects: { happinessChange: 2, energyChange: 3 },
      storyFlag: `${lesson.id}-steady`,
    },
  ];
}

function defaultHints(lesson: Lesson): Hint[] | undefined {
  const hints: Hint[] = [];
  if (lesson.tags?.includes('html')) {
    hints.push({ id: `${lesson.id}-hint-html`, text: 'Close your tags and respect indentation; clients screenshot everything.' });
  } else if (lesson.tags?.includes('css')) {
    hints.push({ id: `${lesson.id}-hint-css`, text: 'Semicolons and braces are clingy—keep them paired and case-sensitive.' });
  } else if (lesson.tags?.includes('js')) {
    hints.push({ id: `${lesson.id}-hint-js`, text: 'Quotes, parentheses, and curly braces riot if you ditch one.' });
  } else if (lesson.tags?.includes('symbols')) {
    hints.push({ id: `${lesson.id}-hint-symbols`, text: 'Symbols reward calm breathing; flailing equals typos.' });
  }

  if (lesson.type === 'job') {
    hints.push({ id: `${lesson.id}-hint-job`, text: 'Payout unlocks only if accuracy AND WPM hit goal. No half-rent.' });
  }

  if (lesson.type === 'story') {
    hints.push({ id: `${lesson.id}-hint-story`, text: 'Keep every character, space, and line break; this is HR-approved lore.' });
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
