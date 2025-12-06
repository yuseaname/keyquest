import { items } from '../data/items';
import { pets } from '../data/pets';
import { vehicles } from '../data/vehicles';
import { housingOptions } from '../data/housing';

interface InventoryPanelProps {
  ownedItems: string[];
  ownedPets: string[];
  ownedVehicles: string[];
  housingId: string;
}

export function InventoryPanel({ ownedItems, ownedPets, ownedVehicles, housingId }: InventoryPanelProps) {
  const housing = housingOptions.find((h) => h.id === housingId);

  return (
    <section className="panel inventory-panel">
      <div className="panel-header">
        <p className="eyebrow">Inventory</p>
        <h3>Life Gear</h3>
      </div>

      <div className="inventory-grid">
        <div className="inventory-block">
          <p className="label">Items</p>
          <ul className="muted small">
            {items.filter((i) => ownedItems.includes(i.id)).map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
            {ownedItems.length === 0 && <li>None yet</li>}
          </ul>
        </div>
        <div className="inventory-block">
          <p className="label">Pets</p>
          <ul className="muted small">
            {pets.filter((p) => ownedPets.includes(p.id)).map((pet) => (
              <li key={pet.id}>{pet.name}</li>
            ))}
            {ownedPets.length === 0 && <li>No pets yet</li>}
          </ul>
        </div>
        <div className="inventory-block">
          <p className="label">Vehicles</p>
          <ul className="muted small">
            {vehicles.filter((v) => ownedVehicles.includes(v.id)).map((vehicle) => (
              <li key={vehicle.id}>{vehicle.name}</li>
            ))}
          </ul>
        </div>
        <div className="inventory-block">
          <p className="label">Housing</p>
          <p className="muted small">{housing?.name ?? 'Unknown'}</p>
        </div>
      </div>
    </section>
  );
}
