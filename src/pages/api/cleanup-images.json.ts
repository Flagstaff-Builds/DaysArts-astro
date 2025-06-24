import type { APIRoute } from 'astro';
import { readdir, stat, rm } from 'fs/promises';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'src', 'content', 'movie');
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

async function cleanupOrphanedImages() {
  const existingMovies = await getExistingMovies();
  const imageDirectories = await getImageDirectories();
  
  const orphanedDirs = imageDirectories.filter(dir => !existingMovies.has(dir));
  const removedDirs = [];
  
  for (const dir of orphanedDirs) {
    const dirPath = join(IMAGES_DIR, dir);
    try {
      await rm(dirPath, { recursive: true, force: true });
      removedDirs.push(dir);
    } catch (error) {
      console.error(`Error removing ${dir}:`, error);
    }
  }
  
  return {
    existingMovies: existingMovies.size,
    imageDirectories: imageDirectories.length,
    orphanedDirs: orphanedDirs.length,
    removedDirs,
    success: true
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const result = await cleanupOrphanedImages();
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Cleanup API error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    const result = await cleanupOrphanedImages();
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Cleanup API error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};