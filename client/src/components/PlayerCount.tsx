import './PlayerCount.css';

interface PlayerCountProps {
  count: number;
}

const PlayerCount: React.FC<PlayerCountProps> = ({ count }) => {
  return (
    <div className="player-count">
      <span className="player-count-icon">👥</span>
      <span className="player-count-label">Players Online:</span>
      <span className="player-count-value">{count}</span>
    </div>
  );
};

export default PlayerCount;

