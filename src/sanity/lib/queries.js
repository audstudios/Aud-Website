// src/lib/sanity/queries.js
// GROQ queries for fetching data from Sanity

import { groq } from 'next-sanity';

// ============================================
// PROJECT QUERIES
// ============================================

// Get all published projects for the Work page
export const allProjectsQuery = groq`
  *[_type == "project" && isPublished == true] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    projectType,
    year,
    layout,
    workPageSubtitle,
    workPageImageUrl,
    displayOrder
  }
`;

// Get a single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    projectType,
    year,
    layout,
    
    // Hero Section
    heroVideoUrl,
    heroVideoUrls,
    fullVideoUrl,
    showWatchButton,
    
    // Content
    mainline,
    contentParagraphs,
    
    // Media
    mainImageUrls,
    subImageUrls,
    brandLogoUrl,
    
    // Work Page
    workPageImageUrl,
    workPageSubtitle
  }
`;

// Get project paths for static generation
export const projectPathsQuery = groq`
  *[_type == "project" && isPublished == true] {
    "slug": slug.current
  }
`;

// ============================================
// HOME SLIDER QUERIES
// ============================================

// Get projects marked for home slider
export const homeSliderProjectsQuery = groq`
  *[_type == "project" && showOnHomeSlider == true && isPublished == true] | order(homeSliderOrder asc) {
    _id,
    title,
    "slug": slug.current,
    homeSliderDisplayTitle,
    homeSliderVideoUrl,
    homeSliderBackgroundUrl,
    homeSliderTitleClass
  }
`;

// ============================================
// WORK PAGE QUERIES
// ============================================

// Get all projects for work page
export const workPageProjectsQuery = groq`
  *[_type == "project" && isPublished == true] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    projectType,
    year,
    workPageImageUrl,
    workPageSubtitle
  }
`;

// ============================================
// CLIENT LOGOS QUERIES
// ============================================

// Get all active client logos for carousel
export const clientLogosQuery = groq`
  *[_type == "clientLogo" && isActive == true] | order(displayOrder asc) {
    _id,
    clientName,
    logoUrl,
    displayOrder
  }
`;

// ============================================
// SITE SETTINGS QUERIES
// ============================================

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    tagline,
    contactEmail,
    instagramUrl,
    instagramHandle,
    linkedinUrl,
    footerTagline1,
    footerTagline2
  }
`;