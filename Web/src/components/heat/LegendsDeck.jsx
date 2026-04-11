import { useState } from 'react';
import LegendsCard from './LegendsCard';

function LegendsDeck({ cards }) {
  const [revealedCount, setRevealedCount] = useState(0);

  function revealNext() {
    setRevealedCount(prev => Math.min(prev + 1, cards.length));
  }

  function reset() {
    setRevealedCount(0);
  }

  return (
    <div className="legends-deck">
      <div className="deck-controls">
        <h2>Legends Deck ({revealedCount} / {cards.length})</h2>
        <div className="deck-buttons">
          <button onClick={revealNext} disabled={revealedCount >= cards.length}>
            Reveal Next Card
          </button>
          <button onClick={reset} disabled={revealedCount === 0}>
            Reset
          </button>
        </div>
      </div>

      <div className="card-list">
        {cards.map((card, index) => (
          <LegendsCard
            key={card.roundNumber}
            card={card}
            revealed={index < revealedCount}
          />
        ))}
      </div>
    </div>
  );
}

export default LegendsDeck;
