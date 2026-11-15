export type Page = {
  title: string;
  domain: string;
  body: string;
};

export const writing: Page = {
  title: 'Writing',
  domain: 'essays · geekienews',
  body:
    'Long-form pieces on AI engineering, static analysis, and building products that encode real constraints. Published on GeekieNews — embedded here, canonical there.',
};

export const now: Page = {
  title: 'Now',
  domain: 'q4 2026',
  body:
    'Shipped Solumbe v4.12.0: the gate an agent calls over MCP now counts consecutive failures on a change and, at three, tells the agent to stop retrying and take the failing checks to a person. The MCP server also finds an API key exported in a shell startup file, which desktop hosts never passed on. Brain Boost Buddy reached v2.6.0 with weekly lesson-time scheduling. Growing BashBop and delivering OTT clients at NBCUniversal for Peacock, NOW, and SkyShowtime.',
};

export const speaking: Page = {
  title: 'Speaking',
  domain: 'talks · upcoming',
  body:
    'Conference talks and panels on deterministic AI tooling, compliance in CI, and building platforms instead of one-off apps. Nothing scheduled yet. If you want a talk on static analysis for AI-assisted development, get in touch.',
};

export const pages = { writing, now, speaking } as const;

export type PageMode = keyof typeof pages;
