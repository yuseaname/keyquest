import { Lesson, TypingResult } from '../types/game';

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  result: TypingResult | null;
  passed: boolean;
  earned: number;
  unlockedChapter?: number;
}

export function ResultModal({
  open,
  onClose,
  lesson,
  result,
  passed,
  earned,
  unlockedChapter,
}: ResultModalProps) {
  if (!open || !lesson || !result) return null;

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
            <p className="small muted">Goal {lesson.goalAccuracy}%</p>
          </div>
          <div>
            <span className="label">WPM</span>
            <strong>{result.wpm}</strong>
            <p className="small muted">Goal {lesson.goalWpm}</p>
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

        <div className="modal-actions">
          <button className="primary" onClick={onClose}>Continue</button>
        </div>
      </div>
    </div>
  );
}
