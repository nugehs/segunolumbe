import { useEffect, useState, type MouseEvent } from 'react';
import ArticleBody from './components/ArticleBody';
import { articles } from './data/articles';
import { pages } from './data/pages';
import { pageModes, sectionLabel, sectionNote, workModes } from './data/sections';
import { headFor, syncHead } from './head';
import { catalog, itemPath, resolveRoute, sectionPath, type Mode } from './routes';

type Props = {
  /** Server passes the path being prerendered; the client passes location.pathname. */
  initialPath: string;
};

export default function App({ initialPath }: Props) {
  const [path, setPath] = useState(initialPath);
  const route = resolveRoute(path);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    syncHead(headFor(resolveRoute(path)));
  }, [path]);

  // Every page is prerendered, so links work without JS; with JS, skip the reload.
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;
    event.preventDefault();
    if (href !== window.location.pathname) window.history.pushState(null, '', href);
    setPath(href);
  }

  const mode: Mode | null = route.kind === 'not-found' ? null : route.mode;

  function current(href: string, active: boolean) {
    if (href === route.path) return 'page';
    return active ? 'true' : undefined;
  }

  const modeNote =
    route.kind === 'work'
      ? sectionNote[route.mode]
      : route.kind === 'writing'
        ? pages.writing.body
        : null;

  return (
    <div className="shell">
      <aside className="identity">
        <div className="identity-top">
          <p className="mark">Olumbe</p>
          <figure className="portrait">
            <img
              src={`${import.meta.env.BASE_URL}me.jpg`}
              alt="Oluwasegun Olumbe"
              width={825}
              height={1100}
            />
          </figure>
          <h1>
            Oluwasegun
            <span>Olumbe</span>
          </h1>
          <p className="role">Founder & software architect</p>
          <p className="tagline">Static analysis, never the model.</p>
          <p className="bio">
            Founder of <b>BashBop</b>. I build deterministic tools that make AI software safer,
            faster, and more reliable: context, contracts, compliance, governance. Local-first.
            MCP-native.
          </p>
        </div>
        <div className="identity-links">
          <a href="https://github.com/nugehs">GitHub</a>
          <a href="https://www.npmjs.com/~davidolu">npm</a>
          <a href="https://registry.modelcontextprotocol.io/?q=nugehs">MCP</a>
          <a href="https://www.linkedin.com/in/segunolumbe/">LinkedIn</a>
          <a href={`${import.meta.env.BASE_URL}olumbe-cv.pdf`}>Resume</a>
          <a href="mailto:info@bashbop.com">Email</a>
        </div>
      </aside>

      <main className="stage">
        <nav className="modebar" aria-label="Work">
          {workModes.map((m) => {
            const href = sectionPath(m);
            return (
              <a
                key={m}
                href={href}
                className={mode === m ? 'mode on' : 'mode'}
                aria-current={current(href, mode === m)}
                onClick={navigate}
              >
                {sectionLabel[m]}
              </a>
            );
          })}
        </nav>

        <nav className="pagenav" aria-label="More">
          {pageModes.map((m) => {
            const href = sectionPath(m);
            return (
              <a
                key={m}
                href={href}
                className={mode === m ? 'page-link on' : 'page-link'}
                aria-current={current(href, mode === m)}
                onClick={navigate}
              >
                {sectionLabel[m]}
              </a>
            );
          })}
        </nav>

        {modeNote ? <p className="mode-note">{modeNote}</p> : null}

        {route.kind === 'work' ? (
          <div className="work">
            <nav className="roster" aria-label={sectionLabel[route.mode]}>
              {catalog[route.mode].map((item) => {
                const href = itemPath(route.mode, item.slug);
                const on = item.slug === route.item.slug;
                return (
                  <a
                    key={item.slug}
                    href={href}
                    className={on ? 'roster-item on' : 'roster-item'}
                    aria-current={current(href, on)}
                    onClick={navigate}
                  >
                    <span className="roster-name">{item.name}</span>
                    <span className="roster-dom">{item.domain}</span>
                  </a>
                );
              })}
            </nav>

            <article className="detail" key={route.path}>
              <p className="detail-dom">{route.item.domain}</p>
              <h2>{route.item.name}</h2>
              <p className="detail-what">{route.item.what}</p>
              {route.item.links.length > 0 ? (
                <div className="detail-links">
                  {route.item.links.map((link) => (
                    <a key={link.href} className={link.site ? 'site' : undefined} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          </div>
        ) : route.kind === 'writing' ? (
          <div className="work">
            <nav className="roster" aria-label="Articles">
              {articles.map((item) => {
                const href = itemPath('writing', item.slug);
                const on = item.slug === route.article.slug;
                return (
                  <a
                    key={item.slug}
                    href={href}
                    className={on ? 'roster-item on' : 'roster-item'}
                    aria-current={current(href, on)}
                    onClick={navigate}
                  >
                    <span className="roster-name">{item.shortTitle}</span>
                    <span className="roster-dom">{item.domain}</span>
                  </a>
                );
              })}
            </nav>

            <article className="detail detail-article" key={route.path}>
              <p className="detail-dom">{route.article.category}</p>
              <h2 className="detail-title-article">{route.article.title}</h2>
              <p className="detail-what">{route.article.description}</p>
              <ArticleBody markdown={route.article.body} />
              <div className="detail-links">
                <a className="site" href={route.article.canonicalUrl}>
                  read on geekienews ↗
                </a>
                <a href="https://geekienews.com/rss.xml">rss ↗</a>
              </div>
            </article>
          </div>
        ) : route.kind === 'page' ? (
          <article className="detail detail-full" key={route.path}>
            <p className="detail-dom">{pages[route.mode].domain}</p>
            <h2>{pages[route.mode].title}</h2>
            <p className="detail-what">{pages[route.mode].body}</p>
            <div className="detail-links">
              <a className="site" href="mailto:info@bashbop.com">
                get in touch ↗
              </a>
            </div>
          </article>
        ) : (
          <article className="detail detail-full">
            <p className="detail-dom">404</p>
            <h2>Page not found</h2>
            <p className="detail-what">Nothing lives at that address. The work is one click away.</p>
            <div className="detail-links">
              <a className="site" href="/" onClick={navigate}>
                see the work
              </a>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
