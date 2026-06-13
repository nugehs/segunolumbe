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
            <p className="stamp rv">South London</p>
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
                Four CLI packages on npm. I use them in CI before I trust an agent with the same
                question.
              </p>
            </header>
            {tools.map((t) => (
              <Card key={t.name} {...t} />
            ))}
          </div>
        </section>
      </main>
    </Base>
  );
}
