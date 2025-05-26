/**
 * Script to update movie descriptions to ensure they're under 160 characters for SEO
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src/content/movie');
const MAX_DESCRIPTION_LENGTH = 160;

/**
 * Truncate a description to MAX_DESCRIPTION_LENGTH characters
 */
function truncateDescription(description) {
  if (!description || description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  }

  // Find the last space before the limit to avoid cutting words
  const lastSpace = description.substring(0, MAX_DESCRIPTION_LENGTH - 3).lastIndexOf(' ');
  if (lastSpace > 0) {
    return description.substring(0, lastSpace) + '...';
  }
  
  // If no space found, just cut at the limit
  return description.substring(0, MAX_DESCRIPTION_LENGTH - 3) + '...';
}

/**
 * Process a single MDX file
 */
async function processFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // Check if description needs truncation
    if (data.description && data.description.length > MAX_DESCRIPTION_LENGTH) {
      console.log(`Truncating description in ${path.basename(filePath)}`);
      console.log(`Original (${data.description.length} chars): ${data.description}`);
      
      // Truncate the description
      const newDescription = truncateDescription(data.description);
      console.log(`New (${newDescription.length} chars): ${newDescription}`);
      
      // Update the frontmatter
      data.description = newDescription;
      
      // Write back to file
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated ${path.basename(filePath)}`);
    } else {
      console.log(`Description in ${path.basename(filePath)} is already under ${MAX_DESCRIPTION_LENGTH} characters (${data.description?.length || 0} chars)`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Find all MDX files
    const files = await glob(path.join(CONTENT_DIR, '**/*.mdx'));
    console.log(`Found ${files.length} movie files to process`);
    
    // Process each file
    for (const file of files) {
      await processFile(file);
      console.log('---');
    }
    
    console.log('All files processed successfully');
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

// Run the script
main().catch(console.error);
