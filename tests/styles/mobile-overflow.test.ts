import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// happy-dom has no layout engine, so these are static guards on the CSS that
// keeps every page inside the viewport on phones. The real layout check is
// scripts/check-mobile-overflow.mjs (headless Chrome at 320/375/390/430px).
const read = (p: string) => readFileSync(resolve(__dirname, '../..', p), 'utf8');
const globalCss = read('src/styles/global.css');
const nav = read('src/components/ui/Navigation.astro');

describe('mobile horizontal overflow guards', () => {
  it('uses border-box sizing globally so .container padding stays inside 100% width', () => {
    expect(globalCss).toMatch(/\*,\s*\*::before,\s*\*::after\s*\{\s*box-sizing:\s*border-box;/);
  });

  it('wraps long words and inline code in content', () => {
    expect(globalCss).toMatch(/overflow-wrap:\s*anywhere/);
  });

  it('caps media and embeds at their container width', () => {
    expect(globalCss).toMatch(/img,\s*svg,\s*video,\s*iframe[^{]*\{\s*max-width:\s*100%;/);
  });

  it('does not hide overflow on body or html as a band-aid', () => {
    expect(globalCss).not.toMatch(/(?:^|\n)\s*(?:html|body)[^{]*\{[^}]*overflow-x:\s*hidden/);
  });

  it('removes the default ul padding on the nav and lets links wrap', () => {
    expect(nav).toMatch(/\.nav-desktop\s*\{[^}]*padding:\s*0;[^}]*flex-wrap:\s*wrap;/);
  });
});
