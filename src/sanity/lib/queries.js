// src/sanity/lib/queries.js
// Updated queries for Cloudinary asset structure

import { groq } from 'next-sanity';

/**
 * Query for work page - gets all projects with work page image
 * Cloudinary assets have: public_id, secure_url, resource_type, format, etc.
 */
export const workPageProjectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    projectType,
    year,
    workPageSubtitle,
    // Cloudinary asset fields
    "workPageImage": workPageImage {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    }
  }
`;

/**
 * Query for single project by slug
 * Returns all Cloudinary asset data for transformation
 */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    projectType,
    year,
    layout,
    mainline,
    contentParagraphs,
    showWatchButton,
    
    // Hero video - Cloudinary asset
    "heroVideo": heroVideo {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    
    // Multiple hero videos - array of Cloudinary assets
    "heroVideos": heroVideos[] {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    
    // Full video - Cloudinary asset
    "fullVideo": fullVideo {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    
    // Main images - array of Cloudinary assets
    "mainImages": mainImages[] {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    
    // Sub images - array of Cloudinary assets
    "subImages": subImages[] {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    
    // Brand logo - Cloudinary asset
    "brandLogo": brandLogo {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    }
  }
`;

/**
 * Query for all project slugs (for static generation)
 */
export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;