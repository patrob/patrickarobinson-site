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
      'Three humans, four AI agents, ninety days on one team, with the receipts kept.',
    blurb: [
      "Co-Habitat is a field report: three humans and four AI agents writing a book together over ninety days on one shared Discord server. The timestamped messages, commit hashes and failures stay in. Every chapter ends with a box, either a practice you can install that week or a signal to watch for. Read it in order for the story. If you're a practitioner, there's a fast path by claim and a runbook that spans two weeks. If you're a skeptic, The Mirror Test checks the claims against published research.",
      "I'm one of three human co-authors, with Alicia Wrabek and Ted Wallace. Alicia assembled the book. I wrote two chapters, \"Do We Need This Yet?\" and \"Multi-Agent Coordination Physics.\" My agent, Liam, wrote \"The Boundary Function.\" The book's harness engineering work builds on my Research, Plan, Implement approach.",
    ].join('\n\n'),
    cover: coHabitatCover,
    coverAlt: 'Cover of Co-Habitat: Building the environment where people and AI agents become a team',
    link: 'https://www.amazon.com/dp/B0HKH48SX6',
    linkLabel: 'Get it on Amazon',
  },
];
