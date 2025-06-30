# DaysArts Theatre Website

**Critical Developer Handover Documentation**

This repository contains the complete DaysArts Palace Theatre website built with **Astro**, **Tailwind CSS**, and **Keystatic CMS**. This README serves as essential documentation for developers taking over maintenance of this project.

## 🚨 Emergency Developer Handover

If you're inheriting this project, here's what you need to know immediately:

### Tech Stack
- **Frontend**: Astro + Tailwind CSS
- **CMS**: Keystatic (file-based CMS)
- **Hosting**: Netlify
- **Domain**: Registered with webnames.ca, DNS via Cloudflare
- **Repository**: Git-based content management

### Quick Start
```bash
git clone [repository-url]
npm install
npm run dev
# Open http://localhost:4321
```

### Content Management Access
- **Production CMS**: https://daysarts.ca/keystatic
- **Local CMS**: http://localhost:4321/keystatic (when running dev server)
- **Authentication**: Keystatic Cloud (project: daysarts/daysarts)

## 📋 Content Management (Keystatic CMS)

**Important**: This project uses Keystatic CMS for all content management. The old MDX-based approach has been completely removed.

### Content Types

#### 1. Movies (`/keystatic/movies`)
Complete movie management with:
- **Basic Info**: Title, description, poster (upload or URL)
- **Media**: Trailer URL, poster images
- **Details**: Rating, genres, runtime, cast
- **Showtimes**: Date-based system with matinee support
- **Sponsors**: Event sponsors and Reel Alternative designation

#### 2. Events (`/keystatic/events`)
Event management including:
- **Basic Info**: Title, description, pricing, date/time
- **Media**: Event poster upload
- **Social Links**: Website, Facebook, X, Instagram, YouTube
- **Sponsors**: Event and reception sponsors

#### 3. Theatre Status (`/keystatic/theatre-status`)
Theatre closure management:
- **Closure Settings**: Toggle theatre closed status
- **Messaging**: Custom closure title, message, dates
- **Visual**: Optional closure background image
- **Communication**: Extended descriptions and personal messages

#### 4. Contact Info (`/keystatic/contact-info`)
Centralized contact information:
- Email, phone, Facebook page URL

### Showtime System
Movies use a simplified date-based showtime system:
- Each showtime = date + optional matinee checkbox
- **Regular showings**: Display as "Wed, Jun 25 (7:30pm)"
- **Matinee showings**: Display as "Wed, Jun 25 (2:00pm)"

## Movie Cleanup System

This project includes an automated cleanup system to remove past movies and keep the repository clean.

### Manual Cleanup Commands

```bash
# Test what would be deleted (safe to run)
npm run movie:cleanup:dry

# Actually delete past movies and their images
npm run movie:cleanup
```

### Automated GitHub Action

The repository includes a GitHub Action that automatically cleans up past movies daily:

**File:** `.github/workflows/cleanup-movies.yml`

**Schedule:** Runs daily at 6 AM UTC (midnight Mountain Time)

#### Setup Instructions:

1. **The workflow is already included** - no additional setup needed
2. **Manual trigger:** Go to Actions tab in GitHub → "Cleanup Past Movies" → "Run workflow"
3. **Monitoring:** Check the Actions tab to see cleanup logs and results

#### What gets cleaned up:
- ✅ Movie `.mdoc` files where ALL showtimes are in the past
- ✅ Associated image directories (`src/content/movie/images/movie-name/`)
- ✅ Automatic git commit with cleanup details

#### Safety features:
- 🔍 Runs a dry-run first to log what would be deleted
- 📝 Detailed logging of all operations
- ⚡ Only deletes movies with ALL past showtimes (keeps movies with future shows)
- 🛡️ Error handling for missing files/directories

#### Customization:
- To change the schedule, edit the `cron` value in `.github/workflows/cleanup-movies.yml`
- Current: `'0 6 * * *'` (daily at 6 AM UTC)
- Example: `'0 6 * * 1'` (weekly on Mondays at 6 AM UTC)


## 🌐 Infrastructure & Deployment

### Domain & DNS Configuration
```
daysarts.ca
├── Registrar: webnames.ca
├── DNS: Cloudflare
└── Hosting: Netlify (auto-deploy from main branch)

palacetheatre-daysarts.ca (EXPIRED - No longer purchased)
└── Previously redirected to daysarts.ca
```

### Netlify Deployment
- **Site**: Connected to this GitHub repository
- **Branch**: `main` (auto-deploy on push)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/`
- **Environment**: Production uses Keystatic Cloud storage

### Critical Access Information
**Domain Management**:
- **Registrar**: webnames.ca account needed for domain renewal
- **DNS**: Cloudflare account for DNS management
- **Hosting**: Netlify account for deployment settings

**CMS Access**:
- **Keystatic Cloud**: Project `daysarts/daysarts`
- **GitHub**: Repository access required for file-based CMS

### Automated Systems
- **Movie Cleanup**: GitHub Action runs daily at 6 AM UTC
- **Image Cleanup**: Runs before every build to prevent orphaned images
- **Deployment**: Automatic on push to main branch

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:watch        # Dev server with automatic image cleanup

# Building
npm run build           # Build for production (includes automatic cleanup)
npm run preview         # Preview production build

# Content Management
npm run images:cleanup  # Remove orphaned movie images
npm run movie:cleanup   # Remove past movies (DESTRUCTIVE)
npm run movie:cleanup:dry # Test movie cleanup (safe)

# CMS Access
# Local: http://localhost:4321/keystatic
# Production: https://daysarts.ca/keystatic
```

## 🚨 Troubleshooting

### Common Issues

**Build Failures**: Usually caused by orphaned images
```bash
npm run images:cleanup
npm run build
```

**CMS Access Issues**: Check Keystatic Cloud project permissions

**Movie Images Missing**: Run image cleanup and restart dev server

### Emergency Procedures

1. **Site Down**: Check Netlify deploy logs
2. **CMS Broken**: Verify Keystatic Cloud project status
3. **Content Missing**: Check GitHub repository for file-based content
4. **Domain Issues**: Verify Cloudflare DNS settings

## 📚 Additional Resources

- **Keystatic Docs**: https://keystatic.com/docs
- **Astro Docs**: https://docs.astro.build
- **Netlify Docs**: https://docs.netlify.com

---

**Last Updated**: June 2025