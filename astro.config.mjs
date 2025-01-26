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
    server: {
      hmr: {
        overlay: false,
        timeout: 1000,
        protocol: 'ws'
      },
      watch: {
        usePolling: false,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/.astro/**',
          '**/content/**/*.{md,mdx}' // Ignore content files in dev
        ]
      }
    },
    optimizeDeps: {
      include: ['vue', '@heroicons/vue/24/outline'],
      exclude: ['@resvg/resvg-js'],
      entries: [
        '!src/content/**/*.mdx',
        '!src/content/**/*.md'
      ]
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      target: 'esnext'
    },
    ssr: {
      noExternal: ['@heroicons/vue']
    }
  },
  integrations: [
    mdx({
      optimize: true,
      extendPlugins: false
    }),
    vue({
      jsx: false,
      template: {
        compilerOptions: {
          whitespace: 'condense'
        }
      },
      appEntrypoint: '/src/pages/_app'
    }),
    tailwind({
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
      ]
    }),
    sentry(),
    spotlightjs()
  ]
});