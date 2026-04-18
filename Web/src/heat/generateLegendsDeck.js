export const LegendDifficulty = Object.freeze({
  Normal: 0,
  Easy: 1,
  Hard: 2,
  Legendary: 3,
});

const DRIVERS = [
  { key: 'useSilver', colour: 'Silver', number: 2 },
  { key: 'useRed', colour: 'Red', number: 3 },
  { key: 'useOrange', colour: 'Orange', number: 4 },
  { key: 'useGreen', colour: 'Green', number: 5 },
  { key: 'useBlack', colour: 'Black', number: 7 },
  { key: 'usePurple', colour: 'Purple', number: 9 },
  { key: 'useBlue', colour: 'Blue', number: 10 },
  { key: 'useYellow', colour: 'Yellow', number: 14 },
];

const DEFAULT_OPTIONS = {
  difficulty: LegendDifficulty.Normal,
  useSilver: true,
  useRed: true,
  useOrange: true,
  useGreen: true,
  useBlack: true,
  usePurple: true,
  useBlue: true,
  useYellow: true,
};

export function generateLegendsDeck(options = {}) {
  const merged = { ...DEFAULT_OPTIONS, ...options };
  return Array.from({ length: 20 }, (_, i) => generateCard(i + 1, merged));
}

function generateCard(roundNumber, options) {
  const speeds = generateSpeedArray(options.difficulty);
  shuffle(speeds);
  shuffle(speeds);

  const drivers = [];
  DRIVERS.forEach((driver, index) => {
    if (options[driver.key]) {
      const speed = speeds[index];
      drivers.push({
        colour: driver.colour,
        number: driver.number,
        speed,
        cornerLimit: generateCornerLimit(options.difficulty, speed),
      });
    }
  });

  return { roundNumber, drivers };
}

function generateCornerLimit(difficulty, speed) {
  let fastestThreshold = 18;
  let fastThreshold = 15;
  let midThreshold = 12;

  if (difficulty === LegendDifficulty.Easy) {
    fastestThreshold = 16;
    fastThreshold = 13;
    midThreshold = 10;
  } else if (difficulty === LegendDifficulty.Hard) {
    fastestThreshold = 19;
    fastThreshold = 17;
    midThreshold = 14;
  } else if (difficulty === LegendDifficulty.Legendary) {
    fastestThreshold = 20;
    fastThreshold = 18;
    midThreshold = 16;
  }

  if (speed >= fastestThreshold) return 3;
  if (speed >= fastThreshold) return 2;
  if (speed >= midThreshold) return 1;
  return 0;
}

function generateSpeedArray(difficulty) {
  switch (difficulty) {
    case LegendDifficulty.Easy:
      return range(8, 10);
    case LegendDifficulty.Hard:
      return range(12, 9);
    case LegendDifficulty.Legendary:
      return range(14, 8);
    default:
      return range(10, 10);
  }
}

function range(start, count) {
  return Array.from({ length: count }, (_, i) => start + i);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
