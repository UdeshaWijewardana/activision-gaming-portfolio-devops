# Activision Gaming Portfolio

> Academic project disclaimer: this is an original, non-commercial university portfolio project. It is **not** an official Activision website and is not affiliated with, sponsored by, endorsed by, or representative of Activision or its studios. Franchise names are used only as contextual reference for an interface design study.

An immersive React + Vite portfolio that explores the visual language of a AAA gaming studio through cinematic composition, purposeful motion, and accessible interface systems.

## Features

- Responsive home, games, reusable game detail, studio, projects, careers, news, contact, and 404 pages
- Data-driven game, news, career, project, and navigation content
- Loading screen, scroll progress, subtle desktop cursor, visual depth, motion hierarchy, and route transitions
- Local-video-ready `VideoHero` with autoplay, muted loop, pause control, error fallback, and reduced-motion fallback
- Accessible navigation with mobile dialog-style focus loop and Escape close; semantic forms with validation and live errors
- CSS-generated original artwork, meaning the project looks complete without copied game media
- SEO baseline: title, description, Open Graph tags, canonical placeholder, favicon, robots, and sitemap

## Tech stack

React 18, Vite, React Router, Framer Motion, React Icons, CSS, ESLint, Vitest, and Testing Library.

## Architecture

```
src/
  components/    Reusable visual and interaction components
  data/          Structured portfolio data
  hooks/         Browser preference hooks
  layout/        Header, footer, route shell
  pages/         Route-level experiences
  styles/        Global visual system
  test/          Test configuration
  utils/         Motion variants
```

## Installation and development

```bash
npm install
npm run dev
```

```bash
npm run lint
npm test
npm run build
```

## Media instructions

The shipped interface uses purpose-built CSS cinematic scenes, so no copyrighted imagery is bundled. To use licensed media:

1. Place an appropriately licensed, optimized MP4 at `public/media/hero/hero.mp4` (and optionally WebM at `public/media/hero/hero.webm`).
2. Replace local placeholders under `public/media/` with licensed stills as needed; their paths are centralized in `src/data/media.js`.
3. Replace `public/assets/images/og-placeholder.svg` with a licensed 1200×630 production social image.
4. Never add official Activision, studio, or game media unless you have the appropriate permission.

See [`public/assets/README.md`](public/assets/README.md) for the same paths.

## CI/CD and deployment

- `.github/workflows/ci.yml` runs install, lint, tests, and production build on pushes to `main`, `develop`, and `feature/**`, plus pull requests to `main` and `develop`.
- `.github/workflows/deploy.yml` builds and deploys `main` to GitHub Pages using the official Pages actions.
- In the repository settings, set **Pages → Build and deployment → GitHub Actions** before the first deployment. No secrets are required by this workflow.
- Set the canonical and sitemap placeholder URLs in `index.html` and `public/sitemap.xml` after deciding on a public URL.

## Branch strategy

- `main`: protected production-ready work
- `develop`: integration branch
- `feature/studio-experience` and `feature/games-experience`: intended feature branches

No collaboration history, names, student IDs, commits, or pull requests have been fabricated. Add actual contributors and individual contributions below when the team begins work.

## Contributors and individual contributions

| Contributor | Contribution |
| --- | --- |
| Add real team member | Add actual contribution after work is completed |

## Testing

The test suite covers home rendering/navigation, functional game filtering, and accessible contact-form validation. Expand coverage as new behaviors are added.

## Known limitations

- The contact form intentionally simulates submission and does not send data.
- The trailer control is a non-media placeholder until licensed video is added.
- CSS visual scenes are original abstractions, not franchise artwork.
- The current deployment and canonical URLs remain placeholders.

## Challenges and resolutions

| Challenge | Resolution |
| --- | --- |
| Premium visual impact without copied media | Built layered, performant CSS-generated cinematic scenes and optional local asset hooks. |
| Motion versus accessibility | Added reduced-motion rules, restrained transforms, and native scrolling. |
| Rich navigation on small screens | Added an accessible full-screen menu, Escape close, and keyboard focus loop. |

## Merge conflict documentation

Record real merge conflicts and resolutions here as the team collaborates. Do not replace this placeholder with fictional history.

## Live deployment

Add the real GitHub Pages URL after deployment is configured.
