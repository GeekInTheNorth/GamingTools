import React from 'react';
import ReactDOM from 'react-dom/client';
import HeatLegendsGenerator from './HeatLegendsGenerator';
import './components/heat/Heat.css';

export function mount(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) {
    throw new Error(`HeatLegendsGenerator: mount target not found (${target})`);
  }
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <HeatLegendsGenerator />
    </React.StrictMode>
  );
  return root;
}

function autoMount() {
  const target = document.getElementById('heat-legends-root');
  if (target) mount(target);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
}
