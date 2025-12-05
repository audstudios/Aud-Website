'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import './projectslider.css';
import '@/components/Home/homeslider/titles.css'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const slides = [
  {
    title: "Hardee's",
    video: '/images/RizzlerHardees/RizzlerHardees.mp4',
    background: '/images/homeblur/rizzlerhomebg.jpg',
    className: 'slide-flippedfrog',
    link: '/prod/work/projects/pages/rizzlerHardees',  // ✅ Added link
  },
  {
    title: 'Jean Paul Gaultier',
    video: '/videos/Aud_Land_Video.mp4',
    background: '/images/homeblur/jpghomebg.jpg',
    className: 'slide-jeanpaul',
    link: '/prod/work/projects/pages/jeanpaulgautier',  // ✅ Added link
  },
  {
    title: 'Doordash',
    video: '/images/CardiBDoorDash/CardiBHomeSlider.mp4',
    background: '/images/homeblur/cardibhomebg.jpg',
    className: 'slide-frogeating',
    link: '/prod/work/projects/pages/cardibdoordash',  // ✅ Added link
  },
];

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevBackground, setPrevBackground] = useState(null);
  const [prevVideo, setPrevVideo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const bgEnterRef = useRef(null);
  const bgExitRef = useRef(null);
  const videoEnterRef = useRef(null);
  const videoExitRef = useRef(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (isAnimating) return;
    setPrevBackground(slides[currentIndex].background);
    setPrevVideo(slides[currentIndex].video);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setPrevBackground(slides[currentIndex].background);
    setPrevVideo(slides[currentIndex].video);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Animate transitions
  useEffect(() => {
    if (!prevBackground && !prevVideo) return;

    // Background fade out
    if (bgExitRef.current) {
      gsap.set(bgExitRef.current, { opacity: 1 });
      gsap.to(bgExitRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.out',
      });
    }

    // Background fade in
    if (bgEnterRef.current) {
      gsap.set(bgEnterRef.current, { opacity: 0 });
      gsap.to(bgEnterRef.current, {
        opacity: 1,
        duration: 1.0,
        ease: 'power2.out',
      });
    }

    // Video fade out
    if (videoExitRef.current) {
      gsap.set(videoExitRef.current, { opacity: 1 });
      gsap.to(videoExitRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    }

    // Video fade in
    if (videoEnterRef.current) {
      gsap.set(videoEnterRef.current, { opacity: 0 });
      gsap.to(videoEnterRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => {
          setPrevBackground(null);
          setPrevVideo(null);
          setIsAnimating(false);
        },
      });
    }
  }, [currentIndex]);

  // Initial load fade-in
  useEffect(() => {
    if (bgEnterRef.current && !prevBackground) {
      gsap.set(bgEnterRef.current, { opacity: 0 });
      gsap.to(bgEnterRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (videoEnterRef.current && !prevVideo) {
      gsap.set(videoEnterRef.current, { opacity: 0 });
      gsap.to(videoEnterRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, []);

  const { title, video, background, className, link } = slides[currentIndex];
  const prevClass = slides.find((s) => s.background === prevBackground)?.className || '';

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

      {/* Fade OUT previous video */}
      {prevVideo && (
        <video
          className="slider-video video-exit"
          ref={videoExitRef}
          key={`exit-${prevVideo}`}
          src={prevVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Fade IN new video */}
      <video
        className="slider-video video-enter"
        ref={videoEnterRef}
        key={`enter-${video}`}
        src={video}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Foreground content */}
      <div className="homeslider-wrapper">
        <div className="homeslider-content">
          <h2 className={`homeslider-title ${className}`}>
            <span className="font-bold">{title}</span>
          </h2>

          <div className="homeslider-controls">
            <span onClick={prevSlide}>
              <KeyboardDoubleArrowLeftIcon style={{ fontSize: 80, color: 'white' }} />
            </span>
            <span onClick={nextSlide}>
              <KeyboardDoubleArrowRightIcon style={{ fontSize: 80, color: 'white' }} />
            </span>
          </div>

          <div className="homeslider-count">
            <Link href={link} className="homeslider-link-button">
              VIEW PROJECT
            </Link>
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