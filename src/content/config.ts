import { defineCollection, z } from "astro:content";

const movieCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    eventNote: z.string().optional(),
    rating: z.string().optional(),
    genre: z.array(z.string()).optional(),
    length: z.string().optional(),
    cast: z.array(z.string()).optional(),
    showtimes: z.array(z.object({
      date: z.date(),
      isMatinee: z.boolean().default(false)
    })).optional(),
    poster: z.union([
      // Legacy format: direct image or string
      image(),
      z.string(),
      // New conditional field format from Keystatic
      z.object({
        discriminant: z.enum(['upload', 'url']),
        value: z.union([image(), z.string()])
      })
    ]).optional(),
    trailer: z.string().optional(),
    reelAlternative: z.boolean().optional(),
  })
});

const eventCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    entertainment: z.array(z.string()).optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    price: z.string().optional(),
    poster: image().optional(),
    socialImage: image().optional(),
    website: z.string().url().optional(),
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    concertSponsor: z.array(z.string()).optional(),
    receptionSponsor: z.array(z.string()).optional(),
    past: z.boolean().optional(),
  })
});

export const collections = {
  'movie': movieCollection,
  'event': eventCollection,
};