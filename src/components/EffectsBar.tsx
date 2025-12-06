interface EffectsBarProps {
  accuracyBonus: number;
  wpmBonus: number;
  payoutMultiplier: number;
}

export function EffectsBar({ accuracyBonus, wpmBonus, payoutMultiplier }: EffectsBarProps) {
  return (
    <div className="effects-bar">
      <span className="chip">Acc Bonus: +{accuracyBonus}</span>
      <span className="chip">WPM Bonus: +{wpmBonus}</span>
      <span className="chip">Payout x{payoutMultiplier.toFixed(2)}</span>
    </div>
  );
}
