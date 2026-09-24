import type { Mode, WorkMode } from '../routes';

export const sectionLabel: Record<Mode, string> = {
  tools: 'Open source',
  products: 'Products',
  stack: 'Background',
  writing: 'Writing',
  now: 'Now',
  speaking: 'Speaking',
};

export const sectionNote: Record<WorkMode, string> = {
  tools:
    'Context, contracts, compliance, governance. One verdict in CI, in your editor, and in the agent. Local-first. MCP-native. Static analysis, never the model.',
  products: 'Commercial products and apps. Proof I ship real systems.',
  stack: 'Day job at NBCUniversal, toolkit, and the engineering behind the tools.',
};

export const workModes: WorkMode[] = ['tools', 'products', 'stack'];
export const pageModes: Mode[] = ['writing', 'now', 'speaking'];
