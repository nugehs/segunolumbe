// Writes one static HTML file per route into dist/ so crawlers, link previews,
// and no-JS visitors get every section, card, and article, each with its own
// title, description, and canonical URL. Also writes 404.html and sitemap.xml.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, allPaths, NOT_FOUND_PATH, resolveRoute, headFor, applyHead, SITE_URL } =
  await import(pathToFileURL(ssrEntry).href);

const template = readFileSync(path.join(dist, 'index.html'), 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error('prerender: could not find root marker in dist/index.html');
}

function page(routePath) {
  const html = applyHead(template, headFor(resolveRoute(routePath)));
  // Replacer function: rendered text can contain `$1`-style sequences.
  return html.replace(marker, () => `<div id="root">${render(routePath)}</div>`);
}

const paths = allPaths();
for (const routePath of paths) {
  const out = path.join(dist, routePath, 'index.html');
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, page(routePath));
}
writeFileSync(path.join(dist, '404.html'), page(NOT_FOUND_PATH));

// Only indexable pages canonical to this site: articles are canonical on GeekieNews.
const urls = [
  ...new Set(
    paths
      .map((routePath) => headFor(resolveRoute(routePath)))
      .filter((head) => !head.noindex && head.canonical.startsWith(`${SITE_URL}/`))
      .map((head) => head.canonical),
  ),
];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerender: wrote ${paths.length} pages, 404.html, and a ${urls.length}-URL sitemap`);
