interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-hero panel">
        <p className="eyebrow">Prologue</p>
        <h1>KeyQuest RPG: Lost in the Woods Digital</h1>
        <p className="muted">
          You just got fired for a coffee-soaked keyboard. Bank account: fumes. You discover that typing and coding gigs can keep
          the lights on while you chase a quieter life tucked away in the forest.
        </p>
        <ul className="start-story">
          <li><span className="dot" /> Fired and broke, but stubborn.</li>
          <li><span className="dot" /> Typing lessons pay the bills and unlock code quests.</li>
          <li><span className="dot" /> Dream: earn enough to buy a cabin far from city noise.</li>
        </ul>
        <button className="primary start-button" onClick={onStart}>Start Game</button>
      </div>

      <div className="start-grid">
        <div className="instruction-card panel">
          <p className="eyebrow">How to Play</p>
          <h3>Type, choose, survive</h3>
          <ul>
            <li>Type snippets of plain text, HTML, CSS, and JavaScript exactly as shown.</li>
            <li>Each lesson ends with a two-option story choice that branches your path.</li>
            <li>Hints are available in lessons if you get stuck or need a reminder.</li>
            <li>Earn cash, mood, and skill to unlock new chapters, gigs, and endings.</li>
          </ul>
        </div>
        <div className="instruction-card panel">
          <p className="eyebrow">Goals</p>
          <h3>Why you’re typing</h3>
          <p className="muted">
            Build enough momentum to escape the city grind. Upgrade your gear, pick gigs, adopt pets, and plot a path toward a
            woodland home where deadlines feel like distant thunder.
          </p>
          <p className="muted">
            Your choices can make lessons tougher or lighter, bring fast cash or steady calm, and unlock different endings.
          </p>
        </div>
      </div>
    </div>
  );
}
