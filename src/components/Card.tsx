type Props = {
  name: string;
  domain: string;
  what: string;
  links: { label: string; href: string; site?: boolean }[];
  lead?: boolean;
};

export default function Card({ name, domain, what, links, lead }: Props) {
  return (
    <article className={`tool rv${lead ? ' tool--lead' : ''}`}>
      <div className="tname">
        {name} <span className="dom">{domain}</span>
      </div>
      <div className="tbody">
        <p className="twhat">{what}</p>
        <div className="tlinks">
          {links.map((l) => (
            <a key={l.href} className={l.site ? 'site' : ''} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
