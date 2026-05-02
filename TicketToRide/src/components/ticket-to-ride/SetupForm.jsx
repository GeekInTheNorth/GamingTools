import { useState } from 'react';
import { PLAYER_COLOURS } from '../../ticket-to-ride/playerColours';
import ColourSelect from './ColourSelect';

const PLAYER_COUNTS = [2, 3, 4, 5, 6];

function makeDefaultPlayers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `p${i + 1}`,
    name: '',
    colourId: PLAYER_COLOURS[i].id,
  }));
}

function SetupForm({ onStart }) {
  const [count, setCount] = useState(2);
  const [players, setPlayers] = useState(() => makeDefaultPlayers(2));

  function handleCountChange(newCount) {
    setCount(newCount);
    setPlayers(prev => {
      if (newCount > prev.length) {
        const used = new Set(prev.map(p => p.colourId));
        const additions = [];
        for (let i = prev.length; i < newCount; i++) {
          const fallback = PLAYER_COLOURS.find(c => !used.has(c.id));
          if (fallback) used.add(fallback.id);
          additions.push({
            id: `p${i + 1}`,
            name: '',
            colourId: fallback ? fallback.id : PLAYER_COLOURS[i].id,
          });
        }
        return [...prev, ...additions];
      }
      return prev.slice(0, newCount);
    });
  }

  function updatePlayer(index, field, value) {
    setPlayers(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  const colourCounts = players.reduce((acc, p) => {
    acc[p.colourId] = (acc[p.colourId] || 0) + 1;
    return acc;
  }, {});
  const hasDuplicateColours = Object.values(colourCounts).some(n => n > 1);
  const allNamed = players.every(p => p.name.trim().length > 0);
  const canStart = allNamed && !hasDuplicateColours;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canStart) return;
    onStart(players.map(p => ({ ...p, name: p.name.trim() })));
  }

  return (
    <form className="setup-form" onSubmit={handleSubmit}>
      <h2 className="setup-title">Ticket to Ride Score Calculator</h2>

      <div className="form-section">
        <div className="form-section-label">Number of Players</div>
        <div className="player-count-options" role="radiogroup" aria-label="Number of players">
          {PLAYER_COUNTS.map(n => (
            <button
              type="button"
              key={n}
              role="radio"
              aria-checked={count === n}
              className={`player-count-option${count === n ? ' selected' : ''}`}
              onClick={() => handleCountChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-label">Players</div>
        <div className="player-rows">
          {players.map((p, i) => {
            const isDup = colourCounts[p.colourId] > 1;
            return (
              <div key={p.id} className="player-row">
                <label className="player-row-label">
                  <span className="player-row-index">{i + 1}</span>
                  <input
                    type="text"
                    className="player-name-input"
                    placeholder={`Player ${i + 1}`}
                    value={p.name}
                    onChange={e => updatePlayer(i, 'name', e.target.value)}
                    maxLength={24}
                  />
                </label>
                <ColourSelect
                  value={p.colourId}
                  onChange={id => updatePlayer(i, 'colourId', id)}
                  hasError={isDup}
                  ariaLabel={`Player ${i + 1} colour`}
                />
              </div>
            );
          })}
        </div>
        {hasDuplicateColours && (
          <div className="setup-error">Each player needs a unique colour.</div>
        )}
      </div>

      <button type="submit" className="primary-button" disabled={!canStart}>
        Start Scoring
      </button>
    </form>
  );
}

export default SetupForm;
