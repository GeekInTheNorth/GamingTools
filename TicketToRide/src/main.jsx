import React from 'react';
import ReactDOM from 'react-dom/client';
import TicketToRide from './TicketToRide';
import './components/ticket-to-ride/TicketToRide.css';

export function mount(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) {
    throw new Error(`TicketToRide: mount target not found (${target})`);
  }
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <TicketToRide />
    </React.StrictMode>
  );
  return root;
}

function autoMount() {
  const target = document.getElementById('ticket-to-ride-root');
  if (target) mount(target);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
}
