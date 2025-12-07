import { useEffect, useState } from 'react';
import { LessonChoice } from '../types/game';

interface LessonChoicePromptProps {
  choices: [LessonChoice, LessonChoice];
  selectedChoiceId?: string;
  onChoiceSelected: (choice: LessonChoice) => void;
  disabled?: boolean;
}

function describeEffects(choice: LessonChoice) {
  const effects = choice.effects;
  if (!effects) return null;
  const parts: string[] = [];
  if (effects.moneyChange) parts.push(`${effects.moneyChange > 0 ? '+' : ''}$${effects.moneyChange}`);
  if (effects.happinessChange) parts.push(`${effects.happinessChange > 0 ? '+' : ''}${effects.happinessChange} mood`);
  if (effects.energyChange) parts.push(`${effects.energyChange > 0 ? '+' : ''}${effects.energyChange} energy`);
  if (effects.skillChange) parts.push(`${effects.skillChange > 0 ? '+' : ''}${effects.skillChange} skill`);
  if (effects.difficultyModifier) {
    const prefix = effects.difficultyModifier > 0 ? '+' : '';
    parts.push(`${prefix}${effects.difficultyModifier} difficulty`);
  }
  return parts.length ? parts.join(' · ') : null;
}

export function LessonChoicePrompt({ choices, selectedChoiceId, onChoiceSelected, disabled }: LessonChoicePromptProps) {
  const [picked, setPicked] = useState<string | undefined>(selectedChoiceId);

  useEffect(() => {
    setPicked(selectedChoiceId);
  }, [selectedChoiceId]);

  const handleSelect = (choice: LessonChoice) => {
    if (picked || disabled) return;
    setPicked(choice.id);
    onChoiceSelected(choice);
  };

  return (
    <div className="lesson-choice-grid">
      {choices.map((choice) => {
        const effectCopy = describeEffects(choice);
        const isChosen = picked === choice.id;
        return (
          <button
            key={choice.id}
            className={`choice-card ${isChosen ? 'chosen' : ''}`}
            onClick={() => handleSelect(choice)}
            disabled={Boolean(picked) || disabled}
            type="button"
          >
            <div className="badge badge-story">path</div>
            <h4>{choice.label}</h4>
            {choice.description && <p className="muted small">{choice.description}</p>}
            {effectCopy && <p className="small">{effectCopy}</p>}
            {choice.storyFlag && <p className="small muted">Influences future story beats.</p>}
            {isChosen && <p className="small success">Locked in</p>}
          </button>
        );
      })}
    </div>
  );
}
