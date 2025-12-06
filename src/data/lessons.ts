import { Lesson } from '../types/game';

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

export const getLessonsForChapter = (chapterId: number) =>
  lessons.filter((lesson) => lesson.chapterId === chapterId);
