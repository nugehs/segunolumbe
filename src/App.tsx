import Base from './components/Base';
import Card from './components/Card';
import DailyQuote from './components/DailyQuote';
import { products } from './data/products';
import { tools } from './data/tools';

export default function App() {
  return (
    <Base>
      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="stamp rv">
              <span>London</span>
              <span className="pipe">/</span>
              <b>full-stack engineer</b>
              <span className="pipe">/</span>
              <b>founder</b>
              <span className="pipe">/</span>
              <span>builder</span>
            </div>
            <h1 className="rv">
              <span>Oluwasegun</span>
              <span className="l2">
                <span className="em">Olumbe.</span>
              </span>
            </h1>
            <p className="sub rv">
              I'm a full-stack engineer in South London. I build commerce systems at <b>Sky</b>, run{' '}
              <b>BashBop</b> on the side, and write small open-source tools when something annoys me
              enough.{' '}
              <span className="a">The common thread: I don't trust black boxes.</span> If a piece of
              software is making a call that matters, I want to be able to open it up and see exactly
              why it decided what it decided.
            </p>
            <DailyQuote />
            <div className="who rv">
              $ whoami
              <br />
              <b>senior full-stack</b> @ sky · <b>founder</b> @ bashbop ltd · author of repoctx,
              tieline, bouncer, aiglare
            </div>
          </div>
        </section>

        <div className="thesis">
          <div className="wrap">
            <div className="thesis-head rv">
              <span className="kick">
                <span className="sq"></span>How I build
              </span>
            </div>
            <div className="trow">
              <div className="tcell rv">
                <div className="num">[ 01 ]</div>
                <h3>No black boxes</h3>
                <p>
                  If the decision matters, I can show you the line of code that made it. No "the
                  model thought so."
                </p>
              </div>
              <div className="tcell rv">
                <div className="num">[ 02 ]</div>
                <h3>Same answer twice</h3>
                <p>
                  Run it now, run it next week — identical result. I'd rather a tool be predictable
                  than smart.
                </p>
              </div>
              <div className="tcell rv">
                <div className="num">[ 03 ]</div>
                <h3>Works without the agent</h3>
                <p>
                  Everything starts as a CLI a person actually uses. The agent integration comes
                  after it's earned its keep.
                </p>
              </div>
              <div className="tcell rv">
                <div className="num">[ 04 ]</div>
                <h3>Built for someone</h3>
                <p>
                  An event organiser, my bird-obsessed kid, an engineer mid-review. Real person,
                  real problem, or I don't build it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="products">
          <div className="wrap">
            <div className="shead rv">
              <div className="lhs">
                <div className="kick">
                  <span className="sq"></span>Things I've built — products
                </div>
                <h2>The stuff with users.</h2>
                <p>
                  Two live products, both under BashBop Ltd. One pays the bills, one started as a
                  conversation with my son.
                </p>
              </div>
              <div className="idx">live</div>
            </div>
            {products.map((p) => (
              <Card key={p.name} badge={p.mark} {...p} />
            ))}
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <div className="shead rv">
              <div className="lhs">
                <div className="kick">
                  <span className="sq"></span>Things I've built — open source
                </div>
                <h2>Four tools that say no.</h2>
                <p>
                  Each one answers a yes/no question people keep trying to hand to an LLM — should
                  this merge, did the contract break, is this compliant, can this AI output do real
                  damage — and answers it with static analysis instead. Free, MIT, on npm.
                </p>
              </div>
              <div className="idx">04 / open-source</div>
            </div>
            {tools.map((t) => (
              <Card key={t.name} badge={t.idx} {...t} />
            ))}
          </div>
        </section>

        <section className="how" id="how">
          <div className="wrap">
            <div className="shead rv" style={{ borderColor: 'rgba(255,255,255,.16)' }}>
              <div className="lhs">
                <div className="kick">
                  <span className="sq"></span>How I build
                </div>
                <h2>Same rule, every time.</h2>
              </div>
            </div>
            <div className="hgrid">
              <div className="hc rv">
                <div className="n">→ the engine</div>
                <h4>Code decides, not vibes</h4>
                <p>
                  The answer comes from parsing what's actually there — syntax trees, contracts,
                  rule packs. Never a guess dressed up as a probability.
                </p>
              </div>
              <div className="hc rv">
                <div className="n">→ the surface</div>
                <h4>A person uses it first</h4>
                <p>
                  If it isn't useful as a command a developer runs by hand, it isn't useful. That's
                  the test before anything else gets bolted on.
                </p>
              </div>
              <div className="hc rv">
                <div className="n">→ the agent</div>
                <h4>The model reads the verdict</h4>
                <p>
                  There's an MCP server, so an agent can call the tool and act on what it says. It
                  acts on the answer. It never gets to be the answer.
                </p>
              </div>
            </div>
            <p className="pull rv">
              The expensive failures I've seen weren't the model being wrong. They were{' '}
              <span className="a">nobody checking</span> — something irreversible went off with no
              deterministic step in the way.
            </p>
          </div>
        </section>
      </main>
    </Base>
  );
}
