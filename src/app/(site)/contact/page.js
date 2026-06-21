'use client';

import LenisProvider from '@/components/LenisProvider';
import NavigationGeneral from '@/components/nav/navgeneral/navgeneral';
import HomeContact from '@/components/Home/homecontact/homecontact';
import './contactpage.css';

export default function ContactPage() {
  return (
    <LenisProvider>
      <NavigationGeneral />
      <div className='spacer-45'></div>
      <HomeContact />
    </LenisProvider>
  );
}
