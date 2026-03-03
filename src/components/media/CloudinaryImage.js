// src/components/media/CloudinaryImage.js
// Optimized image component using Cloudinary

'use client';

import { useState } from 'react';
import { getMediaUrl, getCloudinaryImageSrcSet, localPathToCloudinaryId, CLOUD_NAME } from '@/lib/cloudinary';

/**
 * CloudinaryImage Component
 * 
 * Renders optimized images from Cloudinary with:
 * - Automatic format selection (WebP, AVIF, etc.)
 * - Responsive srcset generation
 * - Lazy loading
 * - Blur placeholder support
 * - Fallback to local images if Cloudinary not configured
 * 
 * @param {Object} props
 * @param {string} props.src - Local path or Cloudinary public ID
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS classes
 * @param {string} props.transformation - Cloudinary transformation preset
 * @param {number[]} props.widths - Widths for srcset
 * @param {string} props.sizes - Sizes attribute for responsive images
 * @param {boolean} props.priority - Load immediately (above the fold)
 * @param {string} props.objectFit - CSS object-fit value
 * @param {Function} props.onLoad - Callback when image loads
 * @param {Function} props.onError - Callback on error
 */
export default function CloudinaryImage({
  src,
  alt,
  className = '',
  transformation = 'fullImage',
  widths = [400, 800, 1200, 1600],
  sizes = '100vw',
  priority = false,
  objectFit = 'cover',
  style = {},
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate URLs
  const cloudinaryUrl = getMediaUrl(src, transformation);
  const publicId = localPathToCloudinaryId(src);
  const srcSet = CLOUD_NAME ? getCloudinaryImageSrcSet(publicId, widths) : '';

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    // Fallback to original src if Cloudinary fails
    if (e.target.src !== src) {
      e.target.src = src;
    }
    onError?.(e);
  };

  return (
    <img
      src={cloudinaryUrl}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        objectFit,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * CloudinaryBackgroundImage Component
 * 
 * For background images using CSS background-image
 */
export function CloudinaryBackgroundImage({
  src,
  transformation = 'fullImage',
  className = '',
  children,
  style = {},
  ...props
}) {
  const cloudinaryUrl = getMediaUrl(src, transformation);

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${cloudinaryUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}