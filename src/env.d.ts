/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


// Visitortracking.com snippet
interface Tracer {
  new (config: { websiteId: string; async: boolean; debug: boolean }): void;
}

declare global {
  var Tracer: Tracer;
}
