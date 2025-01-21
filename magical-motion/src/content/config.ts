import { defineCollection, z } from "astro:content"
import { date } from "astro:schema"

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    updated: z.coerce.date().optional(),
    keywords: z.array(z.string()).optional(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
})

export const collections = { blog }
