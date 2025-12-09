'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Animate the logo in
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      }
    );

    // Set a timer for 3 seconds
    const timer = setTimeout(() => {
      // Fade out the preloader
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-content">
        <div className="preloader-spinner">
          <img 
            ref={logoRef}
            src="/images/audwordmark_nav.svg" 
            alt="Aud Studios" 
            className="preloader-logo"
          />
        </div>
      </div>
    </div>
  );
}