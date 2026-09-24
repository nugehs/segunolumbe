import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { articles } from '../src/data/articles';
import { applyHead, headFor, SITE_URL, summarize } from '../src/head';
import { allPaths, NOT_FOUND_PATH, resolveRoute } from '../src/routes';

const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

describe('page head', () => {
  it('gives every indexable page its own title and canonical URL', () => {
    const heads = allPaths()
      .filter((path) => path !== '/open-source/')
      .map((path) => headFor(resolveRoute(path)));
    expect(new Set(heads.map((head) => head.title)).size).toBe(heads.length);
    expect(new Set(heads.map((head) => head.canonical)).size).toBe(heads.length);
    for (const head of heads) {
      expect(head.noindex).toBe(false);
      expect(head.canonical).toMatch(/^https:\/\//);
      expect(head.description.length).toBeLessThanOrEqual(160);
    }
  });

  it('canonicalises /open-source/ to the home page', () => {
    expect(headFor(resolveRoute('/open-source/')).canonical).toBe(`${SITE_URL}/`);
  });

  it('points article pages at their canonical copy on GeekieNews', () => {
    for (const article of articles) {
      expect(headFor(resolveRoute(`/writing/${article.slug}/`)).canonical).toBe(article.canonicalUrl);
    }
  });

  it('marks the 404 page noindex', () => {
    const html = applyHead(template, headFor(resolveRoute(NOT_FOUND_PATH)));
    expect(html).toContain('<meta name="robots" content="noindex" />');
  });

  it('writes a route head into the real index.html', () => {
    const head = headFor(resolveRoute('/products/snap-a-bird/'));
    const html = applyHead(template, head);
    expect(html).toContain(`<title>${head.title}</title>`);
    expect(html).toContain(`<link rel="canonical" href="${SITE_URL}/products/snap-a-bird/" />`);
    expect(html).toContain(`<meta property="og:url" content="${SITE_URL}/products/snap-a-bird/" />`);
    expect(html).toContain(`<meta name="twitter:title" content="${head.title}" />`);
    expect(html).not.toContain('noindex');
  });

  it('escapes quotes and ampersands in head values', () => {
    const html = applyHead(template, {
      title: 'A & "B"',
      description: '<x>',
      canonical: `${SITE_URL}/`,
      noindex: false,
    });
    expect(html).toContain('<title>A &amp; &quot;B&quot;</title>');
    expect(html).toContain('<meta name="description" content="&lt;x&gt;" />');
  });

  it('fails loudly if index.html loses a tag it rewrites', () => {
    const broken = template.replace(/<meta property="og:title"[^>]*>/, '');
    expect(() => applyHead(broken, headFor(resolveRoute('/')))).toThrow(/og:title/);
  });

  it('summarizes on a word boundary', () => {
    expect(summarize('short')).toBe('short');
    const long = summarize('word '.repeat(60));
    expect(long.length).toBeLessThanOrEqual(160);
    expect(long.endsWith('word…')).toBe(true);
  });
});
