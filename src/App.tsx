import Base from './components/Base';
import Card from './components/Card';
import { products } from './data/products';
import { tools } from './data/tools';

export default function App() {
  return (
    <Base>
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <p className="stamp rv">Engineer &amp; Founder · South London · 3 products, 5 open-source tools</p>
            <h1 className="rv">
              <span>Oluwasegun</span>
              <span className="l2">
                <span className="em">Olumbe.</span>
              </span>
            </h1>
            <p className="sub rv">
              I write software for a living and run <b>BashBop</b>, an events company, on the side.
              Most of my open-source work started because I hit the same problem twice in my own
              repos and got tired of guessing.
            </p>
          </div>
        </section>

        <section id="products">
          <div className="wrap">
            <header className="shead rv">
              <h2>Products</h2>
              <p className="snote">
                All under BashBop Ltd. Events pay the bills; the other two started at my kitchen
                table.
              </p>
            </header>
            {products.map((p) => (
              <Card key={p.name} {...p} />
            ))}
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <header className="shead rv">
              <h2>Open source</h2>
              <p className="snote">
                A deterministic governance toolchain. Four checks — AI governance, compliance,
                contract drift, merge readiness — unified by <b>gate</b> into one ship/no-ship
                verdict. Local-first, runs in CI, callable by agents over MCP.
              </p>
              <p className="strust mono rv">
                published on npm · gate also ships to the VS Code Marketplace + Open VSX (Cursor)
              </p>
            </header>
            <Card key={tools[0].name} {...tools[0]} lead />
            <p className="tgroup mono rv">the four it runs ↓</p>
            {tools.slice(1).map((t) => (
              <Card key={t.name} {...t} />
            ))}
          </div>
        </section>
      </main>
    </Base>
  );
}
