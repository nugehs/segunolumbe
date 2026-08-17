export type Article = {
  slug: string;
  /** Short label for the sidebar roster */
  shortTitle: string;
  title: string;
  description: string;
  domain: string;
  publishDate: string;
  category: string;
  tags: string[];
  /** Canonical URL on GeekieNews */
  canonicalUrl: string;
  /** Markdown body — keep in sync with geekienews src/content/articles/<slug>/index.mdoc */
  body: string;
};

export const articles: Article[] = [
  {
    slug: 'missing-verification-layer',
    shortTitle: 'Verification layer',
    title: 'The Missing Verification Layer for AI Software Engineers',
    description:
      "When an AI agent can modify your entire codebase in minutes, human review doesn't scale and asking the model to self-review is circular. Static analysis is the watcher.",
    domain: 'essay · 6 jul 2026',
    publishDate: '2026-07-06',
    category: 'essay',
    tags: ['static-analysis', 'ai-agents', 'verification'],
    canonicalUrl: 'https://geekienews.com/articles/missing-verification-layer/',
    body: `An AI agent can touch forty files in ninety seconds. It can invent an API endpoint that never existed, skip a compliance control, and merge with confidence because the *reasoning* sounded right.

The model cannot be its own judge. It is non-deterministic, unbounded in scope, and structurally incapable of certifying correctness. Every serious engineering org already knows this about humans — that is why we have compilers, type checkers, linters, tests, security scanners, and code review.

The AI era did not remove that need. It **amplified** it.

## The gap in the pipeline

Traditional software engineering has a verification stack:

\`\`\`
Human writes code → compiler/types → tests → review → deploy
\`\`\`

Modern AI-assisted development often looks like this:

\`\`\`
Agent writes code → ??? → deploy
\`\`\`

What fills the gap today is ad hoc: human review that does not scale, test suites with incomplete coverage, or asking the model to review its own output — which is circular reasoning dressed up as diligence.

What should fill it is a **verification layer** built on static analysis: deterministic checks with explainable evidence, repeatable across runs, auditable for compliance, and fail-closed when something is wrong.

## Four questions every AI change must answer

Before agent-generated code ships, four yes/no questions should be answered by analysis — not by the model:

1. **Structure** — What does this change actually touch? (import graph, blast radius, merge readiness)
2. **Contracts** — Does the frontend still match the backend? (route drift, API shape)
3. **Compliance** — Do required controls exist in the code? (regulatory rule packs, policy-as-code)
4. **Governance** — Where can model output reach a user or trigger a side effect without guardrails?

Each of these is a static analysis problem. Each produces evidence a human or policy engine can act on.

## Reasoning → verification → execution

The architecture that scales looks like this:

\`\`\`
AI Agent
   │
   ▼
Reasoning layer (LLM)          ← creative, non-deterministic
   │
   ▼
Verification layer (static analysis)   ← deterministic, explainable
   │
   ▼
Human / policy approval
   │
   ▼
Execution (CI → deploy)
\`\`\`

You do not control the model. You control the harness around it — the context it receives, the gates it must pass, and the verdict that blocks merge when checks fail.

## Static analysis, never the model

This is not a slogan. It is an engineering constraint:

- **Deterministic checks** — same input, same output, every time
- **Explainable decisions** — file, line, rule, evidence
- **Repeatability** — runs in CI, locally, and via MCP for agents
- **Trust boundaries** — the model proposes; analysis disposes

The open-source toolchain I am building — gate, repoctx, tieline, bouncer, aiglare — composes these checks into one normalized verdict. GeekieNews is where the argument lives.

The deeper question behind all of it:

> When AI writes software, who watches the AI?

Static analysis is the answer.`,
  },
];
