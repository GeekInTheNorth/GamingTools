import { TICKET_VALUES } from '../../ticket-to-ride/scoring';

function TicketCardGrid({ counts, onChange, mode = 'positive' }) {
  function increment(value) {
    const next = (counts[value] || 0) + 1;
    onChange(value, next);
  }

  function decrement(e, value) {
    e.stopPropagation();
    const current = counts[value] || 0;
    if (current <= 0) return;
    onChange(value, current - 1);
  }

  return (
    <div className={`ticket-card-grid ${mode}`}>
      {TICKET_VALUES.map(value => {
        const count = counts[value] || 0;
        const selected = count > 0;
        return (
          <button
            type="button"
            key={value}
            className={`ticket-card${selected ? ' selected' : ''}`}
            onClick={() => increment(value)}
            aria-label={`Add ticket worth ${value} points`}
          >
            <span className="ticket-card-value">{value}</span>
            <span className="ticket-card-suffix">pt{value === 1 ? '' : 's'}</span>
            {count > 0 && (
              <>
                <span className="ticket-card-count" aria-label={`Selected ${count} times`}>
                  ×{count}
                </span>
                <span
                  className="ticket-card-decrement"
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove one ticket worth ${value} points`}
                  onClick={e => decrement(e, value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') decrement(e, value);
                  }}
                >
                  −
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TicketCardGrid;
