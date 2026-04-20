import { useState } from 'react';
import HelmetIcon from './HelmetIcon';

const drivers = [
  { key: 'useSilver', label: 'Silver', number: 2 },
  { key: 'useRed', label: 'Red', number: 3 },
  { key: 'useOrange', label: 'Orange', number: 4, expansion: 'Heavy Rain' },
  { key: 'useGreen', label: 'Green', number: 5 },
  { key: 'useBlack', label: 'Black', number: 7 },
  { key: 'usePurple', label: 'Purple', number: 9, expansion: 'Tunnel Vision' },
  { key: 'useBlue', label: 'Blue', number: 10 },
  { key: 'useWhite', label: 'White', number: 11, expansion: 'Rocky Road' },
  { key: 'useYellow', label: 'Yellow', number: 14 },
];

const difficulties = [
  { value: 1, label: 'Easy' },
  { value: 0, label: 'Normal' },
  { value: 2, label: 'Hard' },
  { value: 3, label: 'Legendary' },
];

function LegendsForm({ onGenerate }) {
  const [difficulty, setDifficulty] = useState(0);
  const [selectedDrivers, setSelectedDrivers] = useState(
    Object.fromEntries(drivers.map(d => [d.key, true]))
  );

  function toggleDriver(key) {
    setSelectedDrivers(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onGenerate({ difficulty, ...selectedDrivers });
  }

  const hasDrivers = Object.values(selectedDrivers).some(Boolean);

  return (
    <form className="legends-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-section-label">Difficulty</div>
        <div className="difficulty-options" role="radiogroup" aria-label="Difficulty">
          {difficulties.map(d => (
            <button
              type="button"
              key={d.value}
              role="radio"
              aria-checked={difficulty === d.value}
              className={`difficulty-option${difficulty === d.value ? ' selected' : ''}`}
              onClick={() => setDifficulty(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-label">Legends Drivers</div>
        <div className="driver-tiles">
          {drivers.map(d => {
            const selected = selectedDrivers[d.key];
            return (
              <button
                type="button"
                key={d.key}
                className={`driver-tile${selected ? ' selected' : ''}`}
                aria-pressed={selected}
                onClick={() => toggleDriver(d.key)}
              >
                <HelmetIcon colour={d.label} />
                <span className="driver-tile-label">#{d.number} {d.label}</span>
                <span className="driver-tile-expansion">{d.expansion || '\u00A0'}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button type="submit" className="generate-button" disabled={!hasDrivers}>
        Generate Deck
      </button>
    </form>
  );
}

export default LegendsForm;
