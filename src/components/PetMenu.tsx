import { pets } from '../data/pets';

interface PetMenuProps {
  ownedPets: string[];
  onAdopt: (petId: string) => { success: boolean; reason?: string };
}

export function PetMenu({ ownedPets, onAdopt }: PetMenuProps) {
  return (
    <section className="panel pet-panel">
      <div className="panel-header">
        <p className="eyebrow">Pets</p>
        <h3>Motivation buddies</h3>
      </div>
      <div className="shop-grid">
        {pets.map((pet) => {
          const owned = ownedPets.includes(pet.id);
          return (
            <button
              key={pet.id}
              className={`shop-card ${owned ? 'owned' : ''}`}
              onClick={() => onAdopt(pet.id)}
              disabled={owned}
            >
              <div className="badge badge-story">pet</div>
              <h4>{pet.name}</h4>
              <p className="muted small">Cost: ${pet.cost} | Upkeep: ${pet.upkeep}/wk</p>
              <p className="small muted">
                Bonus: {pet.effects.accuracyBonus ? `+${pet.effects.accuracyBonus} acc ` : ''}
                {pet.effects.motivationBonus ? `+${pet.effects.motivationBonus} happy ` : ''}
                {pet.effects.luckBonus ? `+${pet.effects.luckBonus} luck ` : ''}
                {pet.effects.wpmBonus ? `+${pet.effects.wpmBonus} wpm` : ''}
              </p>
              {owned && <p className="small success">Adopted</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
