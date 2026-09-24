import { describe, expect, it } from 'vitest';
import { articles } from '../src/data/articles';
import { pages } from '../src/data/pages';
import { NOT_FOUND_PATH, render } from '../src/entry-server';
import { allPaths, catalog, itemPath, type WorkMode } from '../src/routes';

// Mirror React's text escaping so source copy can be found in rendered HTML.
const escape = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

const count = (html: string, text: string) => html.split(escape(text)).length - 1;

describe('prerendered HTML', () => {
  it('renders each page body exactly once', () => {
    for (const mode of ['now', 'speaking'] as const) {
      const html = render(`/${mode}/`);
      expect(count(html, pages[mode].body), mode).toBe(1);
    }
  });

  it('renders the selected card on its own page, and only that card', () => {
    for (const mode of Object.keys(catalog) as WorkMode[]) {
      for (const item of catalog[mode]) {
        const path = itemPath(mode, item.slug);
        const html = render(path);
        expect(count(html, item.what), path).toBe(1);
        for (const other of catalog[mode]) {
          if (other !== item) expect(count(html, other.what), `${path} leaks ${other.slug}`).toBe(0);
        }
      }
    }
  });

  it('renders article pages with their title and a link to the canonical copy', () => {
    for (const article of articles) {
      const html = render(`/writing/${article.slug}/`);
      expect(count(html, article.title)).toBe(1);
      expect(html).toContain(`href="${article.canonicalUrl}"`);
    }
  });

  it('links every section with real hrefs so navigation works without JS', () => {
    for (const path of allPaths()) {
      const html = render(path);
      for (const href of ['/', '/products/', '/background/', '/writing/', '/now/', '/speaking/']) {
        expect(html, `${path} -> ${href}`).toContain(`href="${href}"`);
      }
      expect(html, path).not.toContain('<button');
    }
  });

  it('marks exactly one section as the current page', () => {
    for (const path of ['/', '/products/', '/writing/', '/now/']) {
      const html = render(path);
      expect(html.match(/aria-current="page"/g)?.length, path).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders a not-found page', () => {
    expect(render(NOT_FOUND_PATH)).toContain('Page not found');
  });
});
