import type { Card } from './products';

export const tools: Card[] = [
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
      'Finds places in a JS/TS codebase where model output can reach a user or trigger a side effect (payments, email, writes). Flags the ones that look irreversible or unconfirmed. Fails the build on red; ignores the rest.',
    links: [
      { label: 'site ↗', href: 'https://nugehs.github.io/aiglare-web/', site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/aiglare' },
      { label: 'github ↗', href: 'https://github.com/nugehs/aiglare' },
    ],
  },
];
