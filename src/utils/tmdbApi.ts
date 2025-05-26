/**
 * TMDB API Utility
 * Provides functions to interact with The Movie Database API
 */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env file for Node.js scripts
interface EnvVars {
  [key: string]: string;
}

const envVars: EnvVars = {};
try {
  const envFile = fs.readFileSync('.env', 'utf-8');
  const lines = envFile.split('\n');
  
  lines.forEach(line => {
    // Skip comments and empty lines
    if (line.startsWith('#') || !line.trim()) return;
    
    // Match key=value pattern
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && match[1]) {
      envVars[match[1]] = match[2].trim();
    }
  });
} catch (error) {
  console.warn('Could not read .env file, using process.env');
}

// TMDB API configuration
const TMDB_API_KEY = envVars.PUBLIC_TMDB_API_KEY || process.env.PUBLIC_TMDB_API_KEY || '';
const TMDB_ACCESS_TOKEN = envVars.PUBLIC_TMDB_API_ACCESS_TOKEN || process.env.PUBLIC_TMDB_API_ACCESS_TOKEN || '';

// Base URL for TMDB API
const BASE_URL = 'https://api.themoviedb.org/3';

// Headers for API requests
const headers = {
  'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};

/**
 * Search for movies by title
 * @param query The movie title to search for
 * @returns Promise with search results
 */
export async function searchMovies(query: string) {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Get detailed information about a movie by ID
 * @param movieId The TMDB movie ID
 * @returns Promise with movie details
 */
export async function getMovieDetails(movieId: number) {
  const url = `${BASE_URL}/movie/${movieId}?append_to_response=videos,credits`;
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Format movie data from TMDB to match our schema
 * @param movie The movie data from TMDB
 * @returns Formatted movie data
 */
export function formatMovieData(movie: any) {
  // Extract trailer URL if available
  let trailerUrl = '';
  try {
    if (movie.videos && movie.videos.results && movie.videos.results.length > 0) {
      const trailer = movie.videos.results.find((video: any) => 
        video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      if (trailer) {
        trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      } else {
        // Fallback to any YouTube video if no trailer is found
        const youtubeVideo = movie.videos.results.find((video: any) => video.site === 'YouTube');
        if (youtubeVideo) {
          trailerUrl = `https://www.youtube.com/watch?v=${youtubeVideo.key}`;
        }
      }
    }
  } catch (error) {
    console.error('Error extracting trailer URL:', error);
  }
  
  // Extract cast information with error handling
  let cast = [];
  try {
    cast = movie.credits?.cast?.slice(0, 5).map((actor: any) => actor.name) || [];
  } catch (error) {
    console.error('Error extracting cast information:', error);
  }
  
  // Format runtime from minutes to hours and minutes with error handling
  let formattedRuntime = '';
  try {
    if (movie.runtime && typeof movie.runtime === 'number') {
      const hours = Math.floor(movie.runtime / 60);
      const minutes = movie.runtime % 60;
      formattedRuntime = `${hours}h ${minutes}m`;
    }
  } catch (error) {
    console.error('Error formatting runtime:', error);
    formattedRuntime = 'Unknown';
  }
  
  // Format genres with error handling
  let genres = [];
  try {
    genres = movie.genres?.map((genre: any) => genre.name) || [];
  } catch (error) {
    console.error('Error extracting genres:', error);
  }
  
  // Check if poster and backdrop paths are valid
  let posterPath = '';
  let backdropPath = '';
  
  try {
    if (movie.poster_path && typeof movie.poster_path === 'string') {
      posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    } else {
      console.warn('Movie poster path is missing or invalid');
    }
  } catch (error) {
    console.error('Error processing poster path:', error);
  }
  
  try {
    if (movie.backdrop_path && typeof movie.backdrop_path === 'string') {
      backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    } else {
      console.warn('Movie backdrop path is missing or invalid');
      // Use poster as fallback for backdrop if available
      backdropPath = posterPath;
    }
  } catch (error) {
    console.error('Error processing backdrop path:', error);
    // Use poster as fallback for backdrop if available
    backdropPath = posterPath;
  }
  
  // Limit description to 160 characters for SEO
  let description = '';
  try {
    if (movie.overview) {
      // If description is longer than 160 characters, truncate it and add ellipsis
      if (movie.overview.length > 160) {
        // Find the last space before the 160 character limit to avoid cutting words
        const lastSpace = movie.overview.substring(0, 157).lastIndexOf(' ');
        description = movie.overview.substring(0, lastSpace > 0 ? lastSpace : 157) + '...';
      } else {
        description = movie.overview;
      }
    }
  } catch (error) {
    console.error('Error formatting description:', error);
  }

  return {
    title: movie.title || 'Unknown Title',
    description: description,
    poster: posterPath,
    socialImage: backdropPath,
    trailer: trailerUrl,
    length: formattedRuntime,
    cast,
    genre: genres,
    tmdbId: movie.id,
    // These fields aren't available from TMDB and would need to be manually added
    // rating, showtimes, reelAlternative, eventNote, contact
  };
}
