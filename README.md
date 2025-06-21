# DaysArts

This is the repo for the DaysArts theater website with all build files. Built with Astro, Tailwind, and Keystatic. Deployed on Netlify.


To build a project in your local machine:
1. clone repo
2. `npm install` to install dependancies
3.
```sh
npm run dev
```
4. open browser to localhost:4321


## Featured collections
- movie
- event

### To update collections
- To create new movie or event, login to admin panel at https://daysarts.ca/keystatic

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


## DNS
### daysarts.ca
- Registered with webnames.ca
- DNS managed by Cloudflare
- Hosted on Netlify

### palacetheatre-daysarts.ca
- Registered with webnames.ca
- DNS managed by Cloudflare (after transfer from WordPress)
- Redirects to daysarts.ca, which is hosted on Netlify

palacetheatre-daysarts.ca --DNS managed by--> Cloudflare --redirects to--> daysarts.ca
                                                                       |
                                                                       v
                                                          Netlify <--- hosts --- webnames.ca
