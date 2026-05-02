import { TICKET_VALUES } from '../../ticket-to-ride/scoring';

function TicketCardGrid({ counts, onChange, mode = 'positive', onReset }) {
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

  const hasAnySelection = Object.values(counts || {}).some(c => c > 0);

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
      {onReset && (
        <button
          type="button"
          className="ticket-card ticket-card-reset"
          onClick={onReset}
          disabled={!hasAnySelection}
          aria-label="Clear all selected tickets for this player"
        >
          <svg className="ticket-card-reset-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
          <span className="ticket-card-reset-label">Reset</span>
        </button>
      )}
    </div>
  );
}

export default TicketCardGrid;
