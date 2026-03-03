// src/lib/cloudinary.js
// Cloudinary configuration and utility functions for Aud Studios

/**
 * Cloudinary Configuration
 * 
 * Environment variables needed in .env.local:
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
 * NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key (optional for signed uploads)
 * CLOUDINARY_API_SECRET=your_api_secret (server-side only)
 */

// Cloud name from environment
export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Base URL for Cloudinary assets
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

/**
 * Asset folder structure in Cloudinary:
 * 
 * aud-studios/
 * ├── projects/
 * │   ├── rizzler-hardees/
 * │   │   ├── hero-video.mp4
 * │   │   ├── images/
 * │   │   └── ...
 * │   ├── jean-paul-gaultier/
 * │   ├── cardi-doordash/
 * │   └── flav/
 * ├── logos/
 * │   ├── client-logos/
 * │   └── brand-logos/
 * ├── home/
 * │   ├── hero/
 * │   ├── slider-backgrounds/
 * │   └── ...
 * ├── about/
 * └── global/
 */

// Default transformations for different asset types
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
 * Generate Cloudinary URL for an image
 * @param {string} publicId - The public ID of the asset in Cloudinary
 * @param {string} transformation - Transformation string or key from TRANSFORMATIONS
 * @returns {string} Full Cloudinary URL
 */
export function getCloudinaryImageUrl(publicId, transformation = 'fullImage') {
  if (!CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured');
    return publicId; // Return original path as fallback
  }

  const trans = TRANSFORMATIONS[transformation] || transformation;
  return `${CLOUDINARY_BASE_URL}/image/upload/${trans}/${publicId}`;
}

/**
 * Generate Cloudinary URL for a video
 * @param {string} publicId - The public ID of the video in Cloudinary
 * @param {string} transformation - Transformation string or key from TRANSFORMATIONS
 * @returns {string} Full Cloudinary URL
 */
export function getCloudinaryVideoUrl(publicId, transformation = 'heroVideo') {
  if (!CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured');
    return publicId; // Return original path as fallback
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
 * @param {string} transformation - Additional transformations
 * @returns {string} Poster image URL
 */
export function getVideoPosterUrl(videoPublicId, transformation = '') {
  if (!CLOUD_NAME) return '';
  
  const baseTrans = 'f_auto,q_auto,so_0';
  const trans = transformation ? `${baseTrans},${transformation}` : baseTrans;
  return `${CLOUDINARY_BASE_URL}/video/upload/${trans}/${videoPublicId}.jpg`;
}

/**
 * Convert local asset path to Cloudinary public ID
 * Maps your existing file structure to Cloudinary folder structure
 * 
 * @param {string} localPath - Local path (e.g., "/images/RizzlerHardees/RizzlerHardees_01.jpg")
 * @returns {string} Cloudinary public ID
 */
export function localPathToCloudinaryId(localPath) {
  if (!localPath) return '';
  
  // Remove leading slash and file extension for public ID
  let publicId = localPath.replace(/^\//, '');
  
  // Map common paths to Cloudinary folder structure
  const pathMappings = {
    'images/RizzlerHardees': 'aud-studios/projects/rizzler-hardees',
    'images/JPG': 'aud-studios/projects/jean-paul-gaultier',
    'images/CardiBDoorDash': 'aud-studios/projects/cardi-doordash',
    'images/flav': 'aud-studios/projects/flav',
    'images/logos': 'aud-studios/logos',
    'images/about': 'aud-studios/about',
    'images/homeblur': 'aud-studios/home/slider-backgrounds',
    'images/work': 'aud-studios/work',
    'images/global': 'aud-studios/global',
    'images/projectcard': 'aud-studios/work/cards',
    'videos': 'aud-studios/videos',
    'icons': 'aud-studios/icons',
  };

  // Apply path mappings
  for (const [localPrefix, cloudinaryPrefix] of Object.entries(pathMappings)) {
    if (publicId.startsWith(localPrefix)) {
      publicId = publicId.replace(localPrefix, cloudinaryPrefix);
      break;
    }
  }

  // Remove file extension for Cloudinary (it handles format automatically)
  // Keep extension for videos since we specify format in transformation
  if (!publicId.match(/\.(mp4|webm|mov)$/i)) {
    publicId = publicId.replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '');
  }

  return publicId;
}

/**
 * Media asset helper - determines if path is image or video and returns appropriate URL
 * @param {string} localPath - Local asset path
 * @param {string} transformation - Optional transformation
 * @returns {string} Cloudinary URL
 */
export function getMediaUrl(localPath, transformation) {
  if (!localPath) return '';
  
  // Check if Cloudinary is configured, otherwise return local path
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