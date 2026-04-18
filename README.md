# GamingTools

Embeddable React component that generates a Heat: Pedal to the Metal Legends deck entirely in the browser — no API required.

## Develop
```
cd Web
npm install
npm run dev
```

## Build
```
cd Web
npm run build
```

The build produces two files in `Web/dist/`:

- `heat-legends-generator.js` — IIFE bundle (React + component)
- `heat-legends-generator.css` — component styles

Drop them onto any page along with a container:

```html
<link rel="stylesheet" href="heat-legends-generator.css">
<div id="heat-legends-root"></div>
<script src="heat-legends-generator.js"></script>
```

For manual mounting, call `HeatLegendsGenerator.mount(element)` after the script loads.
