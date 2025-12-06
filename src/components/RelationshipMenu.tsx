import { relationships } from '../data/relationships';

interface RelationshipMenuProps {
  relationshipLevels: Record<string, { level: number; progress: number }>;
}

export function RelationshipMenu({ relationshipLevels }: RelationshipMenuProps) {
  return (
    <section className="panel relationship-panel">
      <div className="panel-header">
        <p className="eyebrow">Relationships</p>
        <h3>Partners & Milestones</h3>
      </div>
      <div className="relationship-grid">
        {relationships.map((partner) => {
          const levelInfo = relationshipLevels[partner.id] ?? { level: 0, progress: 0 };
          return (
            <div key={partner.id} className="relationship-card">
              <div className="badge badge-story">partner</div>
              <h4>{partner.name}</h4>
              <p className="muted small">{partner.occupation}</p>
              <p className="small">Level: {levelInfo.level}</p>
              <ul className="muted small">
                {partner.milestones.map((mile) => (
                  <li key={mile.level}>
                    Lv {mile.level}: {mile.label} → Lesson {mile.lessonId}
                    {mile.requirement && (
                      <span className="small"> (Req: {mile.requirement.type})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
