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
      'Stronger coding agents do not make the harness obsolete. They make independent evidence about scope, validation, ownership, CI, and human review more important.',
    domain: 'essay · updated 17 aug 2026',
    publishDate: '2026-07-06',
    category: 'essay',
    tags: ['static-analysis', 'ai-agents', 'verification', 'trust-harness', 'ai-governance'],
    canonicalUrl: 'https://geekienews.com/articles/missing-verification-layer/',
    body: `_Updated 17 August 2026 to reflect the rise of stronger native agent harnesses and the v1.7.0 gate-effectiveness proof in Òtítọ́._

An AI agent can touch forty files in ninety seconds. It can invent an API endpoint that never existed, skip a compliance control, and merge with confidence because the _reasoning_ sounded right.

The model cannot be its own judge. It is non-deterministic, broad in scope, and structurally unable to certify its own correctness. Every serious engineering organisation already knows this about humans: that is why we have compilers, type checkers, linters, tests, security scanners, CI, protected branches, and code review.

The AI era did not remove that need. It **amplified** it.

## The gap has moved

Traditional software engineering has a verification stack:

\`\`\`
Human writes code → compiler/types → tests → review → deploy
\`\`\`

Early AI-assisted development often looked like this:

\`\`\`
Agent writes code → ??? → deploy
\`\`\`

The first response was to build a better agent loop: more prompts, retries, planning, tool routing, and file editing. That mattered when models could not reliably operate a repository.

Modern coding agents increasingly provide that loop themselves. They can plan, search, edit, run commands, recover from mistakes, and use tools. As those capabilities become native infrastructure, a generic orchestration harness becomes less differentiated.

The durable gap is **independent trust**.

Before a change reaches a user, someone still needs evidence that the agent understood the repository, stayed within scope, ran the required validation against the exact change, respected ownership and policy, and did not award itself a passing grade.

## Why stronger models increase the need

Better models make the trust harness more important for four reasons:

1. **Greater scope**: a capable agent is trusted with more files, more tools, and more consequential changes.
2. **Speed asymmetry**: generation gets faster than a human can review every line with equal attention.
3. **Circular self-review**: asking the same probabilistic system to certify its own output is not independent evidence.
4. **Authority separation**: local checks, hosted CI, CODEOWNERS, review conversations, branch protection, and the final merge decision are different authorities.

The goal is not to slow the model down. It is to put deterministic boundaries around what the model is allowed to claim.

## Four questions every AI change must answer

Before agent-generated code ships, four questions should be answered with evidence:

1. **Context and scope**: What does this task actually touch, and did the change stay inside that boundary?
2. **Validation**: Did approved tests, type checks, builds, and security checks run against the exact changed tree?
3. **Ownership and review**: Are the required owners, hosted checks, and review conversations satisfied?
4. **Governance**: Can model output reach a user or trigger a side effect without the required guardrails and human decision?

Static analysis answers part of this. Git supplies the exact change subject. CI supplies hosted execution evidence. Repository policy supplies ownership and protection rules. A human remains responsible for the merge decision.

No single green badge is allowed to impersonate the whole chain.

## Generation → trust → decision → execution

The architecture that scales looks like this:

\`\`\`
AI coding agent
   │
   ▼
Generation layer                    ← creative, probabilistic
   │
   ▼
Independent trust harness           ← context, impact, secrets, exact validation
   │
   ▼
Hosted repository authorities       ← CI, CODEOWNERS, protection, review state
   │
   ▼
Human merge decision
   │
   ▼
Execution                           ← deploy, publish, release
\`\`\`

These layers must stay distinct. A local test run cannot prove a hosted check passed. A merged pull request cannot prove a package reached npm. A successful release cannot prove the user-facing site deployed. Trust comes from joining those facts without pretending they are interchangeable.

## What proof looks like in practice

[Òtítọ́](https://bashbop.github.io/otito/) is the open-source trust harness I am building around this boundary. It gives agents deterministic repository context before editing and produces changed-file risk, secret safety, validation, ownership, CI, and review-readiness evidence before merge.

[Version 1.7.0](https://github.com/BASHBOP/otito/releases/tag/v1.7.0) adds a gate-effectiveness evaluation that invokes the real staged local gate against seven committed cases:

- one valid control must pass;
- a secret file must be blocked;
- a high-risk change without remote controls must be blocked;
- an incomplete release must be blocked;
- a missing validation policy must be blocked;
- ownership that cannot be verified locally must be blocked;
- scope drift must fail the convergence requirement.

This does not prove that every future change is correct. It proves that known safety invariants have not silently collapsed, and that adversarial changes fail for named, deterministic reasons.

## Static analysis, never the model

This is not a slogan about replacing engineers with rules. It is an engineering constraint on who gets to award trust:

- **Deterministic checks**: same input, same output, every time;
- **Explainable decisions**: file, line, rule, receipt, and evidence;
- **Repeatability**: local, CI, and MCP surfaces use the same underlying checks;
- **Trust boundaries**: the model proposes, independent systems verify, and a human decides.

The deeper question remains:

> When AI writes software, who watches the AI?

Not the model alone. An independent trust harness produces the evidence, and a human owns the decision.`,
  },
];
