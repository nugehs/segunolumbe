# segunolumbe.com agent guide

## Product boundary

This repository is Oluwasegun Olumbe's static personal site. It should show concrete proof of shipped products and trust-layer developer tools in a direct founder voice. Read `PRODUCT.md`, `README.md`, and `IMPROVEMENTS.md` before changing positioning, content hierarchy, or visual direction.

The products linked from this site live in separate repositories. Update links and portfolio copy here, but do not edit sibling product repositories unless the task explicitly includes them.

## Working safely

- Preserve existing uncommitted work. Check `git status --short --branch` before editing and do not overwrite changes you did not create.
- Use npm on Node 22 (`.nvmrc`); `package-lock.json` is authoritative. Use `npm ci` for a clean install.
- The site is Vite + React + TypeScript. Every route is prerendered to its own HTML file for GitHub Pages.
- Keep public assets in `public/`; `public/CNAME` is required for the custom domain.
- Do not deploy, alter DNS, or change GitHub Pages settings unless the user explicitly asks.

## Content and architecture map

- `src/App.tsx`: top-level page composition and client-side navigation.
- `src/routes.ts`: path to route resolution and the list of prerendered paths.
- `src/head.ts`: per-route title, description, canonical, and Open Graph tags.
- `src/data/products.ts`, `tools.ts`, `stack.ts`: cards and links. `slug` is the URL segment.
- `src/data/articles.ts`: embedded articles, canonical on GeekieNews.
- `src/data/pages.ts`: Writing, Now, and Speaking copy.
- `src/data/sections.ts`: section labels and notes.
- `src/components/ArticleBody.tsx`: article rendering.
- `src/styles/global.css`: global design system and responsive styling.
- `src/entry-server.tsx` and `scripts/prerender.mjs`: prerender every route, plus `404.html` and `sitemap.xml`.
- `tests/`: Vitest suite.
- `.github/workflows/ci.yml`: checks on pull requests. `.github/workflows/deploy.yml`: GitHub Pages deployment.

Prefer editing the appropriate data module over hardcoding repeated content in JSX. Pages, head tags, and the sitemap are generated from the data and `src/routes.ts`, so a new card or article needs only a unique slug. Renaming a slug breaks inbound links.

Card and page copy renders as plain text: no Markdown. Photos in `public/` must have EXIF stripped (a test enforces it).

## Validation

For every change, run the full checks and the build:

```bash
npm run check
npm run build
```

Then spot-check the generated site with `npm run preview`, including mobile layout, keyboard focus, reduced motion, article routes, metadata, and outbound links when affected.

## Product invariants

- Work is the proof: products and tools should remain easy to scan and click.
- Founder products and open-source trust tools get meaningful, balanced representation.
- Preserve WCAG AA contrast, visible focus, reduced-motion support, and responsive behaviour.
- Avoid generic portfolio-template, faux-terminal, or soft SaaS styling.
