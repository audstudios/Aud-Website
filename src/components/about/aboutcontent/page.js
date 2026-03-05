// src/components/about/aboutcontent/page.js
// Updated to fetch from Sanity with hardcoded fallbacks

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMediaUrl, getCloudinaryAssetUrl } from '@/lib/cloudinary';
import { aboutImages } from '@/data/projects';
import { client } from '@/sanity/lib/client';
import { aboutPageQuery } from '@/sanity/lib/queries';
import './aboutcontent.css';

gsap.registerPlugin(ScrollTrigger);

// Hardcoded fallback data (current content)
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
    'With experience across commercial, social, and celebrity experiential production, Madeline has led everything from social stunts to large-scale campaigns\u2014 including spots for the Super Bowl, NYFW, and 3D and anamorphic productions featured in Times Square. She integrates seamlessly into teams, executing with clarity, perspective, and a premium production sensibility.',
  madelineBio3:
    'Outside of the studio, you\u2019ll find her singing in an NYC choir, planning her next trip, or enjoying theatre.',
  madelineImage: getMediaUrl(aboutImages.madeline, 'aboutImage'),
  sydName: 'Syd Ross',
  sydBio1:
    'Syd Ross is an NYC-based Creative Producer and writer whose work spans commercial, digital, and studio projects. She blends narrative thinking and creative vision with hands-on producing, and her work has been featured in WWD, USA Today, and Ad Age.',
  sydBio2:
    "Originally from Canton, Georgia, Syd earned her MFA in Emerging Media from the University of Georgia\u2019s New Media Institute. She was an artist in residence at Ilahela Art Residency in Summer 2025.",
  sydBio3:
    'Day to day, she enjoys playing basketball, meeting new people, reading and traveling.',
  sydImage: getMediaUrl(aboutImages.syd, 'aboutImage'),
  galleryImages: aboutImages.gallery.map((src) => getMediaUrl(src, 'aboutImage')),
};

export default function AboutContentIntegrated() {
  const [data, setData] = useState(null);
  const titleRef = useRef(null);
  const introTextRefs = useRef([]);
  const introImageRefs = useRef([]);
  const madelineBioRef = useRef(null);
  const sydBioRef = useRef(null);
  const galleryImageRefs = useRef([]);

  // Fetch about page data from Sanity
  useEffect(() => {
    async function fetchAbout() {
      try {
        if (client) {
          const sanityData = await client.fetch(aboutPageQuery);
          if (sanityData) {
            setData({
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
              madelineImage:
                getCloudinaryAssetUrl(sanityData.madelineImage, 'aboutImage') ||
                FALLBACK.madelineImage,
              sydName: sanityData.sydName || FALLBACK.sydName,
              sydBio1: sanityData.sydBio1 || FALLBACK.sydBio1,
              sydBio2: sanityData.sydBio2 || FALLBACK.sydBio2,
              sydBio3: sanityData.sydBio3 || FALLBACK.sydBio3,
              sydImage:
                getCloudinaryAssetUrl(sanityData.sydImage, 'aboutImage') || FALLBACK.sydImage,
              galleryImages: [
                getCloudinaryAssetUrl(sanityData.galleryImage1, 'aboutImage') || FALLBACK.galleryImages[0],
                getCloudinaryAssetUrl(sanityData.galleryImage2, 'aboutImage') || FALLBACK.galleryImages[1],
                getCloudinaryAssetUrl(sanityData.galleryImage3, 'aboutImage') || FALLBACK.galleryImages[2],
              ],
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching about page from Sanity:', error);
      }
      // Use fallback if Sanity fetch fails or returns nothing
      setData(FALLBACK);
    }
    fetchAbout();
  }, []);

  // GSAP animations - run after data loads
  useEffect(() => {
    if (!data) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Intro text paragraphs
    introTextRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3 + index * 0.2, ease: 'power3.out' }
        );
      }
    });

    // Intro images
    introImageRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.5 + index * 0.15, ease: 'power3.out' }
        );
      }
    });

    // Bio sections on scroll
    [madelineBioRef, sydBioRef].forEach((bioRef) => {
      if (bioRef.current) {
        const image = bioRef.current.querySelector('.about-bio-image');
        const content = bioRef.current.querySelector('.about-bio-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          image,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        ).fromTo(
          content,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
          '-=0.7'
        );
      }
    });

    // Gallery images on scroll
    galleryImageRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data]);

  // Don't render until data is ready
  if (!data) return null;

  return (
    <div className="about-content-container">
      <div className="about-content-wrapper">
        {/* Title */}
        <h1 className="about-content-title page-title" ref={titleRef}>
          {data.pageTitle}
        </h1>

        {/* Intro Section with Images */}
        <div className="about-intro-section">
          <div className="about-intro-text">
            <p
              className="about-content-paragraph"
              ref={(el) => (introTextRefs.current[0] = el)}
            >
              {data.introParagraph1}
            </p>
            <p
              className="about-content-paragraph"
              ref={(el) => (introTextRefs.current[1] = el)}
            >
              So we created <span className="bolded">aud studios</span>:{' '}
              {data.introParagraph2.replace(/^So we created aud studios:\s*/i, '')}
            </p>
          </div>

          <div className="about-intro-images">
            {data.introImages.map((src, index) => (
              <div
                key={index}
                className="about-intro-image"
                ref={(el) => (introImageRefs.current[index] = el)}
              >
                <img
                  src={src}
                  alt={`Aud Studios team ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Madeline Bio */}
        <div className="about-bio-section" ref={madelineBioRef}>
          <div className="about-bio-image">
            <img src={data.madelineImage} alt={data.madelineName} />
          </div>
          <div className="about-bio-content">
            <h2 className="about-bio-name">{data.madelineName}</h2>
            <p className="about-bio-text">{data.madelineBio1}</p>
            <p className="about-bio-text">{data.madelineBio2}</p>
            <p className="about-bio-text">{data.madelineBio3}</p>
          </div>
        </div>

        {/* Syd Bio */}
        <div className="about-bio-section" ref={sydBioRef}>
          <div className="about-bio-image">
            <img
              className="syd-mobile-img-position"
              src={data.sydImage}
              alt={data.sydName}
            />
          </div>
          <div className="about-bio-content">
            <h2 className="about-bio-name">{data.sydName}</h2>
            <p className="about-bio-text">{data.sydBio1}</p>
            <p className="about-bio-text">{data.sydBio2}</p>
            <p className="about-bio-text">{data.sydBio3}</p>
          </div>
        </div>

        {/* Bottom Gallery */}
        <div className="about-gallery-section">
          {data.galleryImages.map((src, index) => (
            <div
              key={index}
              className="about-gallery-image"
              ref={(el) => (galleryImageRefs.current[index] = el)}
            >
              <img
                src={src}
                alt={`Studio image ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}