/**
 * Combat Log Component
 * Shows recent combat events
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CombatEvent {
  id: string;
  type: 'damage' | 'critical' | 'heal' | 'ability' | 'miss' | 'combo';
  message: string;
  value?: number;
  timestamp: number;
}

// Mock events for now - in real implementation, this would come from combat store
const MOCK_EVENTS: CombatEvent[] = [];

export function CombatLog() {
  const [events, setEvents] = useState<CombatEvent[]>(MOCK_EVENTS);

  // Auto-remove old events
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setEvents((prev) =>
        prev.filter((event) => now - event.timestamp < 5000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-kq-dark-800/80 backdrop-blur-sm rounded-xl p-4 border border-kq-dark-600 flex-1 overflow-hidden">
      <h4 className="font-display text-sm text-kq-dark-400 mb-3">Combat Log</h4>
      
      <div className="space-y-1 max-h-40 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`text-xs py-1 px-2 rounded ${getEventStyle(event.type)}`}
              >
                {event.message}
                {event.value !== undefined && (
                  <span className="font-bold ml-1">
                    {event.type === 'damage' || event.type === 'critical'
                      ? `-${event.value}`
                      : event.type === 'heal'
                      ? `+${event.value}`
                      : event.value}
                  </span>
                )}
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-kq-dark-500 text-xs text-center py-4"
            >
              Combat events will appear here...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getEventStyle(type: CombatEvent['type']): string {
  switch (type) {
    case 'damage':
      return 'bg-kq-fire-500/10 text-kq-fire-400';
    case 'critical':
      return 'bg-kq-gold-500/10 text-kq-gold-400';
    case 'heal':
      return 'bg-kq-nature-500/10 text-kq-nature-400';
    case 'ability':
      return 'bg-kq-tech-500/10 text-kq-tech-400';
    case 'combo':
      return 'bg-kq-shadow-500/10 text-kq-shadow-400';
    default:
      return 'bg-kq-dark-700/50 text-kq-dark-400';
  }
}
