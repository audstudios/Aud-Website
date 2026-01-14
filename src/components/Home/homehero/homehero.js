import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './homehero.css';

export default function Homehero() {
  const logoRef = useRef(null);

  useEffect(() => {
    // Set initial state - centered with offset and invisible
    gsap.set(logoRef.current, {
      opacity: 0,
      y: 50  // Start 50px below center
    });

    // Animate: fade in and move to center
    gsap.to(logoRef.current, {
      opacity: 1,
      y: 0,  // Move to perfect center
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
        alt="Aud Studios glass logo"
      />
      <div className="hero-fade"></div>
    </div>
  );
}