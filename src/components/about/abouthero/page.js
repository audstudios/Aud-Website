'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
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
          <Image
            src="/images/about/AUD_About02.jpg"
            alt="Aud Studios team collaboration"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="floating-image floating-image-1" ref={floating1Ref}>
          <Image
            src="/images/about/AUD_About01.jpg"
            alt="Creative workspace detail"
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>

        <div className="floating-image floating-image-2" ref={floating2Ref}>
          <Image
            src="/images/about/AUD_About05.jpg"
            alt="Team collaboration moment"
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>

        <div className="floating-image floating-image-3" ref={floating3Ref}>
          <Image
            src="/images/about/AUD_About06.jpg"
            alt="Production in action"
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>

        <div className="floating-image floating-image-4" ref={floating4Ref}>
          <Image
            src="/images/about/AUD_About07.jpg"
            alt="Behind the scenes"
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
      </div>
    </div>
  );
}