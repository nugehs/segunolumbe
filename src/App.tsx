import { useState } from 'react';
import type { Card as WorkItem } from './data/products';
import { products } from './data/products';
import { stack } from './data/stack';
import { tools } from './data/tools';

type Mode = 'stack' | 'products' | 'tools';

const catalog: Record<Mode, WorkItem[]> = {
  stack,
  products,
  tools,
};

const modes: { id: Mode; label: string; note: string }[] = [
  {
    id: 'stack',
    label: 'Stack',
    note: 'NBCUniversal streaming work, toolkit, compliance, and AI.',
  },
  {
    id: 'products',
    label: 'Side projects',
    note: 'A few things I built in my spare time.',
  },
  {
    id: 'tools',
    label: 'Open source',
    note: 'Small packages on npm and the MCP registry. Gate ties the rest together.',
  },
];

const rosterLabel: Record<Mode, string> = {
  stack: 'Stack',
  products: 'Side projects',
  tools: 'Open source',
};

export default function App() {
  const [mode, setMode] = useState<Mode>('stack');
  const [selected, setSelected] = useState<string>(stack[0].name);

  const items = catalog[mode];
  const active = items.find((item) => item.name === selected) ?? items[0];

  function switchMode(next: Mode) {
    setMode(next);
    setSelected(catalog[next][0].name);
  }

  function pick(item: WorkItem) {
    setSelected(item.name);
  }

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
          <p className="role">Software engineer</p>
          <p className="bio">
            Software engineer on streaming clients used by millions. In my spare time I build small
            apps and open-source tools, usually because I hit the same problem twice and got tired of
            guessing.
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
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls="work-panel"
              className={mode === m.id ? 'mode on' : 'mode'}
              onClick={() => switchMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <p className="mode-note">{modes.find((m) => m.id === mode)?.note}</p>

        <div className="work" id="work-panel" role="tabpanel" aria-labelledby={`tab-${mode}`}>
          <nav className="roster" aria-label={rosterLabel[mode]}>
            {items.map((item) => (
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
      </main>
    </div>
  );
}
