export type Page = {
  title: string;
  domain: string;
  body: string;
};

export const writing: Page = {
  title: 'Writing',
  domain: 'essays · in progress',
  body:
    'Long-form pieces on AI engineering, static analysis, and building products that encode real constraints. First essay coming soon: why a deterministic trust layer beats asking the model.',
};

export const now: Page = {
  title: 'Now',
  domain: 'q3 2026',
  body:
    'Shipping gate, repoctx, tieline, bouncer, and aiglare as a connected MCP suite. Growing BashBop. Writing the umbrella story that ties the tools together. Day job: OTT clients at NBCUniversal for Peacock, NOW, and SkyShowtime.',
};

export const speaking: Page = {
  title: 'Speaking',
  domain: 'talks · upcoming',
  body:
    'Conference talks and panels on deterministic AI tooling, compliance in CI, and building platforms instead of one-off apps. Nothing scheduled yet. If you want a talk on static analysis for AI-assisted development, get in touch.',
};

export const pages = { writing, now, speaking } as const;

export type PageMode = keyof typeof pages;
