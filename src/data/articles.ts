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
    slug: 'testing-ai-merge-gates',
    shortTitle: 'Testing merge gates',
    title: 'How to Test an AI Merge Gate Before You Trust It',
    description:
      'A merge gate should prove that valid changes pass, unsafe changes fail for the right reasons, and local evidence never impersonates hosted review or deployment proof.',
    domain: 'audit · 17 aug 2026',
    publishDate: '2026-08-17',
    category: 'audit',
    tags: ['ai-agents', 'verification', 'evals', 'merge-gates', 'devsecops'],
    canonicalUrl: 'https://geekienews.com/articles/testing-ai-merge-gates/',
    body: `A merge gate can be green and still be wrong.

It may pass every normal example while quietly ignoring a secret file. It may block every change and call that safety. It may report that tests passed without binding the result to the exact Git tree under review. Or it may treat a local command as proof that CODEOWNERS, hosted CI, and review conversations are satisfied.

The useful question is not:

> Does the gate run?

It is:

> Does the gate allow a valid change, reject known unsafe changes for the correct reasons, and tell the truth about what it cannot verify?

That is a testable engineering claim.

## Agent evaluation is not gate evaluation

An agent and a merge gate sit on different sides of the trust boundary.

The agent is probabilistic. It interprets intent, explores a repository, chooses an implementation, calls tools, and adapts when something fails. Its performance varies across tasks and trials.

The gate should be deterministic. It receives a candidate change, a versioned policy, and available repository evidence. It returns the same verdict for the same inputs, with named checks that a reviewer can inspect.

Anthropic's guide to [evaluating AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) makes the distinction useful. Agent evaluations often need multiple trials because model outputs vary. They should grade the outcome in the environment, not merely trust what the agent says happened. A coding agent can claim that it completed a task; the evaluator should inspect whether the expected files, tests, or state actually exist.

A merge-gate evaluation goes one step downstream:

\`\`\`
Agent task → candidate Git change → merge gate → hosted controls → human decision
\`\`\`

It does not ask whether the model wrote elegant code. It asks whether the safety boundary behaves correctly when presented with a known change.

## Test both directions

A gate needs positive and negative controls.

The positive control proves that an ordinary, policy-compliant change can pass. Without it, a gate that rejects everything appears perfectly safe while making the repository unusable.

The negative controls are adversarial changes constructed to violate one invariant at a time. Each should fail at the expected check. A generic \`FAIL\` is not enough: if a secret fixture fails only because a test command is missing, the secret rule has not been proven.

The minimum shape is:

\`\`\`
valid change              → PASS
known policy violation    → FAIL at the named invariant
same inputs, repeated run → same verdict and reason
\`\`\`

This is closer to testing a compiler or policy engine than benchmarking a language model.

## A practical seven-case matrix

[Òtítọ́ v1.7.0](https://github.com/BASHBOP/otito/releases/tag/v1.7.0) includes a small gate-effectiveness corpus. It runs the real staged local gate inside isolated temporary Git repositories. The current suite contains one valid control and six adversarial cases:

1. **Valid control** — a normal source change with validation and policy in place must pass.
2. **Secret file** — adding \`.env.production\` must fail the secret-safety check.
3. **High-risk change** — changing a Prisma schema under the high-risk profile must warn on risk and fail when required company controls are unavailable.
4. **Incomplete release** — changing package version metadata without a changelog update must fail release discipline.
5. **Missing validation policy** — a code change without an approved, versioned validation plan must fail validation execution.
6. **Unverified ownership** — company governance must not allow a local process to self-certify GitHub ownership and review controls.
7. **Scope drift** — a reporting export added for an unrelated request must fail the required intent-to-diff convergence score.

On 17 August 2026, the suite produced seven expected results: the valid control passed and all six unsafe cases were blocked at their named checks. The cases and thresholds are public in the [evaluation corpus](https://github.com/BASHBOP/otito/blob/main/evals/corpus.json), and the command is reproducible:

\`\`\`
npx --yes --package=@bashbop/otito@1.7.0 -- otito eval --gate-effectiveness
\`\`\`

This is useful evidence, but it is not universal proof. Seven cases cannot establish that every future vulnerability will be caught, that the rules contain no blind spots, or that a repository's hosted settings are correct. It proves a narrower claim: these committed invariants currently behave as specified against the real gate.

## Bind evidence to the exact change

A validation result is meaningful only if it identifies what was validated.

Suppose an agent runs tests, edits another file, and then presents the earlier green output. The tests may be genuine, but they no longer describe the candidate change. The gate needs a stable subject such as a staged-tree hash, commit SHA, or artifact digest.

The receipt should bind at least:

- the repository and base reference;
- the exact changed tree or commit;
- the policy profile and governance mode;
- the validation commands that ran;
- the result of every check;
- the gate engine and policy version.

If the tree changes, the receipt becomes stale. Re-run the gate.

This follows the same architectural lesson used in software supply-chain security. [SLSA's verification model](https://slsa.dev/spec/v1.1/terminology) separates build execution from a trusted control plane that produces provenance, then asks consumers to verify artifacts against expectations. A merge receipt is not SLSA provenance, but both depend on evidence that is bound to a specific subject and produced outside the subject's control.

## Keep authority boundaries honest

Local evidence is necessary, but it is not the whole merge decision.

A local gate can inspect changed files, detect risky paths, run approved validation, compare the request with the diff, and read versioned repository policy. It cannot honestly certify a hosted review that has not happened.

GitHub's [protected-branch controls](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) treat these as separate authorities: required status checks, approving reviews, CODEOWNERS, resolved conversations, merge queues, signed commits, and successful deployments can each be enforced independently.

That separation should appear in the gate's language:

\`\`\`
Local validation passed                  ✓
Required hosted CI passed               ✓ / ✗ / unknown
CODEOWNERS approval present             ✓ / ✗ / unknown
Review conversations resolved           ✓ / ✗ / unknown
Human chose to merge                     separate decision
Deployment reached users                 separate proof
\`\`\`

Unknown is not failure, and it is not success. It means the current verifier does not hold that authority.

## Test false positives as aggressively as misses

A noisy gate will be bypassed.

Secret detection is a good example. \`.env\`, a private key, or a credential-store path should fail. A source file named \`dev.environments.ts\` or a documentation page called \`secrets-management.md\` should not fail merely because its name contains a suspicious substring.

For every blocking rule, add at least three fixtures:

1. a true positive that must fail;
2. a nearby benign case that must pass;
3. a boundary case that documents the intended policy.

Track false positives as product defects. A gate that cries wolf teaches maintainers to search for bypasses, while an agent learns that the shortest route to completion is to weaken the rule.

## Make the failure reason part of the contract

The verdict is only one output. The reason is part of the interface.

Good failure evidence identifies:

- the check that failed;
- the policy or threshold applied;
- the files or hosted facts involved;
- the remediation required;
- which claims remain unverified.

Prefer stable machine-readable identifiers beneath the prose. Human wording can improve without breaking automation, while receipts and evaluation cases continue to assert \`secret-safety\`, \`release-discipline\`, or \`ownership-unverified\`.

This also makes regressions easier to diagnose. If an adversarial fixture still fails but the expected check now passes, another rule may be masking a broken invariant.

## Use a scorecard, not a demo

A credible merge gate should be able to publish a scorecard with at least these measures:

- **Valid-control pass rate:** can legitimate work move through the gate?
- **Expected-block rate:** how many committed unsafe cases are rejected?
- **Reason accuracy:** did each case fail at the intended invariant?
- **Repeatability:** do repeated runs over the same subject agree?
- **False-positive coverage:** are nearby benign cases protected?
- **Subject binding:** can a receipt be matched to the exact tree or commit?
- **Authority honesty:** are local, hosted, merge, release, and deployment claims kept separate?
- **Corpus growth:** does every real escaped defect become a regression case?

NIST describes trustworthy AI as a measurement problem as well as a policy problem. Its work on [AI testing, evaluation, validation, and verification](https://www.nist.gov/ai-measurement-and-evaluation) emphasises meaningful tasks, challenge problems, testbeds, metrics, and characterised datasets. The same discipline applies at the software boundary: define the risk, construct the case, state the expected result, and preserve the evidence.

## The corpus must keep moving

A seven-case suite is a seed, not a moat.

The next useful additions are mutation tests that deliberately weaken individual checks, language-specific release cases, monorepo ownership boundaries, CI-source spoofing, stale-receipt detection, merge-queue behaviour, unresolved-review cases, and real failures contributed by adopters.

Vendor research also shows why the corpus cannot stand still. Anthropic's June 2026 analysis of roughly 400,000 Claude Code sessions found that people made most planning decisions while the agent made most execution decisions, and that usage was shifting toward more end-to-end work such as operating and deploying software. That is [self-reported vendor research](https://www.anthropic.com/research/claude-code-expertise), not an industry-wide census, but the direction is operationally important: when agents execute more of the change, independent verification has more work to do.

The gate should evolve from incidents, bypass attempts, false positives, repository migrations, and new authority surfaces. Every time the gate is wrong, capture the smallest reproducible fixture before fixing it.

## Trust is a falsifiable claim

A product demo shows the happy path. A gate-effectiveness suite tries to break the safety claim.

That is the standard teams should demand from any system placed between agent-generated code and production:

1. Show me the valid control.
2. Show me the adversarial cases.
3. Show me that each one fails for the intended reason.
4. Bind the evidence to the exact change.
5. Tell me which authorities the gate cannot verify.
6. Keep the human merge decision explicit.

Do not trust a merge gate because its dashboard is green.

Trust it provisionally because its claims are specific, reproducible, independently inspectable, and designed to be falsified.`,
  },

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
