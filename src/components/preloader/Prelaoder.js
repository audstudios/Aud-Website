'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    let lottieAnimation = null;

    // Load Lottie player script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setAnimationLoaded(true);
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!animationLoaded) return;

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
  }, [animationLoaded, onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-content" ref={lottieContainerRef}>
        {animationLoaded && (
          <lottie-player
            src="https://lottie.host/f8a26c09-cdf7-44e0-847e-45764248cca4/P9tvHzFLg4.lottie"
            background="transparent"
            speed="1"
            style={{ width: '300px', height: '300px' }}
            loop
            autoplay
          />
        )}
      </div>
    </div>
  );
}