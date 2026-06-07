# segunolumbe.com

Personal site — built with [Vite](https://vitejs.dev) + [React](https://react.dev) + TypeScript. Static, deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build

```bash
npm run build        # tsc -b && vite build → ./dist
npm run preview      # serve the production build locally
```

## Structure

```
index.html                       # Vite entry, mounts <div id="root">
vite.config.ts                   # base, plugins
tsconfig.json                    # strict TS, react-jsx
src/
  main.tsx                       # React root, imports global.css
  App.tsx                        # page composition
  components/
    Base.tsx                     # header + footer wrapper, calls useReveal()
    Card.tsx                     # shared product/tool row markup
    DailyQuote.tsx               # public-domain proverb, picked per day
  data/
    products.ts                  # cards under #products
    tools.ts                     # cards under #work
    quotes.ts                    # quotes + quoteForToday() helper
  hooks/
    useReveal.ts                 # IntersectionObserver reveal-on-scroll
  styles/
    global.css                   # all styling + colour tokens (--accent is the logo red)
public/
  logo.png  favicon.png          # the red "S" disc
```

Editing content: the `products` and `tools` arrays in `src/data/` drive the cards. Add or change an entry there — no markup edits needed.

## Daily quote

`src/data/quotes.ts` exports a list of public-domain proverbs and a `quoteForToday()` helper that picks one by day-of-year. `DailyQuote.tsx` seeds with the server-side pick and re-runs the helper on mount, so the quote rolls over at the visitor's local midnight without a rebuild. To curate the list, edit the `quotes` array.

## Deploy (GitHub Pages)

A workflow is included at `.github/workflows/deploy.yml`.

1. Push to `main`.
2. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Push to `main` — the site builds (`vite build` → `./dist`) and deploys automatically.

### Custom domain (segunolumbe.com)

1. Add a `CNAME` file containing `segunolumbe.com` to the `public/` folder (Vite copies `public/` to `dist/` as-is).
2. Repo → Settings → Pages → Custom domain → `segunolumbe.com`.
3. Point your DNS at GitHub's apex IPs (or a `www` CNAME at `nugehs.github.io`).

### Deploying to a project path instead

If you'd rather serve from `https://<user>.github.io/segunolumbe/`, set `base: '/segunolumbe/'` in `vite.config.ts`.
