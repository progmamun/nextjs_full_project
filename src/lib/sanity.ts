import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k05g7l57',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});



const builder = imageUrlBuilder(sanityClient);

// lib/sanity.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any): string {
  if (!source || !source.asset) {
    console.warn('urlFor received invalid source:', source);
    return '/placeholder-image.jpg'; // Return a fallback image URL
  }
  return builder.image(source).width(800).fit('max').url();
}