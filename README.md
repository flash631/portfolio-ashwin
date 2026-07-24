# Ashwin M R portfolio

A responsive, single-page aerospace engineering portfolio built with React, TypeScript, and Vite. The visual system follows a technical dossier: a strong identity sheet, repository-backed project evidence, publication records, OpenFOAM studies, and a compact working toolkit.

## Local development

- Install dependencies: `npm ci`
- Start the site: `npm run dev`
- Typecheck: `npm run typecheck`
- Build for production: `npm run build`
- Preview the production build: `npm run preview`

The Vite base path is `/portfolio-ashwin/` for GitHub Pages project hosting. Static media lives in `public/`, content records live in `constants.ts` and `simulationData.ts`, and the design tokens and responsive rules live in `index.css`.

The landing page uses section anchors for About, Experience, Publications, Projects, Simulations, Skills, and Contact. Full simulation studies use static-host-safe query URLs such as `/portfolio-ashwin/?simulation=periodic-hill`; each page renders the complete source narrative, locally typeset equations, videos, figures, and captions.

## Deployment

Pushes to `main` run the GitHub Pages workflow. The workflow installs from the lockfile, typechecks, builds, uploads `dist/`, and deploys the Pages artifact.

## Content notes

- Publication and project claims follow the source portfolio records.
- The About laboratory gallery and final Contact section preserve the fuller predecessor’s content while using the current dossier styling.
- Patent-related items are labelled as entries because the current source does not specify their grant status.
- Update the profile location, external links, and dated publication status whenever those details change.
