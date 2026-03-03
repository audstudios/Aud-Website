// src/hooks/useCloudinaryMedia.js
// Custom hook for Cloudinary media management

'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  getMediaUrl, 
  getCloudinaryImageUrl, 
  getCloudinaryVideoUrl,
  localPathToCloudinaryId,
  CLOUD_NAME 
} from '@/lib/cloudinary';

/**
 * useCloudinaryMedia Hook
 * 
 * Provides optimized media URLs and loading states
 * 
 * @param {string} src - Local path or Cloudinary public ID
 * @param {Object} options - Configuration options
 * @returns {Object} Media URL, loading state, and error state
 */
export function useCloudinaryMedia(src, options = {}) {
  const {
    transformation = 'fullImage',
    type = 'auto', // 'auto', 'image', 'video'
  } = options;

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Determine media type
  const mediaType = useMemo(() => {
    if (type !== 'auto') return type;
    return /\.(mp4|webm|mov)$/i.test(src) ? 'video' : 'image';
  }, [src, type]);

  // Generate URL
  const url = useMemo(() => {
    if (!src) return '';
    return getMediaUrl(src, transformation);
  }, [src, transformation]);

  // Preload image
  useEffect(() => {
    if (!url || mediaType !== 'image') return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = (e) => setError(e);
    img.src = url;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url, mediaType]);

  return {
    url,
    isLoaded,
    error,
    isConfigured: !!CLOUD_NAME,
    publicId: localPathToCloudinaryId(src),
    mediaType,
  };
}

/**
 * useCloudinaryImages Hook
 * 
 * Batch process multiple images
 * 
 * @param {string[]} sources - Array of local paths
 * @param {string} transformation - Transformation preset
 * @returns {Object} Array of URLs and loading states
 */
export function useCloudinaryImages(sources = [], transformation = 'fullImage') {
  const urls = useMemo(() => {
    return sources.map(src => ({
      original: src,
      cloudinary: getMediaUrl(src, transformation),
      publicId: localPathToCloudinaryId(src),
    }));
  }, [sources, transformation]);

  return {
    urls,
    isConfigured: !!CLOUD_NAME,
  };
}

/**
 * useResponsiveCloudinaryImage Hook
 * 
 * Returns srcset and sizes for responsive images
 * 
 * @param {string} src - Local path or Cloudinary public ID
 * @param {Object} options - Configuration options
 * @returns {Object} src, srcset, and sizes attributes
 */
export function useResponsiveCloudinaryImage(src, options = {}) {
  const {
    widths = [400, 800, 1200, 1600, 2000],
    sizes = '100vw',
    transformation = 'responsive',
  } = options;

  const publicId = localPathToCloudinaryId(src);

  const srcSet = useMemo(() => {
    if (!CLOUD_NAME) return '';
    
    return widths
      .map(w => {
        const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${w},c_scale/${publicId}`;
        return `${url} ${w}w`;
      })
      .join(', ');
  }, [publicId, widths]);

  const defaultSrc = useMemo(() => {
    return getMediaUrl(src, transformation);
  }, [src, transformation]);

  return {
    src: defaultSrc,
    srcSet,
    sizes,
    isConfigured: !!CLOUD_NAME,
  };
}

export default useCloudinaryMedia;