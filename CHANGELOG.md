# Changelog

## [1.2.0] — 2026-09-24

### Added
- Every section, card, and article has its own prerendered URL: `/open-source/<slug>/`, `/products/<slug>/`, `/background/<slug>/`, `/writing/<slug>/`, `/now/`, `/speaking/`. Each page carries its own title, description, canonical URL, and Open Graph/Twitter tags; article pages declare their GeekieNews copy as canonical. Navigation is real links, so it works without JS and every page can be shared.
- Generated `sitemap.xml` (indexable pages only) and a `noindex` 404 page.
- ESLint (typescript-eslint, react-hooks, jsx-a11y), a Vitest suite, and `npm run check`. A CI workflow runs type check, lint, tests, and build on every pull request; the deploy runs lint and tests before building.
- Unlisted learning tracks at `/devops-track/` and `/ai-engineer-track/`.
- Embedded writing archive: the verification-layer essay, the AI merge-gate testing audit, and the model routing article.
- LinkedIn link and downloadable resume.

### Changed
- Homepage repositioned around founder identity and deterministic AI tooling, as a fixed shell with open source, products, and background sections.
- Òtítọ́ copy updated to v1.15.0 (the model router as an MCP tool); Brain Boost Buddy copy covers lesson-time scheduling.
- npm link points at the maintainer profile, which covers both the `@nugehs` and `@bashbop` scopes.
- Node 22 in CI, Vite 7, Vitest 4. `npm audit` is clean.

### Fixed
- The portrait shipped with EXIF metadata, including GPS coordinates. Stripped losslessly; a test now fails on any JPEG with EXIF.
- Now and Speaking rendered their text twice.
- Card copy showed literal Markdown backticks.
- Mobile section tabs overflowed: the small-screen rule sat before the base rule and never applied.
- Roster hover state dropped secondary text below WCAG AA contrast.
- Section tabs claimed the ARIA tab pattern without its keyboard behaviour; they are now plain navigation links with `aria-current`.

### Removed
- Unused `DailyQuote` component and quote list, the static sitemap, the committed `tsconfig.tsbuildinfo`, and a stale `.dev-context/` cache from the retired context tool.

## [1.1.0] — 2026-06-09

### Added
- Full SEO/social metadata: Open Graph, Twitter card, canonical URL, JSON-LD Person schema, theme-color, OG image.
- Build-time prerendering: `vite build` now also builds an SSR bundle and injects static HTML into `dist/index.html` (crawlers, link previews, and no-JS visitors see real content). Client hydrates via `hydrateRoot`.
- `public/robots.txt`, `public/sitemap.xml`, `public/CNAME` (segunolumbe.com).
- Email contact link in footer.
- `prefers-reduced-motion` support and visible focus outlines.

### Changed
- Footer open-source links point at npm package pages (canonical install surface).
- Fixed npm profile link.
- `DailyQuote` made hydration-safe (server pick may differ from visitor's local day).

## [1.0.0]
- Initial Vite + React + TypeScript site.
