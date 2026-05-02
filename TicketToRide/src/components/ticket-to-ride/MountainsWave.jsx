import PlayerLabel from './PlayerLabel';
import { MOUNTAIN_POINTS, scoreMountains } from '../../ticket-to-ride/scoring';

function MountainsWave({ players, scores, updatePlayerScore }) {
  function handleChange(playerId, raw) {
    const value = Math.max(0, parseInt(raw, 10) || 0);
    updatePlayerScore(playerId, 'mountains', value);
  }

  return (
    <div className="simple-wave">
      <p className="wave-instruction">
        Each train lost servicing a mountain scores {MOUNTAIN_POINTS} points.
      </p>
      <div className="stepper-rows">
        {players.map(p => {
          const lost = scores[p.id].mountains;
          return (
            <div key={p.id} className="stepper-row">
              <div className="stepper-row-player">
                <PlayerLabel player={p} />
              </div>
              <div className="stepper-controls">
                <button
                  type="button"
                  className="stepper-button-icon"
                  onClick={() => handleChange(p.id, lost - 1)}
                  aria-label={`Decrement mountain trains for ${p.name}`}
                >
                  −
                </button>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  className="stepper-input"
                  value={lost}
                  onChange={e => handleChange(p.id, e.target.value)}
                  aria-label={`${p.name} mountain trains lost`}
                />
                <button
                  type="button"
                  className="stepper-button-icon"
                  onClick={() => handleChange(p.id, lost + 1)}
                  aria-label={`Increment mountain trains for ${p.name}`}
                >
                  +
                </button>
              </div>
              <div className="stepper-subtotal">
                × {MOUNTAIN_POINTS} = <strong>{scoreMountains(lost)}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MountainsWave;
