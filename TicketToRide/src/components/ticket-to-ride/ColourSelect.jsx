import { useEffect, useRef, useState } from 'react';
import { PLAYER_COLOURS } from '../../ticket-to-ride/playerColours';
import TrainIcon from './TrainIcon';

function ColourSelect({ value, onChange, hasError, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const current = PLAYER_COLOURS.find(c => c.id === value) || PLAYER_COLOURS[0];

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  function selectColour(id) {
    onChange(id);
    setOpen(false);
  }

  return (
    <div className={`colour-select${hasError ? ' has-error' : ''}`} ref={wrapperRef}>
      <button
        type="button"
        className="colour-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(o => !o)}
      >
        <TrainIcon colour={current.hex} />
        <span className="colour-select-name">{current.label}</span>
        <span className="colour-select-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="colour-select-menu" role="listbox">
          {PLAYER_COLOURS.map(c => (
            <li
              key={c.id}
              role="option"
              aria-selected={c.id === value}
              className={`colour-select-option${c.id === value ? ' selected' : ''}`}
              onClick={() => selectColour(c.id)}
            >
              <TrainIcon colour={c.hex} />
              <span className="colour-select-name">{c.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ColourSelect;
