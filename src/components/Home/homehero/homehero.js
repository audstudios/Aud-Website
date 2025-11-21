import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './homehero.css';

export default function Homehero() {
  const logoRef = useRef(null);

  useEffect(() => {
    // Set initial state - centered but offset down and invisible
    gsap.set(logoRef.current, {
      opacity: 0,
      x: '0%',
      y: 'calc(-50% + 50px)'  // Start 50px lower than centered position
    });

    // Animate: fade in and move up to centered position
    gsap.to(logoRef.current, {
      opacity: 1,
      x: '0%',
      y: '-50%',  // End at perfectly centered position
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    });
  }, []);

  return (
    <div className="home-hero-container">
      <video
        className="background-video"
        src="/videos/JPGHeroFinal_Land.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <img
        className="hero-logo"
        ref={logoRef}
        src="/images/AudGlassLogoV02.png"
        alt="AUD Studios Logo"
      />
      <div className="hero-fade"></div>
    </div>
  );
}