import { pages } from './data/pages';
import { sectionLabel, sectionNote } from './data/sections';
import type { Route } from './routes';

export const SITE_URL = 'https://segunolumbe.com';

const NAME = 'Oluwasegun Olumbe';
const HOME_TITLE = `${NAME}: founder & software architect`;
const HOME_DESCRIPTION =
  'Founder of BashBop. Building deterministic AI dev tools: gate, Òtítọ́, tieline, bouncer, aiglare. Static analysis, never the model. Local-first, MCP-native.';

export type Head = {
  title: string;
  description: string;
  /** Absolute URL. Articles point at GeekieNews, where they are canonical. */
  canonical: string;
  noindex: boolean;
};

/** Trim to a search-snippet length on a word boundary. */
export function summarize(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:]+$/, '')}…`;
}

const absolute = (path: string) => `${SITE_URL}${path}`;

export function headFor(route: Route): Head {
  switch (route.kind) {
    case 'work': {
      if (route.mode === 'tools' && route.isSectionRoot) {
        return { title: HOME_TITLE, description: HOME_DESCRIPTION, canonical: absolute('/'), noindex: false };
      }
      const label = sectionLabel[route.mode];
      if (route.isSectionRoot) {
        return {
          title: `${label} · ${NAME}`,
          description: sectionNote[route.mode],
          canonical: absolute(route.path),
          noindex: false,
        };
      }
      return {
        title: `${route.item.name} · ${label} · ${NAME}`,
        description: summarize(route.item.what),
        canonical: absolute(route.path),
        noindex: false,
      };
    }
    case 'writing':
      return route.isSectionRoot
        ? {
            title: `Writing · ${NAME}`,
            description: summarize(pages.writing.body),
            canonical: absolute(route.path),
            noindex: false,
          }
        : {
            title: `${route.article.title} · ${NAME}`,
            description: summarize(route.article.description),
            canonical: route.article.canonicalUrl,
            noindex: false,
          };
    case 'page': {
      const page = pages[route.mode];
      return {
        title: `${page.title} · ${NAME}`,
        description: summarize(page.body),
        canonical: absolute(route.path),
        noindex: false,
      };
    }
    case 'not-found':
      return {
        title: `Page not found · ${NAME}`,
        description: HOME_DESCRIPTION,
        canonical: absolute('/'),
        noindex: true,
      };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type TagRule = { pattern: RegExp; render: (head: Head) => string };

const tagRules: TagRule[] = [
  { pattern: /<title>[^<]*<\/title>/, render: (h) => `<title>${escapeHtml(h.title)}</title>` },
  {
    pattern: /<meta name="description" content="[^"]*" \/>/,
    render: (h) =>
      `<meta name="description" content="${escapeHtml(h.description)}" />` +
      (h.noindex ? '\n    <meta name="robots" content="noindex" />' : ''),
  },
  { pattern: /<link rel="canonical" href="[^"]*" \/>/, render: (h) => `<link rel="canonical" href="${escapeHtml(h.canonical)}" />` },
  { pattern: /<meta property="og:url" content="[^"]*" \/>/, render: (h) => `<meta property="og:url" content="${escapeHtml(h.canonical)}" />` },
  { pattern: /<meta property="og:title" content="[^"]*" \/>/, render: (h) => `<meta property="og:title" content="${escapeHtml(h.title)}" />` },
  {
    pattern: /<meta property="og:description" content="[^"]*" \/>/,
    render: (h) => `<meta property="og:description" content="${escapeHtml(h.description)}" />`,
  },
  { pattern: /<meta name="twitter:title" content="[^"]*" \/>/, render: (h) => `<meta name="twitter:title" content="${escapeHtml(h.title)}" />` },
  {
    pattern: /<meta name="twitter:description" content="[^"]*" \/>/,
    render: (h) => `<meta name="twitter:description" content="${escapeHtml(h.description)}" />`,
  },
];

/** Write a route's head into the built index.html. Throws if the template drifts, so a page never ships with the home page's tags. */
export function applyHead(template: string, head: Head): string {
  return tagRules.reduce((html, rule) => {
    const matches = html.match(new RegExp(rule.pattern.source, 'g'));
    if (matches?.length !== 1) {
      throw new Error(`applyHead: expected exactly one match for ${rule.pattern}, found ${matches?.length ?? 0}`);
    }
    return html.replace(rule.pattern, () => rule.render(head));
  }, template);
}

function setAttr(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/** Keep the live document's head in step after client-side navigation. */
export function syncHead(head: Head) {
  document.title = head.title;
  setAttr('meta[name="description"]', 'content', head.description);
  setAttr('link[rel="canonical"]', 'href', head.canonical);
  setAttr('meta[property="og:url"]', 'content', head.canonical);
  setAttr('meta[property="og:title"]', 'content', head.title);
  setAttr('meta[property="og:description"]', 'content', head.description);
  setAttr('meta[name="twitter:title"]', 'content', head.title);
  setAttr('meta[name="twitter:description"]', 'content', head.description);

  let robots = document.head.querySelector('meta[name="robots"]');
  if (head.noindex && !robots) {
    robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex');
    document.head.append(robots);
  } else if (!head.noindex) {
    robots?.remove();
  }
}
