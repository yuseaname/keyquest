/**
 * Inventory Page
 * Manage character items and equipment
 */

import { Link } from 'react-router-dom';
import { useGameStore } from '@/store';

export function InventoryPage() {
  const { currentCharacter } = useGameStore();

  if (!currentCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-kq-dark-400 mb-4">No character selected</p>
          <Link
            to="/"
            className="px-6 py-3 bg-kq-gold-500 text-kq-dark-900 font-display rounded-xl"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-kq-gold-400 mb-1">Inventory</h1>
            <p className="text-kq-dark-400">{currentCharacter.name}'s Equipment</p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-kq-dark-700 text-white rounded-lg hover:bg-kq-dark-600 transition-colors"
          >
            ? Back
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Equipped Items */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-lg text-white mb-4">Equipped</h2>
            <div className="space-y-4">
              {['weapon', 'armor', 'accessory', 'mount'].map((slot) => {
                const item = currentCharacter.equippedItems[slot as keyof typeof currentCharacter.equippedItems];
                return (
                  <div
                    key={slot}
                    className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-kq-dark-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-kq-dark-700 rounded-lg flex items-center justify-center">
                        {item ? (
                          <span className="text-2xl">??</span>
                        ) : (
                          <span className="text-kq-dark-500 text-2xl">+</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-kq-dark-500 uppercase">{slot}</p>
                        <p className="text-white font-medium">
                          {item ? item.name : 'Empty Slot'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inventory Grid */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-lg text-white mb-4">Items</h2>
            {currentCharacter.inventory.length > 0 ? (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {currentCharacter.inventory.map((invItem, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-kq-dark-800/50 backdrop-blur-sm rounded-lg border border-kq-dark-700 flex flex-col items-center justify-center p-2 cursor-pointer hover:border-kq-gold-500/50 transition-colors"
                  >
                    <span className="text-2xl mb-1">??</span>
                    <p className="text-xs text-kq-dark-400 text-center truncate w-full">
                      {invItem.item.name}
                    </p>
                    {invItem.quantity > 1 && (
                      <span className="absolute bottom-1 right-1 text-xs bg-kq-dark-900 px-1 rounded">
                        {invItem.quantity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-12 border border-kq-dark-700 text-center">
                <div className="text-4xl mb-4">??</div>
                <p className="text-kq-dark-400">Your inventory is empty</p>
                <p className="text-kq-dark-500 text-sm mt-2">
                  Defeat enemies to collect loot!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
