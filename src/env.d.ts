/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


// Visitortracking.com snippet
interface Tracer {
  new (config: { websiteId: string; async: boolean; debug: boolean }): void;
}

declare global {
  var Tracer: Tracer;
}

/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly VITE_APPWRITE_ENDPOINT: string;
    readonly VITE_APPWRITE_PROJECT_ID: string;
    readonly VITE_APPWRITE_DATABASE_ID: string;
    readonly VITE_APPWRITE_MOVIES_COLLECTION_ID: string;
    readonly VITE_APPWRITE_EVENTS_COLLECTION_ID: string;
    readonly VITE_APPWRITE_USERS_COLLECTION_ID: string;
    readonly VITE_TMDB_API_ACCESS_TOKEN: string;
    readonly VITE_TMDB_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
