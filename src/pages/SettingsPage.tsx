/**
 * Settings Page
 * Game configuration and user preferences
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '@/store';

export function SettingsPage() {
  const { user, logout } = useGameStore();
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(80);
  const [musicVolume, setMusicVolume] = useState(60);
  const [showWPM, setShowWPM] = useState(true);
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-kq-gold-400 mb-1">Settings</h1>
            <p className="text-kq-dark-400">Customize your experience</p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-kq-dark-700 text-white rounded-lg hover:bg-kq-dark-600 transition-colors"
          >
            ? Back
          </Link>
        </div>

        <div className="space-y-6">
          {/* Audio Settings */}
          <section className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700">
            <h2 className="font-display text-lg text-white mb-4">Audio</h2>
            
            <div className="space-y-4">
              {/* Sound Effects */}
              <div className="flex items-center justify-between">
                <span className="text-kq-dark-300">Sound Effects</span>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    soundEnabled ? 'bg-kq-gold-500' : 'bg-kq-dark-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Sound Volume */}
              {soundEnabled && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-kq-dark-400">Sound Volume</span>
                    <span className="text-white">{soundVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(Number(e.target.value))}
                    className="w-full h-2 bg-kq-dark-700 rounded-lg appearance-none cursor-pointer accent-kq-gold-500"
                  />
                </div>
              )}

              {/* Music */}
              <div className="flex items-center justify-between">
                <span className="text-kq-dark-300">Music</span>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    musicEnabled ? 'bg-kq-gold-500' : 'bg-kq-dark-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      musicEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Music Volume */}
              {musicEnabled && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-kq-dark-400">Music Volume</span>
                    <span className="text-white">{musicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                    className="w-full h-2 bg-kq-dark-700 rounded-lg appearance-none cursor-pointer accent-kq-gold-500"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Display Settings */}
          <section className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700">
            <h2 className="font-display text-lg text-white mb-4">Display</h2>
            
            <div className="space-y-4">
              {/* Show WPM */}
              <div className="flex items-center justify-between">
                <span className="text-kq-dark-300">Show WPM During Battle</span>
                <button
                  onClick={() => setShowWPM(!showWPM)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showWPM ? 'bg-kq-gold-500' : 'bg-kq-dark-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showWPM ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Show Accuracy */}
              <div className="flex items-center justify-between">
                <span className="text-kq-dark-300">Show Accuracy During Battle</span>
                <button
                  onClick={() => setShowAccuracy(!showAccuracy)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showAccuracy ? 'bg-kq-gold-500' : 'bg-kq-dark-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showAccuracy ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div>
                <span className="text-kq-dark-300 block mb-2">Typing Font Size</span>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors capitalize ${
                        fontSize === size
                          ? 'bg-kq-gold-500 text-kq-dark-900'
                          : 'bg-kq-dark-700 text-white hover:bg-kq-dark-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700">
            <h2 className="font-display text-lg text-white mb-4">Account</h2>
            
            <div className="space-y-4">
              {user ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-kq-dark-300">Username</span>
                    <span className="text-white">{user.username}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-kq-dark-300">Email</span>
                    <span className="text-white">{user.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-2 bg-kq-fire-500/20 text-kq-fire-400 rounded-lg hover:bg-kq-fire-500/30 transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-kq-dark-400 mb-4">Playing as Guest</p>
                  <button className="px-6 py-2 bg-kq-gold-500 text-kq-dark-900 font-medium rounded-lg">
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* About */}
          <section className="bg-kq-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-kq-dark-700">
            <h2 className="font-display text-lg text-white mb-4">About</h2>
            <div className="text-kq-dark-400 text-sm space-y-2">
              <p>KeyQuest: Chronicles of the Typing Realms</p>
              <p>Version 1.0.0</p>
              <p>© 2024 KeyQuest Team</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
