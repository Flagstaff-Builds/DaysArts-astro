import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string().default('Anonymous'),
    date: z.string(),
    categories: z.array(z.string()).optional(),
    image: image().refine((img) => img.width >= 1080, {
      message: "Image must be at least 1080 pixels wide!",
    }).optional(),
  }),
});

const movieCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    rating: z.string().optional(),
    genre: z.array(z.string()).optional(),
    length: z.string().optional(),
    cast: z.array(z.string()).optional(),
    showtimes: z.array(z.string()),
    poster: image().optional(),
  }),
});

const eventCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    entertainment: z.array(z.string()).optional(),
    date: z.string(),
    time: z.string(),
    poster: image().optional(),
    website: z.string().url().optional(),
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'movie': movieCollection,
  'event': eventCollection,
};