import type { Card } from './products';

export const tools: Card[] = [
  {
    name: 'gate',
    domain: 'unified verdict',
    what:
      'Runs aiglare, bouncer, tieline & repoctx against a repo and merges them into one ship/no-ship verdict — pass, warn, or fail. A --ci gate that can\'t be silently bypassed, an MCP server for agents, and a VS Code / Cursor extension that puts the verdict in your status bar with inline squiggles on the offending lines. The spine the other four were already implying.',
    links: [
      { label: 'vs code ↗', href: 'https://marketplace.visualstudio.com/items?itemName=nugehs.gate', site: true },
      { label: 'open vsx ↗', href: 'https://open-vsx.org/extension/nugehs/gate' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/gate' },
      { label: 'github ↗', href: 'https://github.com/nugehs/gate' },
    ],
  },
  {
    name: 'repoctx',
    domain: 'repo context',
    what:
      'Builds a map of your repo (imports, call paths, tests, permissions) so a reviewer or agent knows what a change actually touches before anyone edits anything. Runs locally; there\'s an MCP server if you want agents to call it.',
    links: [
      { label: 'site ↗', href: 'https://nugehs.github.io/repoctx-web/', site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/repoctx' },
      { label: 'github ↗', href: 'https://github.com/nugehs/repoctx' },
    ],
  },
  {
    name: 'tieline',
    domain: 'contract drift',
    what:
      'Checks whether your frontend and backend still agree. You usually find out they don\'t when something 500s in production; this fails in CI instead. Adapters for a few common stack shapes.',
    links: [
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/tieline' },
      { label: 'github ↗', href: 'https://github.com/nugehs/tieline' },
    ],
  },
  {
    name: 'bouncer',
    domain: 'compliance',
    what:
      'Runs your controls against versioned rule packs for the UK Online Safety Act and the ICO Children\'s Code. The rules are plain files you can diff. Useful when "is this lawful?" is not a question you want a chatbot answering.',
    links: [
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/bouncer' },
      { label: 'github ↗', href: 'https://github.com/nugehs/bouncer' },
    ],
  },
  {
    name: 'aiglare',
    domain: 'ai governance',
    what:
      'Finds places in a JS/TS codebase where model output reaches a user or triggers a side effect (payments, email, writes) without guardrails. Maps findings to SOC 2, EU AI Act, NIST AI RMF, and OWASP LLM Top 10 controls. Outputs ESLint-style lint, Markdown evidence docs, or a branded HTML report for auditors. Fails the build on red; ignores the rest.',
    links: [
      { label: 'site ↗', href: 'https://nugehs.github.io/aiglare-web/', site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/aiglare' },
      { label: 'github ↗', href: 'https://github.com/nugehs/aiglare' },
    ],
  },
];
