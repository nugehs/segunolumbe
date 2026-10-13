import { useEffect, useState, type MouseEvent } from 'react';
import ArticleBody from './components/ArticleBody';
import CaseStudy from './components/CaseStudy';
import { articles } from './data/articles';
import { pages } from './data/pages';
import { pageModes, sectionLabel, sectionNote, workModes } from './data/sections';
import { skills } from './data/skills';
import { headFor, syncHead } from './head';
import { catalog, itemPath, resolveRoute, sectionPath, type Mode } from './routes';

type Props = {
  /** Server passes the path being prerendered; the client passes location.pathname. */
  initialPath: string;
};

const sections: Mode[] = [...workModes, ...pageModes];

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
    if (href !== window.location.pathname) {
      window.history.pushState(null, '', href);
      window.scrollTo(0, 0);
    }
    setPath(href);
  }

  const mode: Mode | null = route.kind === 'not-found' ? null : route.mode;
  const isHome = route.kind === 'work' && route.mode === 'tools' && route.isSectionRoot;

  function current(href: string, active: boolean) {
    if (href === route.path) return 'page';
    return active ? 'true' : undefined;
  }

  const identityLinks = (
    <div className="identity-links">
      <a href="https://github.com/nugehs">GitHub</a>
      <a href="https://www.npmjs.com/~davidolu">npm</a>
      <a href="https://registry.modelcontextprotocol.io/?q=nugehs">MCP</a>
      <a href="https://www.linkedin.com/in/segunolumbe/">LinkedIn</a>
      <a href={`${import.meta.env.BASE_URL}olumbe-cv.pdf`}>Resume</a>
      <a href="mailto:info@bashbop.com">Email</a>
    </div>
  );

  // The home page's h1 is the name, so its section heading drops a level.
  const SectionHeading = isHome ? 'h2' : 'h1';
  const EntryHeading = isHome ? 'h3' : 'h2';

  return (
    <div className="shell">
      <header className="masthead">
        <a className="mark" href="/" onClick={navigate}>
          Segun Olumbe
        </a>
        <nav className="sections" aria-label="Sections">
          {sections.map((m) => {
            const href = sectionPath(m);
            return (
              <a
                key={m}
                href={href}
                className={mode === m ? 'section-link on' : 'section-link'}
                aria-current={current(href, mode === m)}
                onClick={navigate}
              >
                {sectionLabel[m]}
              </a>
            );
          })}
        </nav>
      </header>

      <main className="stage">
        {isHome ? (
          <section className="hero" aria-label="About">
            <figure className="portrait">
              <img
                src={`${import.meta.env.BASE_URL}me.jpg`}
                alt="Oluwasegun Olumbe"
                width={825}
                height={1100}
              />
            </figure>
            <div className="hero-copy">
              <p className="role">Founder & software architect</p>
              <h1>
                Oluwasegun
                <span>Olumbe</span>
              </h1>
              <p className="tagline">Static analysis, never the model.</p>
              <p className="bio">
                Founder of <b>BashBop</b>. I build deterministic tools that make AI software safer,
                faster, and more reliable: context, contracts, compliance, governance. Local-first.
                MCP-native.
              </p>
              {identityLinks}
            </div>
          </section>
        ) : null}

        {isHome ? (
          <section className="skills-band" aria-label="Skills">
            <dl className="skills">
              {skills.map((group) => (
                <div key={group.area}>
                  <dt>{group.area}</dt>
                  <dd>{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {route.kind === 'work' && route.isSectionRoot ? (
          <section className="page" aria-labelledby="section-title">
            <header className="section-head">
              <SectionHeading id="section-title">{sectionLabel[route.mode]}</SectionHeading>
              <p className="mode-note">{sectionNote[route.mode]}</p>
            </header>
            <ol className="index">
              {catalog[route.mode].map((item, position) => {
                const href = itemPath(route.mode, item.slug);
                const site = item.links.find((link) => link.site);
                return (
                  <li key={item.slug} className="entry">
                    <span className="entry-num" aria-hidden="true">
                      {String(position + 1).padStart(2, '0')}
                    </span>
                    <div className="entry-head">
                      <EntryHeading className="entry-name">
                        <a href={href} onClick={navigate}>
                          {item.name}
                        </a>
                      </EntryHeading>
                      <p className="entry-dom">{item.domain}</p>
                    </div>
                    <div className="entry-body">
                      <p className="entry-what">{item.what}</p>
                      {item.stack ? (
                        <ul className="chips" aria-label="Stack">
                          {item.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      ) : null}
                      {item.caseStudy ? (
                        <div className="detail-links">
                          <a className="site" href={href} onClick={navigate}>
                            case study →
                          </a>
                          {site ? <a href={site.href}>{site.label}</a> : null}
                        </div>
                      ) : item.links.length > 0 ? (
                        <div className="detail-links">
                          {item.links.map((link) => (
                            <a key={link.href} className={link.site ? 'site' : undefined} href={link.href}>
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : route.kind === 'work' ? (
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
              <h1>{route.item.name}</h1>
              <p className="detail-what">{route.item.what}</p>
              {route.item.stack ? (
                <ul className="chips" aria-label="Stack">
                  {route.item.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}
              {route.item.links.length > 0 ? (
                <div className="detail-links">
                  {route.item.links.map((link) => (
                    <a key={link.href} className={link.site ? 'site' : undefined} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
              {route.item.caseStudy ? <CaseStudy study={route.item.caseStudy} /> : null}
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
              <p className="mode-note">{pages.writing.body}</p>
              <p className="detail-dom">{route.article.category}</p>
              <h1 className="detail-title-article">{route.article.title}</h1>
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
            <h1>{pages[route.mode].title}</h1>
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
            <h1>Page not found</h1>
            <p className="detail-what">Nothing lives at that address. The work is one click away.</p>
            <div className="detail-links">
              <a className="site" href="/" onClick={navigate}>
                see the work
              </a>
            </div>
          </article>
        )}
      </main>

      {isHome ? null : (
        <footer className="footer">
          <p className="tagline">Static analysis, never the model.</p>
          {identityLinks}
        </footer>
      )}
    </div>
  );
}
