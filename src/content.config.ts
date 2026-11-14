import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const songs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/songs' }),
  schema: z.object({
    title: z.string(),
    year: z.number().optional(),
    key: z.string().optional(),
    bpm: z.number().optional(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    audioUrl: z.string().url().optional(),
  }),
});
export const collections = { songs };
