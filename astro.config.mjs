import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
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
  image: {
    domains: ['image.tmdb.org'], // Allow images from TMDB
    remotePatterns: [{ protocol: 'https' }]
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        external: (id) => id.includes('_old') || id === '/src/_app',
        output: {
          manualChunks: {
            'vue': ['vue'],
            'heroicons': ['@heroicons/vue/24/outline']
          }
        }
      }
    },
    resolve: {
      alias: {
        './images/': path.resolve(__dirname, 'src/content/movie/images/')
      }
    },
    // Dev mode optimizations
    server: {
      hmr: {
        overlay: false // Disable HMR overlay for better performance
      },
      watch: {
        usePolling: false, // Disable polling in dev mode
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/docs/**'] // Ignore watching unnecessary files
      }
    },
    optimizeDeps: {
      include: ['vue', '@heroicons/vue/24/outline', 'react', 'react-dom'],
      exclude: ['@resvg/resvg-js', '@heroicons/vue/20/solid', '@spotlightjs/astro', '@sentry/astro'],
      // Disable dependency optimization for certain paths
      entries: [
        '!src/content/**/*.mdx',
        '!src/content/**/*.md'
      ]
    },
    // Improve build performance
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    ssr: {
      noExternal: ['@heroicons/vue']
    }
  },
  integrations: [
    mdx({
      optimize: true, // Enable MDX optimization
      extendPlugins: false // Disable plugin extension for better performance
    }),
    vue({
      jsx: false, // Disable JSX support if not needed
      template: {
        compilerOptions: {
          whitespace: 'condense' // Optimize template whitespace handling
        }
      }
    }),
    tailwind({
      // Optimize Tailwind for development
      config: {
        future: {
          hoverOnlyWhenSupported: true
        }
      }
    }),
    sitemap({
      filter: (page) => !page.includes('_old'),
      customPages: [
        'https://daysarts.ca/now-playing',
        'https://daysarts.ca/events',
        'https://daysarts.ca/about',
        'https://daysarts.ca/contact',
      ],
      serialize: (item) => {
        // Remove _old from sitemap
        if (item.url.includes('_old')) {
          return undefined;
        }

        // Determine change frequency based on the page type
        let changefreq;
        if (item.url.includes('/now-playing') || item.url.includes('/movie/')) {
          changefreq = 'weekly';
        } else if (item.url.includes('/event/') || item.url.includes('/events')) {
          changefreq = 'monthly';
        } else {
          changefreq = 'yearly';
        }

        return {
          url: item.url,
          lastmod: item.lastmod,
          changefreq
        };
      }
    }),
    sentry({
      dsn: "https://882fe11474b2fa0cdad664e6276797c3@o4509516796985345.ingest.us.sentry.io/4509516836896768",
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      // Setting this option to true will send default PII data to Sentry.
      // For example, automatic IP address collection on events
      sendDefaultPii: true,
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    spotlightjs(),
    react(),
    markdoc(),
    keystatic()
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
});