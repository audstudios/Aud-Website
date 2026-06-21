import AboutPageClient from './AboutPageClient';
import { sanityFetch } from '@/sanity/lib/client';
import { aboutPageQuery } from '@/sanity/lib/queries';
import { getCloudinaryAssetUrl, getMediaUrl } from '@/lib/cloudinary';
import { aboutImages } from '@/data/projects';

export const metadata = {
  title: 'About | Aud Studios',
  description: 'Meet the founders of Aud Studios — a founder-led creative strategy and production agency based in NYC.',
};

const FALLBACK = {
  pageTitle: 'About',
  introParagraph1:
    "For the past decade we've partnered with some of the world's most iconic brands, working side by side as collaborators and friends. Along the way, we reimagined how production and strategy could work, more agile, intentional, and dynamic.",
  introParagraph2:
    'So we created aud studios: a founder-led creative strategy and production agency built for those who want to work directly with the people doing the work.',
  introImages: aboutImages.intro.map((src) => getMediaUrl(src, 'aboutImage')),
  madelineName: 'Madeline Corley',
  madelineBio1:
    'Madeline Corley is a producer and marketing strategist who bridges vision and execution, aligning creative and strategy teams to bring ideas to life.',
  madelineBio2:
    'With experience across commercial, social, and celebrity experiential production, Madeline has led everything from social stunts to large-scale campaigns— including spots for the Super Bowl, NYFW, and 3D and anamorphic productions featured in Times Square. She integrates seamlessly into teams, executing with clarity, perspective, and a premium production sensibility.',
  madelineBio3:
    'Outside of the studio, you’ll find her singing in an NYC choir, planning her next trip, or enjoying theatre.',
  madelineImage: getMediaUrl(aboutImages.madeline, 'aboutImage'),
  sydName: 'Syd Ross',
  sydBio1:
    'Syd Ross is an NYC-based Creative Producer and writer whose work spans commercial, digital, and studio projects. She blends narrative thinking and creative vision with hands-on producing, and her work has been featured in WWD, USA Today, and Ad Age.',
  sydBio2:
    "Originally from Canton, Georgia, Syd earned her MFA in Emerging Media from the University of Georgia’s New Media Institute. She was an artist in residence at Ilahela Art Residency in Summer 2025.",
  sydBio3:
    'Day to day, she enjoys playing basketball, meeting new people, reading and traveling.',
  sydImage: getMediaUrl(aboutImages.syd, 'aboutImage'),
  galleryImages: aboutImages.gallery.map((src) => getMediaUrl(src, 'aboutImage')),
};

export default async function AboutPage() {
  const sanityData = await sanityFetch({ query: aboutPageQuery, tags: ['about'] });

  let data = FALLBACK;

  if (sanityData) {
    data = {
      pageTitle: sanityData.pageTitle || FALLBACK.pageTitle,
      introParagraph1: sanityData.introParagraph1 || FALLBACK.introParagraph1,
      introParagraph2: sanityData.introParagraph2 || FALLBACK.introParagraph2,
      introImages: [
        getCloudinaryAssetUrl(sanityData.introImage1, 'aboutImage') || FALLBACK.introImages[0],
        getCloudinaryAssetUrl(sanityData.introImage2, 'aboutImage') || FALLBACK.introImages[1],
        getCloudinaryAssetUrl(sanityData.introImage3, 'aboutImage') || FALLBACK.introImages[2],
      ],
      madelineName: sanityData.madelineName || FALLBACK.madelineName,
      madelineBio1: sanityData.madelineBio1 || FALLBACK.madelineBio1,
      madelineBio2: sanityData.madelineBio2 || FALLBACK.madelineBio2,
      madelineBio3: sanityData.madelineBio3 || FALLBACK.madelineBio3,
      madelineImage: getCloudinaryAssetUrl(sanityData.madelineImage, 'aboutImage') || FALLBACK.madelineImage,
      sydName: sanityData.sydName || FALLBACK.sydName,
      sydBio1: sanityData.sydBio1 || FALLBACK.sydBio1,
      sydBio2: sanityData.sydBio2 || FALLBACK.sydBio2,
      sydBio3: sanityData.sydBio3 || FALLBACK.sydBio3,
      sydImage: getCloudinaryAssetUrl(sanityData.sydImage, 'aboutImage') || FALLBACK.sydImage,
      galleryImages: [
        getCloudinaryAssetUrl(sanityData.galleryImage1, 'aboutImage') || FALLBACK.galleryImages[0],
        getCloudinaryAssetUrl(sanityData.galleryImage2, 'aboutImage') || FALLBACK.galleryImages[1],
        getCloudinaryAssetUrl(sanityData.galleryImage3, 'aboutImage') || FALLBACK.galleryImages[2],
      ],
    };
  }

  return <AboutPageClient data={data} />;
}
