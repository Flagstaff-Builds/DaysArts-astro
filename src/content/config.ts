import { defineCollection, z } from "astro:content";

const movieCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    eventNote: z.string().optional(),
    sponsors: z.array(z.string()).optional(),
    description: z.string().optional(),
    rating: z.string().optional(),
    genre: z.array(z.string()).optional(),
    length: z.string().optional(),
    cast: z.array(z.string()).optional(),
    contact: z.array(
      z.object({
        name: z.string(),
        phone: z.string().optional()
      })
    ).optional(),
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
    price: z.string().optional(),
    dateTime: z.union([z.string(), z.date()]).optional(),
    poster: z.union([
      image(),
      z.string(),
      z.object({
        discriminant: z.enum(['upload', 'url']),
        value: z.union([image(), z.string()]).optional()
      })
    ]).optional(),
    links: z.object({
      website: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
    eventSponsor: z.array(z.string()).optional(),
    receptionSponsor: z.array(z.string()).optional(),
    // Keep legacy fields for backward compatibility
    entertainment: z.array(z.string()).optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    socialImage: image().optional(),
    website: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    concertSponsor: z.array(z.string()).optional(),
    past: z.boolean().optional(),
  })
});

export const collections = {
  'movie': movieCollection,
  'event': eventCollection,
};