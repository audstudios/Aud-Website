// src/components/media/CloudinaryVideo.js
// Optimized video component using Cloudinary

'use client';

import { useRef, useState, useEffect } from 'react';
import { getMediaUrl, getVideoPosterUrl, localPathToCloudinaryId, CLOUD_NAME } from '@/lib/cloudinary';

/**
 * CloudinaryVideo Component
 * 
 * Renders optimized videos from Cloudinary with:
 * - Automatic format selection
 * - Adaptive bitrate streaming
 * - Auto-generated poster images
 * - Lazy loading for below-the-fold videos
 * - Fallback to local videos if Cloudinary not configured
 * 
 * @param {Object} props
 * @param {string} props.src - Local path or Cloudinary public ID
 * @param {string} props.className - CSS classes
 * @param {string} props.transformation - Cloudinary transformation preset
 * @param {boolean} props.autoPlay - Auto play video
 * @param {boolean} props.muted - Mute video
 * @param {boolean} props.loop - Loop video
 * @param {boolean} props.playsInline - Play inline on mobile
 * @param {boolean} props.controls - Show video controls
 * @param {boolean} props.priority - Load immediately
 * @param {string} props.poster - Custom poster image path
 * @param {Function} props.onPlay - Callback when video plays
 * @param {Function} props.onPause - Callback when video pauses
 * @param {Function} props.onEnded - Callback when video ends
 * @param {Function} props.onTimeUpdate - Callback on time update
 * @param {Function} props.onLoadedMetadata - Callback when metadata loads
 */
export default function CloudinaryVideo({
  src,
  className = '',
  transformation = 'heroVideo',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  priority = false,
  poster,
  style = {},
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onLoadedMetadata,
  onError,
  ...props
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate URLs
  const cloudinaryUrl = getMediaUrl(src, transformation);
  const publicId = localPathToCloudinaryId(src);
  
  // Generate poster from video if not provided
  const posterUrl = poster 
    ? getMediaUrl(poster, 'cardImage')
    : (CLOUD_NAME ? getVideoPosterUrl(publicId) : '');

  const handleLoadedMetadata = (e) => {
    setIsLoaded(true);
    onLoadedMetadata?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    // Fallback to original src if Cloudinary fails
    if (videoRef.current && videoRef.current.src !== src) {
      videoRef.current.src = src;
    }
    onError?.(e);
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.load();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      src={priority ? cloudinaryUrl : undefined}
      data-src={!priority ? cloudinaryUrl : undefined}
      poster={posterUrl || undefined}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={priority ? 'auto' : 'none'}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onError={handleError}
      style={{
        opacity: isLoaded || priority ? 1 : 0,
        transition: 'opacity 0.3s ease',
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * CloudinaryBackgroundVideo Component
 * 
 * Full-screen background video with overlay support
 */
export function CloudinaryBackgroundVideo({
  src,
  transformation = 'heroVideo',
  className = '',
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  children,
  style = {},
  videoStyle = {},
  ...props
}) {
  const cloudinaryUrl = getMediaUrl(src, transformation);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <video
        src={cloudinaryUrl}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: 0,
          ...videoStyle,
        }}
        {...props}
      />
      {overlayColor && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            zIndex: 1,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}