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
    'Shipped Solumbe v4.7.1, the new name for Òtítọ́: a request can now declare the files it will touch before the edit, and the gate fails any file that was never declared. The gate delegates to gitleaks, Semgrep, and osv-scanner where they are installed, attestation records can be signed, and Claude can now answer the request read alongside Jev. Brain Boost Buddy reached v2.6.0 with weekly lesson-time scheduling. Growing BashBop and delivering OTT clients at NBCUniversal for Peacock, NOW, and SkyShowtime.',
};

export const speaking: Page = {
  title: 'Speaking',
  domain: 'talks · upcoming',
  body:
    'Conference talks and panels on deterministic AI tooling, compliance in CI, and building platforms instead of one-off apps. Nothing scheduled yet. If you want a talk on static analysis for AI-assisted development, get in touch.',
};

export const pages = { writing, now, speaking } as const;

export type PageMode = keyof typeof pages;
