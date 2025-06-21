#!/usr/bin/env node

/**
 * Automated cleanup script for past movies
 * This script removes movie files and their associated images after all showtimes have passed
 * 
 * Usage: node scripts/cleanup-past-movies.js
 * 
 * This can be run as a GitHub Action cron job to keep the repo clean
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MOVIE_DIR = path.join(__dirname, '..', 'src', 'content', 'movie');
const IMAGES_DIR = path.join(__dirname, '..', 'src', 'content', 'movie', 'images');
const DRY_RUN = process.env.DRY_RUN === 'true'; // Set DRY_RUN=true to test without deleting

console.log('🎬 Movie Cleanup Script');
console.log('========================');
console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no files will be deleted)' : 'LIVE (files will be deleted)'}`);
console.log('');

// Function to normalize dates to start of day for comparison
function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Function to parse showtime - handles both old and new format
function parseShowtime(showtime) {
  // Handle new format {date: Date, isMatinee: boolean}
  if (showtime && typeof showtime === 'object' && 'date' in showtime) {
    return showtime.date instanceof Date ? showtime.date : new Date(showtime.date);
  }
  // Fallback for old format (direct Date)
  return showtime instanceof Date ? showtime : new Date(showtime);
}

// Check if movie has any future showtimes
function hasCurrentOrFutureShowtimes(movie) {
  const today = normalizeDate(new Date());
  
  if (!movie.data.showtimes || !Array.isArray(movie.data.showtimes)) {
    return false;
  }
  
  return movie.data.showtimes.some(showtime => {
    const showtimeDate = normalizeDate(parseShowtime(showtime));
    return showtimeDate >= today;
  });
}

// Get image directory for a movie
function getMovieImageDir(movieTitle) {
  // Convert title to directory name (similar to how Keystatic does it)
  const dirName = movieTitle.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return path.join(IMAGES_DIR, dirName);
}

// Delete directory and all its contents
async function deleteDirectory(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
    console.log(`  ✅ Deleted image directory: ${path.relative(process.cwd(), dirPath)}`);
    return true;
  } catch (error) {
    console.log(`  ❌ Failed to delete image directory: ${error.message}`);
    return false;
  }
}

// Delete movie file
async function deleteMovieFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`  ✅ Deleted movie file: ${path.relative(process.cwd(), filePath)}`);
    return true;
  } catch (error) {
    console.log(`  ❌ Failed to delete movie file: ${error.message}`);
    return false;
  }
}

// Main cleanup function
async function cleanupPastMovies() {
  try {
    // Read all movie files
    const files = await fs.readdir(MOVIE_DIR);
    const movieFiles = files.filter(file => file.endsWith('.mdoc'));
    
    console.log(`Found ${movieFiles.length} movie files to check\n`);
    
    let deletedCount = 0;
    let totalMovies = 0;
    
    for (const file of movieFiles) {
      const filePath = path.join(MOVIE_DIR, file);
      totalMovies++;
      
      try {
        // Read and parse the movie file
        const content = await fs.readFile(filePath, 'utf8');
        const { data } = matter(content);
        
        console.log(`📽️  Checking: ${data.title || file}`);
        
        // Check if movie has current or future showtimes
        if (hasCurrentOrFutureShowtimes({ data })) {
          console.log(`  ⏰ Has future showtimes - keeping`);
          continue;
        }
        
        console.log(`  🗑️  All showtimes are past - marking for deletion`);
        
        if (DRY_RUN) {
          console.log(`  🔍 DRY RUN: Would delete movie file and images`);
          deletedCount++;
          continue;
        }
        
        // Delete movie file
        const movieDeleted = await deleteMovieFile(filePath);
        
        // Delete associated image directory
        const imageDir = getMovieImageDir(data.title || file.replace('.mdoc', ''));
        let imagesDeleted = true;
        
        try {
          await fs.access(imageDir);
          imagesDeleted = await deleteDirectory(imageDir);
        } catch (error) {
          // Image directory doesn't exist, that's fine
          console.log(`  ℹ️  No image directory found: ${path.relative(process.cwd(), imageDir)}`);
        }
        
        if (movieDeleted) {
          deletedCount++;
          console.log(`  ✅ Successfully cleaned up: ${data.title}`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error processing ${file}: ${error.message}`);
      }
      
      console.log(''); // Empty line for readability
    }
    
    // Summary
    console.log('========================');
    console.log(`📊 Summary:`);
    console.log(`   Total movies checked: ${totalMovies}`);
    console.log(`   Movies cleaned up: ${deletedCount}`);
    console.log(`   Movies remaining: ${totalMovies - deletedCount}`);
    
    if (DRY_RUN) {
      console.log('');
      console.log('🔍 This was a DRY RUN - no files were actually deleted');
      console.log('   To run for real, use: node scripts/cleanup-past-movies.js');
    }
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanupPastMovies();