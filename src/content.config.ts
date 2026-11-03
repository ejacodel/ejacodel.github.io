import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const disciplines = z.enum(['Mechanics', 'Electronics', 'Firmware', 'Software', 'Vision', 'Fabrication', 'Automation']);

/** One file per project page. A missing or mistyped field stops the build with a clear error. */
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    order: z.number(),                     // position on the index, also the big number
    title: z.string(),
    short: z.string(),                     // one line for the index rows
    context: z.string(),                   // "MSc thesis, UPV"
    years: z.string(),
    status: z.string(),                    // be plain about this: "Prototype", "In progress"...
    disciplines: z.array(disciplines),
    cover: z.string().optional(),          // image in src/media/
    problem: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    stats: z.array(z.object({ value: z.string(), label: z.string(), note: z.string().optional() })).default([]),
    draft: z.boolean().default(false),
  }),
});

/** Dated entries: build notes, how-tos, failures, documentation. Each can point to a project. */
const log = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    project: z.string().optional(),        // file name of a work entry
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, log };
