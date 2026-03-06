// src/sanity/lib/queries.js

import { groq } from 'next-sanity';

export const workPageProjectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    projectType,
    year,
    workPageSubtitle,
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
    "heroVideo": heroVideo {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    "heroVideos": heroVideos[] {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    "fullVideo": fullVideo {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    "mainImages": mainImages[] {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
    "subImages": subImages[] {
      public_id,
      secure_url,
      resource_type,
      format,
      width,
      height
    },
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

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const homeSliderQuery = groq`
  *[_type == "homeSlider" && isActive == true] | order(displayOrder asc) {
    "displayTitle": coalesce(displayTitle, project->title),
    "video": coalesce(video, project->heroVideo) {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "backgroundImage": coalesce(backgroundImage, project->workPageImage) {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "projectLink": "/work/projects/" + project->slug.current,
    titleClass,
    displayOrder
  }
`;

// About page query - matches standalone studio schema (aboutPage.js)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    pageTitle,
    introParagraph1,
    introParagraph2,
    "introImage1": introImage1 {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "introImage2": introImage2 {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "introImage3": introImage3 {
      public_id,
      secure_url,
      resource_type,
      format
    },
    madelineName,
    madelineBio1,
    madelineBio2,
    madelineBio3,
    "madelineImage": madelineImage {
      public_id,
      secure_url,
      resource_type,
      format
    },
    sydName,
    sydBio1,
    sydBio2,
    sydBio3,
    "sydImage": sydImage {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "galleryImage1": galleryImage1 {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "galleryImage2": galleryImage2 {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "galleryImage3": galleryImage3 {
      public_id,
      secure_url,
      resource_type,
      format
    }
  }
`;

// Contact section CTA query
export const contactSectionQuery = groq`
  *[_type == "contactSection"][0] {
    subtitle,
    heading,
    buttonText
  }
`;

// Home hero query
export const homeHeroQuery = groq`
  *[_type == "homeHero"][0] {
    "backgroundVideo": backgroundVideo {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "logo": logo {
      public_id,
      secure_url,
      resource_type,
      format
    }
  }
`;