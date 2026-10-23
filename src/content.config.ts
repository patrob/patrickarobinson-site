import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// CSS object-position for cropped hero/card images, e.g. "center top" or "50% 85%".
			// Defaults to DEFAULT_HERO_POSITION (consts.ts) when omitted.
			heroPosition: z.string().optional(),
		}),
});

export const collections = { blog };
