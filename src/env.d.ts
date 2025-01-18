/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


// Extend AstroScript attributes
declare namespace astroHTML.JSX {
  interface ScriptHTMLAttributes {
    'client:only'?: boolean;
  }
}

// Visitortracking.com snippet
interface Tracer {
  new (config: { websiteId: string; async: boolean; debug: boolean }): any;
}

declare var Tracer: Tracer;

// Extend Window interface
declare global {
  interface Window {
    init_tracer: () => void;
  }
}
