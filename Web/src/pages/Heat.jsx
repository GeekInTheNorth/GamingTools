import { useState } from 'react';
import LegendsForm from '../components/heat/LegendsForm';
import LegendsDeck from '../components/heat/LegendsDeck';
import '../components/heat/Heat.css';

function Heat() {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate(options) {
    setLoading(true);
    setError(null);
    setDeck(null);

    try {
      const response = await fetch(import.meta.env.VITE_APP_HEAT_GENERATE_LEGENDS_DECK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error('Failed to generate deck. Ensure at least one driver is selected.');
      }

      const data = await response.json();
      setDeck(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Heat: Legends Deck Generator</h1>
      <LegendsForm onGenerate={handleGenerate} loading={loading} />
      {error && <p className="error">{error}</p>}
      {deck && <LegendsDeck cards={deck} />}
    </>
  );
}

export default Heat;
