'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './abouthero.css';

export default function AboutHero() {
  const mainImageRef = useRef(null);
  const floating1Ref = useRef(null);
  const floating2Ref = useRef(null);
  const floating3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states - images start above viewport
    gsap.set(mainImageRef.current, { y: -100, opacity: 0 });
    gsap.set(floating1Ref.current, { y: -150, rotation: -15, opacity: 0 });
    gsap.set(floating2Ref.current, { y: -200, rotation: 10, opacity: 0 });
    gsap.set(floating3Ref.current, { y: -180, rotation: -8, opacity: 0 });

    // Animate images falling into place
    tl.to(mainImageRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    })
      .to(
        floating1Ref.current,
        {
          y: 0,
          rotation: -5,
          opacity: 1,
          duration: 1,
        },
        '-=0.8'
      )
      .to(
        floating3Ref.current,
        {
          y: 0,
          rotation: 3,
          opacity: 1,
          duration: 1,
        },
        '-=0.9'
      )
      .to(
        floating2Ref.current,
        {
          y: 0,
          rotation: -3,
          opacity: 1,
          duration: 1,
        },
        '-=0.8'
      );
  }, []);

  return (
    <div className="about-hero-container">
      <div className="about-hero-wrapper">
        {/* Main center image */}
        <div className="about-hero-main-image" ref={mainImageRef}>
          <img
            src="/images/about/AUD_About02.jpg"
            alt="Aud Studios team collaboration"
          />
        </div>

        {/* Floating images */}
        <div className="floating-image floating-image-1" ref={floating1Ref}>
          <img
            src="/images/about/AUD_About01.jpg"
            alt="Creative workspace detail"
          />
        </div>

        <div className="floating-image floating-image-2" ref={floating2Ref}>
          <img
            src="/images/about/AUD_About03.jpg"
            alt="Team collaboration moment"
          />
        </div>

        <div className="floating-image floating-image-3" ref={floating3Ref}>
          <img
            src="/images/about/AUD_About04.jpg"
            alt="Production in action"
          />
        </div>
      </div>
    </div>
  );
}