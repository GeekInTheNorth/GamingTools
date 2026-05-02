import { TICKET_VALUES } from '../../ticket-to-ride/scoring';

const defaultSuffix = (v) => (v === 1 ? 'pt' : 'pts');

function TicketCardGrid({
  counts,
  onChange,
  mode = 'positive',
  onReset,
  values = TICKET_VALUES,
  formatPrefix,
  formatSuffix = defaultSuffix,
  maxForValue,
  ariaItemLabel = (v) => `Add ticket worth ${v} points`,
  ariaRemoveLabel = (v) => `Remove one ticket worth ${v} points`,
  ariaResetLabel = 'Clear all selected tickets for this player',
}) {
  function increment(value) {
    const current = counts[value] || 0;
    if (maxForValue && current >= maxForValue(value)) return;
    onChange(value, current + 1);
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
      {values.map(value => {
        const count = counts[value] || 0;
        const selected = count > 0;
        return (
          <button
            type="button"
            key={value}
            className={`ticket-card${selected ? ' selected' : ''}`}
            onClick={() => increment(value)}
            aria-label={ariaItemLabel(value)}
          >
            {formatPrefix && (
              <span className="ticket-card-prefix">{formatPrefix(value)}</span>
            )}
            <span className="ticket-card-value">{value}</span>
            <span className="ticket-card-suffix">{formatSuffix(value)}</span>
            {count > 0 && (
              <>
                <span className="ticket-card-count" aria-label={`Selected ${count} times`}>
                  ×{count}
                </span>
                <span
                  className="ticket-card-decrement"
                  role="button"
                  tabIndex={0}
                  aria-label={ariaRemoveLabel(value)}
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
          aria-label={ariaResetLabel}
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
