// src/app/(site)/work/projects/[slug]/page.js
// Updated to handle Cloudinary assets from Sanity

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import HorizontalProjectPage from '../templates/horizontal/page';
import VerticalProjectPage from '../templates/vertical/page';
import { getCloudinaryAssetUrl, getCloudinaryAssetUrls } from '@/lib/cloudinary';
import { client } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';
import { portableTextToHtml } from '@/sanity/lib/portableText';

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await client.fetch(projectBySlugQuery, { slug: params.slug });
        
        if (data) {
          // Transform Sanity Cloudinary assets to optimized URLs
          const transformedProject = {
            title: data.title,
            client: data.client,
            type: data.projectType,
            year: data.year,
            layout: data.layout || 'horizontal',
            
            // Single Cloudinary assets - use getCloudinaryAssetUrl
            heroVideo: getCloudinaryAssetUrl(data.heroVideo, 'heroVideo'),
            fullVideo: getCloudinaryAssetUrl(data.fullVideo, 'heroVideo'),
            brandLogo: getCloudinaryAssetUrl(data.brandLogo, 'logo'),
            
            // Array of Cloudinary assets - use getCloudinaryAssetUrls
            heroVideos: getCloudinaryAssetUrls(data.heroVideos, 'heroVideo'),
            mainImages: getCloudinaryAssetUrls(data.mainImages, 'cardImage'),
            subImages: getCloudinaryAssetUrls(data.subImages, 'cardImage'),
            
            watchLink: data.showWatchButton ? '#' : null,
            mainline: data.mainline,
            content: portableTextToHtml(data.contentParagraphs),
          };
          
          setProject(transformedProject);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchProject();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000',
        color: '#fff'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000',
        color: '#fff'
      }}>
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div>
      <NavigationGeneral />
      {project.layout === 'vertical' ? (
        <VerticalProjectPage projectData={project} />
      ) : (
        <HorizontalProjectPage projectData={project} />
      )}
    </div>
  );
}