'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose, videoSrc }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // GSAP animation for opening
      const tl = gsap.timeline();
      
      // Fade in overlay
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Scale and fade in content
      tl.fromTo(
        contentRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      );
    } else {
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
      
      // Pause and reset video when closing
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    // GSAP animation for closing
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    
    // Scale down and fade out content
    tl.to(contentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
    
    // Fade out overlay
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      },
      '-=0.1'
    );
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef} 
      className="video-modal"
      style={{ opacity: 1 }}
    >
      <div
        ref={overlayRef}
        className="video-modal-overlay"
        onClick={handleOverlayClick}
        style={{ opacity: 0 }}
      >
        <div
          ref={contentRef}
          className="video-modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ opacity: 0 }}
        >
          <button className="video-modal-close" onClick={handleClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="video-modal-video-wrapper">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              className="video-modal-video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}