# GamingTools

Embeddable React components that provide varying tools for board gaming.

- Heat: Pedal to the Metal
  - Legends deck generator
- Ticket to Ride
  - Score board

## Heat

Develop:
```
cd Heat
npm install
npm run dev
```

Build:
```
cd Heat
npm run build
```

The build produces two files in `Heat/dist/`:

- `heat-legends-generator.js` — IIFE bundle (React + component)
- `heat-legends-generator.css` — component styles

Drop them onto any page along with a container:

```html
<link rel="stylesheet" href="heat-legends-generator.css">
<div id="heat-legends-root"></div>
<script src="heat-legends-generator.js"></script>
```

For manual mounting, call `HeatLegendsGenerator.mount(element)` after the script loads.

## Ticket To Ride

Develop:
```
cd TicketToRide
npm install
npm run dev
```

Build:
```
cd TicketToRide
npm run build
```

The build produces two files in `TicketToRide/dist/`:

- `ticket-to-ride.js` — IIFE bundle (React + component)
- `ticket-to-ride.css` — component styles

Drop them onto any page along with a container:

```html
<link rel="stylesheet" href="ticket-to-ride.css">
<div id="ticket-to-ride-root"></div>
<script src="ticket-to-ride.js"></script>
```