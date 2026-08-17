# segunolumbe.com agent guide

## Product boundary

This repository is Oluwasegun Olumbe's static personal site. It should show concrete proof of shipped products and trust-layer developer tools in a direct founder voice. Read `PRODUCT.md`, `README.md`, and `IMPROVEMENTS.md` before changing positioning, content hierarchy, or visual direction.

The products linked from this site live in separate repositories. Update links and portfolio copy here, but do not edit sibling product repositories unless the task explicitly includes them.

## Working safely

- Preserve existing uncommitted work. Check `git status --short --branch` before editing and do not overwrite changes you did not create.
- Use npm; `package-lock.json` is authoritative. Use `npm ci` for a clean install.
- The site is Vite + React + TypeScript and is statically prerendered for GitHub Pages.
- Keep public assets in `public/`; `public/CNAME` is required for the custom domain.
- Do not deploy, alter DNS, or change GitHub Pages settings unless the user explicitly asks.

## Content and architecture map

- `src/App.tsx`: top-level page composition.
- `src/data/products.ts`: product cards and links.
- `src/data/tools.ts`: developer-tool cards and links.
- `src/data/articles.ts`: article metadata/content sources.
- `src/data/pages.ts`: static page content.
- `src/components/ArticleBody.tsx`: article rendering.
- `src/styles/global.css`: global design system and responsive styling.
- `src/entry-server.tsx` and `scripts/prerender.mjs`: static prerender path.
- `.github/workflows/deploy.yml`: GitHub Pages deployment.

Prefer editing the appropriate data module over hardcoding repeated content in JSX. Keep internal links and prerendered routes aligned with `public/sitemap.xml` and metadata when pages are added or renamed.

## Validation

For ordinary changes, run:

```bash
npm run build
```

Then spot-check the generated site with `npm run preview`, including mobile layout, keyboard focus, reduced motion, article routes, metadata, and outbound links when affected. The build may update `tsconfig.tsbuildinfo`; do not discard a pre-existing change to that file without checking ownership.

## Product invariants

- Work is the proof: products and tools should remain easy to scan and click.
- Founder products and open-source trust tools get meaningful, balanced representation.
- Preserve WCAG AA contrast, visible focus, reduced-motion support, and responsive behaviour.
- Avoid generic portfolio-template, faux-terminal, or soft SaaS styling.
