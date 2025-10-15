'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import GhostLogo from '@/components/global/ghostlogo/ghostlogo';
import WorkTitle from '@/components/work/title/worktitle';
import ProjectStackOne from '@/components/work/projectstackone/projectstackone';

export default function Test() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <div>
        <NavigationGeneral />
        <WorkTitle />
        <GhostLogo />
        <ProjectStackOne />
    </div>
  );
}
