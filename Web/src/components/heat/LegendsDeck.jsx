import { useEffect, useState } from 'react';
import LegendsCard from './LegendsCard';

function LegendsDeck({ cards }) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    setRevealedCount(0);
  }, [cards]);

  const remaining = cards.length - revealedCount;
  const currentCard = revealedCount > 0 ? cards[revealedCount - 1] : null;
  const hasMore = revealedCount < cards.length;

  function revealNext() {
    if (hasMore) setRevealedCount(c => c + 1);
  }

  function reset() {
    setRevealedCount(0);
  }

  return (
    <div className="legends-deck">
      <div className="deck-controls">
        <h2>Legends Deck ({revealedCount} / {cards.length})</h2>
        <button
          type="button"
          className="reset-button"
          onClick={reset}
          disabled={revealedCount === 0}
        >
          Reset Deck
        </button>
      </div>

      <div className="deck-area">
        <DeckStack remaining={remaining} onClick={revealNext} />
        <div
          className={`current-card-slot${hasMore ? ' clickable' : ''}`}
          onClick={revealNext}
          role={hasMore ? 'button' : undefined}
          tabIndex={hasMore ? 0 : undefined}
          onKeyDown={e => {
            if (hasMore && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              revealNext();
            }
          }}
        >
          {currentCard ? (
            <LegendsCard card={currentCard} revealed />
          ) : (
            <div className="legends-card placeholder">
              <span>Click the deck to reveal the first card</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DeckStack({ remaining, onClick }) {
  if (remaining === 0) {
    return (
      <div className="deck-stack empty">
        <span>Deck Empty</span>
      </div>
    );
  }

  const layers = Math.min(remaining, 5);
  return (
    <div
      className="deck-stack clickable"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Draw next card, ${remaining} remaining`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {Array.from({ length: layers }).map((_, i) => {
        const offset = (layers - 1 - i) * 3;
        return (
          <div
            key={i}
            className="deck-layer"
            style={{ transform: `translate(${offset}px, ${offset}px)` }}
          />
        );
      })}
      <div className="deck-top-label">
        <strong>{remaining}</strong>
        <span>cards</span>
      </div>
    </div>
  );
}

export default LegendsDeck;
