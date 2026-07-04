import type { Card } from './products';

const mcp = (name: string) =>
  `https://registry.modelcontextprotocol.io/?q=${encodeURIComponent(`io.github.nugehs/${name}`)}`;

export const tools: Card[] = [
  {
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
    name: 'repoctx',
    domain: 'repo context · mcp',
    what:
      'Map of imports, call paths, tests, and permissions so a reviewer or agent knows what a change actually touches before anyone edits. Runs locally. Official MCP server if you want agents to call it.',
    links: [
      { label: 'mcp ↗', href: mcp('repoctx'), site: true },
      { label: 'site ↗', href: 'https://nugehs.github.io/repoctx-web/' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/repoctx' },
      { label: 'github ↗', href: 'https://github.com/nugehs/repoctx' },
    ],
  },
  {
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
