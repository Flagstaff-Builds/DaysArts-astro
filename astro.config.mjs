import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://daysarts.ca',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        external: (id) => id.includes('_old') || id === '/src/_app',
        output: {
          manualChunks: {
            'vue': ['vue'],
            'heroicons': ['@heroicons/vue/24/outline'],
            'utils': ['/src/utils/lazyLoad.ts']
          }
        }
      }
    },
    resolve: {
      alias: {
        './images/': path.resolve(__dirname, 'src/content/movie/images/')
      }
    },
    plugins: [
      {
        name: 'exclude-old-content',
        enforce: 'pre',
        resolveId(id) {
          if (id.includes('_old')) {
            return false;
          }
        }
      },
      {
        name: 'exclude-old-content',
        enforce: 'pre',
        resolveId(id) {
          if (id.includes('_old')) {
            return false;
          }
        }
      }
    ],
    optimizeDeps: {
      include: ['vue', '@heroicons/vue/24/outline'],
      exclude: ['@resvg/resvg-js']
    },
    ssr: {
      noExternal: ['@heroicons/vue']
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    vue(),
    sentry(),
    spotlightjs(),
    sitemap({
      filter: (page) => !page.includes('_old'),
      customPages: [
        'https://daysarts.ca/now-playing',
        'https://daysarts.ca/events',
        'https://daysarts.ca/about',
        'https://daysarts.ca/contact',
      ],
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.85,
      serialize: (item) => {
        // Remove _old from sitemap
        if (item.url.includes('_old')) {
          return undefined;
        }
        return {
          url: item.url,
          changefreq: item.changefreq,
          lastmod: item.lastmod,
          priority: item.priority
        };
      },
    })
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
});