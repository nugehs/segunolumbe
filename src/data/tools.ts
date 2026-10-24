import type { Card } from './products';

const mcp = (name: string) =>
  `https://registry.modelcontextprotocol.io/?q=${encodeURIComponent(`io.github.nugehs/${name}`)}`;

export const tools: Card[] = [
  {
    slug: 'gate',
    name: 'gate',
    domain: 'unified verdict · mcp',
    what:
      'One pass, warn, or fail from four checks. Same answer in CI, as an official MCP server an agent can call, and as a VS Code / Cursor extension that puts the verdict in your status bar and underlines what failed. Install this first: it runs the checks and gives one answer.',
    stack: [
      'Node.js',
      'JavaScript (ESM)',
      'MCP over stdio',
      'JSON-RPC 2.0',
      'VS Code extension API',
      'TypeScript',
      'GitHub Actions',
    ],
    caseStudy: {
      problem:
        'I had four tools that each answered a different version of the same question, can this ship, and each answered in its own vocabulary. CI ran four jobs, an agent had four tools to call, and nobody, human or model, got one answer. And a check that did not run must never look like a check that passed.',
      constraints: [
        'A check that did not run is never a pass.',
        'It has to be safe in a repository that uses only some of the tools.',
        'The same answer in CI, in the editor, and to an agent, from one JSON document.',
        'A team can adopt it without drowning in warnings: only a failure blocks by default.',
        'No runtime dependencies.',
      ],
      architecture: {
        intro:
          'A small engine with three ways in. Whoever asks, the same four checks run and the same JSON comes back. Read it top to bottom.',
        layers: [
          {
            label: 'Who asks',
            nodes: [
              { name: 'CLI and CI', role: 'One command in a terminal, or with a CI flag to fail the build on a blocking verdict.' },
              { name: 'Agent', role: 'Calls gate_check over MCP before it says a change is done.' },
              {
                name: 'Editor',
                role: 'A VS Code and Cursor extension: status bar, a verdict cockpit, inline diagnostics, and an @gate chat participant.',
              },
            ],
          },
          {
            label: 'Orchestrator',
            nodes: [
              {
                name: 'Tool resolver',
                role: 'Finds each tool at runtime: an environment override, then the installed package, then a sibling checkout.',
              },
              {
                name: 'Runner',
                role: 'Runs the four tools in parallel as child processes, with a timeout, and captures everything they print.',
              },
            ],
          },
          {
            label: 'Adapters',
            nodes: [
              { name: 'AI governance', role: 'aiglare: red, amber, or green surfaces.' },
              { name: 'Compliance', role: 'bouncer: pass, fail, or unknown for each required control.' },
              { name: 'Contract drift', role: 'tieline: frontend calls that reach no backend route.' },
              { name: 'Merge readiness', role: 'Secret safety, risk review, and required checks for the change.' },
            ],
          },
          {
            label: 'Verdict',
            nodes: [
              { name: 'Normalise', role: 'Every dialect mapped onto pass, warn, fail, unknown, skipped, or error.' },
              {
                name: 'Roll up',
                role: 'The worst status among the checks that ran. Unknown and error count as a warning; skipped does not count.',
              },
              { name: 'Report', role: 'A terminal summary, or versioned JSON with each domain and the blocking reasons.' },
            ],
          },
        ],
        aside: {
          label: 'Release',
          nodes: [
            { name: 'npm', role: 'Published from CI with OIDC trusted publishing, after the full quality gate.' },
            { name: 'MCP Registry', role: 'The server manifest is published in the same release.' },
            { name: 'Extension stores', role: 'One tag publishes the extension to the VS Code Marketplace and Open VSX.' },
          ],
        },
      },
      decisions: [
        {
          chose: 'One verdict from four dialects',
          over: 'four separate reports',
          why: 'Each tool speaks its own language: red, amber, and green; pass, fail, and unknown; matched and drift. gate maps all of them onto one status, so CI, an agent, and the editor read the same answer.',
        },
        {
          chose: 'Unknown is never a pass',
          over: 'treating anything short of a failure as green',
          why: 'Unknown and error roll up to a warning, and a skipped check does not count at all. If nothing ran, gate says no checks ran and fails the build, so a mistyped flag cannot turn the gate green.',
        },
        {
          chose: 'Finding the tools at runtime',
          over: 'bundling all four',
          why: 'gate looks for each tool in three places and reports one it cannot find as skipped, not as a failure. That makes it safe in a repository that uses only part of the toolchain.',
        },
        {
          chose: 'Deriving the blocking verdict itself',
          over: 'trusting each tool\'s exit code',
          why: 'gate runs a tool without its own CI flag and reads the whole report. A tool that exits before it has flushed its output cannot truncate what gate sees, and a non-zero exit is expected, not treated as a crash.',
        },
        {
          chose: 'A hand-written MCP server',
          over: 'an SDK dependency',
          why: 'The server is line-delimited JSON-RPC 2.0 over stdio in under 200 lines, the same convention as the other tools. The package ships with no runtime dependencies at all.',
        },
        {
          chose: 'Blocking on failure only by default',
          over: 'blocking on every warning from day one',
          why: 'A team can turn it on without being buried. A strict flag makes warnings block too, for when they are ready.',
        },
      ],
      broke: [
        {
          what: 'The editor ran out of findings to underline.',
          cause: 'Findings were capped at five per domain. That was a nicety for the terminal that had leaked into the JSON, so any repository with more than a handful of findings lost its squiggles.',
          fix: 'The cap came out of the data model. The list is bounded only by a runaway guard of 200, and the summary counts always carried the true totals.',
        },
        {
          what: 'Saving a file could stack up full-repository runs.',
          cause: 'The extension ran the gate on save, and nothing stopped one run overlapping the next.',
          fix: 'Saves are debounced, and a newer run supersedes the one in flight and kills its child process.',
        },
      ],
      outcome: [
        'Published on npm, the MCP Registry, the VS Code Marketplace, and Open VSX.',
        'The engine is about 900 lines with no runtime dependencies, covered by 60 tests.',
        'One JSON document drives the CLI, the CI gate, the MCP server, and the editor extension, so the assistant writing the code is checked by the same gate as CI.',
      ],
    },
    links: [
      { label: 'mcp ↗', href: mcp('gate'), site: true },
      { label: 'vs code ↗', href: 'https://marketplace.visualstudio.com/items?itemName=nugehs.gate' },
      { label: 'open vsx ↗', href: 'https://open-vsx.org/extension/nugehs.gate' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/gate' },
      { label: 'github ↗', href: 'https://github.com/nugehs/gate' },
    ],
  },
  {
    slug: 'otito',
    name: 'Solumbe',
    domain: 'trust harness · v4.8.0',
    what:
      'Models generate the change. Solumbe proves whether it is safe to merge. It gives an agent deterministic repository context before the edit, then gates the exact staged tree on changed-file risk, secrets, scope, validation, and ownership. No server, no account, and no code leaves the machine. Formerly Òtítọ́: the package, CLI, and MCP server were renamed in v4.0.0, behaviour unchanged.',
    stack: ['Node.js', 'JavaScript (ESM)', 'TypeScript compiler', 'MCP over stdio', 'Git', 'GitHub Actions'],
    caseStudy: {
      problem:
        'A coding agent writes the diff and then tells you it is fine. The model that misread the request is the one reviewing the work, so it misreads it the same way twice. Before the edit it guesses which files matter from memory or a stale rules file. After it, nothing independent says whether the diff matches what was asked, or what it touched on the way.',
      constraints: [
        'No model in the verdict. The same checkout and the same request give the same answer on any machine.',
        'Nothing leaves the machine by default: no server, no account, no embeddings, no upload.',
        'It runs beside every agent host instead of replacing one: Claude Code, Claude Desktop, Codex, Cursor, VS Code, Gemini CLI, and Kimi Code.',
        'Indexing never writes into the repository it inspects. The code map lives in a per-user cache.',
        'A pass is not a merge approval. Hosted CI, code owners, and a human still decide.',
      ],
      architecture: {
        intro:
          'One Node.js package with two entry points and one runtime dependency, the TypeScript compiler, which it uses to read code. Below the entry points the core is a pure function of repository state: read it top to bottom, in the order a change moves through it.',
        layers: [
          {
            label: 'Callers',
            nodes: [
              { name: 'Agent hosts', role: 'Call 14 tools over a stdio MCP server, before and after they edit.' },
              { name: 'CLI', role: 'The same engine from a terminal. Every command takes --json.' },
              { name: 'CI', role: 'Runs the gate on the pull request and writes the record after the merge.' },
            ],
          },
          {
            label: 'Repository facts',
            nodes: [
              {
                name: 'Code map',
                role: 'Symbols, imports, exports, routes, and tests for TypeScript, JavaScript, Go, C#, Python, Java, Ruby, and Rust.',
              },
              { name: 'Git state', role: 'The exact staged tree, its base, and its parent, read by identity.' },
              { name: 'Index cache', role: 'Kept per user, outside the repository, so inspecting a repo never changes it.' },
            ],
          },
          {
            label: 'Before the edit',
            nodes: [
              { name: 'Context pack', role: 'Ranks the files, tests, and validation commands a request needs.' },
              {
                name: 'Change impact',
                role: 'Predicts which files own the change, flags risk paths, and can freeze that list as a declared intent.',
              },
            ],
          },
          {
            label: 'After the edit',
            nodes: [
              {
                name: 'Convergence score',
                role: 'Compares the request with the files the diff actually changed, and issues a receipt bound to the tree.',
              },
              {
                name: 'Gate',
                role: 'Pass, warn, or fail from changed-file risk, secrets, the scope contract, validation, and ownership.',
              },
              {
                name: 'Delegated scanners',
                role: 'Runs gitleaks, Semgrep, or osv-scanner when they are installed, each as a check of its own.',
              },
            ],
          },
          {
            label: 'After the merge',
            nodes: [
              {
                name: 'Attestation',
                role: 'A hash-chained record of what shipped under which verdict. Editing one record breaks every hash after it.',
              },
              {
                name: 'Calibration',
                role: 'Replays the repository\'s own history to grade each risk flag against what was later repaired.',
              },
            ],
          },
        ],
        aside: {
          label: 'Optional, and never part of the verdict',
          nodes: [
            {
              name: 'Model read',
              role: 'A calibrated model reads the request to recommend a cheap, mid, or premium tier. Off without a key.',
            },
            {
              name: 'Hosted audit trail',
              role: 'A copy of the attestation record for teams with audits to pass. Never the diff or the source.',
            },
          ],
        },
      },
      decisions: [
        {
          chose: 'Static analysis for the verdict',
          over: 'asking a model to review the diff',
          why: 'A model cannot judge its own output. One that misread the requirement misreads it again at temperature zero, and two runs agreeing proves nothing about the first. A deterministic check fails the same way every time, where you can see it.',
        },
        {
          chose: 'Local-first, with no server',
          over: 'hosted code search and embeddings',
          why: 'No account, no upload, and the same query always gives the same packet. It also means nothing hosted can change a verdict: every hosted feature is opt-in and has a local equivalent that works fully.',
        },
        {
          chose: 'Gating the exact staged tree',
          over: 'scoring whatever is in the working directory',
          why: 'A verdict is only evidence if someone else can recompute it. The receipt is bound to the base, the parent, and the staged tree, so the number in a pull request traces back to one exact change.',
        },
        {
          chose: 'Declaring scope before the edit',
          over: 'reading the diff afterwards and hoping',
          why: 'The files a request should touch are recorded first, so the gate can name any file that was never declared. Growing the scope takes an amendment with a reason, and the reviewer reads that reason.',
        },
        {
          chose: 'Grading risk weights against git history',
          over: 'hand-tuned weights, or calling a calibrated model',
          why: 'A risk level that has never been compared to an outcome is a heuristic wearing a number. History already holds the outcome: which commits were later repaired. Measuring it needs no network, no key, and no labelling budget.',
        },
        {
          chose: 'Model routing as advice',
          over: 'letting a model into the gate',
          why: 'Some things live in the sentence and not the code, so a model read helps pick a tier. But an unreachable or unkeyed model should cost a tier, never a verdict, and only the host can actually switch models.',
        },
        {
          chose: 'Delegating to gitleaks, Semgrep, and osv-scanner',
          over: 'growing a scanner of my own',
          why: 'The gate reads paths, names, and a short list of credential formats. It is not a vulnerability database and should not turn into one.',
        },
      ],
      broke: [
        {
          what: 'Medium-risk changes were safer than low-risk ones.',
          cause: 'A lockfile bump added two points, which pushed hundreds of otherwise-low commits into medium. Over 30 days on one repository, low, medium, and high changes were later repaired 26.9%, 17.3%, and 53.2% of the time.',
          fix: 'Dependency manifests got a flag of their own, scored at zero and still shown to the reviewer. The same bands now read 10.1%, 42.1%, and 52.6%.',
        },
        {
          what: 'The first calibration said nearly every commit was later repaired.',
          cause: 'It joined a fix to any earlier commit that touched the same file. At 90 days that called 91.4% of commits repaired, which separates nothing.',
          fix: 'Blame the exact lines a fix changes and join on line overlap. The rate fell to 30.7% and the flags started to discriminate.',
        },
        {
          what: 'Fix commits were being graded as feature requests.',
          cause: 'The rule that recognises a fix by its subject missed hot-fix, bug, patch, fixes, and fixed, so 119 fix commits across two repositories were invisible as repairs.',
          fix: 'One rule shared by both graders, and saved runs can be regraded with it.',
        },
      ],
      outcome: [
        'Published on npm and the MCP Registry: 14 tools over one stdio server, and one command installs it into seven agent hosts.',
        'On a 618-commit replay of one production API, changes the gate warned on were later repaired 52.2% of the time, against 32.0% for changes it passed. The intervals do not overlap.',
        'The same replay shows the limit. The gate raised an alarm on 56.0% of changes, and 47.7% of those alarms were on changes nothing later repaired.',
        'None of that shows the gate prevents a repair. A trial with a control arm is running to measure exactly that, and I will not quote a number until both arms hold enough changes.',
      ],
    },
    links: [
      { label: 'v4.8.0 ↗', href: 'https://github.com/BASHBOP/solumbe/releases/tag/v4.8.0' },
      {
        label: 'mcp ↗',
        href: 'https://registry.modelcontextprotocol.io/?q=io.github.BASHBOP%2Fsolumbe',
        site: true,
      },
      { label: 'site ↗', href: 'https://bashbop.github.io/solumbe/' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@bashbop/solumbe' },
      { label: 'github ↗', href: 'https://github.com/BASHBOP/solumbe' },
    ],
  },
  {
    slug: 'tieline',
    name: 'tieline',
    domain: 'contract drift · mcp',
    what:
      'Frontend and backend still agree, or CI fails. Catches drift before production returns a 404. Adapters for common stack shapes. Official MCP server on the registry.',
    stack: ['Node.js', 'JavaScript (ESM)', 'OpenAPI', 'MCP over stdio', 'GitHub Actions'],
    caseStudy: {
      problem:
        'A frontend calls a route the backend no longer serves, and nothing notices until a user does. Contract testing catches it, but only after someone has written contract tests on both sides and stood up a broker. tieline reads the code both sides already have.',
      constraints: [
        'Nothing to author and nothing to run: no contract tests, no broker, no booted backend.',
        'Fast enough to gate every pull request. It finishes in well under a second.',
        'A URL built at runtime is reported as unverifiable, never guessed.',
        'Any client adapter has to pair with any server adapter.',
        'No dependencies and no model. Delete the LLM and a developer still installs it.',
      ],
      architecture: {
        intro:
          'Each side of the API boundary gets one extractor, and everything after that is shared. A new framework is a new adapter of about 80 lines; the matcher never changes.',
        layers: [
          {
            label: 'Two codebases',
            nodes: [
              { name: 'Frontend source', role: 'The HTTP calls the app makes: RTK Query, axios and fetch, Angular HttpClient.' },
              {
                name: 'Backend source',
                role: 'The routes the server declares: NestJS, Express, Fastify, Next, FastAPI, Flask, Spring, or any OpenAPI document.',
              },
            ],
          },
          {
            label: 'Adapters',
            nodes: [
              { name: 'Client adapters', role: 'Three of them. Each returns the method, raw path, file, and line of every call site.' },
              {
                name: 'Server adapters',
                role: 'Eight of them. Express walks the mount graph across files; OpenAPI covers any backend that emits a spec.',
              },
            ],
          },
          {
            label: 'Shared engine',
            nodes: [
              {
                name: 'Normaliser',
                role: 'Reduces every parameter syntax to one form, so a colon, braces, brackets, and a template literal compare equal.',
              },
              { name: 'Matcher', role: 'Joins both sides on method and path into matched, drift, unverifiable, and dead.' },
              { name: 'Hints', role: 'Did-you-mean suggestions for a drifted call, such as the right path with the wrong method.' },
            ],
          },
          {
            label: 'Out',
            nodes: [
              { name: 'Reports', role: 'Terminal, JSON, or an HTML report.' },
              { name: 'CI gate', role: 'A non-zero exit when the frontend calls something the backend does not serve.' },
              { name: 'MCP server', role: 'The same check for an agent, over stdio.' },
            ],
          },
        ],
        aside: {
          label: 'Doctor: the same engine, pointed at your docs',
          nodes: [
            { name: 'Code against spec', role: 'Diffs the routes parsed from source against the published OpenAPI spec.' },
            {
              name: 'Undocumented and phantom',
              role: 'Routes the code serves that the spec leaves out, and routes the spec promises that the code no longer serves.',
            },
          ],
        },
      },
      decisions: [
        {
          chose: 'Static analysis of both sides',
          over: 'consumer-driven contract tests',
          why: 'Contract testing gives payload-level guarantees and costs tests on both sides, a broker, and provider verification builds. tieline needs only the source, so there is nothing to write or maintain. It checks less, paths and methods and not payloads, and the two compose.',
        },
        {
          chose: 'Reading the source',
          over: 'diffing OpenAPI documents',
          why: 'Spec diff tools compare two versions of a document and never read the code, so they help only when the spec is accurate. tieline reads what the frontend actually calls.',
        },
        {
          chose: 'Unverifiable as its own result',
          over: 'guessing at URLs built at runtime',
          why: 'A URL assembled at runtime cannot be resolved by reading the code. It is reported as unverifiable and never counted as a match or as drift.',
        },
        {
          chose: 'One extractor per side and a shared matcher',
          over: 'a checker for each pair of frameworks',
          why: 'Any client adapter pairs with any server adapter, so one engine checks React against Express and Angular against Spring. Adding a framework touches nothing else.',
        },
      ],
      broke: [
        {
          what: 'Did-you-mean hints could point at the wrong route.',
          cause: 'The hint was not aware of path segments, so it could suggest a route that was not a real near miss.',
          fix: 'Hints are segment-aware and cross-reference every route, including ones under a different prefix.',
        },
        {
          what: 'The first MCP Registry release was rejected.',
          cause: 'The server description was over the registry\'s 100-character limit. The npm package had already shipped.',
          fix: 'Trimmed the description and released again the same day.',
        },
      ],
      outcome: [
        'Published on npm and the MCP Registry.',
        '11 adapters, three client and eight server, covering MERN, MEAN, Next, Python, and Spring stacks, plus any backend with an OpenAPI spec.',
        '71 tests on Node\'s built-in runner, including three cross-stack integration proofs.',
        'Known limits: extraction is regex-based, and it checks that a path and method exist, not the shape of the payload.',
      ],
    },
    links: [
      { label: 'mcp ↗', href: mcp('tieline'), site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/tieline' },
      { label: 'github ↗', href: 'https://github.com/nugehs/tieline' },
    ],
  },
  {
    slug: 'bouncer',
    name: 'bouncer',
    domain: 'compliance · mcp',
    what:
      'Your controls against versioned rule packs for the UK Online Safety Act and the ICO Children\'s Code. Rules are plain files you can diff. For when "is this lawful?" should not be a chatbot answer. Official MCP server on the registry.',
    stack: ['Node.js', 'JavaScript (ESM)', 'JSON rule packs', 'MCP over stdio', 'GitHub Actions'],
    caseStudy: {
      problem:
        'Regulators now expect controls you can demonstrate: age assurance, high-privacy defaults for children, a way to report and block on user content. Those either exist in a codebase or they do not. Vulnerability scanners look for code that should not be there. Nothing was checking for the code that must be.',
      constraints: [
        'No model. Whether a control exists should not be a chatbot answer.',
        'The engine knows nothing about the law. Everything legal lives in the rule packs.',
        'A surface it cannot find is unknown, never a pass.',
        'Every pass points at a file and a line.',
        'It is an engineering aid, not legal advice, and it says so.',
      ],
      architecture: {
        intro:
          'A small engine, a set of JSON rule packs, and an adapter that knows where things live in your stack. Read it top to bottom.',
        layers: [
          {
            label: 'Inputs',
            nodes: [
              { name: 'Rule packs', role: 'JSON files. Each rule ties a legal standard to an assertion over a surface.' },
              { name: 'Config', role: 'Which packs to run, which rules to ignore, and which verdicts fail the build.' },
              { name: 'Your repository', role: 'Read as files. Nothing is executed.' },
            ],
          },
          {
            label: 'Adapter',
            nodes: [
              {
                name: 'Surface map',
                role: 'Resolves a surface such as sign-up, profile, chat, or livestream to the files that implement it. Next.js and React Native today.',
              },
            ],
          },
          {
            label: 'Engine',
            nodes: [
              {
                name: 'Assertions',
                role: 'Find a pattern in a surface and expect it present or absent, combined with all-of, any-of, and not.',
              },
              {
                name: 'Verdicts',
                role: 'Pass with a file and line, fail when the surface exists without the control, unknown when the surface cannot be found.',
              },
            ],
          },
          {
            label: 'Out',
            nodes: [
              { name: 'Report', role: 'Terminal output, or a self-contained HTML audit report.' },
              { name: 'CI gate', role: 'Exits non-zero when a required control is missing.' },
              { name: 'MCP server', role: 'Four tools: run a check, list the rules, explain a rule, list the packs.' },
            ],
          },
        ],
      },
      decisions: [
        {
          chose: 'Checking that required code exists',
          over: 'scanning for code that should not',
          why: 'Scanners hunt for what should not be there. A repository can be free of vulnerabilities and still fail every obligation in a regulation. bouncer asks the opposite question, and the two are meant to run together.',
        },
        {
          chose: 'Rules as JSON packs',
          over: 'rules written into the engine',
          why: 'The engine knows nothing about the law; the packs do. A pack is a file you can read, diff, and review, and you can point bouncer at a directory of your own.',
        },
        {
          chose: 'An honest unknown',
          over: 'passing what it cannot see',
          why: 'If the sign-up surface cannot be located, bouncer cannot say whether age assurance is there. It reports unknown and never shows green for a surface it did not find.',
        },
        {
          chose: 'Gating application source',
          over: 'policy-as-code over configuration',
          why: 'Policy engines gate configuration and infrastructure. These obligations live in application code: a report button, a default setting, an age gate.',
        },
        {
          chose: 'Naming what a scan cannot prove',
          over: 'pretending everything is checkable',
          why: 'Some obligations are process, not code: a registration with the regulator, a signed agreement, a tax remittance. Those rules surface as gaps to track, not as things a static scan claims to have verified.',
        },
      ],
      broke: [
        {
          what: 'The MCP Registry rejected the server manifest.',
          cause: 'The description was over the registry\'s 100-character limit.',
          fix: 'Shortened it. The manifest is now published to the registry as part of every release.',
        },
      ],
      outcome: [
        'Published on npm and the MCP Registry.',
        'Five packs and 33 rules: the UK Online Safety Act, the ICO Children\'s Code, and three Nigerian packs for data protection, consumer protection, and tax.',
        '19 tests on Node\'s built-in runner, run in CI on Node 18, 20, and 22.',
        'It runs as its own check in both BashBop repositories.',
        'A green report means the coded controls a rule looks for were found. It is not a substitute for a compliance review.',
      ],
    },
    links: [
      { label: 'mcp ↗', href: mcp('bouncer'), site: true },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/bouncer' },
      { label: 'github ↗', href: 'https://github.com/nugehs/bouncer' },
    ],
  },
  {
    slug: 'aiglare',
    name: 'aiglare',
    domain: 'ai governance · mcp',
    what:
      'Finds where model output hits a user or a side effect (payments, email, writes) without guardrails. Maps to SOC 2, EU AI Act, NIST AI RMF, and OWASP LLM Top 10. Lint, Markdown evidence, or an HTML report for auditors. Red fails the build. Official MCP server on the registry.',
    stack: ['Node.js', 'JavaScript (ESM)', 'TypeScript compiler', 'MCP over stdio', 'GitHub Actions'],
    caseStudy: {
      problem:
        'Most AI incidents are not model failures. They are governance failures: the model\'s output went straight to a user or an irreversible action with nothing in between. aiglare makes those paths visible, and lets you block the worst of them in CI.',
      constraints: [
        'Static analysis only. It never calls a model and never runs your code.',
        'It works on any JavaScript or TypeScript repository with no rules to write.',
        'The CI gate has to be adoptable: it fails only on a red surface that feeds a side effect.',
        'It is a linter, not a verifier. Its output is surfaces to review, not violations.',
      ],
      architecture: {
        intro:
          'One pass over the source finds every call to a model, works out where the output goes, and scores what stands in between.',
        layers: [
          {
            label: 'Discovery',
            nodes: [
              {
                name: 'Provider registry',
                role: '14 providers, from OpenAI and Anthropic to Bedrock, Ollama, and the Vercel AI SDK, plus raw HTTP calls to known inference hosts.',
              },
              { name: 'Scanner', role: 'Built on the TypeScript compiler. Finds each place the code calls a model.' },
            ],
          },
          {
            label: 'Classification',
            nodes: [
              { name: 'Sink', role: 'Where the output goes: user-facing, side-effectful, or internal.' },
              {
                name: 'Guardrails',
                role: 'Five dimensions: confidence handling, a fallback path, output validation, a human in the loop, and error isolation.',
              },
              {
                name: 'Severity',
                role: 'Red when output reaches a user or a side effect with no guardrails, amber for partial cover, green when they are there.',
              },
            ],
          },
          {
            label: 'Compliance mapping',
            nodes: [
              {
                name: 'Controls',
                role: 'Each finding mapped to named controls in SOC 2, the EU AI Act, NIST AI RMF, and the OWASP LLM Top 10.',
              },
            ],
          },
          {
            label: 'Out',
            nodes: [
              { name: 'Reports', role: 'Terminal, JSON, lint format, a Markdown evidence document, or an HTML report for an auditor.' },
              { name: 'CI gate', role: 'Fails the build on a red, side-effectful surface.' },
              { name: 'MCP server', role: 'The same audit for an agent, with the control violations attached.' },
            ],
          },
        ],
      },
      decisions: [
        {
          chose: 'Static analysis before anything runs',
          over: 'runtime validators on every call',
          why: 'Runtime guardrail libraries check each output as it happens, but only where someone has wired them in. aiglare finds the surfaces that have no guardrail at all. It tells you where one is missing; a runtime validator is how you add it.',
        },
        {
          chose: 'AI knowledge built in',
          over: 'general lint rules you write yourself',
          why: 'A general rule engine leaves you to write and maintain the rules. aiglare ships the provider registry, the sink classification, and the five guardrail dimensions.',
        },
        {
          chose: 'Failing only on red side effects',
          over: 'failing on every finding',
          why: 'The dangerous case is a model that triggers an irreversible action with no confirmation. Gating on that alone makes it safe to adopt without drowning a team in warnings.',
        },
        {
          chose: 'Calling it a linter',
          over: 'calling it a verifier',
          why: 'It produces false positives, because a guardrail two calls away can be missed, and false negatives, because a confidence variable that gates nothing still reads as present. The README says both.',
        },
      ],
      broke: [
        {
          what: 'Bedrock was being detected by accident.',
          cause: 'A host matcher happened to find the Bedrock runtime name inside the import string. That also meant wiring files that never call a model were reported as AI surfaces.',
          fix: 'Imports are now matched by package, on purpose, and left out of host matching.',
        },
      ],
      outcome: [
        'Published on npm and the MCP Registry, with a one-week pilot runbook for trying it on a real codebase.',
        '14 providers, five guardrail dimensions, and four frameworks mapped.',
        '48 tests, all passing.',
        'It is the AI governance check inside gate.',
      ],
    },
    links: [
      { label: 'mcp ↗', href: mcp('aiglare'), site: true },
      { label: 'site ↗', href: 'https://nugehs.github.io/aiglare-web/' },
      { label: 'npm ↗', href: 'https://www.npmjs.com/package/@nugehs/aiglare' },
      { label: 'github ↗', href: 'https://github.com/nugehs/aiglare' },
    ],
  },
];
