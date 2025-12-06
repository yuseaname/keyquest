import { vehicles } from '../data/vehicles';

interface TransportationMenuProps {
  ownedVehicles: string[];
  onBuy: (vehicleId: string) => { success: boolean; reason?: string };
}

export function TransportationMenu({ ownedVehicles, onBuy }: TransportationMenuProps) {
  return (
    <section className="panel transport-panel">
      <div className="panel-header">
        <p className="eyebrow">Transportation</p>
        <h3>Get to gigs</h3>
      </div>
      <div className="shop-grid">
        {vehicles.map((vehicle) => {
          const owned = ownedVehicles.includes(vehicle.id);
          return (
            <button
              key={vehicle.id}
              className={`shop-card ${owned ? 'owned' : ''}`}
              onClick={() => onBuy(vehicle.id)}
              disabled={owned}
            >
              <div className="badge badge-job">tier {vehicle.tier}</div>
              <h4>{vehicle.name}</h4>
              <p className="muted small">Cost: ${vehicle.cost} | Upkeep: ${vehicle.upkeep}/wk</p>
              {vehicle.effects?.jobTags && (
                <p className="small muted">Enables: {vehicle.effects.jobTags.join(', ')}</p>
              )}
              {owned && <p className="small success">Owned</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
