/**
 * Leaderboard Page
 * Global and seasonal rankings with multiple categories
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLeaderboard, getPlayerRank } from '@/services/database';
import { getCurrentUserId } from '@/services/firebase';
import type { LeaderboardCategory, LeaderboardEntry } from '@/types/collectibles';
import { useCollectiblesStore } from '@/store';

const LEADERBOARD_CATEGORIES: { id: LeaderboardCategory; label: string; icon: string }[] = [
  { id: 'wpm', label: 'Highest WPM', icon: '?' },
  { id: 'accuracy', label: 'Best Accuracy', icon: '??' },
  { id: 'combo', label: 'Longest Combo', icon: '??' },
  { id: 'xp', label: 'Most XP', icon: '?' },
  { id: 'boss-clears', label: 'Boss Victories', icon: '??' },
  { id: 'speed-run', label: 'Speed Runs', icon: '??' },
];

export function LeaderboardPage() {
  const [category, setCategory] = useState<LeaderboardCategory>('wpm');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const { cacheLeaderboard } = useCollectiblesStore();

  useEffect(() => {
    loadLeaderboard();
  }, [category]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(category, 100);
      setEntries(data);
      cacheLeaderboard(category, data);

      // Get player's rank
      const uid = getCurrentUserId();
      if (uid) {
        const rank = await getPlayerRank(uid, category);
        setPlayerRank(rank);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-kq-dark-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '??';
    if (rank === 2) return '??';
    if (rank === 3) return '??';
    return rank;
  };

  const formatValue = (value: number) => {
    if (category === 'accuracy') return `${value.toFixed(1)}%`;
    if (category === 'speed-run') return `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`;
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-kq-dark-400 hover:text-kq-gold-400 transition-colors mb-8"
        >
          <span className="text-2xl">?</span>
          <span>Back</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-5xl text-kq-gold-400 mb-2">Leaderboards</h1>
          <p className="text-kq-dark-400">
            Compete with typists around the world
          </p>
        </div>

        {/* Category Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {LEADERBOARD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`p-4 rounded-xl font-display text-left transition-all ${
                category === cat.id
                  ? 'bg-kq-gold-500 text-kq-dark-900 transform scale-105'
                  : 'bg-kq-dark-800 text-kq-dark-400 hover:text-kq-gold-400 hover:bg-kq-dark-750'
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-sm">{cat.label}</div>
            </button>
          ))}
        </div>

        {/* Player's Rank Card */}
        {playerRank > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-kq-primary-500/20 to-kq-gold-500/20 border border-kq-gold-500/50 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-kq-dark-400 text-sm mb-1">Your Rank</div>
                <div className="font-display text-2xl text-kq-gold-400">
                  #{playerRank}
                </div>
              </div>
              <div className="text-4xl">{getRankIcon(playerRank)}</div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-kq-dark-900/50 border border-kq-dark-700 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-kq-dark-700 font-display text-kq-gold-400 text-sm">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3">Class</div>
            <div className="col-span-3 text-right">Score</div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-kq-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-kq-dark-400">Loading leaderboard...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && entries.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">??</div>
              <p className="text-kq-dark-400 mb-2">No entries yet</p>
              <p className="text-kq-dark-500 text-sm">Be the first to set a record!</p>
            </div>
          )}

          {/* Leaderboard Entries */}
          {!loading && entries.length > 0 && (
            <div className="divide-y divide-kq-dark-800">
              {entries.map((entry, index) => {
                const uid = getCurrentUserId();
                const isCurrentPlayer = entry.uid === uid;
                
                return (
                  <motion.div
                    key={entry.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`grid grid-cols-12 gap-4 p-4 transition-colors ${
                      isCurrentPlayer
                        ? 'bg-kq-primary-500/10 border-l-4 border-kq-primary-500'
                        : 'hover:bg-kq-dark-800/30'
                    }`}
                  >
                    {/* Rank */}
                    <div className={`col-span-1 font-display text-xl ${getRankColor(entry.rank)}`}>
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Player Info */}
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        {entry.avatarUrl && (
                          <img
                            src={entry.avatarUrl}
                            alt={entry.username}
                            className="w-10 h-10 rounded-lg border-2 border-kq-dark-700"
                          />
                        )}
                        <div>
                          <div className="text-white font-medium">
                            {entry.username}
                            {isCurrentPlayer && (
                              <span className="ml-2 text-xs px-2 py-1 bg-kq-primary-500 text-white rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          {entry.title && (
                            <div className="text-xs text-kq-gold-400">{entry.title}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Class */}
                    <div className="col-span-3 text-kq-dark-400 flex items-center">
                      {entry.classType}
                    </div>

                    {/* Score */}
                    <div className="col-span-3 text-white font-display text-xl text-right">
                      {formatValue(entry.value)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-kq-dark-500 text-sm">
          <p>Leaderboards update in real-time</p>
          <p className="mt-1">Season resets on the 1st of each month</p>
        </div>
      </div>
    </div>
  );
}
