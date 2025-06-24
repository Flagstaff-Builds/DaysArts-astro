import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Vite plugin to handle missing movie images gracefully
 */
export function safeMovieImages() {
  return {
    name: 'safe-movie-images',
    load(id) {
      // Check if this is a movie image import
      if (id.includes('src/content/movie/images/') && (id.endsWith('.png') || id.endsWith('.jpg') || id.endsWith('.jpeg'))) {
        // Check if the file actually exists
        const filePath = id.startsWith('/') ? id : resolve(id);
        
        if (!existsSync(filePath)) {
          console.warn(`Movie image not found: ${id}, returning placeholder`);
          // Return a placeholder image module
          return `
            export default {
              src: '/movie-placeholder.svg',
              width: 400,
              height: 600,
              format: 'svg'
            };
          `;
        }
      }
      return null;
    }
  };
}