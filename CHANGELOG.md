# Changelog

## [1.4.0] — 2026-10-24

### Added
- A new GeekieNews article, "When Your Benchmark and Your Git History Disagree", mirrored into the writing section: Solumbe 4.8.0's history-replay eval.

### Changed
- Solumbe is now shown as v4.8.0 on the card, the release link, and the Now page, with copy for the 4.8.0 work (dependency-aware ranking, runtime version pins, the history replay).
- Renamed the remaining "Òtítọ́" mentions to Solumbe across the three earlier articles, the page meta tags, and the learning tracks (`otito-ci.yml` is now `solumbe-ci.yml`), matching the v4.0.0 rename. Historical references keep "then called Òtítọ́" and the 1.7.0 command keeps its old package name.

## [1.3.0] — 2026-10-13

### Added
- Case studies: a card can carry a `caseStudy`, and its page then explains the problem, constraints, architecture (a layered diagram in plain HTML), key decisions with what was rejected and why, what broke and the fix, and the outcome. A study can carry a second diagram for another subsystem; BashBop's shows its event assistant (retrieval-augmented answers) beside the payment path. Seven are published: gate, Solumbe, tieline, bouncer, aiglare, BashBop, and Snap A Bird, each written from its own repositories and docs. Brain Boost Buddy's is written but unpublished, in `src/data/drafts/`.
- A skills band on the home page, grouped as AI engineering, backend, clients, and delivery.
- Section pages list every project with its summary, stack, and links, instead of showing only the first one.
- Tests fail on a placeholder in a case study, on a case study with fewer than two decisions, and on a page without exactly one `h1`.

### Changed
- Layout: the fixed, non-scrolling shell is now a scrolling page with one masthead for all six sections, a home hero, and a sibling roster beside each write-up.
- Theme: the dark indigo and yellow palette is now light, with a cool off-white page, slate text, one indigo accent, a tinted hero with a dot grid, and rounded corners. Type is unchanged. Every text pair still meets WCAG AA.
- Solumbe's card copy is shorter; the detail moved into its case study.

### Fixed
- The Background AI card called the trust harness by its old name.
- Snap A Bird's summary said BirdNET and 964 UK birds. The app runs a MobileNet V3 image classifier on the phone, and the 964 species are worldwide.
- gate's summary said the other four tools feed it; its merge-readiness check does not run Solumbe yet.
- tieline's summary said drift shows up as a 500. A call to a route that is not there is a 404.
- The social share image was the old cream and red design and named a retired tool. It is redrawn in the light theme.

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
