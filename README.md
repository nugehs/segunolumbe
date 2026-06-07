# segunolumbe.com

Personal site — built with [Astro](https://astro.build). Static, no framework runtime.

## Run locally

```bash
npm install
npm run dev          # http://localhost:4321
```

## Build

```bash
npm run build        # outputs to ./dist
npm run preview      # preview the production build
```

## Structure

```
src/
  layouts/Base.astro        # head, fonts, header, footer, reveal-on-scroll
  pages/index.astro         # the page — products + tools are data arrays at the top
  components/DailyQuote.astro# public-domain proverb, changes daily (client-side)
  styles/global.css         # all styling + colour tokens (--accent is the logo red)
public/
  logo.png  favicon.png     # the red "S" disc
```

Editing content: the `products` and `tools` arrays at the top of
`src/pages/index.astro` drive the cards. Add or change an entry there —
no markup edits needed.

## Daily quote

`DailyQuote.astro` ships a list of public-domain proverbs and picks one by
day-of-year **in the browser**, so it changes at local midnight without a
rebuild. To curate the list, edit the `quotes` array in that file.

## Deploy (GitHub Pages)

A workflow is included at `.github/workflows/deploy.yml`.

1. Push this repo to GitHub.
2. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Push to `main` — the site builds and deploys automatically.

### Custom domain (segunolumbe.com)

`astro.config.mjs` is already set with `site: 'https://segunolumbe.com'`.
In Settings → Pages, set the custom domain to `segunolumbe.com` and add a
`CNAME` file containing `segunolumbe.com` to the `public/` folder (GitHub
can also add this for you when you set the domain in the UI).

### Deploying to a project path instead

If you'd rather serve from `https://<user>.github.io/segunolumbe/`, edit
`astro.config.mjs`: remove the `site` line and uncomment the `site` +
`base` lines noted in the comments there.
# segunolumbe
