import type { Card } from './products';

export const stack: Card[] = [
  {
    name: 'Day job',
    domain: 'nbcuniversal · ott',
    what:
      'Part of the team delivering streaming services to millions of consumers across Peacock, NOW, and SkyShowtime at NBCUniversal. I implement and optimise OTT clients for TVs and consoles (PlayStation, Xbox) in high-traffic environments. Recently lead developer on the Telemundo dual-language project, bringing a Spanish experience to Peacock for the 2026 World Cup. I sit at the intersection of technical implementation and user-centric design: clean, maintainable code, informed by design theory so interfaces stay intuitive on a remote.',
    links: [],
  },
  {
    name: 'Stack',
    domain: 'whatever fits',
    what:
      'I am not bound to one language. I use whatever solves the problem and learn what I do not know yet. Day to day that is often LightningJS, React, Redux, TypeScript, GraphQL, Node.js, Bash, and Python. Pipelines and runtime: Kubernetes, Docker, Jenkins, GitHub Actions, and Concourse CI. Outside work I also run things on VPS hosts and AWS, plus Cloudflare, Stripe, and Paystack when a side project needs them.',
    links: [],
  },
  {
    name: 'Compliance',
    domain: 'controls that ship',
    what:
      'I like compliance when it is concrete: versioned rules you can diff, checks that fail in CI, evidence you can hand to someone. Spare-time work includes bouncer for UK Online Safety Act and ICO Children\'s Code controls, and aiglare for AI governance mappings (SOC 2, EU AI Act, NIST AI RMF, OWASP LLM Top 10). I would rather encode a control than argue about it in a slide deck.',
    links: [
      { label: 'bouncer ↗', href: 'https://www.npmjs.com/package/@nugehs/bouncer' },
      { label: 'aiglare ↗', href: 'https://www.npmjs.com/package/@nugehs/aiglare' },
    ],
  },
  {
    name: 'AI',
    domain: 'software 2.0',
    what:
      'I care about the Software 2.0 shift: AI-augmented development workflows that make engineering faster without making it sloppy. In practice that means MCP servers agents can call (gate, repoctx, tieline, bouncer, aiglare on the official registry), repo context before an agent edits, contract and compliance checks in CI, and scans for model output that hits users or side effects without guardrails. Wire it in, constrain it, fail closed when it is wrong.',
    links: [
      {
        label: 'mcp registry ↗',
        href: 'https://registry.modelcontextprotocol.io/?q=nugehs',
        site: true,
      },
    ],
  },
];
