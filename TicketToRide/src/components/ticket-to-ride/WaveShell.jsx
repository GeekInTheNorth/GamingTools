function WaveShell({ waveIndex, waveCount, waveLabel, onBack, onNext, isLast, children }) {
  return (
    <div className="wave-shell">
      <div className="wave-header">
        <div className="wave-progress" aria-label={`Wave ${waveIndex + 1} of ${waveCount}`}>
          {Array.from({ length: waveCount }).map((_, i) => (
            <span
              key={i}
              className={`wave-dot${i === waveIndex ? ' active' : ''}${i < waveIndex ? ' done' : ''}`}
            />
          ))}
        </div>
        <h2 className="wave-title">
          <span className="wave-step">Wave {waveIndex + 1} of {waveCount}</span>
          <span className="wave-label">{waveLabel}</span>
        </h2>
      </div>

      <div className="wave-body">{children}</div>

      <div className="wave-nav">
        {onBack ? (
          <button type="button" className="secondary-button" onClick={onBack}>
            Back
          </button>
        ) : <span />}
        <button type="button" className="primary-button" onClick={onNext}>
          {isLast ? 'Show Leaderboard' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default WaveShell;
