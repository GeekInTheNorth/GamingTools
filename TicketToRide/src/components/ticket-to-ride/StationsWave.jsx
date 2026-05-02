import PlayerLabel from './PlayerLabel';
import { MAX_STATIONS, STATION_POINTS, scoreStations } from '../../ticket-to-ride/scoring';

function StationsWave({ players, scores, updatePlayerScore }) {
  function setStations(playerId, value) {
    const clamped = Math.min(MAX_STATIONS, Math.max(0, value));
    updatePlayerScore(playerId, 'stations', clamped);
  }

  return (
    <div className="simple-wave">
      <p className="wave-instruction">
        Each unused station scores {STATION_POINTS} points. Players have a maximum of {MAX_STATIONS} stations.
      </p>
      <div className="stepper-rows">
        {players.map(p => {
          const unused = scores[p.id].stations;
          return (
            <div key={p.id} className="stepper-row">
              <div className="stepper-row-player">
                <PlayerLabel player={p} />
              </div>
              <div className="stepper-controls" role="group" aria-label={`${p.name} unused stations`}>
                {Array.from({ length: MAX_STATIONS + 1 }).map((_, n) => (
                  <button
                    key={n}
                    type="button"
                    className={`stepper-button${unused === n ? ' selected' : ''}`}
                    onClick={() => setStations(p.id, n)}
                    aria-pressed={unused === n}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="stepper-subtotal">
                × {STATION_POINTS} = <strong>{scoreStations(unused)}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StationsWave;
