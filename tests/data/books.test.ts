import { describe, it, expect } from 'vitest';
import { BOOKS } from '../../src/data/books';
import { NAV_ITEMS } from '../../src/consts';

describe('books data', () => {
  it('has at least one book', () => {
    expect(BOOKS.length).toBeGreaterThan(0);
  });

  it('every book has the required fields filled in', () => {
    for (const book of BOOKS) {
      expect(book.title).toBeTruthy();
      expect(book.subtitle).toBeTruthy();
      expect(book.authors).toBeTruthy();
      expect(book.publisher).toBeTruthy();
      expect(book.year).toBeGreaterThan(1900);
      expect(book.blurb).toBeTruthy();
      expect(book.cardSubtitle).toBeTruthy();
      expect(book.cover).toBeTruthy();
      expect(book.coverAlt).toBeTruthy();
      expect(book.linkLabel).toBeTruthy();
    }
  });

  it('every book links out over https', () => {
    for (const book of BOOKS) {
      expect(new URL(book.link).protocol).toBe('https:');
    }
  });

  it('lists Co-Habitat with its Amazon link', () => {
    const coHabitat = BOOKS.find((b) => b.title === 'Co-Habitat');
    expect(coHabitat?.authors).toContain('Patrick Robinson');
    expect(coHabitat?.link).toBe('https://www.amazon.com/dp/B0HKH48SX6');
  });
});

describe('navigation', () => {
  it('has a Books tab right after Speaking', () => {
    const labels = NAV_ITEMS.map((i) => i.label);
    expect(labels.indexOf('Books')).toBe(labels.indexOf('Speaking') + 1);
    expect(NAV_ITEMS.find((i) => i.label === 'Books')?.href).toBe('/books');
  });
});
