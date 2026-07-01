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
      'Ticketing for UK diaspora organisers. The tickets part is straightforward; getting money between the UK and Lagos without it falling over is not. I built this because I kept seeing organisers patch together WhatsApp, spreadsheets, and prayer. Stack is Docker Compose, Cloudflare R2, Paystack and Stripe. I\'m still the person who gets the 2am call.',
    links: [{ label: 'bashbop.com ↗', href: 'https://bashbop.com', site: true }],
  },
  {
    name: 'Brain Boost Buddy',
    domain: 'desktop · ks1–ks2',
    what:
      'A Mac and Windows app that locks the laptop at login until your child passes a short quiz. Maths, English and money for UK Years 2–6 (ages 6–11), with SATs or 11+ practice. I built it when screen time kept turning into a daily argument. You hold the parent PIN; they earn the unlock. Free 7-day trial, then £2.99 a month.',
    links: [{ label: 'brainboostbuddy.com ↗', href: 'https://brainboostbuddy.com', site: true }],
  },
  {
    name: 'Snap A Bird',
    domain: 'mobile · birds',
    what:
      'My son Nathan can ID birds by call. The rest of the family cannot. So I built him an app: point the phone, get a species name. It covers 964 UK birds, runs on-device with BirdNET, works offline on walks with no signal, and costs nothing. Sightings feed an open dataset researchers can use under Creative Commons.',
    links: [
      { label: 'snapabird.com ↗', href: 'https://snapabird.com', site: true },
      { label: 'about ↗', href: 'https://snapabird.com/about' },
    ],
  },
];
