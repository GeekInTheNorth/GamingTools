import PlayerLabel from './PlayerLabel';
import TicketCardGrid from './TicketCardGrid';
import { scoreTicketCounts } from '../../ticket-to-ride/scoring';

function FailedTicketsWave({ players, scores, updatePlayerScore }) {
  function handleChange(playerId, value, newCount) {
    const next = { ...scores[playerId].failedTickets };
    if (newCount <= 0) {
      delete next[value];
    } else {
      next[value] = newCount;
    }
    updatePlayerScore(playerId, 'failedTickets', next);
  }

  return (
    <div className="tickets-wave">
      <p className="wave-instruction">
        Click a card for each failed ticket. These point values are <strong>deducted</strong> from the player's score.
      </p>
      {players.map(p => {
        const counts = scores[p.id].failedTickets;
        const subtotal = scoreTicketCounts(counts);
        return (
          <section key={p.id} className="tickets-player-section">
            <header className="tickets-player-header">
              <PlayerLabel player={p} />
              <span className="tickets-subtotal negative">
                {subtotal === 0 ? '0' : `−${subtotal}`} pts
              </span>
            </header>
            <TicketCardGrid
              counts={counts}
              onChange={(value, newCount) => handleChange(p.id, value, newCount)}
              mode="negative"
            />
          </section>
        );
      })}
    </div>
  );
}

export default FailedTicketsWave;
