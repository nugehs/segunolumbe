type Props = {
  name: string;
  domain: string;
  what: string;
  links: { label: string; href: string; site?: boolean }[];
};

export default function Card({ name, domain, what, links }: Props) {
  return (
    <article className="tool rv">
      <div className="tcol">
        <div className="tname">
          {name} <span className="dom">{domain}</span>
        </div>
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
