export type Card = {
  name: string;
  domain: string;
  what: string;
  links: { label: string; href: string; site?: boolean }[];
};

export const products: Card[] = [
  {
    name: 'BashBop',
    domain: 'events & ticketing',
    what:
      'Event ticketing with payouts and money movement in one place, so organisers are not stuck on WhatsApp and spreadsheets. Works in any country Stripe or Paystack covers.',
    links: [{ label: 'bashbop.com ↗', href: 'https://bashbop.com', site: true }],
  },
  {
    name: 'Brain Boost Buddy',
    domain: 'desktop · ks1-ks2',
    what:
      'Laptop stays locked at login until your child clears a short quiz. Maths, English, and money for UK Years 2-6, plus SATs and 11+ practice. Built when screen time became a daily fight. Parent PIN on your side; unlock earned on theirs. Free for 7 days, then £2.99 a month.',
    links: [{ label: 'brainboostbuddy.com ↗', href: 'https://brainboostbuddy.com', site: true }],
  },
  {
    name: 'Snap A Bird',
    domain: 'mobile · birds',
    what:
      'Point the phone, get a species. 964 UK birds, BirdNET on-device, works offline on walks with no signal. Free, because I built it for my son Nathan. Sightings go into an open Creative Commons dataset researchers can use.',
    links: [
      { label: 'snapabird.com ↗', href: 'https://snapabird.com', site: true },
      { label: 'about ↗', href: 'https://snapabird.com/about' },
    ],
  },
];
