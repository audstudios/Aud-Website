'use client'; // if using Next.js App Router

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import Navigation from "@/components/nav/nav";
import Homehero from "@/components/home/homehero/homehero";
import Services from "@/components/home/services/services";
import HomeSlider from "@/components/home/homeslider/homeslider";
import HomeCarousel from "@/components/home/homecarousel/homecarousel";
import HomeContact from "@/components/home/homecontact/homecontact";

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
      <Navigation />
      <Homehero />
      <Services />
      <HomeSlider />
      <HomeCarousel />
      <HomeContact />
    </div>
  );
}
