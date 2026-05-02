import PlayerLabel from './PlayerLabel';
import { ROUTE_LENGTHS, ROUTE_POINTS, scoreRoutes } from '../../ticket-to-ride/scoring';

const SHORT_ROUTE_MAX = 25;
const LONG_ROUTE_MAX = 10;

function maxForLength(length) {
  return length <= 4 ? SHORT_ROUTE_MAX : LONG_ROUTE_MAX;
}

function RoutesWave({ players, scores, updatePlayerScore }) {
  function handleChange(playerId, length, raw) {
    const value = Math.max(0, parseInt(raw, 10) || 0);
    const next = { ...scores[playerId].routes, [length]: value };
    updatePlayerScore(playerId, 'routes', next);
  }

  return (
    <div className="routes-wave">
      <p className="wave-instruction">
        For each player, choose how many routes of each length they completed.
      </p>
      <ul className="routes-points-key">
        {ROUTE_LENGTHS.map(l => (
          <li key={l}>Length {l} = {ROUTE_POINTS[l]} pt{ROUTE_POINTS[l] === 1 ? '' : 's'}</li>
        ))}
      </ul>

      {players.map(p => {
        const routes = scores[p.id].routes;
        const subtotal = scoreRoutes(routes);
        return (
          <section key={p.id} className="player-card">
            <header className="player-card-header">
              <PlayerLabel player={p} />
              <span className="player-card-subtotal positive">+{subtotal} pts</span>
            </header>
            <div className="route-length-grid">
              {ROUTE_LENGTHS.map(l => {
                const max = maxForLength(l);
                return (
                  <label key={l} className="route-length-cell">
                    <span className="route-length-label">Length {l}</span>
                    <select
                      className="route-select"
                      value={routes[l]}
                      onChange={e => handleChange(p.id, l, e.target.value)}
                      aria-label={`${p.name} routes of length ${l}`}
                    >
                      {Array.from({ length: max + 1 }, (_, n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default RoutesWave;
