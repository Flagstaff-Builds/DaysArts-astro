/**
 * Safely import an image and return it, with fallback to placeholder
 */
export async function safeImageImport(imagePath: string): Promise<any> {
  try {
    // Try to import the image
    const imageModule = await import(imagePath);
    return imageModule.default;
  } catch (error) {
    console.warn(`Failed to import image: ${imagePath}. Using placeholder.`);
    // Return a placeholder image path
    return '/movie-placeholder.svg';
  }
}

/**
 * Check if a poster value is a local image path that needs importing
 */
export function needsImageImport(posterValue: any): boolean {
  return typeof posterValue === 'string' && posterValue.startsWith('./images/');
}

/**
 * Get the safe poster value, handling missing images gracefully
 */
export function getSafePosterValue(poster: any): string | any {
  if (!poster) return '/movie-placeholder.svg';
  
  let value;
  // Handle conditional field structure
  if (poster.discriminant && poster.value) {
    value = poster.value;
  } else {
    // Handle direct value (legacy format)
    value = poster;
  }
  
  // If no value found, return placeholder
  if (!value) return '/movie-placeholder.svg';
  
  return value;
}