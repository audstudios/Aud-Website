'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const aRef = useRef(null);
  const uRef = useRef(null);
  const dRef = useRef(null);

  useEffect(() => {
    // Create the looping animation timeline
    const tl = gsap.timeline({ repeat: 1 }); // Repeat once (plays twice total)

    // Animate 'a'
    tl.fromTo(
      aRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }
    );

    // Animate 'u'
    tl.fromTo(
      uRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      '-=0.2' // Overlap slightly with previous animation
    );

    // Animate 'd'
    tl.fromTo(
      dRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      '-=0.2' // Overlap slightly with previous animation
    );

    // Hold for a moment
    tl.to({}, { duration: 0.3 });

    // Add subtle floating animation to all letters
    tl.to(
      [aRef.current, uRef.current, dRef.current],
      {
        y: -10,
        duration: 0.4,
        ease: 'sine.inOut',
        stagger: 0.1,
      },
      '-=0.3'
    );

    tl.to(
      [aRef.current, uRef.current, dRef.current],
      {
        y: 0,
        duration: 0.4,
        ease: 'sine.inOut',
        stagger: 0.1,
      }
    );

    // Fade out all letters
    tl.to(
      [aRef.current, uRef.current, dRef.current],
      {
        opacity: 0,
        y: -20,
        scale: 0.8,
        duration: 0.5,
        ease: 'power2.in',
        stagger: 0.1,
      },
      '+=0.2'
    );

    // After the animation completes (including repeat), fade out the preloader
    tl.eventCallback('onComplete', () => {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.3,
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    });

    return () => {
      tl.kill(); // Clean up timeline on unmount
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-content">
        <div className="preloader-text">
          <span ref={aRef} className="preloader-letter">
            a
          </span>
          <span ref={uRef} className="preloader-letter">
            u
          </span>
          <span ref={dRef} className="preloader-letter">
            d
          </span>
        </div>
      </div>
    </div>
  );
}