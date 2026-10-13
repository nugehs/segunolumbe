import type { ReactNode } from 'react';
import type { ArchLayer, ArchNode, CaseStudy as Study } from '../data/products';

type Props = {
  study: Study;
};

function Nodes({ nodes }: { nodes: ArchNode[] }) {
  return (
    <ul className="arch-nodes">
      {nodes.map((node) => (
        <li key={node.name} className="arch-node">
          <strong>{node.name}</strong>
          <span>{node.role}</span>
        </li>
      ))}
    </ul>
  );
}

function Layers({ layers }: { layers: ArchLayer[] }) {
  return (
    <ol className="arch-layers">
      {layers.map((layer) => (
        <li key={layer.label} className="arch-layer">
          <p className="arch-label">{layer.label}</p>
          <Nodes nodes={layer.nodes} />
        </li>
      ))}
    </ol>
  );
}

export default function CaseStudy({ study }: Props) {
  const { architecture } = study;

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
            <div className="arch">
              <Layers layers={architecture.layers} />
              {architecture.aside ? (
                <div className="arch-layer arch-aside">
                  <p className="arch-label">{architecture.aside.label}</p>
                  <Nodes nodes={architecture.aside.nodes} />
                </div>
              ) : null}
            </div>
            {(architecture.more ?? []).map((part) => (
              <div key={part.title} className="arch-more">
                <h3>{part.title}</h3>
                <p className="cs-text">{part.intro}</p>
                <div className="arch">
                  <Layers layers={part.layers} />
                </div>
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
                    <span>Instead of</span> {decision.over}
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
