import RoutesWave from '../components/ticket-to-ride/RoutesWave';
import StationsWave from '../components/ticket-to-ride/StationsWave';
import MountainsWave from '../components/ticket-to-ride/MountainsWave';
import CompletedTicketsWave from '../components/ticket-to-ride/CompletedTicketsWave';
import FailedTicketsWave from '../components/ticket-to-ride/FailedTicketsWave';
import LongestRouteWave from '../components/ticket-to-ride/LongestRouteWave';

export const WAVES = [
  { key: 'routes', label: 'Train Routes', component: RoutesWave },
  { key: 'stations', label: 'Stations', component: StationsWave },
  { key: 'mountains', label: 'Mountain Trains', component: MountainsWave },
  { key: 'tickets-completed', label: 'Completed Tickets', component: CompletedTicketsWave },
  { key: 'tickets-failed', label: 'Failed Tickets', component: FailedTicketsWave },
  { key: 'longest-route', label: 'Longest Continuous Route', component: LongestRouteWave },
];
