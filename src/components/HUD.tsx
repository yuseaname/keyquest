import { chapters } from '../data/chapters';
import { LifetimeStats } from '../types/game';

interface HUDProps {
  money: number;
  currentChapterId: number;
  lifetimeStats: LifetimeStats;
  happiness: number;
  energy: number;
  skill: number;
  housingName: string;
  vehicleName: string;
}

export function HUD({
  money,
  currentChapterId,
  lifetimeStats,
  happiness,
  energy,
  skill,
  housingName,
  vehicleName,
}: HUDProps) {
  const chapter = chapters.find((c) => c.id === currentChapterId);
  const accuracy =
    lifetimeStats.totalCharsTyped === 0
      ? 100
      : Math.round((lifetimeStats.correctChars / Math.max(lifetimeStats.totalCharsTyped, 1)) * 100);
  const avgWpm =
    lifetimeStats.totalTimeMs === 0
      ? 0
      : Math.round(
          (lifetimeStats.correctChars / 5) / Math.max(lifetimeStats.totalTimeMs / 60000, 0.01)
        );
  const level = Math.max(1, Math.floor(lifetimeStats.correctChars / 350) + 1);

  return (
    <header className="hud">
      <div>
        <p className="eyebrow">Broke Coder Typer</p>
        <h1 className="title">HTML Hustle</h1>
        <p className="subtitle">{chapter?.name ?? 'Chapter Loading...'}</p>
      </div>
      <div className="hud-stats">
        <div className="pill">
          <span className="label">Cash</span>
          <strong>${money}</strong>
        </div>
        <div className="pill">
          <span className="label">Happiness</span>
          <strong>{happiness}</strong>
        </div>
        <div className="pill">
          <span className="label">Energy</span>
          <strong>{energy}</strong>
        </div>
        <div className="pill">
          <span className="label">Level</span>
          <strong>Lv {level}</strong>
        </div>
        <div className="pill">
          <span className="label">Skill</span>
          <strong>{skill}</strong>
        </div>
        <div className="pill">
          <span className="label">Accuracy</span>
          <strong>{accuracy}%</strong>
        </div>
        <div className="pill">
          <span className="label">WPM</span>
          <strong>{avgWpm}</strong>
        </div>
        <div className="pill">
          <span className="label">Housing</span>
          <strong>{housingName}</strong>
        </div>
        <div className="pill">
          <span className="label">Vehicle</span>
          <strong>{vehicleName}</strong>
        </div>
      </div>
    </header>
  );
}
