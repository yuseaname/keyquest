import { Chapter, Lesson, CompletedLesson } from '../types/game';

interface StoryPanelProps {
  chapter: Chapter;
  lesson: Lesson;
  progress: { completed: number; total: number };
  completedLessons: Record<string, CompletedLesson>;
}

export function StoryPanel({ chapter, lesson, progress, completedLessons }: StoryPanelProps) {
  const lessonStatus = completedLessons[lesson.id];

  return (
    <section className="panel story-panel">
      <div className="panel-header">
        <p className="eyebrow">Story / Briefing</p>
        <div className="progress-row">
          <span className="label">Chapter Progress</span>
          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${(progress.completed / Math.max(progress.total, 1)) * 100}%` }}
            />
          </div>
          <span className="small">{progress.completed}/{progress.total} core lessons</span>
        </div>
      </div>

      <div className="story-block">
        <h2>{chapter.name}</h2>
        <p className="muted">{chapter.summary}</p>
        <ul className="beats">
          {chapter.beats.map((beat, idx) => (
            <li key={beat} aria-label={`story-beat-${idx}`}>
              <span className="dot" /> {beat}
            </li>
          ))}
        </ul>
      </div>

      <div className="story-block">
        <div className="lesson-meta">
          <div>
            <p className="eyebrow">Now practicing</p>
            <h3>{lesson.title}</h3>
            <p className="muted">{lesson.description}</p>
          </div>
          <div className={`badge badge-${lesson.type}`}>{lesson.type}</div>
        </div>
        <div className="goal-row">
          <div>
            <span className="label">Goal Accuracy</span>
            <strong>{lesson.goalAccuracy}%</strong>
          </div>
          <div>
            <span className="label">Goal WPM</span>
            <strong>{lesson.goalWpm}</strong>
          </div>
          <div>
            <span className="label">Payout</span>
            <strong>${lesson.payout}</strong>
          </div>
        </div>
        <p className="muted">{lesson.flavor}</p>
        {lesson.tags && (
          <div className="tag-row">
            {lesson.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
        {lessonStatus && (
          <div className="status-line">
            <span className={`status-dot ${lessonStatus.passed ? 'status-pass' : 'status-fail'}`} />
            <span className="small">
              {lessonStatus.passed
                ? 'Completed with payout'
                : 'Completed but accuracy/wpm missed. Partial tip only.'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
