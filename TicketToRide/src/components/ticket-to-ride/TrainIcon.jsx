function TrainIcon({ colour, className = '' }) {
  return (
    <svg
      className={`train-icon ${className}`}
      viewBox="0 0 64 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: colour }}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <rect x="3" y="8" width="15" height="14" rx="1" />
        <path d="M16 12 L16 22 L48 22 L52 18 L52 14 L48 12 Z" />
        <rect x="38" y="3" width="6" height="10" />
        <rect x="28" y="8" width="4" height="4" />
        <rect x="2" y="22" width="50" height="3" />
        <path d="M52 22 L60 22 L52 28 Z" />
        <circle cx="10" cy="27" r="4" />
        <circle cx="22" cy="27" r="4" />
        <circle cx="34" cy="27" r="4" />
        <circle cx="46" cy="28" r="3" />
      </g>
    </svg>
  );
}

export default TrainIcon;
