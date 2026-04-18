import { useState } from 'react';

const drivers = [
  { key: 'useSilver', label: 'Silver', number: 2 },
  { key: 'useRed', label: 'Red', number: 3 },
  { key: 'useOrange', label: 'Orange', number: 4 },
  { key: 'useGreen', label: 'Green', number: 5 },
  { key: 'useBlack', label: 'Black', number: 7 },
  { key: 'usePurple', label: 'Purple', number: 9 },
  { key: 'useBlue', label: 'Blue', number: 10 },
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
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={e => setDifficulty(Number(e.target.value))}
        >
          {difficulties.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <fieldset className="form-group">
        <legend>Legends Drivers</legend>
        <div className="driver-checkboxes">
          {drivers.map(d => (
            <label key={d.key} className="driver-checkbox">
              <input
                type="checkbox"
                checked={selectedDrivers[d.key]}
                onChange={() => toggleDriver(d.key)}
              />
              <span className={`driver-swatch driver-${d.label.toLowerCase()}`} />
              #{d.number} {d.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" disabled={!hasDrivers}>
        Generate Deck
      </button>
    </form>
  );
}

export default LegendsForm;
