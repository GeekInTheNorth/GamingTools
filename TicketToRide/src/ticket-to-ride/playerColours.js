export const PLAYER_COLOURS = [
  { id: 'red', label: 'Red', hex: '#c0392b' },
  { id: 'blue', label: 'Blue', hex: '#2980b9' },
  { id: 'green', label: 'Green', hex: '#27ae60' },
  { id: 'yellow', label: 'Yellow', hex: '#f1c40f' },
  { id: 'black', label: 'Black', hex: '#2c3e50' },
  { id: 'white', label: 'White', hex: '#ecf0f1' },
];

export function getColour(id) {
  return PLAYER_COLOURS.find(c => c.id === id) || PLAYER_COLOURS[0];
}
