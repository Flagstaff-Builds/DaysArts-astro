/**
 * TMDB Movie Data Update Script
 * 
 * This script helps search for movies on TMDB and update the MDX files with real movie data.
 * It preserves existing custom fields like eventNote, contact, showtimes, etc.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse, stringify } from 'yaml';
import { searchMovies, getMovieDetails, formatMovieData } from '../src/utils/tmdbApi';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to movie content directory
const MOVIE_DIR = path.resolve(__dirname, '../src/content/movie');

/**
 * Search for a movie by title and return formatted results
 */
async function searchMovie(title: string) {
  try {
    const results = await searchMovies(title);
    
    if (results.results.length === 0) {
      console.log(`No results found for "${title}"`);
      return null;
    }
    
    console.log(`Found ${results.results.length} results for "${title}":`);
    results.results.slice(0, 5).forEach((movie: any, index: number) => {
      console.log(`${index + 1}. ${movie.title} (${movie.release_date?.split('-')[0] || 'N/A'}) - ID: ${movie.id}`);
    });
    
    return results.results;
  } catch (error) {
    console.error('Error searching for movie:', error);
    return null;
  }
}

/**
 * Get detailed information about a movie
 */
async function getMovie(movieId: number) {
  try {
    const movie = await getMovieDetails(movieId);
    return formatMovieData(movie);
  } catch (error) {
    console.error('Error getting movie details:', error);
    return null;
  }
}

/**
 * Validate an image buffer to ensure it's not corrupted or an HTML error page
 */
async function validateImageBuffer(buffer: ArrayBuffer): Promise<boolean> {
  // Convert buffer to string for HTML detection
  const bufferStr = Buffer.from(buffer).toString('utf8', 0, Math.min(1000, buffer.byteLength));
  
  // Check if the buffer contains HTML tags (indicating an error page)
  if (bufferStr.includes('<!DOCTYPE html>') || 
      bufferStr.includes('<html') || 
      bufferStr.includes('<head') || 
      bufferStr.includes('<body')) {
    console.error('Received HTML content instead of an image');
    return false;
  }
  
  // Simple validation: Check if the buffer has a valid image header
  const header = Buffer.from(buffer.slice(0, 4));
  
  // Check for common image format headers
  // JPEG starts with FF D8 FF
  if (header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF) {
    return true;
  }
  
  // PNG starts with 89 50 4E 47 (‰PNG)
  if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47) {
    return true;
  }
  
  // WebP starts with RIFF....WEBP
  const webpCheck = Buffer.from(buffer.slice(0, 12));
  if (webpCheck[0] === 0x52 && webpCheck[1] === 0x49 && webpCheck[2] === 0x46 && webpCheck[3] === 0x46 &&
      webpCheck[8] === 0x57 && webpCheck[9] === 0x45 && webpCheck[10] === 0x42 && webpCheck[11] === 0x50) {
    return true;
  }
  
  // If none of the above, it's likely not a valid image
  return false;
}

/**
 * Download an image from a URL to a local path
 */
async function downloadImage(imageUrl: string, localPath: string, movieTitle: string): Promise<boolean> {
  if (!imageUrl) {
    console.warn(`No image URL provided for ${movieTitle}`);
    return false;
  }

  try {
    // Create the images directory if it doesn't exist
    const imagesDir = path.dirname(localPath);
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Download the image with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      const response = await fetch(imageUrl, { 
        signal: controller.signal,
        redirect: 'follow', // Follow redirects automatically
        headers: {
          'User-Agent': 'DaysArts-Website/1.0 (jeremy@daysarts.org)',
          'Accept': 'image/avif,image/webp,image/jpeg,image/png,*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache'
        }
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`Failed to download image for ${movieTitle}: ${response.status} ${response.statusText}`);
        return false;
      }
      
      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        console.error(`Invalid content type for image: ${contentType}`);
        return false;
      }
      
      const buffer = await response.arrayBuffer();
      
      // Validate the image buffer
      if (buffer.byteLength < 100) { // Too small to be a valid image
        console.error(`Image file too small (${buffer.byteLength} bytes), likely corrupted or not an image`);
        return false;
      }
      
      const isValid = await validateImageBuffer(buffer);
      if (!isValid) {
        console.error(`Invalid image format for ${movieTitle}`);
        
        // If we detect an HTML response, log more details for debugging
        const bufferStr = Buffer.from(buffer).toString('utf8', 0, Math.min(500, buffer.byteLength));
        if (bufferStr.includes('<html') || bufferStr.includes('<!DOCTYPE')) {
          console.error(`Received HTML instead of image. First 500 chars: ${bufferStr.substring(0, 500)}`);
        }
        
        return false;
      }
      
      fs.writeFileSync(localPath, Buffer.from(buffer));
      console.log(`Downloaded image to ${localPath}`);
      return true;
    } catch (error) {
      clearTimeout(timeoutId);
      const fetchError = error as { name?: string };
      if (fetchError.name === 'AbortError') {
        console.error(`Timeout downloading image for ${movieTitle}`);
      } else {
        console.error(`Fetch error downloading image for ${movieTitle}:`, fetchError);
      }
      return false;
    }
  } catch (error) {
    console.error(`Error downloading image for ${movieTitle}:`, error);
    return false;
  }
}

/**
 * Update an MDX file with TMDB data
 */
async function updateMovieFile(filePath: string, movieData: any) {
  try {
    // Read the existing file
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return false;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Split the frontmatter and content
    const parts = fileContent.split('---');
    if (parts.length < 3) {
      console.error(`Invalid MDX file format for ${filePath}`);
      return false;
    }
    
    // Parse the frontmatter
    let frontmatter;
    try {
      frontmatter = parse(parts[1].trim());
    } catch (error) {
      console.error(`Error parsing frontmatter in ${filePath}:`, error);
      return false;
    }
    
    // Check if we have valid movie data
    if (!movieData.title) {
      console.error('Movie data is missing title');
      return false;
    }
    
    // Handle image paths
    const movieFileName = path.basename(filePath, '.mdx');
    const movieName = movieFileName.split('-').slice(3).join('-');
    const imagesDir = path.join(path.dirname(filePath), 'images');
    
    // Prepare local image paths
    const posterLocalPath = path.join(imagesDir, `${movieName}.jpg`);
    const backdropLocalPath = path.join(imagesDir, `${movieName}-backdrop.jpg`);
    const posterRelativePath = `./images/${movieName}.jpg`;
    const backdropRelativePath = `./images/${movieName}-backdrop.jpg`;
    
    // Try to download images if URLs are provided
    let posterDownloaded = false;
    let backdropDownloaded = false;
    
    if (movieData.poster) {
      posterDownloaded = await downloadImage(movieData.poster, posterLocalPath, movieData.title);
    }
    
    if (movieData.socialImage) {
      backdropDownloaded = await downloadImage(movieData.socialImage, backdropLocalPath, movieData.title);
    }
    
    // Preserve existing fields that aren't in the TMDB data
    const updatedFrontmatter = {
      ...frontmatter,
      title: movieData.title || frontmatter.title,
      description: movieData.description || frontmatter.description,
      // Use local paths if images were downloaded successfully
      poster: posterDownloaded ? posterRelativePath : (movieData.poster || frontmatter.poster),
      socialImage: backdropDownloaded ? backdropRelativePath : (movieData.socialImage || frontmatter.socialImage),
      trailer: movieData.trailer || frontmatter.trailer,
      length: movieData.length || frontmatter.length,
      cast: movieData.cast || frontmatter.cast,
      genre: movieData.genre || frontmatter.genre,
      // Preserve these fields if they exist
      rating: frontmatter.rating,
      showtimes: frontmatter.showtimes,
      reelAlternative: frontmatter.reelAlternative,
      eventNote: frontmatter.eventNote,
      contact: frontmatter.contact,
    };
    
    // Create the updated file content
    const updatedContent = `---
${stringify(updatedFrontmatter)}---

${parts[2] ? parts[2].trim() : ''}`;
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${path.basename(filePath)}`);
    
    // Provide guidance if images weren't downloaded
    if (!posterDownloaded && movieData.poster) {
      console.warn(`Warning: Could not download poster image for ${movieData.title}. Using URL in file.`);
      console.warn(`You may need to manually download the image from: ${movieData.poster}`);
    }
    
    if (!backdropDownloaded && movieData.socialImage) {
      console.warn(`Warning: Could not download backdrop image for ${movieData.title}. Using URL in file.`);
      console.warn(`You may need to manually download the image from: ${movieData.socialImage}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating movie file:', error);
    return false;
  }
}

/**
 * List all movie MDX files
 */
function listMovieFiles() {
  try {
    const files = fs.readdirSync(MOVIE_DIR)
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(MOVIE_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const parts = content.split('---');
        let title = file;
        
        if (parts.length >= 3) {
          try {
            const frontmatter = parse(parts[1].trim());
            title = frontmatter.title || file;
          } catch (e) {
            // Ignore parsing errors
          }
        }
        
        return {
          file,
          path: filePath,
          title
        };
      });
    
    console.log('Available movie files:');
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.title} (${file.file})`);
    });
    
    return files;
  } catch (error) {
    console.error('Error listing movie files:', error);
    return [];
  }
}

/**
 * Main function to run the script
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    console.log(`
TMDB Movie Data Update Script

Commands:
  list                        List all movie MDX files
  search <title>              Search for a movie by title
  update <file> <movieId>     Update a movie file with TMDB data
  
Examples:
  node updateMovieData.js list
  node updateMovieData.js search "Snow White"
  node updateMovieData.js update 06-06-2025-snow-white.mdx 12345
    `);
    return;
  }
  
  if (command === 'list') {
    listMovieFiles();
    return;
  }
  
  if (command === 'search') {
    const title = args[1];
    if (!title) {
      console.error('Please provide a movie title to search for');
      return;
    }
    
    await searchMovie(title);
    return;
  }
  
  if (command === 'update') {
    const file = args[1];
    const movieId = parseInt(args[2], 10);
    
    if (!file || isNaN(movieId)) {
      console.error('Please provide a file name and valid movie ID');
      return;
    }
    
    const filePath = path.join(MOVIE_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${file}`);
      return;
    }
    
    const movieData = await getMovie(movieId);
    if (movieData) {
      await updateMovieFile(filePath, movieData);
    }
    return;
  }
  
  console.error(`Unknown command: ${command}`);
}

main().catch(console.error);
