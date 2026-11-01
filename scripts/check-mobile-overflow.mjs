// Manual layout check: no page may scroll sideways on a phone.
// Usage:
//   npm run build && npx astro preview --port 4321 &
//   npm i --no-save playwright-core
//   CHROME=/path/to/chrome node scripts/check-mobile-overflow.mjs http://localhost:4321
// Exits 1 and lists the offending elements if any page has scrollWidth > clientWidth.
import { chromium } from 'playwright-core';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:4321';
const widths = [320, 375, 390, 430];

const pages = [];
(function walk(dir, prefix) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, `${prefix}${name}/`);
    else if (name === 'index.html') pages.push(prefix);
  }
})('dist', '/');

const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
  args: ['--no-sandbox'],
});
let failures = 0;
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const d = document.documentElement;
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > d.clientWidth + 0.5)
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).trim().split(/\s+/).join('.')}`);
      return { sw: d.scrollWidth, cw: d.clientWidth, wide };
    });
    const ok = r.sw <= r.cw;
    if (!ok) failures++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${width}px ${path} scrollWidth=${r.sw} clientWidth=${r.cw} ${ok ? '' : r.wide.join(' | ')}`);
  }
  await page.close();
}
await browser.close();
process.exit(failures ? 1 : 0);
