import { ChoiceNode } from '../types/game';

interface ChoicePanelProps {
  node?: ChoiceNode;
  onChoose: (optionId: string) => void;
  canSatisfy: (reqs?: ChoiceNode['options'][number]['requirements']) => boolean;
}

export function ChoicePanel({ node, onChoose, canSatisfy }: ChoicePanelProps) {
  if (!node) {
    return (
      <section className="panel choice-panel">
        <p className="eyebrow">Choices</p>
        <p className="muted small">No decisions right now. Enjoy the quiet before another landlord text.</p>
      </section>
    );
  }

  return (
    <section className="panel choice-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Choice</p>
          <h3>{node.title}</h3>
          <p className="muted">{node.narrative}</p>
        </div>
      </div>
      <div className="choice-options">
        {node.options.map((option) => {
          const met = canSatisfy(option.requirements);
          return (
            <button
              key={option.id}
              className={`choice-card ${met ? '' : 'locked'}`}
              onClick={() => met && onChoose(option.id)}
              disabled={!met}
            >
              <div className="badge badge-story">plot twist</div>
              <h4>{option.label}</h4>
              <p className="muted">{option.outcomeText}</p>
              {!met && <p className="small muted">Requirements not met</p>}
              {option.triggersLessonId && <p className="small">Leads to lesson: {option.triggersLessonId}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
