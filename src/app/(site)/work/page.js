import WorkPageClient from './WorkPageClient';
import { sanityFetch } from '@/sanity/lib/client';
import { workPageProjectsQuery } from '@/sanity/lib/queries';
import { getCloudinaryAssetUrl } from '@/lib/cloudinary';

export const metadata = {
  title: 'Work | Aud Studios',
  description: 'Explore our portfolio of creative strategy and production work for iconic brands.',
};

export default async function WorkPage() {
  const data = await sanityFetch({ query: workPageProjectsQuery, tags: ['project'] });

  const projects = (data || []).map((project) => ({
    id: project._id,
    title: project.title,
    subtitle: project.workPageSubtitle || '',
    client: project.client,
    type: project.projectType,
    year: project.year,
    image: getCloudinaryAssetUrl(project.workPageImage, 'fullImage'),
    link: `/work/projects/${project.slug}`,
  }));

  return <WorkPageClient projects={projects} />;
}
