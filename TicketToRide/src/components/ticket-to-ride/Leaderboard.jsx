import PlayerLabel from './PlayerLabel';
import { totalForPlayer } from '../../ticket-to-ride/scoring';

function Leaderboard({ players, scores, longestRouteWinnerId, onReset }) {
  const ranked = players
    .map(p => ({ player: p, breakdown: totalForPlayer(scores[p.id], longestRouteWinnerId, p.id) }))
    .sort((a, b) => b.breakdown.total - a.breakdown.total);

  return (
    <div className="leaderboard">
      <header className="leaderboard-header">
        <h2>Final Scores</h2>
        <button type="button" className="secondary-button" onClick={onReset}>
          Start Over
        </button>
      </header>

      <ol className="leaderboard-list">
        {ranked.map(({ player, breakdown }, index) => {
          const isWinner = index === 0 && breakdown.total > 0;
          return (
            <li key={player.id} className={`leaderboard-row${isWinner ? ' winner' : ''}`}>
              <span className="leaderboard-rank">{index + 1}</span>
              <div className="leaderboard-main">
                <PlayerLabel player={player} size="lg" />
                <ul className="score-breakdown">
                  <li><span>Routes</span><strong>{breakdown.routes}</strong></li>
                  <li><span>Stations</span><strong>{breakdown.stations}</strong></li>
                  <li><span>Mountains</span><strong>{breakdown.mountains}</strong></li>
                  <li><span>Completed</span><strong>{breakdown.completedTickets}</strong></li>
                  <li><span>Failed</span><strong className="negative">{breakdown.failedTickets}</strong></li>
                  <li><span>Longest</span><strong>{breakdown.longestRoute}</strong></li>
                </ul>
              </div>
              <div className="leaderboard-total">
                <span className="total-label">Total</span>
                <span className="total-value">{breakdown.total}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Leaderboard;
