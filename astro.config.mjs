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
    envPrefix: 'VITE_',
    define: {
      'process.env': process.env
    },
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
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'] // Ignore watching unnecessary files
      }
    },
    optimizeDeps: {
      include: ['vue', '@heroicons/vue/24/outline'],
      exclude: ['@resvg/resvg-js'],
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
      outfile: 'sitemap.xml',
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
    sentry(),
    spotlightjs()
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
});