import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import { describe, expect, it } from 'vitest';

const tracks = ['public/devops-track/index.html', 'public/ai-engineer-track/index.html'];
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe.each(tracks)('%s', (path) => {
  const html = read(path);

  it('stays unlisted', () => {
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(read('index.html')).not.toContain(path.replace(/^public|index\.html$/g, ''));
  });

  it('uses no em dashes in copy', () => {
    expect(html).not.toContain('—');
  });

  it('has inline scripts and JSON blocks that parse', () => {
    const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)];
    expect(blocks.length).toBeGreaterThan(0);
    for (const [, attrs, code] of blocks) {
      if (attrs.includes('application/json')) expect(() => JSON.parse(code)).not.toThrow();
      else expect(() => new Script(code)).not.toThrow();
    }
  });

  it('has no duplicate element ids', () => {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicates).toEqual([]);
  });
});
