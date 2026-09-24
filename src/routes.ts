import { articles, type Article } from './data/articles';
import { pages, type PageMode } from './data/pages';
import { products, type Card } from './data/products';
import { stack } from './data/stack';
import { tools } from './data/tools';

export type WorkMode = 'tools' | 'products' | 'stack';
export type Mode = WorkMode | PageMode;

export const catalog: Record<WorkMode, Card[]> = {
  tools,
  products,
  stack,
};

/** URL segment for each mode. Changing one breaks inbound links. */
export const sectionSegment: Record<Mode, string> = {
  tools: 'open-source',
  products: 'products',
  stack: 'background',
  writing: 'writing',
  now: 'now',
  speaking: 'speaking',
};

export type Route =
  | { kind: 'work'; mode: WorkMode; item: Card; path: string; isSectionRoot: boolean }
  | { kind: 'writing'; mode: 'writing'; article: Article; path: string; isSectionRoot: boolean }
  | { kind: 'page'; mode: 'now' | 'speaking'; path: string }
  | { kind: 'not-found'; path: string };

export function isWorkMode(mode: Mode): mode is WorkMode {
  return mode in catalog;
}

/** Where a section tab points. Open source is the home page. */
export function sectionPath(mode: Mode): string {
  return mode === 'tools' ? '/' : `/${sectionSegment[mode]}/`;
}

export function itemPath(mode: WorkMode | 'writing', slug: string): string {
  return `/${sectionSegment[mode]}/${slug}/`;
}

/** `/products` and `/products/index.html` both mean `/products/`. */
export function normalizePath(pathname: string): string {
  let path = pathname.replace(/\/index\.html$/, '/').replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  return path;
}

const modeBySegment = new Map(
  (Object.entries(sectionSegment) as [Mode, string][]).map(([mode, segment]) => [segment, mode]),
);

export function resolveRoute(pathname: string): Route {
  const path = normalizePath(pathname);
  if (path === '/') {
    return { kind: 'work', mode: 'tools', item: tools[0], path, isSectionRoot: true };
  }

  const [segment, slug, ...rest] = path.split('/').filter(Boolean);
  const mode = modeBySegment.get(segment);
  if (!mode || rest.length > 0) return { kind: 'not-found', path };

  if (isWorkMode(mode)) {
    const items = catalog[mode];
    const item = slug ? items.find((candidate) => candidate.slug === slug) : items[0];
    return item
      ? { kind: 'work', mode, item, path, isSectionRoot: !slug }
      : { kind: 'not-found', path };
  }

  if (mode === 'writing') {
    const article = slug ? articles.find((candidate) => candidate.slug === slug) : articles[0];
    return article
      ? { kind: 'writing', mode, article, path, isSectionRoot: !slug }
      : { kind: 'not-found', path };
  }

  return slug ? { kind: 'not-found', path } : { kind: 'page', mode, path };
}

/** Every path the prerender writes, in sitemap order. `/open-source/` is served but canonicalises to `/`. */
export function allPaths(): string[] {
  const paths = ['/', '/open-source/'];
  for (const mode of Object.keys(catalog) as WorkMode[]) {
    if (mode !== 'tools') paths.push(sectionPath(mode));
    for (const item of catalog[mode]) paths.push(itemPath(mode, item.slug));
  }
  paths.push(sectionPath('writing'));
  for (const article of articles) paths.push(itemPath('writing', article.slug));
  for (const mode of Object.keys(pages) as PageMode[]) {
    if (mode !== 'writing') paths.push(sectionPath(mode));
  }
  return paths;
}

export const NOT_FOUND_PATH = '/404/';
