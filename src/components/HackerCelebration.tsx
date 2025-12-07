import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import hackerCelebrationImg from '../../media/images/Hacker.png';

// Asset: media/images/Hacker.png. Add more jokes by extending LESSON_MESSAGES or JOB_MESSAGES below.
const LESSON_MESSAGES = [
  'You just hacked the alphabet. Next up: punctuation!',
  'Look at you, typing like the main character.',
  'Your keyboard respects you now. A little.',
  'That lesson never saw you coming.',
  'Keycaps tremble when you warm up now.',
];

const JOB_MESSAGES = [
  "Client thinks you're a wizard. Don't correct them.",
  "Money acquired. You've hacked the gig economy.",
  'Somewhere, a project manager just breathed a sigh of relief.',
  "You typed things. They paid you. That's basically hacking reality.",
  'Invoices fear how fast you send them now.',
];

function getRandomHackerMessage(context: 'lesson' | 'job') {
  const pool = context === 'job' ? JOB_MESSAGES : LESSON_MESSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export interface HackerCelebrationProps {
  visible: boolean;
  onClose: () => void;
  context?: 'lesson' | 'job';
  messageOverride?: string;
}

export function HackerCelebration({ visible, onClose, context = 'lesson', messageOverride }: HackerCelebrationProps) {
  const [message, setMessage] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const latestOnClose = useRef(onClose);

  useEffect(() => {
    latestOnClose.current = onClose;
  }, [onClose]);

  const triggerClose = useCallback(() => {
    latestOnClose.current();
  }, [latestOnClose]);

  useEffect(() => {
    if (!visible) return;
    setMessage(messageOverride ?? getRandomHackerMessage(context));
  }, [visible, messageOverride, context]);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setTimeout(() => {
      triggerClose();
    }, 3600);
    return () => window.clearTimeout(timer);
  }, [visible, triggerClose]);

  useEffect(() => {
    if (!visible) return undefined;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        triggerClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, triggerClose]);

  useEffect(() => {
    if (visible) {
      closeButtonRef.current?.focus();
    }
  }, [visible]);

  if (!visible) return null;

  const subtitle = useMemo(() => {
    if (messageOverride) return messageOverride;
    return message;
  }, [messageOverride, message]);

  return (
    <div
      className="hacker-celebration-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Hacker celebration"
      onMouseDown={triggerClose}
    >
      <div className="hacker-celebration-card" onMouseDown={(event) => event.stopPropagation()}>
        <div className="hacker-image-wrapper">
          <img src={hackerCelebrationImg} alt="Cartoon hacker celebrating" />
        </div>
        <p className="eyebrow">{context === 'job' ? 'Gig cleared' : 'Lesson conquered'}</p>
        <h2>Certified Keyboard Hacker!</h2>
        <p className="celebration-message">{subtitle}</p>
        <button className="primary" ref={closeButtonRef} onClick={triggerClose}>
          Keep flexing
        </button>
      </div>
    </div>
  );
}

export default HackerCelebration;
