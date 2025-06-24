import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Safe movie image handler that checks for file existence before importing
 */

export async function getMoviePosterSafely(posterData: any): Promise<string | null> {
  if (!posterData) return null;
  
  let posterValue;
  
  // Handle conditional field structure
  if (posterData.discriminant && posterData.value) {
    posterValue = posterData.value;
  } else {
    // Handle direct value (legacy format)
    posterValue = posterData;
  }
  
  // If it's a URL, return it directly
  if (typeof posterValue === 'string' && posterValue.startsWith('http')) {
    return posterValue;
  }
  
  // If it's a local path, check if it exists
  if (typeof posterValue === 'string' && posterValue.startsWith('./images/')) {
    const imagePath = join(process.cwd(), 'src/content/movie', posterValue);
    try {
      await readFile(imagePath);
      return posterValue; // File exists, safe to import
    } catch {
      console.warn(`Image file not found: ${posterValue}, using placeholder`);
      return null; // File doesn't exist, use placeholder
    }
  }
  
  // If it's already an imported image object, return it
  if (posterValue && typeof posterValue === 'object' && 'src' in posterValue) {
    return posterValue;
  }
  
  return posterValue;
}