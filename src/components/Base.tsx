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
            <div className="fcol fcol-wide">
              <div className="id fbrand">
                <img className="mk" src={logo} alt="Segun Olumbe" />
                OLUMBE
              </div>
              <p className="fblurb">
                Engineer and founder in London. BashBop pays some of the bills; Snap A Bird was for
                my kid.
              </p>
            </div>
            <div className="fcol">
              <h5>Products</h5>
              <a href="https://bashbop.com">BashBop ↗</a>
              <a href="https://brainboostbuddy.com">Brain Boost Buddy ↗</a>
              <a href="https://snapabird.com">Snap A Bird ↗</a>
            </div>
            <div className="fcol">
              <h5>Open source</h5>
              <a href="https://www.npmjs.com/package/@nugehs/gate">gate</a>
              <a href="https://www.npmjs.com/package/@nugehs/repoctx">repoctx</a>
              <a href="https://www.npmjs.com/package/@nugehs/tieline">tieline</a>
              <a href="https://www.npmjs.com/package/@nugehs/bouncer">bouncer</a>
              <a href="https://www.npmjs.com/package/@nugehs/aiglare">aiglare</a>
            </div>
            <div className="fcol">
              <h5>Contact</h5>
              <a href="https://github.com/nugehs">github ↗</a>
              <a href="https://www.npmjs.com/search?q=%40nugehs">npm ↗</a>
              <a href="mailto:info@bashbop.com">info@bashbop.com</a>
            </div>
          </div>
          <div className="fnote">
            <span>© 2026 Oluwasegun Olumbe</span>
          </div>
        </div>
      </footer>
    </>
  );
}
