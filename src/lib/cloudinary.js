// src/lib/cloudinary.js
// Cloudinary configuration and utility functions
// Works with both local paths AND Sanity Cloudinary assets

/**
 * Cloudinary Configuration
 * 
 * Environment variables needed in .env.local:
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
 */

export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'din7i5lsw';

export const CLOUDINARY_BASE_URL = CLOUD_NAME 
  ? `https://res.cloudinary.com/${CLOUD_NAME}` 
  : '';

/**
 * Default transformations for different asset types
 */
export const TRANSFORMATIONS = {
  heroVideo: 'f_auto,q_auto:best',
  thumbnailVideo: 'f_auto,q_auto:good,w_750',
  sliderVideo: 'f_auto,q_auto:good,w_800',
  fullImage: 'f_auto,q_auto:best',
  cardImage: 'f_auto,q_auto:good,w_600,c_fill',
  logo: 'f_auto,q_auto:best',
  blurredBackground: 'f_auto,q_auto:good,e_blur:1000',
  responsive: 'f_auto,q_auto,w_auto,c_scale',
  aboutImage: 'f_auto,q_auto:good,w_800,c_fill',
};

/**
 * Path mappings for local paths to Cloudinary
 */
const PATH_MAPPINGS = [
  { from: 'images/RizzlerHardees', to: 'aud-studios/projects/rizzler-hardees' },
  { from: 'images/JPG', to: 'aud-studios/projects/jean-paul-gaultier' },
  { from: 'images/CardiBDoorDash', to: 'aud-studios/projects/cardi-doordash' },
  { from: 'images/flav', to: 'aud-studios/projects/flav' },
  { from: 'images/logos', to: 'aud-studios/logos' },
  { from: 'images/about', to: 'aud-studios/about' },
  { from: 'images/homeblur', to: 'aud-studios/home/slider-backgrounds' },
  { from: 'images/work', to: 'aud-studios/work' },
  { from: 'images/global', to: 'aud-studios/global' },
  { from: 'images/projectcard', to: 'aud-studios/work/cards' },
  { from: 'videos', to: 'aud-studios/videos' },
  { from: 'icons', to: 'aud-studios/icons' },
  { from: 'images', to: 'aud-studios/images' },
];

/**
 * Convert local asset path to Cloudinary public ID
 */
export function localPathToCloudinaryId(localPath) {
  if (!localPath) return '';
  
  let path = localPath.replace(/^\//, '');
  
  for (const mapping of PATH_MAPPINGS) {
    if (path.startsWith(mapping.from + '/')) {
      path = path.replace(mapping.from, mapping.to);
      break;
    }
  }

  return path;
}

/**
 * Generate Cloudinary URL for an image
 */
export function getCloudinaryImageUrl(publicId, transformation = 'fullImage') {
  if (!CLOUD_NAME) return publicId;
  const trans = TRANSFORMATIONS[transformation] || transformation;
  return `${CLOUDINARY_BASE_URL}/image/upload/${trans}/${publicId}`;
}

/**
 * Generate Cloudinary URL for a video
 */
export function getCloudinaryVideoUrl(publicId, transformation = 'heroVideo') {
  if (!CLOUD_NAME) return publicId;
  const trans = TRANSFORMATIONS[transformation] || transformation;
  return `${CLOUDINARY_BASE_URL}/video/upload/${trans}/${publicId}`;
}

/**
 * Get URL from a Sanity Cloudinary asset with transformations applied
 * 
 * Sanity Cloudinary assets look like:
 * {
 *   public_id: 'aud-studios/projects/jpig/video.mp4',
 *   secure_url: 'https://res.cloudinary.com/.../video.mp4',
 *   resource_type: 'video' | 'image',
 *   format: 'mp4' | 'jpg' | etc,
 *   width: 1920,
 *   height: 1080
 * }
 * 
 * @param {Object} asset - Cloudinary asset object from Sanity
 * @param {string} transformation - Transformation preset
 * @returns {string} Optimized Cloudinary URL
 */
export function getCloudinaryAssetUrl(asset, transformation) {
  if (!asset) return '';
  
  // If it's already a string URL, process it
  if (typeof asset === 'string') {
    return getMediaUrl(asset, transformation);
  }
  
  // If we have public_id, build optimized URL with transformations
  if (asset.public_id) {
    const isVideo = asset.resource_type === 'video';
    const defaultTrans = isVideo ? 'heroVideo' : 'fullImage';
    const trans = TRANSFORMATIONS[transformation] || TRANSFORMATIONS[defaultTrans];
    const resourceType = isVideo ? 'video' : 'image';
    
    return `${CLOUDINARY_BASE_URL}/${resourceType}/upload/${trans}/${asset.public_id}`;
  }
  
  // Fallback to secure_url if available (no transformations)
  if (asset.secure_url) {
    return asset.secure_url;
  }
  
  return '';
}

/**
 * Process an array of Sanity Cloudinary assets
 * 
 * @param {Array} assets - Array of Cloudinary asset objects
 * @param {string} transformation - Transformation preset
 * @returns {string[]} Array of optimized URLs
 */
export function getCloudinaryAssetUrls(assets, transformation) {
  if (!assets || !Array.isArray(assets)) return [];
  return assets.map(asset => getCloudinaryAssetUrl(asset, transformation));
}

/**
 * Media URL helper - works with:
 * 1. Local paths: /images/JPG/video.mp4
 * 2. Full Cloudinary URLs: https://res.cloudinary.com/...
 * 3. External URLs: returns as-is
 * 
 * @param {string} path - Local path or URL
 * @param {string} transformation - Optional transformation preset
 * @returns {string} Cloudinary URL with transformations
 */
export function getMediaUrl(path, transformation) {
  if (!path) return '';
  
  // Check if it's already a Cloudinary URL
  const cloudinaryRegex = /^https?:\/\/res\.cloudinary\.com\/([^\/]+)\/(image|video)\/upload\/(.+)$/;
  const match = path.match(cloudinaryRegex);
  
  if (match) {
    const [, cloudName, resourceType, rest] = match;
    const isVideo = resourceType === 'video';
    const trans = TRANSFORMATIONS[transformation] || transformation || (isVideo ? TRANSFORMATIONS.heroVideo : TRANSFORMATIONS.fullImage);
    
    // Find where public_id starts (after any existing transformations)
    const parts = rest.split('/');
    let publicIdStartIndex = 0;
    
    for (let i = 0; i < parts.length; i++) {
      const isTransformation = /^(f_|q_|w_|h_|c_|e_|g_|so_|ar_|dpr_|fl_)/.test(parts[i]) || 
                               parts[i].includes(',');
      if (!isTransformation) {
        publicIdStartIndex = i;
        break;
      }
    }
    
    const publicId = parts.slice(publicIdStartIndex).join('/');
    return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${trans}/${publicId}`;
  }
  
  // Other external URLs - return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Local path - transform to Cloudinary
  if (!CLOUD_NAME) return path;

  const publicId = localPathToCloudinaryId(path);
  const isVideo = /\.(mp4|webm|mov)$/i.test(path);

  if (isVideo) {
    return getCloudinaryVideoUrl(publicId, transformation || 'heroVideo');
  }
  
  return getCloudinaryImageUrl(publicId, transformation || 'fullImage');
}

/**
 * Responsive image srcset
 */
export function getCloudinaryImageSrcSet(publicId, widths = [400, 800, 1200, 1600, 2000]) {
  if (!CLOUD_NAME) return '';
  
  return widths
    .map(w => `${CLOUDINARY_BASE_URL}/image/upload/f_auto,q_auto,w_${w},c_scale/${publicId} ${w}w`)
    .join(', ');
}

export default {
  cloudName: CLOUD_NAME,
  baseUrl: CLOUDINARY_BASE_URL,
  transformations: TRANSFORMATIONS,
  getImageUrl: getCloudinaryImageUrl,
  getVideoUrl: getCloudinaryVideoUrl,
  getMediaUrl,
  getCloudinaryAssetUrl,
  getCloudinaryAssetUrls,
  localPathToCloudinaryId,
};