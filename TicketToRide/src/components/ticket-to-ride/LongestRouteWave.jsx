import PlayerLabel from './PlayerLabel';
import { LONGEST_ROUTE_BONUS } from '../../ticket-to-ride/scoring';

function LongestRouteWave({ players, longestRouteWinnerId, setLongestRouteWinnerId }) {
  return (
    <div className="longest-route-wave">
      <p className="wave-instruction">
        The player with the longest continuous route scores an extra {LONGEST_ROUTE_BONUS} points.
        Only one player can claim this bonus.
      </p>
      <div className="longest-route-options" role="radiogroup" aria-label="Longest route winner">
        {players.map(p => {
          const selected = longestRouteWinnerId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`longest-route-option${selected ? ' selected' : ''}`}
              onClick={() => setLongestRouteWinnerId(p.id)}
            >
              <PlayerLabel player={p} />
              <span className="longest-route-bonus">+{LONGEST_ROUTE_BONUS}</span>
            </button>
          );
        })}
        <button
          type="button"
          role="radio"
          aria-checked={longestRouteWinnerId === null}
          className={`longest-route-option no-one${longestRouteWinnerId === null ? ' selected' : ''}`}
          onClick={() => setLongestRouteWinnerId(null)}
        >
          No one
        </button>
      </div>
    </div>
  );
}

export default LongestRouteWave;
