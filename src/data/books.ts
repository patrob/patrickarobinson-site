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
    cardSubtitle:
      'Three humans and four AI agents wrote a book together. This is the field report.',
    blurb: [
      "Co-Habitat is a field report from 90 days of three humans and four AI agents working as one team on a shared Discord server. Alicia Wrabek, Ted Wallace, and I wrote it alongside our agents, and we kept the receipts: real messages with timestamps, failures left in, and corrections to our own earlier drafts printed in the book.",
      "I wrote the chapters on whether you need a piece of process yet and on how multiple agents coordinate, and my agent Liam wrote one of his own. Every chapter ends with a practice to try or a signal to watch for. If you're figuring out how people and agents become a real team, this is what it looked like for us.",
    ].join('\n\n'),
    cover: coHabitatCover,
    coverAlt: 'Cover of Co-Habitat: Building the environment where people and AI agents become a team',
    link: 'https://www.amazon.com/dp/B0HKH48SX6',
    linkLabel: 'Get it on Amazon',
  },
];
