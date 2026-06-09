import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

const logo = `${import.meta.env.BASE_URL}logo.png`;

type Props = { children: ReactNode };

export default function Base({ children }: Props) {
  useReveal();

  return (
    <>
      <header>
        <div className="wrap">
          <nav>
            <a className="id" href="#top">
              <img className="mk" src={logo} alt="Segun Olumbe" />
              OLUMBE
            </a>
            <div className="nlx">
              <a href="#products">products</a>
              <a href="#work">open source</a>
              <a href="#how">how i build</a>
              <a className="cta" href="https://github.com/nugehs">
                github ↗
              </a>
            </div>
          </nav>
        </div>
      </header>

      {children}

      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div className="fcol" style={{ maxWidth: '32ch' }}>
              <div className="id" style={{ marginBottom: 16 }}>
                <img className="mk" src={logo} alt="Segun Olumbe" />
                OLUMBE
              </div>
              <p
                style={{
                  fontFamily: "'Spectral',serif",
                  fontStyle: 'italic',
                  color: 'var(--ink-3)',
                  fontSize: 15,
                  lineHeight: 1.5,
                }}
              >
                Engineer and founder in London. I build software you can open up and check — and the
                occasional bird app for my son.
              </p>
            </div>
            <div className="fcol">
              <h5>Products</h5>
              <a href="https://bashbop.com">BashBop ↗</a>
              <a href="https://snapabird.com">Snap A Bird ↗</a>
            </div>
            <div className="fcol">
              <h5>Open source</h5>
              <a href="https://www.npmjs.com/package/@nugehs/repoctx">repoctx</a>
              <a href="https://www.npmjs.com/package/@nugehs/tieline">tieline</a>
              <a href="https://www.npmjs.com/package/@nugehs/bouncer">bouncer</a>
              <a href="https://www.npmjs.com/package/@nugehs/aiglare">aiglare</a>
            </div>
            <div className="fcol">
              <h5>Elsewhere</h5>
              <a href="https://github.com/nugehs">github ↗</a>
              <a href="https://www.npmjs.com/search?q=%40nugehs">npm ↗</a>
              <a href="mailto:info@bashbop.com">email ↗</a>
            </div>
          </div>
          <div className="fnote">
            <span>© 2026 Oluwasegun Olumbe</span>
            <span>static analysis, never the model</span>
          </div>
        </div>
      </footer>
    </>
  );
}
