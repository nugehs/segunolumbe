# Changelog

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
