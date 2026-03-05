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
    displayTitle,
    "video": video {
      public_id,
      secure_url,
      resource_type,
      format
    },
    "backgroundImage": backgroundImage {
      public_id,
      secure_url,
      resource_type,
      format
    },
    projectLink,
    titleClass,
    displayOrder
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    introParagraph1,
    introParagraph2,
    "introImages": introImages[] {
      public_id,
      secure_url,
      resource_type,
      format
    },
    madelineName,
    "madelinePhoto": madelinePhoto {
      public_id,
      secure_url,
      resource_type,
      format
    },
    madelineBio,
    sydName,
    "sydPhoto": sydPhoto {
      public_id,
      secure_url,
      resource_type,
      format
    },
    sydBio,
    "galleryImages": galleryImages[] {
      public_id,
      secure_url,
      resource_type,
      format
    }
  }
`;