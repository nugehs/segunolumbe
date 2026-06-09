// Injects the server-rendered app into dist/index.html so crawlers,
// link previews, and no-JS visitors see real content.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const indexPath = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(ssrEntry).href);
const html = readFileSync(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  throw new Error('prerender: could not find root marker in dist/index.html');
}
writeFileSync(indexPath, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('prerender: dist/index.html now contains static HTML');
