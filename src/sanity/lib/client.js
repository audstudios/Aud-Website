import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = projectId 
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;

export async function sanityFetch({ query, params = {}, tags = [] }) {
  if (!client) {
    console.error('Sanity client not configured - missing projectId');
    return null;
  }
  
  try {
    const data = await client.fetch(query, params, {
      next: {
        revalidate: 60,
        tags,
      },
    });
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}