import { describe, expect, it } from 'vitest';
import { articles } from '../src/data/articles';
import { pages } from '../src/data/pages';
import { NOT_FOUND_PATH, render } from '../src/entry-server';
import { allPaths, catalog, itemPath, sectionPath, type WorkMode } from '../src/routes';

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

  it('lists every card on its section page, each linked to its own page', () => {
    for (const mode of Object.keys(catalog) as WorkMode[]) {
      const path = sectionPath(mode);
      const html = render(path);
      for (const item of catalog[mode]) {
        expect(count(html, item.what), `${path} ${item.slug}`).toBe(1);
        expect(html, `${path} ${item.slug}`).toContain(`href="${itemPath(mode, item.slug)}"`);
      }
    }
  });

  it('renders a case study on its own page only, with every section it has content for', () => {
    for (const mode of Object.keys(catalog) as WorkMode[]) {
      for (const item of catalog[mode]) {
        const html = render(itemPath(mode, item.slug));
        const study = item.caseStudy;
        if (!study) {
          expect(html, item.slug).not.toContain('class="case-study"');
          continue;
        }
        expect(count(html, study.problem), item.slug).toBe(1);
        for (const decision of study.decisions) {
          // A title is short enough to recur in the prose, so count its heading.
          expect(html.split(`<h3>${escape(decision.chose)}</h3>`).length - 1, item.slug).toBe(1);
          expect(count(html, decision.why), item.slug).toBe(1);
        }
        for (const layer of study.architecture.layers) {
          for (const node of layer.nodes) expect(count(html, node.role), `${item.slug} ${node.name}`).toBe(1);
        }
        for (const id of ['problem', 'constraints', 'architecture', 'decisions', 'what-broke', 'outcome']) {
          expect(html, `${item.slug} #${id}`).toContain(`href="#${id}"`);
          expect(html, `${item.slug} #${id}`).toContain(`id="${id}"`);
        }
      }
    }
  });

  it('gives every page exactly one h1 and no placeholder text', () => {
    for (const path of [...allPaths(), NOT_FOUND_PATH]) {
      const html = render(path);
      expect(html.match(/<h1[\s>]/g)?.length, path).toBe(1);
      expect(html, path).not.toMatch(/\bTODO\b/);
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
