import { endings } from '../data/endings';

interface EndingsMenuProps {
  flags: Record<string, boolean>;
}

export function EndingsMenu({ flags }: EndingsMenuProps) {
  return (
    <section className="panel endings-panel">
      <div className="panel-header">
        <p className="eyebrow">Endings</p>
        <h3>Possible Futures</h3>
      </div>
      <div className="relationship-grid">
        {endings.map((ending) => {
          const unlocked = flags[ending.id];
          return (
            <div key={ending.id} className={`relationship-card ${unlocked ? 'completed' : ''}`}>
              <div className="badge badge-drill">ending</div>
              <h4>{ending.title}</h4>
              <p className="muted small">{ending.description}</p>
              <p className="small">{unlocked ? 'Discovered' : 'Locked'}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
