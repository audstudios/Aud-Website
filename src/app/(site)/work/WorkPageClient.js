'use client';

import LenisProvider from '@/components/LenisProvider';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import WorkLayout from '@/components/work/worklayout/worklayout';

export default function WorkPageClient({ projects }) {
  return (
    <LenisProvider>
      <NavigationGeneral />
      <WorkLayout projects={projects} />
    </LenisProvider>
  );
}
