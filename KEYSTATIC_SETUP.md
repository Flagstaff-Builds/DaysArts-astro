# Keystatic Cloud Setup

This project is configured to work with both local and cloud modes for Keystatic CMS.

## Local Development

In development, Keystatic runs in local mode and stores content files directly in the repository at `src/content/`.

To access the admin interface locally:
1. Run `npm run dev`
2. Visit `http://localhost:4321/keystatic`

## Cloud Setup (Production)

For production deployment on Netlify, the project uses Keystatic Cloud which stores content in GitHub.

### 1. Create Keystatic Cloud Account

1. Go to [keystatic.cloud](https://keystatic.cloud)
2. Sign in with your GitHub account
3. Create a new project
4. Connect it to your GitHub repository

### 2. Complete Cloud Setup

The current Keystatic Cloud setup is simplified and doesn't require additional environment variables. Simply:

1. Click "Save settings" in the Keystatic Cloud dashboard
2. Follow any GitHub integration prompts
3. Deploy your site to Netlify

### 3. GitHub Integration

Keystatic Cloud will guide you through setting up a GitHub App with the necessary permissions:
- Read/write access to repository contents
- Read access to repository metadata
- Read/write access to pull requests

## How It Works

### Development Mode
- `output: 'server'` with `prerender: true` on content pages
- Keystatic admin UI available at `/keystatic`
- Content stored locally in `src/content/`

### Production Mode
- Keystatic admin UI disabled (for security)
- Content managed through Keystatic Cloud interface
- Changes made via GitHub commits/PRs
- Netlify rebuilds site when content changes

## Content Structure

- **Events**: `src/content/event/*.mdoc`
- **Movies**: `src/content/movie/*.mdoc`

## File Filtering

The project is configured to only process `.mdoc` files (Keystatic format) and ignore `.mdx` files for a cleaner migration from the previous CMS.

## Troubleshooting

1. **Build fails with "No adapter installed"**: Make sure `@astrojs/netlify` is installed and configured in `astro.config.mjs`

2. **Admin UI not accessible**: In production, the admin UI is intentionally disabled. Use Keystatic Cloud dashboard instead.

3. **Content not updating**: Check that your GitHub App has the correct permissions and that Netlify is configured to rebuild on repository changes.

## Deployment

The project uses:
- **Netlify** for hosting
- **Hybrid rendering** (static pages with server-side API routes)
- **Netlify Functions** for Keystatic Cloud API integration

Make sure your `netlify.toml` includes the necessary redirects for the Keystatic API routes.