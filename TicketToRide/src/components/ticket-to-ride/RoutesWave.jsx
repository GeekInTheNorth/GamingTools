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
      <div className="routes-legend">
        <span>Enter the count of completed routes per length for each player.</span>
        <ul className="routes-points-key">
          {ROUTE_LENGTHS.map(l => (
            <li key={l}>Length {l} = {ROUTE_POINTS[l]} pts</li>
          ))}
        </ul>
      </div>

      <div className="routes-table">
        <div className="routes-header">
          <div className="routes-header-cell player-cell">Player</div>
          {ROUTE_LENGTHS.map(l => (
            <div key={l} className="routes-header-cell">{l}</div>
          ))}
          <div className="routes-header-cell subtotal-cell">Subtotal</div>
        </div>

        {players.map(p => {
          const routes = scores[p.id].routes;
          const subtotal = scoreRoutes(routes);
          return (
            <div key={p.id} className="routes-row">
              <div className="routes-cell player-cell">
                <PlayerLabel player={p} />
              </div>
              {ROUTE_LENGTHS.map(l => {
                const max = maxForLength(l);
                return (
                  <div key={l} className="routes-cell">
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
                  </div>
                );
              })}
              <div className="routes-cell subtotal-cell">{subtotal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoutesWave;
