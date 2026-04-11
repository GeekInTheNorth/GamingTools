function LegendsCard({ card, revealed }) {
  if (!revealed) {
    return (
      <div className="legends-card face-down">
        <span className="card-back-label">Round {card.roundNumber}</span>
      </div>
    );
  }

  return (
    <div className="legends-card face-up">
      <div className="card-header">Round {card.roundNumber}</div>
      <div className="card-drivers">
        {card.drivers.map(driver => (
          <div key={driver.number} className={`card-driver driver-bg-${driver.colour.toLowerCase()}`}>
            <span className="driver-name">#{driver.number} {driver.colour}</span>
            <span className="driver-speed">Speed: {driver.speed}</span>
            <span className="driver-corner">Corner: {driver.cornerLimit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LegendsCard;
