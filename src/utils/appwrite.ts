import { Client, Account, Databases, ID, Query } from 'appwrite';

// Initialize the client
export const appwriteClient = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

try {
    if (!import.meta.env.VITE_APPWRITE_ENDPOINT) {
        throw new Error('VITE_APPWRITE_ENDPOINT is not set');
    }
    if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        throw new Error('VITE_APPWRITE_PROJECT_ID is not set');
    }
    if (!import.meta.env.VITE_APPWRITE_DATABASE_ID) {
        throw new Error('VITE_APPWRITE_DATABASE_ID is not set');
    }
    if (!import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID) {
        throw new Error('VITE_APPWRITE_MOVIES_COLLECTION_ID is not set');
    }
} catch (error) {
    console.error('Error initializing Appwrite client:', error);
}

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);

// Collection IDs
const MOVIES_COLLECTION = import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID;

// Define a Movie type alias
type Movie = {
  id: string;  // Appwrite document ID
  title: string;
  releaseDate: string;
  posterUrl: string;
  description: string;
  status: string;
  trailerUrl: string;
  cast: string[];
  genre: string[];
  tmdbId: string;
  rating: string;
  isReelAlternative: boolean;
  runtime: number | null;
  showTimes: string[];
};

// Export the Movie type for use in other files
export type { Movie };

// Movies functions
export async function getMovies(): Promise<Movie[]> {
    try {
        const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            MOVIES_COLLECTION,
            [
                Query.equal('status', 'active')
            ]
        );
        
        // Transform and sort movies by their first showtime
        const transformedMovies: Movie[] = response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            releaseDate: doc.releaseDate,
            posterUrl: doc.posterUrl,
            description: doc.description,
            status: doc.status,
            trailerUrl: doc.trailerUrl,
            cast: doc.cast || [],
            genre: doc.genre || [],
            tmdbId: doc.tmdbId,
            rating: doc.rating,
            isReelAlternative: doc.isReelAlternative || false,
            runtime: doc.runtime || null,
            showTimes: doc.showTimes || []
        }));

        return transformedMovies.sort((a, b) => {
            const aTime = a.showTimes[0] ? new Date(a.showTimes[0]) : new Date(0);
            const bTime = b.showTimes[0] ? new Date(b.showTimes[0]) : new Date(0);
            return aTime.getTime() - bTime.getTime();
        });
    } catch (error) {
        return [];
    }
};

export async function createMovie(movieData: Movie) {
    try {
        const response = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            MOVIES_COLLECTION,
            ID.unique(),
            movieData
        );
        return { success: true, movie: response };
    } catch (error) {
        console.error('Error creating movie:', error);
        return { success: false, error };
    }
};

export async function updateMovie(
    movieId: string,
    movieData: Movie
) {
    try {
        const response = await databases.updateDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            MOVIES_COLLECTION,
            movieId,
            movieData
        );
        return { success: true, movie: response };
    } catch (error) {
        console.error('Error updating movie:', error);
        return { success: false, error };
    }
};

export async function deleteMovie(movieId: string) {
    try {
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            MOVIES_COLLECTION,
            movieId
        );
        return { success: true };
    } catch (error) {
        console.error('Error deleting movie:', error);
        return { success: false, error };
    }
};

export const login = async (email: string, password: string) => {
    if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        return { 
            success: false, 
            error: {
                message: 'Authentication service is not properly configured.',
                details: 'Configuration error'
            }
        };
    }

    try {
        const session = await account.createEmailSession(email, password);
        return { success: true, session };
    } catch (error) {
        return {
            success: false,
            error: {
                message: 'Failed to authenticate',
                details: 'Invalid credentials'
            }
        };
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { 
            success: false, 
            error: {
                message: error instanceof Error ? error.message : 'Failed to logout',
                details: error
            }
        };
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return { success: true, data: user };
    } catch (error) {
        console.error('Get current user error:', error);
        return { 
            success: false, 
            error: {
                message: error instanceof Error ? error.message : 'Failed to get current user',
                details: error
            }
        };
    }
};
