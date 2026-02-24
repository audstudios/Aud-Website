// src/lib/sanity/client.js
// Sanity client configuration for Next.js

import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper function to fetch data with error handling
export async function sanityFetch({ query, params = {}, tags = [] }) {
  try {
    const data = await client.fetch(query, params, {
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        tags,
      },
    });
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
}