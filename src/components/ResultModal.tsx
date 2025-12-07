import { Lesson, LessonChoice, TypingResult } from '../types/game';
import { LessonChoicePrompt } from './LessonChoicePrompt';

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  result: TypingResult | null;
  passed: boolean;
  earned: number;
  unlockedChapter?: number;
  choices?: [LessonChoice, LessonChoice];
  onChoiceSelected?: (choiceId: string) => void;
  selectedChoiceId?: string;
  requireChoice?: boolean;
  goalAccuracy?: number;
  goalWpm?: number;
}

export function ResultModal({
  open,
  onClose,
  lesson,
  result,
  passed,
  earned,
  unlockedChapter,
  choices,
  onChoiceSelected,
  selectedChoiceId,
  requireChoice,
  goalAccuracy,
  goalWpm,
}: ResultModalProps) {
  if (!open || !lesson || !result) return null;

  const targetGoalAccuracy = goalAccuracy ?? lesson.goalAccuracy;
  const targetGoalWpm = goalWpm ?? lesson.goalWpm;
  const mustChooseBeforeContinue = Boolean(requireChoice && passed && choices && !selectedChoiceId);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="eyebrow">Session Complete</p>
        <h3>{lesson.title}</h3>
        <p className="muted">{passed ? 'Client approved your work.' : 'You submitted, but the client sighed loudly.'}</p>

        <div className="stat-grid">
          <div>
            <span className="label">Accuracy</span>
            <strong>{result.accuracy}%</strong>
            <p className="small muted">Goal {targetGoalAccuracy}%</p>
          </div>
          <div>
            <span className="label">WPM</span>
            <strong>{result.wpm}</strong>
            <p className="small muted">Goal {targetGoalWpm}</p>
          </div>
          <div>
            <span className="label">Errors</span>
            <strong>{result.errors}</strong>
            <p className="small muted">Lower is better</p>
          </div>
          <div>
            <span className="label">Time</span>
            <strong>{(result.timeMs / 1000).toFixed(1)}s</strong>
            <p className="small muted">Keep it calm</p>
          </div>
        </div>

        <div className="payout">
          <span className="label">Payout</span>
          <strong>${earned}</strong>
          {!passed && <p className="small muted">Partial tip for effort. Hit the goals for full cash.</p>}
        </div>

        {unlockedChapter !== undefined && (
          <div className="unlock-callout">
            <span className="badge badge-drill">unlocked</span>
            <p>New chapter unlocked: {unlockedChapter}</p>
          </div>
        )}

        {choices && passed && (
          <div className="result-choice">
            <div className="panel-header" style={{ padding: 0, marginBottom: 8 }}>
              <p className="eyebrow">Story Choice</p>
              <p className="muted small">Pick one path before continuing.</p>
            </div>
            <LessonChoicePrompt
              choices={choices}
              selectedChoiceId={selectedChoiceId}
              onChoiceSelected={(choice) => onChoiceSelected?.(choice.id)}
            />
          </div>
        )}

        <div className="modal-actions">
          <button className="primary" onClick={onClose} disabled={mustChooseBeforeContinue}>Continue</button>
        </div>
        {mustChooseBeforeContinue && <p className="small muted">Make a story choice to move forward.</p>}
      </div>
    </div>
  );
}
