import { housingOptions } from '../data/housing';

interface HousingMenuProps {
  currentHousingId: string;
  onChange: (housingId: string) => { success: boolean; reason?: string };
}

export function HousingMenu({ currentHousingId, onChange }: HousingMenuProps) {
  return (
    <section className="panel housing-panel">
      <div className="panel-header">
        <p className="eyebrow">Housing</p>
        <h3>Where you code</h3>
      </div>
      <div className="shop-grid">
        {housingOptions.map((home) => {
          const active = currentHousingId === home.id;
          return (
            <button
              key={home.id}
              className={`shop-card ${active ? 'owned' : ''}`}
              onClick={() => onChange(home.id)}
              disabled={active}
            >
              <div className="badge badge-drill">tier {home.tier}</div>
              <h4>{home.name}</h4>
              <p className="muted small">Cost: ${home.cost} | Upkeep: ${home.upkeep}/wk</p>
              <p className="small muted">
                +{home.effects.happinessBonus} happiness · +{home.effects.energyRegen} energy regen
              </p>
              {home.endingFlag && <p className="small">Ending hook</p>}
              {active && <p className="small success">Current home</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
