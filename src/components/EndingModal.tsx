import { Ending } from '../types/game';

interface EndingModalProps {
  ending?: Ending;
  open: boolean;
  onClose: () => void;
}

export function EndingModal({ ending, open, onClose }: EndingModalProps) {
  if (!open || !ending) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="eyebrow">Ending Reached</p>
        <h3>{ending.title}</h3>
        <p className="muted">{ending.description}</p>
        <div className="modal-actions">
          <button className="primary" onClick={onClose}>Keep Hustling</button>
        </div>
      </div>
    </div>
  );
}
