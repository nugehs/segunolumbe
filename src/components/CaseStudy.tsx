import type { ReactNode } from 'react';
import type { ArchLayer, CaseStudy as Study } from '../data/products';

type Props = {
  study: Study;
};

function Boxes({ layer }: { layer: ArchLayer }) {
  return (
    <ul className="arch-boxes">
      {layer.nodes.map((node) => (
        <li key={node.name} className="arch-box">
          {node.name}
        </li>
      ))}
    </ul>
  );
}

/**
 * The picture: component names only, one row per layer, an arrow from each row into the next.
 * What each component does is in the key below it, so the drawing stays readable.
 */
function Figure({ number, layers, aside }: { number: number; layers: ArchLayer[]; aside?: ArchLayer }) {
  return (
    <figure className="arch">
      <ol className="arch-flow">
        {layers.map((layer) => (
          <li key={layer.label} className="arch-row">
            <p className="arch-label">{layer.label}</p>
            <Boxes layer={layer} />
          </li>
        ))}
      </ol>
      {aside ? (
        <div className="arch-row arch-aside">
          <p className="arch-label">{aside.label}</p>
          <Boxes layer={aside} />
        </div>
      ) : null}
      <figcaption>
        Figure {number}. Read top to bottom: each row feeds the one below it.
        {aside ? ' The dashed row sits outside that flow.' : ''}
      </figcaption>
    </figure>
  );
}

/** The words: every component in the figure, grouped by its row, with what it does. */
function Key({ layers }: { layers: ArchLayer[] }) {
  return (
    <div className="arch-key">
      {layers.map((layer) => (
        <div key={layer.label} className="key-group">
          <p className="key-label">{layer.label}</p>
          <dl>
            {layer.nodes.map((node) => (
              <div key={node.name} className="key-row">
                <dt>{node.name}</dt>
                <dd>{node.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export default function CaseStudy({ study }: Props) {
  const { architecture } = study;
  const mainLayers = [...architecture.layers, ...(architecture.aside ? [architecture.aside] : [])];

  // A section with nothing in it is left out, heading and all.
  const sections: { id: string; title: string; body: ReactNode }[] = [
    {
      id: 'problem',
      title: 'Problem',
      body: study.problem ? <p className="cs-lead">{study.problem}</p> : null,
    },
    {
      id: 'constraints',
      title: 'Constraints',
      body:
        study.constraints.length > 0 ? (
          <ul className="cs-list">
            {study.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        ) : null,
    },
    {
      id: 'architecture',
      title: 'Architecture',
      body:
        architecture.layers.length > 0 ? (
          <>
            <p className="cs-text">{architecture.intro}</p>
            <Figure number={1} layers={architecture.layers} aside={architecture.aside} />
            <Key layers={mainLayers} />
            {(architecture.more ?? []).map((part, index) => (
              <div key={part.title} className="arch-more">
                <h3>{part.title}</h3>
                <p className="cs-text">{part.intro}</p>
                <Figure number={index + 2} layers={part.layers} />
                <Key layers={part.layers} />
              </div>
            ))}
          </>
        ) : null,
    },
    {
      id: 'decisions',
      title: 'Key decisions',
      body:
        study.decisions.length > 0 ? (
          <ol className="decisions">
            {study.decisions.map((decision) => (
              <li key={decision.chose} className="decision">
                <div>
                  <h3>{decision.chose}</h3>
                  <p className="decision-over">
                    <span>Instead of:</span> {decision.over}
                  </p>
                </div>
                <p className="decision-why">{decision.why}</p>
              </li>
            ))}
          </ol>
        ) : null,
    },
    {
      id: 'what-broke',
      title: 'What broke, and the fix',
      body:
        study.broke.length > 0 ? (
          <ol className="breaks">
            {study.broke.map((entry) => (
              <li key={entry.what} className="break">
                <h3>{entry.what}</h3>
                <dl>
                  <dt>Cause</dt>
                  <dd>{entry.cause}</dd>
                  <dt>Fix</dt>
                  <dd>{entry.fix}</dd>
                </dl>
              </li>
            ))}
          </ol>
        ) : null,
    },
    {
      id: 'outcome',
      title: 'Outcome',
      body:
        study.outcome.length > 0 ? (
          <ul className="cs-list">
            {study.outcome.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null,
    },
  ].filter((section) => section.body !== null);

  if (sections.length === 0) return null;

  return (
    <div className="case-study">
      <nav className="cs-nav" aria-label="Case study">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
          </a>
        ))}
      </nav>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="cs-section" aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          {section.body}
        </section>
      ))}
    </div>
  );
}
