# Ashwin M R Portfolio

React + Vite single-page portfolio for showcasing aerospace engineering work, projects, and publications. Uses a hash router so it can be deployed on static hosts without server config.

## Getting Started
- Prerequisite: Node.js 18+
- Install dependencies: `npm install`
- Start dev server: `npm run dev` (then open the printed local URL)
- Production build: `npm run build`
- Preview build locally: `npm run preview`

## Project Structure
- `pages/` route-level screens (Home, About, Experiences, Projects, Publications, Contact)
- `components/` shared UI pieces and theming
- `images/` static assets referenced by the UI
- `index.html`/`index.tsx` entry point and client-side mounting

## Deployment Notes
Because routes use hash-based navigation, you can host the built `dist/` folder on any static host (GitHub Pages, Netlify, etc.) without additional routing rules.
