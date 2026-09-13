# Teamatic

Pre-launch landing page for Teamatic — an automatic chai maker that boils,
simmers, strains and pours masala chai on its own, controlled from a phone.

## Stack

React 19 + Vite 7 + Tailwind 3, deployed to Netlify. Three.js renders the
appliance procedurally in the hero. Matches the frontend stack used by
`zonepredictor` so the tooling transfers.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm test
```

## Forms

The waitlist and the poll are Netlify Forms. The collectors are declared as
static hidden forms in `index.html` — Netlify's build step scans served HTML,
and a React tree renders too late to be seen. Both forms submit by hand from
`src/lib/submit.js` so each can keep its own success UI. Submissions appear
under **Forms** in the Netlify site dashboard; there is no backend and no
database.

## Deploy

Netlify builds `npm run build` and publishes `dist/` (see `netlify.toml`).
