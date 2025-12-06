import { Lesson, CompletedLesson, Requirement } from '../types/game';
import { vehicles } from '../data/vehicles';
import { items } from '../data/items';

interface JobBoardProps {
  jobs: Lesson[];
  unlockedChapters: number[];
  completedLessons: Record<string, CompletedLesson>;
  canSatisfy: (reqs?: Requirement[]) => boolean;
  onSelect: (lessonId: string) => void;
}

function requirementLabel(requirement: Requirement) {
  switch (requirement.type) {
    case 'vehicle': {
      const vehicle = vehicles.find((v) => v.id === requirement.vehicleId);
      return vehicle ? `Requires: ${vehicle.name}` : 'Vehicle required';
    }
    case 'item': {
      const item = items.find((i) => i.id === requirement.itemId);
      return item ? `Requires: ${item.name}` : 'Item required';
    }
    default:
      return 'Requirements apply';
  }
}

export function JobBoard({ jobs, unlockedChapters, completedLessons, canSatisfy, onSelect }: JobBoardProps) {
  return (
    <section className="panel job-board">
      <div className="panel-header">
        <p className="eyebrow">Job Board</p>
        <h3>Gigs & Contracts</h3>
        <p className="muted small">Late-game CSS/JS contracts appear as you unlock chapters.</p>
      </div>
      <div className="job-grid">
        {jobs.map((job) => {
          const locked = !unlockedChapters.includes(job.chapterId);
          const reqLocked = !locked && !canSatisfy(job.requirements);
          const status = completedLessons[job.id];
          return (
            <button
              key={job.id}
              className={`job-card ${locked || reqLocked ? 'locked' : ''} ${status?.passed ? 'completed' : ''}`}
              onClick={() => !locked && !reqLocked && onSelect(job.id)}
              disabled={locked || reqLocked}
            >
              <div className="job-header">
                <div className="badge badge-job">job</div>
                <span className="payout">+${job.payout}</span>
              </div>
              <h4>{job.title}</h4>
              <p className="muted">{job.description}</p>
              <div className="job-meta">
                <span>{job.goalAccuracy}% acc</span>
                <span>{job.goalWpm} wpm</span>
              </div>
              {locked && <p className="small muted">Unlock Chapter {job.chapterId} to attempt.</p>}
              {reqLocked && (
                <p className="small muted">
                  {job.requirements?.map(requirementLabel).join(', ')}
                </p>
              )}
              {status && (
                <p className="small success">
                  {status.passed ? 'Completed, paid in full.' : 'Partial tip received.'}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
