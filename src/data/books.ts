import type { ImageMetadata } from 'astro';
import coHabitatCover from '../assets/books/co-habitat-cover.png';

export interface Book {
  title: string;
  /** Full subtitle as printed on the cover. */
  subtitle: string;
  /** Authors as printed, comma-separated. */
  authors: string;
  publisher: string;
  year: number;
  /** One-line teaser shown on the card under the title. */
  cardSubtitle: string;
  /** Short blurb in Patrick's voice. Plain text; separate paragraphs with a blank line. */
  blurb: string;
  cover: ImageMetadata;
  /** Alt text for the cover image. */
  coverAlt: string;
  link: string;
  linkLabel: string;
}

export const BOOKS: Book[] = [
  {
    title: 'Co-Habitat',
    subtitle: 'Building the environment where people and AI agents become a team',
    authors: 'Alicia Wrabek, Ted Wallace, Patrick Robinson',
    publisher: 'Adapt & Thrive Books',
    year: 2026,
    cardSubtitle: 'TODO: card subtitle (pending Patrick voice pass)',
    blurb: 'TODO: blurb (pending Patrick voice pass)',
    cover: coHabitatCover,
    coverAlt: 'Cover of Co-Habitat: Building the environment where people and AI agents become a team',
    link: 'https://www.amazon.com/dp/B0HKH48SX6',
    linkLabel: 'Get it on Amazon',
  },
];
