'use client';

import { useEffect, useState } from 'react';

import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/nav/nav";
import Homehero from "@/components/Home/homehero/homehero";
import Services from "@/components/Home/Services/services";
import HomeSlider from "@/components/Home/homeslider/homeslider";
import HomeCarousel from "@/components/Home/homecarousel/homecarousel";
import HomeContact from "@/components/Home/homecontact/homecontact";
import Preloader from "@/components/preloader/Preloader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('aud-preloader-shown')) return;

    const dismiss = () => setIsLoading(false);

    const video = document.querySelector('.background-video');
    if (video && video.readyState >= 3) {
      dismiss();
      return;
    }

    window.addEventListener('hero-video-ready', dismiss);
    return () => window.removeEventListener('hero-video-ready', dismiss);
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('aud-preloader-shown', 'true');
    setIsLoading(false);
  };

return (
  <LenisProvider>
    {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
    <Navigation />
    <Homehero />
    <Services />
    <HomeSlider />
    <HomeCarousel />
    <HomeContact />
  </LenisProvider>
);
}