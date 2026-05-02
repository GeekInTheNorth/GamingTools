export const ROUTE_POINTS = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 10, 6: 15, 8: 21 };
export const ROUTE_LENGTHS = [1, 2, 3, 4, 5, 6, 8];
export const STATION_POINTS = 4;
export const MOUNTAIN_POINTS = 2;
export const LONGEST_ROUTE_BONUS = 10;
export const MAX_STATIONS = 3;
export const TICKET_VALUES = Array.from({ length: 25 }, (_, i) => i + 1);

export function createInitialPlayerScore() {
  return {
    routes: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 8: 0 },
    stations: 0,
    mountains: 0,
    completedTickets: {},
    failedTickets: {},
  };
}

export function scoreRoutes(routesByLength) {
  let total = 0;
  for (const length of ROUTE_LENGTHS) {
    const count = routesByLength?.[length] || 0;
    total += count * ROUTE_POINTS[length];
  }
  return total;
}

export function scoreStations(unusedCount) {
  return (unusedCount || 0) * STATION_POINTS;
}

export function scoreMountains(lostCount) {
  return (lostCount || 0) * MOUNTAIN_POINTS;
}

export function scoreTicketCounts(counts) {
  let total = 0;
  for (const value of Object.keys(counts || {})) {
    total += Number(value) * counts[value];
  }
  return total;
}

export function totalForPlayer(playerScore, longestRouteWinnerId, playerId) {
  const routes = scoreRoutes(playerScore.routes);
  const stations = scoreStations(playerScore.stations);
  const mountains = scoreMountains(playerScore.mountains);
  const completedTickets = scoreTicketCounts(playerScore.completedTickets);
  const failedTickets = scoreTicketCounts(playerScore.failedTickets);
  const longestRoute = longestRouteWinnerId === playerId ? LONGEST_ROUTE_BONUS : 0;
  const total = routes + stations + mountains + completedTickets - failedTickets + longestRoute;
  return { routes, stations, mountains, completedTickets, failedTickets, longestRoute, total };
}
