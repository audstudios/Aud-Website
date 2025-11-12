import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './homehero.css';

export default function Homehero() {
  const logoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      logoRef.current,
      { 
        autoAlpha: 0, 
        y: 20  //
      },
      { 
        autoAlpha: 1, 
        y: 0,  
        duration: 1,
        clearProps: 'transform'  // 
      }
    ).fromTo(
      titleRef.current,
      { 
        autoAlpha: 0, 
        y: 20  
      },
      { 
        autoAlpha: 1, 
        y: 0,  
        duration: 1,
        clearProps: 'transform' 
      },
      "-=0.5" 
    );
  }, []);

  return (
    <div className="home-hero-container">
      <video
        className="background-video"
        src="/videos/Aud_Land_Video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <h1 className="hero-title" ref={titleRef}>
        we are not the standard.
        <span className="font-bold"> we are aud studios.</span>
      </h1>
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