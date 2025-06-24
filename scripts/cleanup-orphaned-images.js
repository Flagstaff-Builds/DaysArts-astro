#!/usr/bin/env node

import { readdir, stat, rm } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'movie');
const IMAGES_DIR = join(CONTENT_DIR, 'images');

async function getExistingMovies() {
  try {
    const files = await readdir(CONTENT_DIR);
    const movieFiles = files.filter(file => file.endsWith('.mdoc'));
    const movieSlugs = movieFiles.map(file => file.replace('.mdoc', ''));
    return new Set(movieSlugs);
  } catch (error) {
    console.error('Error reading movie content directory:', error);
    return new Set();
  }
}

async function getImageDirectories() {
  try {
    const files = await readdir(IMAGES_DIR);
    const directories = [];
    
    for (const file of files) {
      const fullPath = join(IMAGES_DIR, file);
      const stats = await stat(fullPath);
      if (stats.isDirectory()) {
        directories.push(file);
      }
    }
    
    return directories;
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
}

async function removeOrphanedDirectories() {
  console.log('🧹 Cleaning up orphaned movie images...');
  
  const existingMovies = await getExistingMovies();
  const imageDirectories = await getImageDirectories();
  
  console.log(`Found ${existingMovies.size} movie files`);
  console.log(`Found ${imageDirectories.length} image directories`);
  
  const orphanedDirs = imageDirectories.filter(dir => !existingMovies.has(dir));
  
  if (orphanedDirs.length === 0) {
    console.log('✅ No orphaned image directories found!');
    return;
  }
  
  console.log(`Found ${orphanedDirs.length} orphaned image directories:`);
  
  for (const dir of orphanedDirs) {
    const dirPath = join(IMAGES_DIR, dir);
    console.log(`  - Removing: ${dir}`);
    
    try {
      await rm(dirPath, { recursive: true, force: true });
      console.log(`    ✅ Removed successfully`);
    } catch (error) {
      console.error(`    ❌ Error removing ${dir}:`, error.message);
    }
  }
  
  console.log('🎉 Cleanup complete!');
}

// Run the cleanup
removeOrphanedDirectories().catch(console.error);