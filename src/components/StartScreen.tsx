interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-hero panel">
        <p className="eyebrow">Origin Story</p>
        <h1>Broke Coder: Survival Typing RPG</h1>
        <p className="muted">
          Fired for baptizing the CEO’s keyboard. Severance: zero. Your new plan? Type, code, and joke your way out of overdraft
          fees while daydreaming about a cabin with functional Wi-Fi.
        </p>
        <ul className="start-story">
          <li><span className="dot" /> Fired in spectacular fashion, still strangely optimistic.</li>
          <li><span className="dot" /> Typing drills turn into coding gigs that barely beat ramen money.</li>
          <li><span className="dot" /> Final boss: affording a quiet cabin and retiring your landlord’s stare.</li>
        </ul>
        <button className="primary start-button" onClick={onStart}>Start the Chaos</button>
      </div>

      <div className="start-grid">
        <div className="instruction-card panel">
          <p className="eyebrow">How to Play</p>
          <h3>Type, choose, survive</h3>
          <ul>
            <li>Type plain text, HTML, CSS, and JavaScript snippets exactly as shown—spills optional.</li>
            <li>Every lesson ends with two ridiculous choices that nudge the story.</li>
            <li>Hints drop mild sarcasm while reminding you how code works.</li>
            <li>Earn just enough cash, happiness, and skill to keep the lights on.</li>
          </ul>
        </div>
        <div className="instruction-card panel">
          <p className="eyebrow">Goals</p>
          <h3>Why you’re typing</h3>
          <p className="muted">
            Build enough momentum to escape the city grind. Upgrade dusty gear, pick sketchy gigs, adopt needy pets, and claw
            your way toward a woodland hideout with reliable coffee.
          </p>
          <p className="muted">
            Your choices make lessons easier or sweatier, tweak payouts, and unlock weird endings—from neon penthouses to van
            life with fairy lights.
          </p>
        </div>
      </div>
    </div>
  );
}
