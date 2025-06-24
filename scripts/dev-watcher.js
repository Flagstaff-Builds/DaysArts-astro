#!/usr/bin/env node

import { watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'movie');

// Simple debouncing function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Cleanup function
async function runCleanup() {
  try {
    console.log('🧹 Running image cleanup...');
    const response = await fetch('http://localhost:4321/api/cleanup-images.json', {
      method: 'POST'
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.removedDirs && result.removedDirs.length > 0) {
        console.log(`✅ Cleaned up ${result.removedDirs.length} orphaned directories:`, result.removedDirs);
      } else {
        console.log('✅ No orphaned directories found');
      }
    }
  } catch (error) {
    console.log('⚠️ Cleanup API not available (dev server may not be running)');
  }
}

const debouncedCleanup = debounce(runCleanup, 2000);

console.log('👀 Watching for movie content changes...');
console.log('📁 Watching:', CONTENT_DIR);

// Watch for file changes in the movie content directory
watch(CONTENT_DIR, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.mdoc')) {
    console.log(`📝 Movie file ${eventType}: ${filename}`);
    // Run cleanup immediately when a file is deleted/renamed
    if (eventType === 'rename') {
      // Slight delay to ensure file operations are complete
      setTimeout(runCleanup, 500);
    } else {
      debouncedCleanup();
    }
  }
});

console.log('✨ File watcher started. Will automatically cleanup orphaned images when movies are deleted.');
console.log('Press Ctrl+C to stop watching.');