import type { Card } from './products';

export type Tool = Omit<Card, 'mark'> & { idx: string };

export const tools: Tool[] = [
  {
    idx: '01',
    name: 'repoctx',
    domain: 'repo context · merge readiness',
    q: 'What does this change actually touch?',
    what: `Maps a repo into context an agent or reviewer can trust before they plan, edit, or merge: <b>context → tests → permissions → review → evidence</b>. It reads your actual code — ASTs, real imports, real call paths — not a model's fuzzy memory of it. Runs entirely on your machine.`,
    meta: [
      ['static', 'AST maps, impact graph, context packs'],
      ['cli', '<code>repoctx context "your task"</code>'],
      ['mcp', '~12 agent-callable tools, local index cache'],
    ],
    links: [
      { label: 'site ↗', href: 'https://nugehs.github.io/repoctx-web/', site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/repoctx' },
      { label: 'github ↗', href: 'https://github.com/nugehs/repoctx' },
    ],
    gate: ['var(--green)', 'local-first'],
  },
  {
    idx: '02',
    name: 'tieline',
    domain: 'contract drift',
    q: 'Did the front end and back end quietly stop agreeing?',
    what: `Checks whether your front end and back end still match, statically, with adapters for different stacks. The usual way you find out they've drifted is a 500 in production. This tells you in CI instead.`,
    meta: [
      ['static', 'Diffs FE expectations vs BE contracts'],
      ['cli', '<code>tieline</code> — fail CI on drift'],
      ['mcp', 'Agents inspect the drift surface'],
    ],
    links: [
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/tieline' },
      { label: 'github ↗', href: 'https://github.com/nugehs/tieline' },
    ],
    gate: ['var(--amber)', 'fails on drift'],
  },
  {
    idx: '03',
    name: 'bouncer',
    domain: 'compliance',
    q: 'Could you actually defend this to Ofcom?',
    what: `Checks compliance controls against <b>versioned rule packs</b> — the UK Online Safety Act and the ICO Children's Code, written as code you can diff and audit. When the question is "is this lawful," the last thing you want answering is a language model. So one doesn't.`,
    meta: [
      ['static', 'Rule packs over your controls'],
      ['cli', '<code>bouncer</code> — gate on failed controls'],
      ['mcp', 'Agents query control status'],
    ],
    links: [
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/bouncer' },
      { label: 'github ↗', href: 'https://github.com/nugehs/bouncer' },
    ],
    gate: ['var(--red)', 'audit-grade'],
  },
  {
    idx: '04',
    name: 'aiglare',
    domain: 'ai governance',
    q: "Where can the model do something you can't undo?",
    what: `Scans a JS/TS repo for every spot where an LLM's output reaches a user or triggers a side-effect — a payment, an email, a write. Then it flags the dangerous ones: irreversible action, no confirmation, no fallback. <b>Fails the build on red</b>, stays quiet about the rest.`,
    meta: [
      ['static', 'Scan → classify by sink → score'],
      ['cli', '<code>npx aiglare ./src --ci</code>'],
      ['mcp', 'audit · gate · list-providers'],
    ],
    links: [
      { label: 'site ↗', href: 'https://nugehs.github.io/aiglare-web/', site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/aiglare' },
      { label: 'github ↗', href: 'https://github.com/nugehs/aiglare' },
    ],
    gate: ['var(--red)', 'blocks red'],
  },
];
