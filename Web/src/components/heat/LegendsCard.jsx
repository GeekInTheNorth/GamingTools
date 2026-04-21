import HelmetIcon from './HelmetIcon';

const CORNER_LIMITS = [0, 1, 2, 3];

function LegendsCard({ card, revealed }) {
  if (!revealed) {
    return (
      <div className="legends-card face-down">
        <span className="card-back-label">Round {card.roundNumber}</span>
      </div>
    );
  }

  const driversByLimit = CORNER_LIMITS.map(limit => ({
    limit,
    drivers: card.drivers.filter(d => d.cornerLimit === limit),
  }));

  return (
    <div className="legends-card face-up">
      <div className="card-header">Round {card.roundNumber}</div>
      <div className="card-columns">
        {driversByLimit.map(({ limit, drivers }) => (
          <div key={limit} className="card-column">
            <div className="corner-diamond"><span>{limit}</span></div>
            <div className="column-entries">
              {drivers.map(driver => (
                <div key={driver.number} className="driver-entry">
                  <HelmetIcon colour={driver.colour} />
                  <span className="speed-bubble">{driver.speed}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LegendsCard;
