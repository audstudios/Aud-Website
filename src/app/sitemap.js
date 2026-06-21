import { sanityFetch } from '@/sanity/lib/client';
import { allProjectSlugsQuery } from '@/sanity/lib/queries';

const BASE_URL = 'https://www.audstudios.com';

export default async function sitemap() {
  const slugs = await sanityFetch({ query: allProjectSlugsQuery, tags: ['project'] }) || [];

  const projectPages = slugs.map((slug) => ({
    url: `${BASE_URL}/work/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...projectPages,
  ];
}
