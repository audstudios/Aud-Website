import { notFound } from 'next/navigation';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import HorizontalProjectPage from '../templates/horizontal/page';
import VerticalProjectPage from '../templates/vertical/page';
import LenisProvider from '@/components/LenisProvider';
import { getCloudinaryAssetUrl, getCloudinaryAssetUrls } from '@/lib/cloudinary';
import { sanityFetch } from '@/sanity/lib/client';
import { projectBySlugQuery, allProjectSlugsQuery } from '@/sanity/lib/queries';
import { portableTextToHtml } from '@/sanity/lib/portableText';

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: allProjectSlugsQuery, tags: ['project'] });
  if (!slugs) return [];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await sanityFetch({ query: projectBySlugQuery, params: { slug }, tags: ['project'] });

  if (!data) {
    return { title: 'Project Not Found | Aud Studios' };
  }

  return {
    title: `${data.title} | Aud Studios`,
    description: `${data.title} — ${data.projectType} for ${data.client}. View the full project by Aud Studios.`,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const data = await sanityFetch({ query: projectBySlugQuery, params: { slug }, tags: ['project'] });

  if (!data) {
    notFound();
  }

  const project = {
    title: data.title,
    client: data.client,
    type: data.projectType,
    year: data.year,
    layout: data.layout || 'horizontal',
    heroVideo: getCloudinaryAssetUrl(data.heroVideo, 'heroVideo'),
    fullVideo: getCloudinaryAssetUrl(data.fullVideo, 'heroVideo'),
    brandLogo: getCloudinaryAssetUrl(data.brandLogo, 'logo'),
    heroVideos: getCloudinaryAssetUrls(data.heroVideos, 'heroVideo'),
    mainImages: getCloudinaryAssetUrls(data.mainImages, 'cardImage'),
    subImages: getCloudinaryAssetUrls(data.subImages, 'cardImage'),
    watchLink: data.showWatchButton ? '#' : null,
    mainline: data.mainline,
    content: portableTextToHtml(data.contentParagraphs),
  };

  return (
    <LenisProvider>
      <NavigationGeneral />
      {project.layout === 'vertical' ? (
        <VerticalProjectPage projectData={project} />
      ) : (
        <HorizontalProjectPage projectData={project} />
      )}
    </LenisProvider>
  );
}
