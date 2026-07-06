import { useState } from 'react';
import type { Card as WorkItem } from './data/products';
import { products } from './data/products';
import { pages, type PageMode } from './data/pages';
import { stack } from './data/stack';
import { tools } from './data/tools';

type WorkMode = 'tools' | 'products' | 'stack';
type Mode = WorkMode | PageMode;

const catalog: Record<WorkMode, WorkItem[]> = {
  tools,
  products,
  stack,
};

const workModes: { id: WorkMode; label: string; note: string }[] = [
  {
    id: 'tools',
    label: 'Open source',
    note:
      'Context, contracts, compliance, governance. One verdict in CI, in your editor, and in the agent. Local-first. MCP-native. Static analysis, never the model.',
  },
  {
    id: 'products',
    label: 'Products',
    note: 'Commercial products and apps. Proof I ship real systems.',
  },
  {
    id: 'stack',
    label: 'Background',
    note: 'Day job at NBCUniversal, toolkit, and the engineering behind the tools.',
  },
];

const pageModes: { id: PageMode; label: string }[] = [
  { id: 'writing', label: 'Writing' },
  { id: 'now', label: 'Now' },
  { id: 'speaking', label: 'Speaking' },
];

const rosterLabel: Record<WorkMode, string> = {
  tools: 'Open source',
  products: 'Products',
  stack: 'Background',
};

function isWorkMode(mode: Mode): mode is WorkMode {
  return mode in catalog;
}

export default function App() {
  const [mode, setMode] = useState<Mode>('tools');
  const [selected, setSelected] = useState<string>(tools[0].name);

  const workItems = isWorkMode(mode) ? catalog[mode] : null;
  const active =
    workItems?.find((item) => item.name === selected) ?? workItems?.[0] ?? null;
  const page = !isWorkMode(mode) ? pages[mode] : null;

  function switchWork(next: WorkMode) {
    setMode(next);
    setSelected(catalog[next][0].name);
  }

  function switchPage(next: PageMode) {
    setMode(next);
  }

  function pick(item: WorkItem) {
    setSelected(item.name);
  }

  const modeNote = isWorkMode(mode)
    ? workModes.find((m) => m.id === mode)?.note
    : page?.body;

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
          <a href="https://www.npmjs.com/search?q=%40nugehs">npm</a>
          <a href="https://registry.modelcontextprotocol.io/?q=nugehs">MCP</a>
          <a href="mailto:info@bashbop.com">Email</a>
        </div>
      </aside>

      <main className="stage">
        <div className="modebar" role="tablist" aria-label="Work">
          {workModes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls="work-panel"
              className={mode === m.id ? 'mode on' : 'mode'}
              onClick={() => switchWork(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <nav className="pagenav" aria-label="More">
          {pageModes.map((m) => (
            <button
              key={m.id}
              type="button"
              className={mode === m.id ? 'page-link on' : 'page-link'}
              aria-current={mode === m.id ? 'page' : undefined}
              onClick={() => switchPage(m.id)}
            >
              {m.label}
            </button>
          ))}
        </nav>

        {isWorkMode(mode) && modeNote ? <p className="mode-note">{modeNote}</p> : null}

        {isWorkMode(mode) && active ? (
          <div className="work" id="work-panel" role="tabpanel" aria-labelledby={`tab-${mode}`}>
            <nav className="roster" aria-label={rosterLabel[mode]}>
              {workItems!.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={item.name === active.name ? 'roster-item on' : 'roster-item'}
                  aria-current={item.name === active.name ? 'true' : undefined}
                  onClick={() => pick(item)}
                >
                  <span className="roster-name">{item.name}</span>
                  <span className="roster-dom">{item.domain}</span>
                </button>
              ))}
            </nav>

            <article className="detail" key={`${mode}-${active.name}`}>
              <p className="detail-dom">{active.domain}</p>
              <h2>{active.name}</h2>
              <p className="detail-what">{active.what}</p>
              {active.links.length > 0 ? (
                <div className="detail-links">
                  {active.links.map((link) => (
                    <a key={link.href} className={link.site ? 'site' : undefined} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          </div>
        ) : page ? (
          <article className="detail detail-full" key={mode}>
            <p className="detail-dom">{page.domain}</p>
            <h2>{page.title}</h2>
            <p className="detail-what">{page.body}</p>
            <div className="detail-links">
              <a className="site" href="mailto:info@bashbop.com">
                get in touch ↗
              </a>
            </div>
          </article>
        ) : null}
      </main>
    </div>
  );
}
