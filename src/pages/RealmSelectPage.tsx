/**
 * Realm Select Page
 * Grid-based world map for selecting realms to enter
 */

import { Link, useNavigate } from 'react-router-dom';
import { useGameStore, useCombatStore } from '@/store';
import { REALMS } from '@/game/realms';

export function RealmSelectPage() {
  const navigate = useNavigate();
  const { currentCharacter } = useGameStore();
  const { initializeCombat } = useCombatStore();

  const handleSelectRealm = (realmId: string) => {
    const realm = REALMS.find((r) => r.id === realmId);
    if (!realm || !currentCharacter) return;
    
    initializeCombat(realm, currentCharacter);
    navigate('/battle');
  };

  if (!currentCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-kq-dark-400 mb-4">You need a character to explore realms</p>
          <Link
            to="/character-create"
            className="px-6 py-3 bg-kq-gold-500 text-kq-dark-900 font-display rounded-xl"
          >
            Create Character
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
            <h1 className="font-display text-3xl text-kq-gold-400 mb-1">Realm Select</h1>
            <p className="text-kq-dark-400">Choose your battlefield</p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-kq-dark-700 text-white rounded-lg hover:bg-kq-dark-600 transition-colors"
          >
            ? Back
          </Link>
        </div>

        {/* Realm Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REALMS.map((realm) => {
            const isUnlocked = currentCharacter.unlockedRealms.includes(realm.id);
            const meetsLevel = currentCharacter.level >= realm.requiredLevel;
            const canEnter = isUnlocked && meetsLevel;

            return (
              <div
                key={realm.id}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                  canEnter
                    ? 'border-kq-dark-600 hover:border-kq-gold-500 cursor-pointer'
                    : 'border-kq-dark-800 opacity-60'
                }`}
                onClick={() => canEnter && handleSelectRealm(realm.id)}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${getRealmColor(realm.theme)}40, transparent)`,
                  }}
                />
                
                <div className="relative p-6">
                  {/* Realm Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: getRealmColor(realm.theme) + '33' }}
                    >
                      {getRealmIcon(realm.theme)}
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white">{realm.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-kq-dark-400">
                          Lvl {realm.requiredLevel}+
                        </span>
                        <span className="text-kq-dark-600">•</span>
                        <span className="text-xs text-kq-dark-400">
                          Difficulty: {realm.difficulty}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-kq-dark-400 text-sm mb-4">{realm.description}</p>

                  {/* Difficulty Bar */}
                  <div className="mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < realm.difficulty
                              ? getDifficultyColor(realm.difficulty)
                              : 'bg-kq-dark-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Boss Preview */}
                  <div className="bg-kq-dark-900/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-kq-fire-400 font-semibold mb-1">Boss</p>
                    <p className="text-white text-sm">{realm.boss.name}</p>
                    <p className="text-kq-dark-500 text-xs">{realm.boss.description}</p>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center gap-4 text-xs text-kq-dark-400">
                    <span>?? {realm.rewards.goldReward} Gold</span>
                    <span>? {realm.rewards.experienceBonus} XP</span>
                  </div>

                  {/* Lock Overlay */}
                  {!canEnter && (
                    <div className="absolute inset-0 bg-kq-dark-950/80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">??</div>
                        {!isUnlocked && (
                          <p className="text-kq-dark-400 text-sm">Locked</p>
                        )}
                        {isUnlocked && !meetsLevel && (
                          <p className="text-kq-dark-400 text-sm">
                            Requires Level {realm.requiredLevel}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Helper functions for realm theming
function getRealmColor(theme: string): string {
  const colors: Record<string, string> = {
    'fire-caverns': '#ef4444',
    'frost-vale': '#3b82f6',
    'shadow-library': '#8b5cf6',
    'crystal-peaks': '#06b6d4',
    'storm-citadel': '#f59e0b',
    'ancient-ruins': '#84cc16',
    'cyber-nexus': '#ec4899',
    'void-realm': '#6366f1',
  };
  return colors[theme] || '#64748b';
}

function getRealmIcon(theme: string): string {
  const icons: Record<string, string> = {
    'fire-caverns': '??',
    'frost-vale': '??',
    'shadow-library': '??',
    'crystal-peaks': '??',
    'storm-citadel': '?',
    'ancient-ruins': '???',
    'cyber-nexus': '??',
    'void-realm': '??',
  };
  return icons[theme] || '???';
}

function getDifficultyColor(difficulty: number): string {
  if (difficulty <= 3) return 'bg-kq-nature-500';
  if (difficulty <= 6) return 'bg-kq-gold-500';
  return 'bg-kq-fire-500';
}
