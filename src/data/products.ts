export type ArchNode = { name: string; role: string };
export type ArchLayer = { label: string; nodes: ArchNode[] };

/** Plain text throughout, like the rest of a card. A section with nothing in it is not rendered. */
export type CaseStudy = {
  problem: string;
  constraints: string[];
  architecture: {
    intro: string;
    /** Top to bottom: each layer feeds the one below it. */
    layers: ArchLayer[];
    /** Parts that sit outside the main flow. */
    aside?: ArchLayer;
    /** Further subsystems worth their own diagram, each read top to bottom. */
    more?: { title: string; intro: string; layers: ArchLayer[] }[];
  };
  decisions: { chose: string; over: string; why: string }[];
  broke: { what: string; cause: string; fix: string }[];
  outcome: string[];
};

export type Card = {
  /** URL segment: /<section>/<slug>/. Changing it breaks inbound links. */
  slug: string;
  name: string;
  domain: string;
  what: string;
  links: { label: string; href: string; site?: boolean }[];
  stack?: string[];
  caseStudy?: CaseStudy;
};

export const products: Card[] = [
  {
    slug: 'bashbop',
    name: 'BashBop',
    domain: 'events & ticketing',
    what:
      'Event ticketing with payouts and money movement in one place, so organisers are not stuck on WhatsApp and spreadsheets. Works in any country Stripe or Paystack covers. Its assistant answers visitor questions from live event data: retrieval over pgvector, a deterministic fact check, and evals to measure it.',
    links: [{ label: 'bashbop.com ↗', href: 'https://bashbop.com', site: true }],
    stack: [
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'Next.js',
      'Expo / React Native',
      'Stripe Connect',
      'Paystack',
      'pgvector',
      'Cloudflare Workers AI',
      'Socket.IO',
      'Playwright',
    ],
    caseStudy: {
      problem:
        'Selling a ticket is the easy part. The hard part is the money. An organiser in Lagos and an organiser in London need different processors, different fee rules, and different payout rails, and each of them expects the figure on the dashboard to be the figure that lands in their bank. Without that, they are back on WhatsApp and a spreadsheet.',
      constraints: [
        'Two processors with different models: Stripe Connect where Stripe operates, Paystack for Nigeria, Ghana, and Kenya.',
        'The processor pays the organiser. BashBop takes its fee and does not run payouts by hand.',
        'Every figure an organiser sees has to match what reaches their bank, to the minor unit.',
        'A webhook can arrive twice or late, and the booking must still be confirmed exactly once.',
        'Anything the assistant tells a visitor has to come from an event record. A wrong answer is worse than no answer.',
        'One API serves the web app and the mobile app, and the web app ships in five locales, Nigerian Pidgin included.',
      ],
      architecture: {
        intro:
          'One NestJS API behind two clients. Two parts are worth drawing. The first is the payment path: a booking goes down through one payment interface to whichever processor the organiser\'s country needs, and comes back through webhooks. The second, further down, is the event assistant.',
        layers: [
          {
            label: 'Clients',
            nodes: [
              { name: 'Web app', role: 'Next.js and React, for organisers and buyers, in five locales.' },
              { name: 'Mobile app', role: 'Expo and React Native on the same API, with a scanner for tickets at the door.' },
            ],
          },
          {
            label: 'API',
            nodes: [
              { name: 'NestJS modules', role: 'Events, bookings, payments, vendors, and notifications in one modular service.' },
              { name: 'WebSocket gateways', role: 'Presence and notifications pushed over Socket.IO.' },
            ],
          },
          {
            label: 'Payment path',
            nodes: [
              { name: 'Payment service', role: 'One interface for every payment operation, whatever the processor.' },
              {
                name: 'Processor factory',
                role: 'Picks the processor from the organiser\'s country, or from the connected account it already holds.',
              },
              {
                name: 'Stripe processor',
                role: 'Destination charges through Stripe Connect, with the platform fee taken at charge time.',
              },
              {
                name: 'Paystack processor',
                role: 'Split payments to the organiser\'s subaccount, settled by Paystack straight to their bank.',
              },
            ],
          },
          {
            label: 'After the payment',
            nodes: [
              {
                name: 'Webhook handlers',
                role: 'Verify the processor\'s signature, then confirm the booking once, however often the event arrives.',
              },
              {
                name: 'Fee true-up',
                role: 'Compares the fee Stripe actually billed with the estimate taken at checkout, and corrects the difference.',
              },
              {
                name: 'Settlement record',
                role: 'Stores the processor\'s own split on the booking, so payout figures are read and never re-derived.',
              },
            ],
          },
          {
            label: 'Data',
            nodes: [
              { name: 'PostgreSQL', role: 'Bookings, payments, and audit history, through Prisma.' },
              { name: 'Redis', role: 'Cache and sessions.' },
            ],
          },
        ],
        aside: {
          label: 'On every pull request',
          nodes: [
            { name: 'CI', role: 'Type check, lint, build, and tests against real Postgres and Redis containers.' },
            { name: 'Migration check', role: 'A separate safety check on every schema migration.' },
            { name: 'bouncer and gitleaks', role: 'Compliance controls and secret scanning, each as a check of its own.' },
          ],
        },
        more: [
          {
            title: 'Event assistant: retrieval-augmented answers',
            intro:
              'Bash, the mascot, answers visitor questions about public events from BashBop\'s own records, and shows the events it used as cards. Every step below is allowed to decline.',
            layers: [
              {
                label: 'Index',
                nodes: [
                  {
                    name: 'Event documents',
                    role: 'One text document per public event: title, description, dates, venue, pricing, host, and series.',
                  },
                  { name: 'Chunk and embed', role: 'Chunks embedded with bge-m3 on Cloudflare Workers AI.' },
                  { name: 'pgvector', role: 'An HNSW index in the existing Postgres, next to the columns the filters use.' },
                ],
              },
              {
                label: 'Retrieve',
                nodes: [
                  {
                    name: 'Question filters',
                    role: 'Narrows by the city and dates named in the question, or by the event page the visitor is on.',
                  },
                  { name: 'Filtered search', role: 'Cosine top-k, always limited to public, live, upcoming events.' },
                  { name: 'Abstain', role: 'A weak best score skips the model and declines in about a tenth of a second.' },
                  {
                    name: 'FAQ and fees',
                    role: 'General questions search the FAQ by meaning. Fee answers are read from the fee configuration, not from prose.',
                  },
                ],
              },
              {
                label: 'Answer',
                nodes: [
                  {
                    name: 'Grounded generation',
                    role: 'The model answers from numbered records only and returns the ids of the events it used.',
                  },
                  {
                    name: 'Fact check',
                    role: 'Deterministic: every amount, time, and date in the answer must appear in the records it cites.',
                  },
                  { name: 'Event cards', role: 'Dates, prices, and links come from the database by id, never from model text.' },
                ],
              },
              {
                label: 'In the chat',
                nodes: [
                  { name: 'Mascot pop-up', role: 'Streams the answer, shows the cards, and offers one next step.' },
                  {
                    name: 'Visitor language',
                    role: 'Answers in French or Nigerian Pidgin when the visitor\'s locale asks for it, held to the same fact check.',
                  },
                ],
              },
            ],
          },
        ],
      },
      decisions: [
        {
          chose: 'One payment interface, one processor per region',
          over: 'Stripe calls wired straight into the booking code',
          why: 'The first version was Stripe-only and the booking code called it directly. Adding Nigeria that way meant a second copy of every payment path. Behind one interface the booking code asks for a payment and a factory picks the processor from the organiser\'s country.',
        },
        {
          chose: 'Paystack for Nigeria, Ghana, and Kenya',
          over: 'Flutterwave',
          why: 'Both support the marketplace model, with a subaccount per organiser and automatic splits. Paystack came out ahead on fees for small local transactions, and I expected most ticket sales to be local.',
        },
        {
          chose: 'Letting the processor pay the organiser',
          over: 'collecting everything and running payouts myself',
          why: 'On both processors the organiser\'s share moves to their own account as part of the charge. There is no payout run to operate, and no balance of other people\'s ticket money building up on the platform.',
        },
        {
          chose: 'Reading the payout from the processor\'s own record',
          over: 'recomputing it from fee constants',
          why: 'The only exact record of what an organiser was paid is the processor\'s split on the transaction. Anything derived from fee estimates is a second opinion, and it drifts the first time a fee rule changes.',
        },
        {
          chose: 'Idempotency in the database',
          over: 'trusting a webhook to arrive once',
          why: 'A booking reference is unique in the database and each fee adjustment is recorded per charge. A webhook that arrives twice finds the work already done and changes nothing.',
        },
        {
          chose: 'Retrieval from live event records',
          over: 'fine-tuning a model on events',
          why: 'Event data changes minute to minute. Retrieval is fresher and cheaper, and every answer can point at the records it came from.',
        },
        {
          chose: 'pgvector in the Postgres I already run',
          over: 'a dedicated vector database',
          why: 'A second system to operate for a modest corpus was not worth it. pgvector in the existing database is enough, and it keeps the public, live, and upcoming filters in SQL beside the vectors.',
        },
        {
          chose: 'Declining instead of guessing',
          over: 'always producing an answer',
          why: 'A wrong answer is worse than no answer. A weak retrieval score skips the model, the server rejects any event the model cites that retrieval did not return, and a deterministic check holds every amount, time, and date to the cited records.',
        },
      ],
      broke: [
        {
          what: 'Organisers on Paystack saw a payout balance of zero.',
          cause: 'Earnings summed a field Paystack never returns, and the payout breakdown estimated fees with constants written for Stripe.',
          fix: 'A booking now records Paystack\'s own split when it is confirmed, and every organiser-facing figure is read from it. Payments too small to split show as held by BashBop instead of paid out.',
        },
        {
          what: 'Premium, European, and international cards cost the platform money.',
          cause: 'Checkout charged a flat estimated processing fee, but Stripe bills by card origin, and on a destination charge the real fee comes out of the platform balance.',
          fix: 'After each successful payment the fee Stripe billed is compared with the estimate and any shortfall is reversed from the organiser\'s transfer. The result is stored per charge and shown in their payout breakdown.',
        },
        {
          what: 'A paid order could crash at confirmation.',
          cause: 'Stock was updated from the item list in the checkout session\'s metadata, which could serialise to an empty list. The update then ran with no item id, after the payment had already succeeded.',
          fix: 'Confirmation reads the purchased items from the booking\'s own stored rows, which are the authoritative record.',
        },
        {
          what: 'The assistant said there were three events in London. There were four.',
          cause: 'The model was given three records and described them as the whole listing. The retrieval metrics looked fine; reading the answers is what found it.',
          fix: 'The prompt forbids claims about the whole listing, and the fact check drops any sentence that makes one.',
        },
        {
          what: 'The abstain threshold tuned on test data was wrong for real events.',
          cause: 'On a synthetic corpus off-topic questions scored up to 0.41 and real matches started at 0.44. On real event descriptions off-topic questions reached 0.49.',
          fix: 'The threshold is set per environment, and a question that slips past retrieval is still declined by the answer step, at the cost of one model call.',
        },
      ],
      outcome: [
        'Live at bashbop.com, taking payments through Stripe and Paystack, with web and mobile clients on one API.',
        'The API is at v2.121 and the web app at v23.19, both released from CI.',
        'Seven critical journeys, paid checkout and organiser refund among them, run as Playwright tests in a real browser.',
        'The mascot chat is shown to half of production visitors. On 35 hand-written questions over real public events, retrieval found the right event 27 times out of 27, the answer path declined all 8 off-topic questions, and no answer carried an amount, time, or date missing from its sources. The median answer took about a second. Thirty-five questions is a small sample.',
      ],
    },
  },
  {
    slug: 'brain-boost-buddy',
    name: 'Brain Boost Buddy',
    domain: 'desktop · ks1-ks2',
    what:
      'Laptop stays locked at login until your child clears a short quiz. Maths, English, and money for UK Years 2-6, plus SATs and 11+ practice. Built when screen time became a daily fight. Parent PIN on your side; unlock earned on theirs. A weekly lesson-time schedule sleeps the laptop for set windows and can launch Zoom or Teams when a lesson starts. Free for 7 days, then £2.99 a month.',
    links: [{ label: 'brainboostbuddy.com ↗', href: 'https://brainboostbuddy.com', site: true }],
    stack: [
      'Electron',
      'electron-updater',
      'Cloudflare Workers',
      'D1',
      'KV',
      'R2',
      'Lemon Squeezy',
      'Playwright',
      'Capacitor',
    ],
  },
  {
    slug: 'snap-a-bird',
    name: 'Snap A Bird',
    domain: 'mobile · birds',
    what:
      'Point the phone, get a species. An image model that knows 964 species runs on the phone, so it works on walks with no signal. Free, because I built it for my son Nathan. Public sightings go into an open Creative Commons dataset researchers can use.',
    stack: [
      'Expo / React Native',
      'TensorFlow Lite',
      'VisionCamera',
      'SQLite',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Cloudflare R2',
      'Claude API',
    ],
    caseStudy: {
      problem:
        'Snap A Bird began with my son Nathan, who knows his birds. Most people see a small brown bird and think sparrow, when it could be a dunnock or a wren. I wanted an answer from one photo, on the walk, with no signal.',
      constraints: [
        'Identification has to work with no connection, so the model ships inside the app.',
        'A photo leaves the phone only when the user asks for a second opinion.',
        'A guess under the confidence threshold is not shown.',
        'Research data carries no names, emails, or photos, and only sightings the user made public.',
      ],
      architecture: {
        intro:
          'Offline first. Everything needed to name a bird and save the sighting is on the phone. The network is for a second opinion and for sharing.',
        layers: [
          {
            label: 'On the phone',
            nodes: [
              { name: 'Camera', role: 'Frames from the camera, throttled and resized to the model\'s input.' },
              {
                name: 'Classifier',
                role: 'MobileNet V3 in TensorFlow Lite, quantised to about 12 MB, covering 964 species. No network call at inference.',
              },
              {
                name: 'Location filter',
                role: 'In the UK and Ireland, weighs each prediction by how likely that species is there and flags a rare sighting.',
              },
              { name: 'Local store', role: 'Sightings saved to SQLite with species, confidence, place, and time.' },
            ],
          },
          {
            label: 'Second opinion',
            nodes: [
              {
                name: 'Cloud rescan',
                role: 'For a low-confidence result, or on request, the photo and the phone\'s top guess go to Claude Sonnet through the backend.',
              },
              { name: 'Fallback', role: 'If that call fails, the on-device answer stands.' },
              { name: 'Audit log', role: 'Every rescan is recorded with its source, status, and both confidence scores.' },
            ],
          },
          {
            label: 'Sync',
            nodes: [
              { name: 'API', role: 'Express and Prisma on PostgreSQL. Sync is optional and started by the user.' },
              { name: 'Photo storage', role: 'A saved sighting keeps its photo in Cloudflare R2.' },
            ],
          },
          {
            label: 'Open data',
            nodes: [
              { name: 'Research API', role: 'Anonymised public sightings as JSON or CSV, under CC BY 4.0.' },
              { name: 'Rare alerts', role: 'An uncommon or rare species triggers the alert pipeline.' },
            ],
          },
        ],
        aside: {
          label: 'Governance, written down',
          nodes: [
            { name: 'Model card', role: 'What each model is, what it is for, and what it cannot do.' },
            { name: 'DPIA', role: 'The data protection assessment for the AI processing.' },
            { name: 'AI Act assessment', role: 'How the system is classified under the EU AI Act, and what follows from that.' },
          ],
        },
      },
      decisions: [
        {
          chose: 'A model on the phone',
          over: 'sending every photo to a server',
          why: 'A bird does not wait for a signal. The classifier is bundled with the app and makes no network call, so identification works offline and the photo stays on the phone.',
        },
        {
          chose: 'A cloud model only as a second opinion',
          over: 'identifying in the cloud first',
          why: 'Image bytes leave the device only when a rescan is invoked. When that call fails the app falls back to the on-device answer, so the cloud can improve a result but cannot block one.',
        },
        {
          chose: 'Not showing a weak guess',
          over: 'always naming a species',
          why: 'Predictions under the confidence threshold are not surfaced. The model card is plain that the threshold is one global value, not calibrated per species.',
        },
        {
          chose: 'Stripping identity at the API',
          over: 'publishing raw sightings',
          why: 'Only sightings marked public are included. User ids, emails, display names, and photos are removed before anything reaches the research API.',
        },
      ],
      broke: [
        {
          what: 'The multi-model rescan was too slow for production.',
          cause: 'The second opinion was planned as an ensemble of models with a fusion score. In production the latency was not acceptable.',
          fix: 'Reverted to a single model on 17 April 2026. The fusion path stays disabled, and the model card says so.',
        },
      ],
      outcome: [
        'Shipping on iOS, at version 2.0.2.',
        'The classifier is about 12 MB and covers 964 species, with a UK list of 170 used to weigh results.',
        'Public sightings are available to researchers under CC BY 4.0.',
        'Per-species accuracy has not been measured yet. The model card lists it as an open item.',
      ],
    },
    links: [
      { label: 'snapabird.com ↗', href: 'https://snapabird.com', site: true },
      { label: 'about ↗', href: 'https://snapabird.com/about' },
    ],
  },
];
