import { useEffect, useMemo, useRef, useState } from 'react';
import { Hint, Lesson, TypingResult } from '../types/game';
import { HintBox } from './HintBox';

interface TypingPanelProps {
  lesson: Lesson;
  onComplete: (result: TypingResult) => void;
  onReset?: () => void;
  goalAccuracy?: number;
  goalWpm?: number;
  hints?: Hint[];
}

export function TypingPanel({ lesson, onComplete, onReset, goalAccuracy, goalWpm, hints }: TypingPanelProps) {
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const targetAccuracy = goalAccuracy ?? lesson.goalAccuracy;
  const targetWpm = goalWpm ?? lesson.goalWpm;
  const hasHints = Boolean(hints && hints.length > 0);

  const stats = useMemo(() => {
    const correct = typed.split('').reduce((acc, char, idx) => {
      return acc + (char === lesson.snippet[idx] ? 1 : 0);
    }, 0);
    const errors = Math.max(typed.length - correct, 0);
    const accuracy = typed.length === 0 ? 100 : Math.round((correct / Math.max(typed.length, 1)) * 100);
    const elapsedMs = startedAt ? Date.now() - startedAt : 0;
    const minutes = Math.max(elapsedMs / 60000, 0.01);
    const wpm = Math.max(0, Math.round((correct / 5) / minutes));

    const result: TypingResult = {
      accuracy,
      wpm,
      errors,
      timeMs: elapsedMs,
      completed: finished,
      correct,
      total: typed.length,
    };

    return result;
  }, [typed, lesson.snippet, startedAt, finished]);

  useEffect(() => {
    setTyped('');
    setFinished(false);
    setStartedAt(null);
    textareaRef.current?.focus();
  }, [lesson.id]);

  const handleChange = (value: string) => {
    if (!startedAt && value.length > 0) {
      setStartedAt(Date.now());
    }
    const clipped = value.slice(0, lesson.snippet.length);
    setTyped(clipped);

    if (clipped.length === lesson.snippet.length && !finished) {
      const correct = clipped.split('').reduce((acc, char, idx) => acc + (char === lesson.snippet[idx] ? 1 : 0), 0);
      const errors = Math.max(clipped.length - correct, 0);
      const elapsedMs = startedAt ? Date.now() - startedAt : 0;
      setFinished(true);
      onComplete({
        accuracy: clipped.length === 0 ? 0 : Math.round((correct / clipped.length) * 100),
        wpm:
          elapsedMs === 0
            ? 0
            : Math.max(0, Math.round((correct / 5) / Math.max(elapsedMs / 60000, 0.01))),
        errors,
        timeMs: elapsedMs,
        completed: true,
        correct,
        total: clipped.length,
      });
    }
  };

  const reset = () => {
    setTyped('');
    setFinished(false);
    setStartedAt(null);
    textareaRef.current?.focus();
    onReset?.();
  };

  const renderTarget = () => {
    return lesson.snippet.split('').map((char, idx) => {
      const typedChar = typed[idx];
      let className = 'pending';
      if (typedChar !== undefined) {
        className = typedChar === char ? 'correct' : 'wrong';
      }
      return (
        <span key={idx} className={`glyph ${className}`}>
          {char === '\n' ? '↵' : char === ' ' ? '·' : char}
        </span>
      );
    });
  };

  const progress = Math.min(1, typed.length / Math.max(lesson.snippet.length, 1));

  return (
    <section className="panel typing-panel">
      <div className="panel-header">
        <p className="eyebrow">Typing Arena</p>
        <div className="goal-chips">
          <span className="chip">Target {targetAccuracy}% acc</span>
          <span className="chip">{targetWpm} wpm</span>
          <span className="chip">Earn ${lesson.payout}</span>
        </div>
      </div>

      {hasHints && <HintBox hints={hints!} />}

      <div className="code-preview" aria-live="polite">
        {renderTarget()}
      </div>

      <textarea
        ref={textareaRef}
        className="type-input"
        placeholder="Type the snippet above, exactly. Hit enter for new lines."
        value={typed}
        onChange={(e) => handleChange(e.target.value)}
        spellCheck={false}
        aria-label="typing input"
      />

      <div className="progress-row">
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="small">{Math.round(progress * 100)}% complete</span>
        <button className="link-btn" onClick={reset}>Retry</button>
      </div>

      <div className="stat-grid">
        <div>
          <span className="label">Live Accuracy</span>
          <strong>{stats.accuracy}%</strong>
        </div>
        <div>
          <span className="label">Live WPM</span>
          <strong>{stats.wpm}</strong>
        </div>
        <div>
          <span className="label">Errors</span>
          <strong>{stats.errors}</strong>
        </div>
        <div>
          <span className="label">Time</span>
          <strong>{(stats.timeMs / 1000).toFixed(1)}s</strong>
        </div>
      </div>
    </section>
  );
}
