import { items } from '../data/items';

interface ShopPanelProps {
  money: number;
  ownedItems: string[];
  onBuy: (itemId: string) => { success: boolean; reason?: string };
}

export function ShopPanel({ money, ownedItems, onBuy }: ShopPanelProps) {
  return (
    <section className="panel shop-panel">
      <div className="panel-header">
        <p className="eyebrow">Shop</p>
        <h3>Upgrades & Coffee</h3>
        <p className="muted small">Bonuses apply to typing accuracy, WPM, or payouts.</p>
      </div>
      <div className="shop-grid">
        {items.map((item) => {
          const owned = ownedItems.includes(item.id);
          return (
            <button
              key={item.id}
              className={`shop-card ${owned ? 'owned' : ''}`}
              onClick={() => onBuy(item.id)}
              disabled={owned}
            >
              <div className="badge badge-drill">{item.type}</div>
              <h4>{item.name}</h4>
              <p className="muted">Cost: ${item.cost}</p>
              <p className="small muted">
                Bonus: {item.effects.accuracyBonus ? `+${item.effects.accuracyBonus} acc ` : ''}
                {item.effects.wpmBonus ? `+${item.effects.wpmBonus} wpm ` : ''}
                {item.effects.payoutMultiplier ? `${Math.round((item.effects.payoutMultiplier - 1) * 100)}% payout` : ''}
              </p>
              {owned && <p className="small success">Owned</p>}
              {!owned && money < item.cost && <p className="small muted">Need more cash</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
