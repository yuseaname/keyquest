/**
 * Skill Tree Page
 * Character stat upgrades and ability enhancements
 */

import { Link } from 'react-router-dom';
import { useGameStore } from '@/store';

export function SkillTreePage() {
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

  const stats = [
    {
      name: 'Precision',
      value: currentCharacter.stats.precision,
      icon: '??',
      color: 'kq-primary',
      description: 'Increases accuracy bonus and reduces mistake penalties',
    },
    {
      name: 'Agility',
      value: currentCharacter.stats.agility,
      icon: '?',
      color: 'kq-gold',
      description: 'Boosts WPM multiplier for more damage',
    },
    {
      name: 'Mana',
      value: currentCharacter.stats.mana,
      icon: '??',
      color: 'kq-tech',
      description: 'Reduces ability cooldowns',
    },
    {
      name: 'Fortitude',
      value: currentCharacter.stats.fortitude,
      icon: '???',
      color: 'kq-nature',
      description: 'Provides mistake forgiveness and damage reduction',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-kq-gold-400 mb-1">Skill Tree</h1>
            <p className="text-kq-dark-400">Enhance your abilities</p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-kq-dark-700 text-white rounded-lg hover:bg-kq-dark-600 transition-colors"
          >
            ? Back
          </Link>
        </div>

        {/* Skill Points Available */}
        <div className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-4 mb-8 border border-kq-dark-700 flex items-center justify-between">
          <span className="text-kq-dark-400">Available Skill Points</span>
          <span className="text-2xl font-bold text-kq-gold-400">0</span>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg text-white">{stat.name}</h3>
                  <p className="text-kq-dark-400 text-sm">{stat.description}</p>
                </div>
              </div>
              
              {/* Stat Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-kq-dark-400">Level</span>
                  <span className="text-white">{stat.value} / 100</span>
                </div>
                <div className="h-3 bg-kq-dark-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 transition-all`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>

              {/* Upgrade Button */}
              <button
                disabled
                className="w-full py-2 bg-kq-dark-700 text-kq-dark-500 font-medium rounded-lg cursor-not-allowed"
              >
                Upgrade (+1)
              </button>
            </div>
          ))}
        </div>

        {/* Class Abilities */}
        <div className="mt-8">
          <h2 className="font-display text-lg text-white mb-4">Class Abilities</h2>
          <div className="space-y-4">
            {currentCharacter.abilities.map((ability) => (
              <div
                key={ability.id}
                className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-kq-dark-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-kq-gold-500/20 flex items-center justify-center text-xl">
                    ??
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{ability.name}</h3>
                    <p className="text-kq-dark-400 text-sm">{ability.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-kq-dark-500 text-xs">Cooldown</p>
                    <p className="text-white">{ability.cooldown}s</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
