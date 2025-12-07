/**
 * Home Page - Main dashboard for KeyQuest
 * Shows character stats, daily quests, and quick actions
 */

import { Link } from 'react-router-dom';
import { useGameStore } from '@/store';

export function HomePage() {
  const { currentCharacter, dailyQuests } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-kq-gold-400 mb-4 animate-glow">
            Broke Coder
          </h1>
          <p className="font-display text-xl md:text-2xl text-kq-dark-300 mb-8">
            Fired, broke, and typing for rent money.
          </p>
          
          {currentCharacter ? (
            <div className="space-y-6">
              {/* Character Summary Card */}
              <div className="bg-kq-dark-800/50 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-kq-dark-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-kq-primary-500 to-kq-primary-700 flex items-center justify-center">
                    <span className="text-2xl">??</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-display text-xl text-white">{currentCharacter.name}</h3>
                    <p className="text-kq-dark-400 capitalize">{currentCharacter.classType.replace('-', ' ')}</p>
                  </div>
                </div>
                
                {/* XP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-kq-dark-400">Level {currentCharacter.level}</span>
                    <span className="text-kq-gold-400">
                      {currentCharacter.experience} / {currentCharacter.experienceToNextLevel} XP
                    </span>
                  </div>
                  <div className="h-2 bg-kq-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-kq-gold-500 to-kq-gold-400 transition-all duration-300"
                      style={{
                        width: `${(currentCharacter.experience / currentCharacter.experienceToNextLevel) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-kq-dark-900/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-kq-primary-400">0</p>
                    <p className="text-xs text-kq-dark-400">Avg WPM</p>
                  </div>
                  <div className="bg-kq-dark-900/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-kq-nature-400">100%</p>
                    <p className="text-xs text-kq-dark-400">Accuracy</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/realm-select"
                  className="px-8 py-4 bg-gradient-to-r from-kq-gold-500 to-kq-gold-600 text-kq-dark-900 font-display font-bold text-lg rounded-xl hover:from-kq-gold-400 hover:to-kq-gold-500 transition-all transform hover:scale-105 shadow-lg shadow-kq-gold-500/25"
                >
                  Start Survival Shift
                </Link>
                <Link
                  to="/training"
                  className="px-8 py-4 bg-kq-dark-700 text-white font-display font-bold text-lg rounded-xl hover:bg-kq-dark-600 transition-all border border-kq-dark-600"
                >
                  Practice Pit
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-kq-dark-400 text-lg">
                Create your disaster avatar and start hustling before rent is due.
              </p>
              <Link
                to="/character-create"
                className="inline-block px-8 py-4 bg-gradient-to-r from-kq-gold-500 to-kq-gold-600 text-kq-dark-900 font-display font-bold text-lg rounded-xl hover:from-kq-gold-400 hover:to-kq-gold-500 transition-all transform hover:scale-105 shadow-lg shadow-kq-gold-500/25"
              >
                Create Your Chaos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Daily Quests Section */}
      {currentCharacter && dailyQuests.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl text-kq-gold-400 mb-6">Daily Quests</h2>
            <div className="grid gap-4">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-4 border ${
                    quest.isCompleted
                      ? 'border-kq-nature-500/50'
                      : 'border-kq-dark-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{quest.title}</h3>
                    {quest.isCompleted && (
                      <span className="text-kq-nature-400 text-sm">? Completed</span>
                    )}
                  </div>
                  <p className="text-kq-dark-400 text-sm mb-3">{quest.description}</p>
                  <div className="h-2 bg-kq-dark-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        quest.isCompleted
                          ? 'bg-kq-nature-500'
                          : 'bg-gradient-to-r from-kq-primary-500 to-kq-primary-400'
                      }`}
                      style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-kq-dark-400 mt-1">
                    {quest.progress} / {quest.target}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation Links */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/inventory"
              className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700 hover:border-kq-primary-500/50 transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">??</div>
              <p className="font-display text-white">Inventory</p>
            </Link>
            <Link
              to="/skill-tree"
              className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700 hover:border-kq-primary-500/50 transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">??</div>
              <p className="font-display text-white">Skills</p>
            </Link>
            <Link
              to="/leaderboard"
              className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700 hover:border-kq-primary-500/50 transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">??</div>
              <p className="font-display text-white">Leaderboard</p>
            </Link>
            <Link
              to="/settings"
              className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700 hover:border-kq-primary-500/50 transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">??</div>
              <p className="font-display text-white">Settings</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
