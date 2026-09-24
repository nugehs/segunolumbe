import type { Card } from './products';

const mcp = (name: string) =>
  `https://registry.modelcontextprotocol.io/?q=${encodeURIComponent(`io.github.nugehs/${name}`)}`;

export const tools: Card[] = [
  {
    slug: 'gate',
    name: 'gate',
    domain: 'unified verdict · mcp',
    what:
      'One pass, warn, or fail from four checks. Same answer in CI, as an official MCP server an agent can call, and as a VS Code / Cursor extension that puts the verdict in your status bar and underlines what failed. Install this first; the other four feed it.',
    links: [
      { label: 'mcp ↗', href: mcp('gate'), site: true },
      { label: 'vs code ↗', href: 'https://marketplace.visualstudio.com/items?itemName=nugehs.gate' },
      { label: 'open vsx ↗', href: 'https://open-vsx.org/extension/nugehs.gate' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/gate' },
      { label: 'github ↗', href: 'https://github.com/nugehs/gate' },
    ],
  },
  {
    slug: 'otito',
    name: 'Òtítọ́',
    domain: 'trust harness · v1.15.0',
    what:
      'Models generate the change. Òtítọ́ proves whether it is safe to merge. It gives agents deterministic repository context, then checks changed-file risk, secrets, validation, ownership, CI, and review readiness. v1.15.0 makes the model router an MCP tool, so any host can score a task before spending tokens and get a cheap, mid, or premium tier, advisory only and never touching the gate. v1.14.0 stopped the router sending one-file changes to the premium tier by trusting repository signals over a model\'s self-reported confidence, and v1.11.0 added otito calibrate, which grades the risk flags against the repository\'s own fix history.',
    links: [
      { label: 'v1.15.0 ↗', href: 'https://github.com/BASHBOP/otito/releases/tag/v1.15.0' },
      {
        label: 'mcp ↗',
        href: 'https://registry.modelcontextprotocol.io/?q=io.github.BASHBOP%2Fotito',
        site: true,
      },
      { label: 'site ↗', href: 'https://bashbop.github.io/otito/' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@bashbop/otito' },
      { label: 'github ↗', href: 'https://github.com/BASHBOP/otito' },
    ],
  },
  {
    slug: 'tieline',
    name: 'tieline',
    domain: 'contract drift · mcp',
    what:
      'Frontend and backend still agree, or CI fails. Catches drift before production returns a 500. Adapters for common stack shapes. Official MCP server on the registry.',
    links: [
      { label: 'mcp ↗', href: mcp('tieline'), site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/tieline' },
      { label: 'github ↗', href: 'https://github.com/nugehs/tieline' },
    ],
  },
  {
    slug: 'bouncer',
    name: 'bouncer',
    domain: 'compliance · mcp',
    what:
      'Your controls against versioned rule packs for the UK Online Safety Act and the ICO Children\'s Code. Rules are plain files you can diff. For when "is this lawful?" should not be a chatbot answer. Official MCP server on the registry.',
    links: [
      { label: 'mcp ↗', href: mcp('bouncer'), site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/bouncer' },
      { label: 'github ↗', href: 'https://github.com/nugehs/bouncer' },
    ],
  },
  {
    slug: 'aiglare',
    name: 'aiglare',
    domain: 'ai governance · mcp',
    what:
      'Finds where model output hits a user or a side effect (payments, email, writes) without guardrails. Maps to SOC 2, EU AI Act, NIST AI RMF, and OWASP LLM Top 10. Lint, Markdown evidence, or an HTML report for auditors. Red fails the build. Official MCP server on the registry.',
    links: [
      { label: 'mcp ↗', href: mcp('aiglare'), site: true },
      { label: 'site ↗', href: 'https://nugehs.github.io/aiglare-web/' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/aiglare' },
      { label: 'github ↗', href: 'https://github.com/nugehs/aiglare' },
    ],
  },
];
