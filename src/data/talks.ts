import { existsSync } from 'node:fs';
import { join } from 'node:path';

export interface Talk {
  /** Stable URL slug: /speaking/<slug>. Printed on QR codes, so never change it once shared. */
  slug: string;
  title: string;
  event: string;
  /** Omit until the date is confirmed. */
  date?: Date;
  location?: string;
  summary?: string;
  /**
   * Public path to the slide deck, e.g. /slides/<slug>.pdf.
   * Drop the PDF at public/slides/<file> and redeploy: the download link
   * appears automatically. Until the file exists the page shows "Slides coming soon."
   */
  slides?: string;
  writeup?: string;
  video?: string;
}

export const TALKS: Talk[] = [
  {
    slug: 'sasw-2026',
    title: 'Speed to Value: Product Thinking in the Age of AI',
    event: 'SA Startup + Tech Week (SASW) 2026',
    location: 'San Antonio, TX',
    slides: '/slides/sasw-2026-speed-to-value.pdf',
    video: 'https://youtu.be/IRZkiwQzvmo',
  },
  {
    slug: 'software-factories',
    title: 'Software Factories: From Vibe Coding to a Machine That Ships While You Sleep',
    event: 'Alamo Agents, Night One',
    date: new Date('Sep 08 2026'),
    location: 'San Antonio, TX',
    slides: '/slides/software-factories.pdf',
    writeup: '/blog/software-factories',
    video: 'https://www.youtube.com/watch?v=angmcGqg-C8',
  },
];

/** True when the talk's slide deck has been uploaded to public/. Checked at build time. */
export function hasSlides(talk: Talk): boolean {
  return !!talk.slides && existsSync(join(process.cwd(), 'public', talk.slides));
}
