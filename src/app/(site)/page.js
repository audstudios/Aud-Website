'use client';

import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

import Navigation from "@/components/nav/nav";
import Homehero from "@/components/Home/homehero/homehero";
import Services from "@/components/Home/Services/services";
import HomeSlider from "@/components/Home/homeslider/homeslider";
import HomeCarousel from "@/components/Home/homecarousel/homecarousel";
import HomeContact from "@/components/Home/homecontact/homecontact";
import Preloader from "@/components/preloader/Preloader";

export default function Test() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (!sessionStorage.getItem('aud-preloader-shown')) return true;
    return !document.querySelector('video')?.readyState;
  });

  useEffect(() => {
    if (!isLoading) return;
    if (!sessionStorage.getItem('aud-preloader-shown')) return;

    const dismiss = () => setIsLoading(false);

    const video = document.querySelector('.background-video');
    if (video && video.readyState >= 3) {
      dismiss();
      return;
    }

    window.addEventListener('hero-video-ready', dismiss);
    return () => window.removeEventListener('hero-video-ready', dismiss);
  }, [isLoading]);

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

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('aud-preloader-shown', 'true');
    setIsLoading(false);
  };

return (
  <>
    {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
    <Navigation />
    <Homehero />
    <Services />
    <HomeSlider />
    <HomeCarousel />
    <HomeContact />
  </>
);
}