'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './homeslider.css';

const slides = [
  {
    title: 'Jean Paul',
    video: '/videos/Aud_Land_Video.mp4',
    background: '/images/AUD_BG_SLIDER01.png',
  },
  {
    title: 'Slide 02',
    video: '/videos/Aud_Land_Video.mp4',
    background: '/images/AudGlassLogo.png',
  },
  {
    title: 'Slide 03',
    video: '/videos/Aud_Land_Video.mp4',
    background: '/images/slider_test.jpg',
  },
];

export default function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevBackground, setPrevBackground] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const bgEnterRef = useRef(null);
  const bgExitRef = useRef(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (isAnimating) return;
    setPrevBackground(slides[currentIndex].background);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setPrevBackground(slides[currentIndex].background);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Animate transitions
  useEffect(() => {
    if (!prevBackground) return;

    if (bgExitRef.current) {
      gsap.set(bgExitRef.current, { opacity: 1 });
      gsap.to(bgExitRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (bgEnterRef.current) {
      gsap.set(bgEnterRef.current, { opacity: 0 });
      gsap.to(bgEnterRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          setPrevBackground(null);
          setIsAnimating(false);
        },
      });
    }
  }, [currentIndex]);

  // 🔥 Animate initial load
  useEffect(() => {
    if (bgEnterRef.current && !prevBackground) {
      gsap.set(bgEnterRef.current, { opacity: 0 });
      gsap.to(bgEnterRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, []);

  const { title, video, background } = slides[currentIndex];

  return (
    <div className="homeslider-container">
      {/* Fade OUT previous background */}
      {prevBackground && (
        <div
          className="bg-layer"
          ref={bgExitRef}
          style={{ backgroundImage: `url(${prevBackground})` }}
        />
      )}

      {/* Fade IN new background */}
      <div
        className="bg-layer"
        ref={bgEnterRef}
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Foreground content */}
      <div className="homeslider-wrapper">
        <div className="homeslider-content">
          <h2 className="homeslider-title">{title}</h2>
          <video
            className="slider-video"
            key={video}
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="homeslider-controls">
            <span onClick={prevSlide}>/-</span>
            <span onClick={nextSlide}>-/</span>
          </div>
          <div className="homeslider-count">
            <p>
              {String(currentIndex + 1).padStart(2, '0')}/
              {String(totalSlides).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
