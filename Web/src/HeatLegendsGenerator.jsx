import { useState } from 'react';
import LegendsForm from './components/heat/LegendsForm';
import LegendsDeck from './components/heat/LegendsDeck';
import { generateLegendsDeck } from './heat/generateLegendsDeck';

function HeatLegendsGenerator() {
  const [deck, setDeck] = useState(null);

  function handleGenerate(options) {
    setDeck(generateLegendsDeck(options));
  }

  return (
    <div className="heat-legends-generator">
      <h1>Heat: Legends Deck Generator</h1>
      <LegendsForm onGenerate={handleGenerate} />
      {deck && <LegendsDeck cards={deck} />}
    </div>
  );
}

export default HeatLegendsGenerator;
