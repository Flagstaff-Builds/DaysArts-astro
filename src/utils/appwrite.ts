import { Client, Account } from 'appwrite';

// Debug environment variables
console.log('Environment variables:', {
    VITE_APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
    VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    VITE_APPWRITE_DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    VITE_APPWRITE_MOVIES_COLLECTION_ID: import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID,
    VITE_APPWRITE_EVENTS_COLLECTION_ID: import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID,
    VITE_APPWRITE_USERS_COLLECTION_ID: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
});

// Initialize the client
const client = new Client();

try {
    if (!import.meta.env.VITE_APPWRITE_ENDPOINT) {
        throw new Error('VITE_APPWRITE_ENDPOINT is not set');
    }
    if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        throw new Error('VITE_APPWRITE_PROJECT_ID is not set');
    }

    console.log('Initializing Appwrite client with:', {
        endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
        projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID
    });
    
    client
        .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
} catch (error) {
    console.error('Error initializing Appwrite client:', error);
}

export const account = new Account(client);

export const login = async (email: string, password: string) => {
    if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
        console.error('Missing VITE_APPWRITE_PROJECT_ID');
        return { 
            success: false, 
            error: {
                message: 'Appwrite is not properly configured. Please check your environment variables.',
                details: 'Missing VITE_APPWRITE_PROJECT_ID'
            }
        };
    }

    try {
        console.log('Creating email session...');
        const session = await account.createEmailSession(email, password);
        console.log('Session created successfully:', session);
        return { success: true, data: session };
    } catch (error) {
        console.error('Failed to create email session:', error);
        return { 
            success: false, 
            error: {
                message: error instanceof Error ? error.message : 'Failed to authenticate',
                details: error
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
