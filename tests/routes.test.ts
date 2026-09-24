import { describe, expect, it } from 'vitest';
import { articles } from '../src/data/articles';
import { allPaths, catalog, normalizePath, resolveRoute, type WorkMode } from '../src/routes';

describe('routes', () => {
  it('serves the open-source section, first tool, at /', () => {
    const route = resolveRoute('/');
    expect(route.kind).toBe('work');
    if (route.kind === 'work') {
      expect(route.mode).toBe('tools');
      expect(route.item).toBe(catalog.tools[0]);
    }
  });

  it('resolves every prerendered path back to itself', () => {
    const paths = allPaths();
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      const route = resolveRoute(path);
      expect(route.kind, path).not.toBe('not-found');
      expect(route.path).toBe(path);
    }
  });

  it('gives every card and article a unique URL-safe slug', () => {
    const groups = [
      ...(Object.keys(catalog) as WorkMode[]).map((mode) => catalog[mode].map((item) => item.slug)),
      articles.map((article) => article.slug),
    ];
    for (const slugs of groups) {
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('prerenders a page for every card and article', () => {
    const paths = new Set(allPaths());
    for (const item of catalog.tools) expect(paths).toContain(`/open-source/${item.slug}/`);
    for (const item of catalog.products) expect(paths).toContain(`/products/${item.slug}/`);
    for (const item of catalog.stack) expect(paths).toContain(`/background/${item.slug}/`);
    for (const article of articles) expect(paths).toContain(`/writing/${article.slug}/`);
    for (const page of ['/products/', '/background/', '/writing/', '/now/', '/speaking/']) {
      expect(paths).toContain(page);
    }
  });

  it('normalizes missing trailing slashes, index.html, and doubled slashes', () => {
    expect(normalizePath('/products')).toBe('/products/');
    expect(normalizePath('/products/index.html')).toBe('/products/');
    expect(normalizePath('/index.html')).toBe('/');
    expect(normalizePath('//now//')).toBe('/now/');
    expect(normalizePath('now')).toBe('/now/');
  });

  it('treats unknown sections, unknown slugs, and extra segments as not found', () => {
    for (const path of ['/nope/', '/products/nope/', '/now/extra/', '/products/bashbop/extra/', '/404/']) {
      expect(resolveRoute(path).kind, path).toBe('not-found');
    }
  });
});
