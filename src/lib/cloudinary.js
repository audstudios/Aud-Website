// src/lib/cloudinary.js
// Cloudinary configuration and utility functions for Aud Studios

/**
 * Cloudinary Configuration
 * 
 * Environment variables needed in .env.local:
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
 */

// Cloud name from environment
export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Base URL for Cloudinary assets
export const CLOUDINARY_BASE_URL = CLOUD_NAME 
  ? `https://res.cloudinary.com/${CLOUD_NAME}` 
  : '';

/**
 * Default transformations for different asset types
 */
export const TRANSFORMATIONS = {
  // Hero videos - high quality, auto format
  heroVideo: 'f_auto,q_auto:best',
  
  // Thumbnail videos - lower quality for faster loading
  thumbnailVideo: 'f_auto,q_auto:good,w_750',
  
  // Slider videos - optimized for background playback
  sliderVideo: 'f_auto,q_auto:good,w_800',
  
  // Full screen images
  fullImage: 'f_auto,q_auto:best',
  
  // Card/thumbnail images
  cardImage: 'f_auto,q_auto:good,w_600,c_fill',
  
  // Logo images - preserve quality
  logo: 'f_auto,q_auto:best',
  
  // Blurred backgrounds
  blurredBackground: 'f_auto,q_auto:good,e_blur:1000',
  
  // Responsive images with automatic sizing
  responsive: 'f_auto,q_auto,w_auto,c_scale',
  
  // About page images
  aboutImage: 'f_auto,q_auto:good,w_800,c_fill',
};

/**
 * Path mappings - MUST match the upload script mappings!
 * Maps local paths to Cloudinary folder structure
 * Order matters - more specific paths first!
 */
const PATH_MAPPINGS = [
  // Project folders
  { from: 'images/RizzlerHardees', to: 'aud-studios/projects/rizzler-hardees' },
  { from: 'images/JPG', to: 'aud-studios/projects/jean-paul-gaultier' },
  { from: 'images/CardiBDoorDash', to: 'aud-studios/projects/cardi-doordash' },
  { from: 'images/flav', to: 'aud-studios/projects/flav' },
  
  // Other specific folders
  { from: 'images/logos', to: 'aud-studios/logos' },
  { from: 'images/about', to: 'aud-studios/about' },
  { from: 'images/homeblur', to: 'aud-studios/home/slider-backgrounds' },
  { from: 'images/work', to: 'aud-studios/work' },
  { from: 'images/global', to: 'aud-studios/global' },
  { from: 'images/projectcard', to: 'aud-studios/work/cards' },
  
  // Videos and icons
  { from: 'videos', to: 'aud-studios/videos' },
  { from: 'icons', to: 'aud-studios/icons' },
  
  // Catch-all for other images (must be last)
  { from: 'images', to: 'aud-studios/images' },
];

/**
 * Convert local asset path to Cloudinary public ID
 * 
 * Examples:
 * /images/logos/CarouselLogo_png-09.png -> aud-studios/logos/CarouselLogo_png-09.png
 * /images/RizzlerHardees/RizzlerHardees.mp4 -> aud-studios/projects/rizzler-hardees/RizzlerHardees.mp4
 * /images/homeblur/rizzlerhomebg.jpg -> aud-studios/home/slider-backgrounds/rizzlerhomebg.jpg
 * /videos/Aud_Land_Video.mp4 -> aud-studios/videos/Aud_Land_Video.mp4
 * 
 * @param {string} localPath - Local path (e.g., "/images/logos/CarouselLogo_png-09.png")
 * @returns {string} Cloudinary public ID
 */
export function localPathToCloudinaryId(localPath) {
  if (!localPath) return '';
  
  // Remove leading slash
  let path = localPath.replace(/^\//, '');
  
  // Find matching path mapping (first match wins, so order matters)
  for (const mapping of PATH_MAPPINGS) {
    if (path.startsWith(mapping.from + '/')) {
      // Replace the matched prefix with the Cloudinary folder
      path = path.replace(mapping.from, mapping.to);
      break;
    }
  }

  return path;
}

/**
 * Generate Cloudinary URL for an image
 * @param {string} publicId - The public ID of the asset in Cloudinary (with extension)
 * @param {string} transformation - Transformation string or key from TRANSFORMATIONS
 * @returns {string} Full Cloudinary URL
 */
export function getCloudinaryImageUrl(publicId, transformation = 'fullImage') {
  if (!CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured');
    return publicId;
  }

  const trans = TRANSFORMATIONS[transformation] || transformation;
  return `${CLOUDINARY_BASE_URL}/image/upload/${trans}/${publicId}`;
}

/**
 * Generate Cloudinary URL for a video
 * @param {string} publicId - The public ID of the video in Cloudinary (with extension)
 * @param {string} transformation - Transformation string or key from TRANSFORMATIONS
 * @returns {string} Full Cloudinary URL
 */
export function getCloudinaryVideoUrl(publicId, transformation = 'heroVideo') {
  if (!CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured');
    return publicId;
  }

  const trans = TRANSFORMATIONS[transformation] || transformation;
  return `${CLOUDINARY_BASE_URL}/video/upload/${trans}/${publicId}`;
}

/**
 * Generate responsive image srcset for Cloudinary
 * @param {string} publicId - The public ID of the image
 * @param {number[]} widths - Array of widths for srcset
 * @returns {string} srcset string
 */
export function getCloudinaryImageSrcSet(publicId, widths = [400, 800, 1200, 1600, 2000]) {
  if (!CLOUD_NAME) return '';
  
  return widths
    .map(w => `${CLOUDINARY_BASE_URL}/image/upload/f_auto,q_auto,w_${w},c_scale/${publicId} ${w}w`)
    .join(', ');
}

/**
 * Generate video poster image URL from video
 * @param {string} videoPublicId - The public ID of the video
 * @returns {string} Poster image URL
 */
export function getVideoPosterUrl(videoPublicId) {
  if (!CLOUD_NAME) return '';
  
  // For video poster, we use so_0 to get the first frame
  // Replace .mp4 etc with .jpg
  const posterPublicId = videoPublicId.replace(/\.(mp4|webm|mov)$/i, '.jpg');
  return `${CLOUDINARY_BASE_URL}/video/upload/f_auto,q_auto,so_0/${posterPublicId}`;
}

/**
 * Media asset helper - determines if path is image or video and returns appropriate URL
 * @param {string} localPath - Local asset path
 * @param {string} transformation - Optional transformation
 * @returns {string} Cloudinary URL or original path if not configured
 */
export function getMediaUrl(localPath, transformation) {
  if (!localPath) return '';
  
  // If Cloudinary is not configured, return local path
  if (!CLOUD_NAME) {
    return localPath;
  }

  const publicId = localPathToCloudinaryId(localPath);
  const isVideo = /\.(mp4|webm|mov)$/i.test(localPath);

  if (isVideo) {
    return getCloudinaryVideoUrl(publicId, transformation || 'heroVideo');
  }
  
  return getCloudinaryImageUrl(publicId, transformation || 'fullImage');
}

/**
 * Batch convert an array of local paths to Cloudinary URLs
 * @param {string[]} paths - Array of local paths
 * @param {string} transformation - Transformation to apply
 * @returns {string[]} Array of Cloudinary URLs
 */
export function batchConvertToCloudinary(paths, transformation) {
  if (!Array.isArray(paths)) return [];
  return paths.map(path => getMediaUrl(path, transformation));
}

// Export default configuration
export default {
  cloudName: CLOUD_NAME,
  baseUrl: CLOUDINARY_BASE_URL,
  transformations: TRANSFORMATIONS,
  getImageUrl: getCloudinaryImageUrl,
  getVideoUrl: getCloudinaryVideoUrl,
  getMediaUrl,
  localPathToCloudinaryId,
};