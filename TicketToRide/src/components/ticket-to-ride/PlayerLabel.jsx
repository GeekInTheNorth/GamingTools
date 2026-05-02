import { getColour } from '../../ticket-to-ride/playerColours';
import TrainIcon from './TrainIcon';

function PlayerLabel({ player, size = 'md' }) {
  const colour = getColour(player.colourId);
  return (
    <span className={`player-label player-label-${size}`}>
      <TrainIcon colour={colour.hex} />
      <span className="player-name">{player.name}</span>
    </span>
  );
}

export default PlayerLabel;
