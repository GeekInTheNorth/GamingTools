import PlayerLabel from './PlayerLabel';
import TicketCardGrid from './TicketCardGrid';
import { ROUTE_LENGTHS, ROUTE_POINTS, scoreRoutes } from '../../ticket-to-ride/scoring';

const SHORT_ROUTE_MAX = 25;
const LONG_ROUTE_MAX = 10;

const EMPTY_ROUTES = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 8: 0 };

function maxForLength(length) {
  return length <= 4 ? SHORT_ROUTE_MAX : LONG_ROUTE_MAX;
}

function formatRouteSuffix(length) {
  const pts = ROUTE_POINTS[length];
  return `${pts}pt${pts === 1 ? '' : 's'}`;
}

function RoutesWave({ players, scores, updatePlayerScore }) {
  function handleChange(playerId, length, value) {
    const next = { ...scores[playerId].routes, [length]: value };
    updatePlayerScore(playerId, 'routes', next);
  }

  return (
    <div className="routes-wave">
      <p className="wave-instruction">
        Click a length card for each completed route. Click again to add another;
        use the small <span className="inline-key">−</span> to remove one.
      </p>

      {players.map(p => {
        const routes = scores[p.id].routes;
        const subtotal = scoreRoutes(routes);
        return (
          <section key={p.id} className="player-card">
            <header className="player-card-header">
              <PlayerLabel player={p} />
              <span className="player-card-subtotal positive">+{subtotal} pts</span>
            </header>
            <TicketCardGrid
              counts={routes}
              onChange={(length, value) => handleChange(p.id, length, value)}
              mode="positive"
              onReset={() => updatePlayerScore(p.id, 'routes', EMPTY_ROUTES)}
              values={ROUTE_LENGTHS}
              formatPrefix={() => 'Length'}
              formatSuffix={formatRouteSuffix}
              maxForValue={maxForLength}
              ariaItemLabel={l => `Add a route of length ${l}`}
              ariaRemoveLabel={l => `Remove one route of length ${l}`}
              ariaResetLabel="Clear all routes for this player"
            />
          </section>
        );
      })}
    </div>
  );
}

export default RoutesWave;
