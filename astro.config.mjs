import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://daysarts.com',
  integrations: [
    tailwind(), 
    vue(), 
    mdx(), 
    sentry(), 
    spotlightjs(),
    sitemap({
      filter: (page) => !page.includes('admin'),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        // Special handling for different page types
        if (item.url.includes('/events/') || item.url.includes('/now-playing/')) {
          return {
            ...item,
            changefreq: 'daily',
            priority: 0.9,
          };
        }
        if (item.url.includes('/movie/')) {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 0.8,
          };
        }
        // Default for other pages
        return {
          ...item,
          changefreq: 'monthly',
          priority: 0.7,
        };
      },
    })
  ]
});