import { Client, Databases, ID } from 'node-appwrite';
import { glob } from 'glob';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT!)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID!)
    .setKey(process.env.VITE_APPWRITE_API_KEY!); // Make sure to create an API key in Appwrite console

const databases = new Databases(client);

async function migrateMovies() {
    try {
        // Get all MDX files from the movies directory
        const movieFiles = await glob('src/content/movie/*.mdx', {
            ignore: ['src/content/movie/_*.mdx'] // Ignore template files
        });

        for (const filePath of movieFiles) {
            // Read the file content
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const { data: frontmatter } = matter(fileContent);

            // Extract the date from the filename (assuming format: MM-DD-YYYY-title.mdx)
            const fileName = path.basename(filePath, '.mdx');
            const [month, day, year] = fileName.split('-');
            const releaseDate = new Date(`${year}-${month}-${day}`);

            // Convert showtimes strings to Date objects
            const showTimes = frontmatter.showtimes?.map(showtime => {
                // Parse the showtime string (e.g., "Jan 24th - 2pm Matinee" or "Jan 24th")
                const [datePart, timePart] = showtime.split('-').map(s => s.trim());
                
                // Remove ordinal suffixes (st, nd, rd, th)
                const dateWithoutSuffix = datePart.replace(/(st|nd|rd|th)/, '');
                const year = new Date().getFullYear();
                
                // Set default time to 7:30 PM unless it's a matinee
                let hours = 19;
                let minutes = 30;
                
                if (timePart && timePart.toLowerCase().includes('matinee')) {
                    hours = 14;
                    minutes = 0;
                }
                
                // Create date object with the specified time
                const date = new Date(`${dateWithoutSuffix}, ${year}`);
                date.setHours(hours, minutes, 0, 0);
                
                return date.toISOString();
            }) || [];

            // Convert length string to runtime integer (e.g., "104m" -> 104)
            const runtime = frontmatter.length ? 
                parseInt(frontmatter.length.replace(/[^0-9]/g, '')) : 
                null;

            // Create full URLs for poster and trailer
            const posterUrl = frontmatter.poster ? 
                `https://daysarts.org/images/${path.basename(frontmatter.poster)}` : 
                'https://daysarts.org/images/placeholder.jpg';

            // Prepare the movie data
            const movieData = {
                title: frontmatter.title,
                releaseDate: releaseDate.toISOString(),
                posterUrl,
                description: frontmatter.description || '',
                status: 'active',  // You might want to adjust this default value
                trailerUrl: frontmatter.trailer || 'https://www.youtube.com/watch?v=placeholder',
                cast: frontmatter.cast || [],
                genre: frontmatter.genre || [],
                tmdbId: frontmatter.tmdbId || 'placeholder_id',  // You might want to fetch this from TMDB API
                rating: frontmatter.rating || 'NR',
                isReelAlternative: frontmatter.reelAlternative || false,
                runtime: runtime,
                showTimes: showTimes
            };

            // Create the document in Appwrite
            const result = await databases.createDocument(
                process.env.VITE_APPWRITE_DATABASE_ID!,
                process.env.VITE_APPWRITE_MOVIES_COLLECTION_ID!,
                ID.unique(),
                movieData
            );

            console.log(`Migrated movie: ${movieData.title}`);
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrateMovies();
