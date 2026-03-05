'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { getMediaUrl, getCloudinaryAssetUrl } from '@/lib/cloudinary';
import { homeSliderData as fallbackSliderData } from '@/data/projects';
import { client } from '@/sanity/lib/client';
import { homeSliderQuery } from '@/sanity/lib/queries';
import './homeslider.css';
import './titles.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function HomeSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevBackground, setPrevBackground] = useState(null);
  const [prevVideo, setPrevVideo] = useState(null);
  const [prevTitle, setPrevTitle] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bgEnterRef = useRef(null);
  const bgExitRef = useRef(null);
  const videoEnterRef = useRef(null);
  const videoExitRef = useRef(null);
  const titleRef = useRef(null);
  const titleExitRef = useRef(null);

  // Fetch slides from Sanity, fallback to static data
  useEffect(() => {
    async function fetchSlides() {
      try {
        if (client) {
          const data = await client.fetch(homeSliderQuery);
          if (data && data.length > 0) {
            const transformed = data.map((slide) => ({
              title: slide.displayTitle,
              video: getCloudinaryAssetUrl(slide.video, 'sliderVideo'),
              background: getCloudinaryAssetUrl(slide.backgroundImage, 'blurredBackground'),
              className: slide.titleClass || '',
              link: slide.projectLink,
            }));
            setSlides(transformed);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
      // Fallback to static data
      const fallback = fallbackSliderData.map((slide) => ({
        ...slide,
        video: getMediaUrl(slide.video, 'sliderVideo'),
        background: getMediaUrl(slide.background, 'blurredBackground'),
      }));
      setSlides(fallback);
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 705);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (isAnimating || totalSlides === 0) return;
    setPrevBackground(slides[currentIndex].background);
    setPrevVideo(slides[currentIndex].video);
    setPrevTitle({ title: slides[currentIndex].title, className: slides[currentIndex].className });
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (isAnimating || totalSlides === 0) return;
    setPrevBackground(slides[currentIndex].background);
    setPrevVideo(slides[currentIndex].video);
    setPrevTitle({ title: slides[currentIndex].title, className: slides[currentIndex].className });
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!prevBackground && !prevVideo) return;

    if (bgExitRef.current) gsap.set(bgExitRef.current, { opacity: 1 });
    if (bgEnterRef.current) gsap.set(bgEnterRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevBackground(null);
        setPrevVideo(null);
        setPrevTitle(null);
        setIsAnimating(false);
      },
    });

    if (videoExitRef.current) {
      tl.to(videoExitRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' }, 0);
    }

    if (isMobile) {
      if (titleExitRef.current) tl.to(titleExitRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
      if (titleRef.current) tl.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.3);
    } else {
      if (titleExitRef.current) tl.to(titleExitRef.current, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' }, 0);
      if (titleRef.current) tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.3);
    }

    if (bgExitRef.current && bgEnterRef.current) {
      tl.to(bgEnterRef.current, { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, 0);
      tl.to(bgExitRef.current, { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0);
    }

    if (videoEnterRef.current) {
      tl.fromTo(videoEnterRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 0.4);
    }
  }, [currentIndex, isMobile]);

  useEffect(() => {
    if (slides.length === 0) return;

    if (bgEnterRef.current && !prevBackground) {
      gsap.fromTo(bgEnterRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    }
    if (videoEnterRef.current && !prevVideo) {
      gsap.fromTo(videoEnterRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 });
    }
    if (titleRef.current && !prevBackground) {
      if (isMobile) {
        gsap.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 });
      } else {
        gsap.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 });
      }
    }
  }, [slides, isMobile]);

  if (slides.length === 0) {
    return <div className="homeslider-container" />;
  }

  const { title, video, background, className, link } = slides[currentIndex];

  return (
    <div className="homeslider-container">
      {prevBackground && (
        <div className="bg-layer" ref={bgExitRef} style={{ backgroundImage: `url(${prevBackground})` }} />
      )}
      <div className="bg-layer" ref={bgEnterRef} style={{ backgroundImage: `url(${background})` }} />

      {prevVideo && (
        <video
          className="slider-video video-exit"
          ref={videoExitRef}
          key={`exit-${prevVideo}`}
          src={prevVideo}
          autoPlay muted loop playsInline
        />
      )}
      <video
        className="slider-video video-enter"
        ref={videoEnterRef}
        key={`enter-${video}`}
        src={video}
        autoPlay muted loop playsInline
      />

      <div className="homeslider-wrapper">
        <div className="homeslider-content">
          <div className="homeslider-title-container">
            {prevTitle && (
              <h2 ref={titleExitRef} className={`homeslider-title ${prevTitle.className}`} style={{ position: 'absolute' }}>
                <span className="font-bold">{prevTitle.title}</span>
              </h2>
            )}
            <h2 ref={titleRef} className={`homeslider-title ${className}`}>
              <span className="font-bold">{title}</span>
            </h2>
          </div>

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