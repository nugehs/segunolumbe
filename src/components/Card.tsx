type Props = {
  badge: string;
  name: string;
  domain: string;
  q: string;
  what: string;
  meta: [string, string][];
  links: { label: string; href: string; site?: boolean }[];
  gate: [string, string];
};

export default function Card({ badge, name, domain, q, what, meta, links, gate }: Props) {
  return (
    <div className="tool rv">
      <div className="tcol idxcol">{badge}</div>
      <div className="tcol">
        <div className="tname">
          {name} <span className="dom">{domain}</span>
        </div>
        <div className="tq">“{q}”</div>
      </div>
      <div className="tcol">
        <p className="twhat" dangerouslySetInnerHTML={{ __html: what }} />
        <div className="tmeta">
          {meta.map(([k, v]) => (
            <div className="m" key={k}>
              <span className="mk">{k}</span>
              <span className="mv" dangerouslySetInnerHTML={{ __html: v }} />
            </div>
          ))}
        </div>
        <div className="tlinks">
          {links.map((l) => (
            <a key={l.href} className={l.site ? 'site' : ''} href={l.href}>
              {l.label}
            </a>
          ))}
          <span className="gate">
            <span className="led" style={{ background: gate[0] }}></span>
            {gate[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
