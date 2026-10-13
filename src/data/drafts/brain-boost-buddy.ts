import type { CaseStudy } from '../products';

// Written but not published. Nothing imports this file, so it is neither rendered nor bundled.
// To publish: import it in ../products.ts and set it as the brain-boost-buddy card's caseStudy.
export const brainBoostBuddyCaseStudy: CaseStudy = {
  problem:
    'Screen time had become a daily fight. I wanted the laptop to stay locked at login until my child had done a few minutes of real practice, so the unlock is earned on their side and the PIN stays on mine. It had to work for a six-year-old, and it must never trap the parent.',
  constraints: [
    'A parent must never be trapped, least of all before setup is finished.',
    'The quiz and the unlock work offline. Fonts, sounds, and questions ship inside the app.',
    'A wrong answer teaches and then retries. It never shames a child or leaves them stuck.',
    'The billing secret cannot live in a desktop app, because anything inside an installer can be extracted.',
    'Electron cannot block what the operating system catches first: app switching, force quit, a reboot.',
  ],
  architecture: {
    intro:
      'An Electron app with one page for the whole interface, and a Cloudflare Worker for the only part that needs a secret. Read it from the screen the child sees down to that one service.',
    layers: [
      {
        label: 'At login',
        nodes: [
          {
            name: 'Kiosk window',
            role: 'Fullscreen, exit keys blocked, focus snapped back. Re-applied after sleep or a screen unlock.',
          },
          {
            name: 'Preload bridge',
            role: 'The only path from the page to the system, with context isolation on and Node integration off.',
          },
          {
            name: 'Parent panel',
            role: 'Behind a four-digit PIN: settings, child profiles, progress, skip a day, switch off.',
          },
        ],
      },
      {
        label: 'Earning the unlock',
        nodes: [
          {
            name: 'Question engine',
            role: 'Generated maths, English, and money questions for England Years 2 to 6, with an optional 11+ tier.',
          },
          { name: 'Teaching', role: 'A wrong answer opens a short lesson on that topic, then a fresh question.' },
          {
            name: 'Lesson times',
            role: 'A weekly schedule stands the lock down for a lesson, opens the Zoom or Teams call, and re-arms afterwards.',
          },
        ],
      },
      {
        label: 'Licence check',
        nodes: [
          {
            name: 'Licence Worker',
            role: 'Holds the billing secret and answers two questions from the app: start, and status.',
          },
          {
            name: 'Trial store',
            role: 'A D1 table of trials: one free trial email per device, disposable addresses refused.',
          },
          { name: 'Rate limit', role: 'Per-email and per-IP throttling in KV.' },
        ],
      },
      {
        label: 'Billing',
        nodes: [
          {
            name: 'Lemon Squeezy',
            role: 'Subscriptions and licence keys. The app validates its key against the public endpoint on each launch.',
          },
        ],
      },
    ],
    aside: {
      label: 'Release, outside the running app',
      nodes: [
        {
          name: 'Builds',
          role: 'The macOS build is signed and notarised; the Windows installer is built in CI.',
        },
        {
          name: 'Update feed',
          role: 'Installers and update metadata on Cloudflare R2. Nothing installs until a parent chooses to.',
        },
        {
          name: 'Smoke test',
          role: 'Static checks and a headless browser run over the quiz, the lessons, and the curriculum.',
        },
      ],
    },
  },
  decisions: [
    {
      chose: 'A kiosk that lets go on a pass',
      over: 'full operating-system lockdown',
      why: 'App switching, force quit, and a reboot are caught by the operating system before Electron sees them, and closing them needs device management or an assigned-access account. For a primary-school child the kiosk removes every casual escape and releases itself on a pass, which is the goal. The rest is optional hardening, and the README says so.',
    },
    {
      chose: 'Not locking until the parent hands over',
      over: 'locking as soon as the settings are saved',
      why: 'Until setup finishes the app is an ordinary window that quits normally. The laptop goes fullscreen only at an explicit handover step, so a parent who is halfway through setup can always get out.',
    },
    {
      chose: 'A subscription activated by email',
      over: 'a one-off licence key to type in',
      why: 'The first version sold a key for a single payment. Now a parent enters the email they paid with and the app fetches and validates the licence itself, with a seven-day trial that needs no card. It is also recurring revenue instead of a one-off.',
    },
    {
      chose: 'A Worker that holds the billing secret',
      over: 'putting the API key in the app',
      why: 'Finding a subscription by email needs the billing API secret, and anything inside an installer can be extracted. The Worker is the only holder of the secret and exposes one narrow set of endpoints.',
    },
    {
      chose: 'Offline first, with a 14-day grace',
      over: 'failing closed when the licence server cannot be reached',
      why: 'A flaky connection must not falsely expire a paying customer. An unreachable or malformed answer counts as offline and the grace window applies; only a clear expired answer shows the renew screen.',
    },
    {
      chose: 'Updates the parent decides',
      over: 'silent automatic updates',
      why: 'The app checks quietly and shows an install button in the parent panel. Nothing downloads or installs until the parent chooses, and the child never sees an update prompt.',
    },
    {
      chose: 'Wrong answers that teach',
      over: 'a fail screen or a lockout',
      why: 'A wrong answer opens a short lesson on that topic and then a fresh question. No red crosses, no streak punishment, no dead end.',
    },
  ],
  broke: [
    {
      what: 'The lock fought the parent for the keyboard.',
      cause: 'The kiosk snaps focus back to itself. On Windows it stole focus from the parent PIN field, and on macOS the field could not take typing once the window had left fullscreen.',
      fix: 'Opening the parent panel now exits the kiosk first and hands focus to the PIN field. Setup also shows a visible Quit.',
    },
    {
      what: 'Offline grace did not cover a broken answer.',
      cause: 'When the billing API returned a malformed or error response, the app took it as a verdict and showed the expired screen.',
      fix: 'A response that is not a real payload now counts as offline, so the grace window applies and the check is retried.',
    },
    {
      what: 'Telling-the-time questions were wrong.',
      cause: 'Clock questions are generated, and both the generation and the clock-hand alignment were off across the read, guided-practice, and retry flows.',
      fix: 'Corrected the generator and added regression coverage for every clock time, including hour changes, minute carry and borrow, noon, and 10:55.',
    },
  ],
  outcome: [
    'On sale at brainboostbuddy.com for macOS and Windows: free for 7 days, then £2.99 a month.',
    'At v2.6.0, with multiple children under one PIN, a parent onboarding wizard, and weekly lesson times added since 1.0.',
    'The same lesson engine is on the App Store for iPhone and iPad through Capacitor, without the device lock.',
  ],
};
