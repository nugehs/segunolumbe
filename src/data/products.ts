export type Card = {
  mark: string;
  name: string;
  domain: string;
  q: string;
  what: string;
  meta: [string, string][];
  links: { label: string; href: string; site?: boolean }[];
  gate: [string, string];
};

export const products: Card[] = [
  {
    mark: '▲',
    name: 'BashBop',
    domain: 'events & ticketing',
    q: 'Ticketing that actually handles UK-to-Lagos money.',
    what: `An <b>event and ticketing platform</b> I founded and still run. It's aimed at UK diaspora organisers, which means the hard part isn't the tickets — it's moving money <b>across the UK↔Lagos border</b> without it being a nightmare. Everything else on this page sits under this company.`,
    meta: [
      ['role', 'Founder, and the person on call at 2am'],
      ['stack', 'Docker Compose, Cloudflare R2, Paystack + Stripe'],
      ['doing now', 'Organiser/vendor tooling, live event streaming'],
    ],
    links: [{ label: 'bashbop.com ↗', href: 'https://bashbop.com', site: true }],
    gate: ['var(--green)', 'live'],
  },
  {
    mark: '◆',
    name: 'Snap A Bird',
    domain: 'ai · mobile · conservation',
    q: 'My son knows every bird. So I built the app.',
    what: `My son Nathan is the bird obsessive — calls, habitats, the lot. The rest of us just see "small brown bird." So I built him an app: point your phone, get the species. It knows <b>964 of them</b>, runs the ID <b>on-device and offline</b>, and it's free. Every photo also feeds an <b>open data API</b> that conservation researchers can use for nothing.`,
    meta: [
      ['build', 'React Native, on-device TensorFlow Lite (BirdNET)'],
      ['why offline', 'No signal on a country walk, no paywall on curiosity'],
      ['data', 'Anonymised sightings, free under Creative Commons'],
    ],
    links: [
      { label: 'snapabird.com ↗', href: 'https://snapabird.com', site: true },
      { label: 'the story ↗', href: 'https://snapabird.com/about' },
    ],
    gate: ['var(--green)', 'live'],
  },
];
