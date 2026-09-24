# segunolumbe.com

Personal site — built with [Vite](https://vitejs.dev) + [React](https://react.dev) + TypeScript. Every route is prerendered to static HTML and deployed to GitHub Pages.

## Run locally

Node 22 (see `.nvmrc`).

```bash
npm ci
npm run dev          # http://localhost:5173
```

## Check and build

```bash
npm run check        # type check, lint, tests
npm run build        # tsc -b → vite build → SSR bundle → prerender every route into ./dist
npm run preview      # serve ./dist locally
```

CI runs the same checks and the build on every pull request. Deploys run from `main`.

## Routes

| Path | Shows |
| --- | --- |
| `/` | Open source, first tool |
| `/open-source/<slug>/` | One tool |
| `/products/`, `/products/<slug>/` | Products |
| `/background/`, `/background/<slug>/` | Background |
| `/writing/`, `/writing/<slug>/` | Articles (canonical on GeekieNews) |
| `/now/`, `/speaking/` | Pages |
| `/devops-track/`, `/ai-engineer-track/` | Unlisted learning tracks (static HTML in `public/`, `noindex`) |

`src/routes.ts` resolves a path to a route; `scripts/prerender.mjs` writes one HTML file per route with its own head tags (from `src/head.ts`), plus `404.html` and `sitemap.xml`. Links are real `<a href>`s, so navigation works without JS; with JS, `App.tsx` swaps routes client-side and keeps the head in sync.

## Structure

```
index.html                 # head template; prerender rewrites title, description, canonical, OG/Twitter
scripts/prerender.mjs      # renders every route, writes 404.html and sitemap.xml
src/
  main.tsx                 # hydrates the prerendered HTML
  entry-server.tsx         # render(path) for the prerender
  App.tsx                  # page composition and client-side navigation
  routes.ts                # path ⇄ route, list of prerendered paths
  head.ts                  # per-route title/description/canonical
  components/ArticleBody.tsx
  data/
    tools.ts products.ts stack.ts   # cards (slug is the URL segment)
    articles.ts                     # embedded articles, mirrored from GeekieNews
    pages.ts                        # Writing, Now, Speaking copy
    sections.ts                     # section labels and notes
  styles/global.css
tests/                     # vitest: routes, rendered HTML, head tags, content and asset guards, tracks
public/                    # copied as-is: CNAME, robots.txt, images, resume, learning tracks
```

Editing content: change the arrays in `src/data/`. A new card needs a unique `slug`; it gets a page and a sitemap entry automatically. Changing a slug breaks inbound links.

Photos go in `public/` without EXIF: a test fails on any JPEG with EXIF or IPTC metadata (GPS included).

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` runs on every push to `main`: install, lint, test, build, publish `./dist`. Pages source is **GitHub Actions**; `public/CNAME` holds the custom domain.
