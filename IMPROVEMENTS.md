# World-class roadmap — site + tools

Audited 2026-06-09: site code, npm registry, GitHub repos, live sites, plus a repoctx dogfood run.

## P0 — Trust breakers (fix this week)

1. **tieline and bouncer GitHub repos 404.** npm `repository`/`homepage`/`bugs`, CI badges, and your own site footer all point to repos that don't exist publicly. For zero-star packages this reads as abandonware. Make them public (or fix links).
2. **repoctx GitHub README is stale** vs npm (old install instructions, local-path MCP config). GitHub Releases stuck at v0.3.2 while npm is at 1.3.3. Automate: one workflow does tag → GitHub Release → npm publish from the same commit.
3. **bouncer config example leaks a personal path** (`"repo": "../bashbop-event-web"`) — replace with a generic example.
4. **Footer npm link** points to `npmjs.com/~nugehs` but packages are published under `davidolu`. Unify the npm identity or fix the link.
5. **GitHub profile is uncurated**: pinned repos are old portfolio projects, none of the four tools pinned, status says "Demo for GrapghQL" (typo), no profile README. This is the first thing anyone checking "who built this?" sees.

## P1 — Discovery & conversion

6. **Empty About boxes, zero topics** on repoctx and aiglare repos. Add description, website link, topics (`mcp-server`, `ai-agents`, `static-analysis`, `developer-tools`, etc.). Two minutes each; it's GitHub's main discovery surface.
7. **Terminal demo gif per tool** (vhs/asciinema). All four produce visually strong output; none has a single image. Half a day, outsized conversion.
8. **aiglare site is invisible** — live and polished, but not linked from README or repo. Cross-link everything.
9. **Comparison pages**: repoctx vs Sourcegraph/CLAUDE.md, tieline vs Pact/openapi-diff/Optic, bouncer vs semgrep/policy-as-code, aiglare vs guardrails-ai/runtime validators. That's where dev search traffic lives.
10. **Launch footprint is zero** — no Show HN, dev.to, X threads. tieline's README is ready today. For aiglare: run it on 20 popular OSS AI repos and publish findings (classic audit-tool launch).
11. **Umbrella story**: one index page tying the four tools into the actual narrative — "a deterministic trust layer for AI-assisted dev: context, contracts, compliance, governance — local-first, MCP-native." The site hints at it; make it explicit and link it from every README.

## P2 — Site (segunolumbe)

12. **SEO is thin for a client-rendered SPA**: no Open Graph/Twitter meta, no canonical URL, no JSON-LD (Person + SoftwareApplication), no sitemap/robots. Crawlers and link previews see an empty `<div id="root">`. Add meta tags now; consider prerender (vite-plugin-prerender) or porting to Astro (you already use it for the tool sites).
13. **No contact path** — footer has GitHub/npm only. Add email and LinkedIn/X; a portfolio without contact loses its main conversion.
14. **Broken footer links** to tieline/bouncer repos (see P0-1).
15. Minor: `<html lang>` fine, but check heading order, focus states, reduced-motion for the reveal animation.

## P3 — repoctx product feedback (from dogfooding it on this repo)

16. `context_pack` for "improve SEO, performance, accessibility…" on this 11-file indexed repo returned **zero primary files** and a generic "refine the query" message. It should never return empty on a small repo — fall back to ranked entrypoints (index.html, vite.config.ts, App.tsx). Intent topics like seo/performance should map to html/config/build files.
17. `merge_readiness` verdict FAIL on "version metadata changed without changelog" — correct behavior, but for `private: true` repos with no CHANGELOG a softer WARN under `solo` governance would reduce noise.
18. The 769 weekly downloads on repoctx vs ~0 elsewhere suggests CI self-installs; worth knowing your real number before quoting it.

## Suggested order

Week 1: items 1–5 (one afternoon, removes every trust breaker).
Week 2: 6–8 + site meta tags (12).
Week 3+: comparison pages, launch posts, umbrella page.
