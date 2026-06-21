'use client';

import LenisProvider from '@/components/LenisProvider';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import AboutContentIntegrated from '@/components/about/aboutcontent/page';

export default function AboutPageClient() {
  return (
    <LenisProvider>
      <div style={{ minHeight: '100vh' }}>
        <NavigationGeneral />
        <AboutContentIntegrated />
      </div>
    </LenisProvider>
  );
}
