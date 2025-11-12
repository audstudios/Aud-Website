// src/app/prod/work/projects/pages/rizzlerHardees/page.js
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import HorizontalProjectPage from '../../templates/horizontal/page';
import { projects } from '@/data/projects'; 

export default function RizzlerHardeesPage() {
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

  return (
    <div>
      <NavigationGeneral />
      <HorizontalProjectPage projectData={projects.rizzlerHardees} />
    </div>
  );
}