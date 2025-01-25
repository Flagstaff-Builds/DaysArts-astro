import { Client, Account, Databases, ID, Query } from 'appwrite';

// Initialize the client
const client = new Client()
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

export const account = new Account(client);
export const databases = new Databases(client);

// Collection IDs
const MOVIES_COLLECTION = import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID;

// Movies functions
export async function getMovies() {
    try {
        const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            MOVIES_COLLECTION,
            [
                Query.orderDesc('releaseDate')
            ]
        );
        return { success: true, movies: response.documents };
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { success: false, error };
    }
};

export async function createMovie(movieData: {
    title: string
    releaseDate: string
    posterUrl: string
    description: string
    status: string
    trailerUrl: string
    cast: string[]
    genre: string[]
    tmdbId: string
    rating: string
    isReelAlternative: boolean
    runtime: number | null
    showTimes: string[]
}) {
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
    movieData: {
        title: string
        releaseDate: string
        posterUrl: string
        description: string
        status: string
        trailerUrl: string
        cast: string[]
        genre: string[]
        tmdbId: string
        rating: string
        isReelAlternative: boolean
        runtime: number | null
        showTimes: string[]
    }
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
