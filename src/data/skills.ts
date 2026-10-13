/** Shown on the home page. Each item should be backed by a card or case study on this site. */
export const skills: { area: string; items: string[] }[] = [
  {
    area: 'AI engineering',
    items: [
      'RAG with pgvector',
      'LLM evals',
      'Grounding and fact checks',
      'MCP servers',
      'Agents and tool use',
      'Model routing',
    ],
  },
  {
    area: 'Backend',
    items: ['TypeScript', 'Node.js', 'Python', 'NestJS', 'PostgreSQL and Prisma', 'Redis', 'Stripe Connect and Paystack'],
  },
  {
    area: 'Clients',
    items: ['React', 'Next.js', 'LightningJS for TVs and consoles', 'Expo / React Native', 'Electron', 'VS Code extensions'],
  },
  {
    area: 'Delivery',
    items: ['Static analysis in CI', 'GitHub Actions', 'Docker', 'Kubernetes', 'Cloudflare Workers', 'Playwright'],
  },
];
