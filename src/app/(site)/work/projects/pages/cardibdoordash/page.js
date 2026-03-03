// src/app/(site)/work/projects/pages/cardibdoordash/page.js
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import VerticalProjectPage from '../../templates/vertical/page';
import { projects, transformProjectForCloudinary } from '@/data/projects';
import { getMediaUrl } from '@/lib/cloudinary';

export default function CardiDoordashPage() {
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

  // Transform project data with Cloudinary URLs
  const projectData = transformProjectForCloudinary(projects.cardidoordash, getMediaUrl);

  return (
    <div>
      <NavigationGeneral />
      <VerticalProjectPage projectData={projectData} />
    </div>
  );
}