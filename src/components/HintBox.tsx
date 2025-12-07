import { useState } from 'react';
import { Hint } from '../types/game';

interface HintBoxProps {
  hints: Hint[];
  label?: string;
}

export function HintBox({ hints, label = 'Hint' }: HintBoxProps) {
  const [open, setOpen] = useState(false);

  if (!hints || hints.length === 0) return null;

  return (
    <div className={`hint-box ${open ? 'open' : ''}`}>
      <button className="hint-toggle" type="button" onClick={() => setOpen((val) => !val)}>
        {open ? 'Hide Hints' : `Show ${label}${hints.length > 1 ? 's' : ''}`}
      </button>
      {open && (
        <ul className="hint-list">
          {hints.map((hint) => (
            <li key={hint.id}>
              <span className="dot" aria-hidden="true" /> {hint.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
