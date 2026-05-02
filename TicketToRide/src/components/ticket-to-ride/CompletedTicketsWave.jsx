import PlayerLabel from './PlayerLabel';
import TicketCardGrid from './TicketCardGrid';
import { scoreTicketCounts } from '../../ticket-to-ride/scoring';

function CompletedTicketsWave({ players, scores, updatePlayerScore }) {
  function handleChange(playerId, value, newCount) {
    const next = { ...scores[playerId].completedTickets };
    if (newCount <= 0) {
      delete next[value];
    } else {
      next[value] = newCount;
    }
    updatePlayerScore(playerId, 'completedTickets', next);
  }

  return (
    <div className="tickets-wave">
      <p className="wave-instruction">
        Click a card for each completed ticket. Click again to add another at the same value;
        use the small <span className="inline-key">−</span> to remove one.
      </p>
      {players.map(p => {
        const counts = scores[p.id].completedTickets;
        const subtotal = scoreTicketCounts(counts);
        return (
          <section key={p.id} className="player-card">
            <header className="player-card-header">
              <PlayerLabel player={p} />
              <span className="player-card-subtotal positive">+{subtotal} pts</span>
            </header>
            <TicketCardGrid
              counts={counts}
              onChange={(value, newCount) => handleChange(p.id, value, newCount)}
              mode="positive"
              onReset={() => updatePlayerScore(p.id, 'completedTickets', {})}
              formatPrefix={() => 'Ticket'}
            />
          </section>
        );
      })}
    </div>
  );
}

export default CompletedTicketsWave;
