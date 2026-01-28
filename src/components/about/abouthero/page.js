'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './abouthero.css';

export default function AboutHero() {
  const mainImageRef = useRef(null);
  const floating1Ref = useRef(null);
  const floating2Ref = useRef(null);
  const floating3Ref = useRef(null);
  const floating4Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states
    gsap.set(mainImageRef.current, { scale: 0.9, opacity: 0 });
    gsap.set([floating1Ref.current, floating2Ref.current, floating3Ref.current, floating4Ref.current], { 
      scale: 0.85, 
      opacity: 0 
    });

    // Animate main image first (center of attention)
    tl.to(mainImageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    })
    // Then animate supporting images with stagger
    .to(
      [floating1Ref.current, floating3Ref.current],
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      },
      '-=0.6'
    )
    .to(
      [floating2Ref.current, floating4Ref.current],
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      },
      '-=0.8'
    );
  }, []);

  return (
    <div className="about-hero-container">
      <div className="about-hero-wrapper">
        {/* Main center image - AUD_About02.jpg */}
        <div className="about-hero-main-image" ref={mainImageRef}>
          <img
            src="/images/about/AUD_About02.jpg"
            alt="Aud Studios team collaboration"
          />
        </div>

        {/* Supporting images arranged around main image */}
        
        {/* Top left - AUD_About01.jpg */}
        <div className="floating-image floating-image-1" ref={floating1Ref}>
          <img
            src="/images/about/AUD_About01.jpg"
            alt="Creative workspace detail"
          />
        </div>

        {/* Bottom left - AUD_About05.jpg (new) */}
        <div className="floating-image floating-image-2" ref={floating2Ref}>
          <img
            src="/images/about/AUD_About05.jpg"
            alt="Team collaboration moment"
          />
        </div>

        {/* Top right - AUD_About06.jpg (new) */}
        <div className="floating-image floating-image-3" ref={floating3Ref}>
          <img
            src="/images/about/AUD_About06.jpg"
            alt="Production in action"
          />
        </div>

        {/* Bottom right - AUD_About07.jpg (new) */}
        <div className="floating-image floating-image-4" ref={floating4Ref}>
          <img
            src="/images/about/AUD_About07.jpg"
            alt="Behind the scenes"
          />
        </div>
      </div>
    </div>
  );
}