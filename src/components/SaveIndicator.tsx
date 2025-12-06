/**
 * Save Indicator Component
 * Shows cloud save status in the UI
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SaveStatus = 'saved' | 'saving' | 'error' | 'offline';

export function SaveIndicator() {
  const [status, setStatus] = useState<SaveStatus>('saved');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => {
      setStatus('saved');
      showIndicator();
    };

    const handleOffline = () => {
      setStatus('offline');
      showIndicator();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial status
    setStatus(navigator.onLine ? 'saved' : 'offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showIndicator = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  // Listen for save events (you can dispatch custom events in your save functions)
  useEffect(() => {
    const handleSaving = () => {
      setStatus('saving');
      setIsVisible(true);
    };

    const handleSaved = () => {
      setStatus('saved');
      showIndicator();
    };

    const handleSaveError = () => {
      setStatus('error');
      showIndicator();
    };

    window.addEventListener('game:saving', handleSaving);
    window.addEventListener('game:saved', handleSaved);
    window.addEventListener('game:saveerror', handleSaveError);

    return () => {
      window.removeEventListener('game:saving', handleSaving);
      window.removeEventListener('game:saved', handleSaved);
      window.removeEventListener('game:saveerror', handleSaveError);
    };
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'saved':
        return {
          icon: '??',
          text: 'Saved to cloud',
          color: 'text-kq-nature-400',
          bg: 'bg-kq-nature-500/10',
        };
      case 'saving':
        return {
          icon: '??',
          text: 'Saving...',
          color: 'text-kq-primary-400',
          bg: 'bg-kq-primary-500/10',
        };
      case 'error':
        return {
          icon: '??',
          text: 'Save failed',
          color: 'text-kq-fire-400',
          bg: 'bg-kq-fire-500/10',
        };
      case 'offline':
        return {
          icon: '??',
          text: 'Playing offline',
          color: 'text-kq-dark-400',
          bg: 'bg-kq-dark-700/50',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <AnimatePresence>
      {(isVisible || status === 'offline') && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${config.bg} border border-kq-dark-700 backdrop-blur-sm`}
          >
            <span className="text-lg">{config.icon}</span>
            <span className={`text-sm font-medium ${config.color}`}>
              {config.text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
