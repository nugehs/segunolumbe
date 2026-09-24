import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { pages } from '../src/data/pages';
import { products, type Card } from '../src/data/products';
import { sectionNote } from '../src/data/sections';
import { stack } from '../src/data/stack';
import { tools } from '../src/data/tools';

const root = new URL('../', import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), 'utf8');
const cards: Card[] = [...tools, ...products, ...stack];

// Card and page copy renders as plain text, so Markdown shows up literally.
const plainText = [
  ...cards.flatMap((card) => [card.name, card.domain, card.what]),
  ...Object.values(pages).flatMap((page) => [page.title, page.domain, page.body]),
  ...Object.values(sectionNote),
];

describe('site copy', () => {
  it('has no Markdown syntax in plain-text fields', () => {
    for (const text of plainText) {
      expect(text, text).not.toMatch(/`|\*\*|\]\(/);
    }
  });

  it('links cards over https only', () => {
    for (const card of cards) {
      for (const link of card.links) expect(link.href, card.slug).toMatch(/^https:\/\//);
    }
  });

  it('quotes one Òtítọ́ version everywhere', () => {
    const otito = tools.find((tool) => tool.slug === 'otito');
    const version = otito?.domain.match(/v(\d+\.\d+\.\d+)/)?.[1];
    expect(version).toBeDefined();
    const release = otito?.links.find((link) => link.href.includes('/releases/tag/'));
    expect(release?.href).toMatch(new RegExp(`/tag/v${version}$`));
    expect(release?.label).toContain(`v${version}`);
    for (const text of [pages.now.body, ...plainText]) {
      for (const [, mentioned] of text.matchAll(/Òtítọ́ v(\d+\.\d+\.\d+)/g)) expect(mentioned).toBe(version);
    }
  });

  it('never mentions the retired context tool', () => {
    // Built from parts so this file does not match itself.
    const retired = ['repo', 'ctx'].join('');
    const tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter((path) => /\.(ts|tsx|mjs|js|json|html|md|css|yml|txt|xml)$/.test(path))
      .filter((path) => path !== 'package-lock.json');
    const offenders = tracked.filter((path) => read(path).toLowerCase().includes(retired));
    expect(offenders).toEqual([]);
  });
});

/** Walk JPEG segments up to start-of-scan and list the APPn markers present. */
function jpegAppMarkers(bytes: Buffer): number[] {
  const markers: number[] = [];
  let offset = 2;
  while (offset < bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda) break;
    if (marker >= 0xe0 && marker <= 0xef) markers.push(marker);
    offset += 2 + bytes.readUInt16BE(offset + 2);
  }
  return markers;
}

describe('public assets', () => {
  it('ships photos without EXIF, so no GPS or device metadata leaks', () => {
    const jpegs = execFileSync('git', ['ls-files', 'public/*.jpg', 'public/*.jpeg'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    expect(jpegs.length).toBeGreaterThan(0);
    for (const path of jpegs) {
      const markers = jpegAppMarkers(readFileSync(new URL(path, root)));
      expect(markers, `${path} has an APP1 (EXIF/XMP) segment`).not.toContain(0xe1);
      expect(markers, `${path} has an APP13 (IPTC) segment`).not.toContain(0xed);
    }
  });
});
