# DaysArts Astro Project

## Important Information for Claude

### Image Cleanup Issue
When movies are deleted through Keystatic, orphaned image directories can cause build failures. This project includes automatic cleanup solutions:

1. **Automatic cleanup before builds**: `npm run build` automatically runs `npm run images:cleanup`
2. **Manual cleanup**: Run `npm run images:cleanup` anytime to clean orphaned images
3. **API endpoint**: `POST /api/cleanup-images.json` for programmatic cleanup
4. **Development watcher**: `npm run dev:watch` runs dev server with file watching for auto-cleanup

### Commands for Cleanup
- `npm run images:cleanup` - Remove orphaned movie image directories
- `npm run dev:watch` - Run dev server with automatic cleanup on file changes
- `curl -X POST http://localhost:4321/api/cleanup-images.json` - API cleanup during development

### Production Safety
The build process automatically cleans up orphaned images before every build, ensuring production deployments won't fail due to missing image references.

### If you see ImageNotFound errors:
1. Run `npm run images:cleanup` immediately
2. Restart the dev server
3. Consider using `npm run dev:watch` instead of `npm run dev` for automatic cleanup

This ensures the CMS is safe for customers to use without breaking the site.