// src/components/about/aboutcontent/page.js
// Updated to fetch from Sanity with hardcoded fallbacks

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import './aboutcontent.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutContentIntegrated({ data }) {
  const titleRef = useRef(null);
  const introTextRefs = useRef([]);
  const introImageRefs = useRef([]);
  const madelineBioRef = useRef(null);
  const sydBioRef = useRef(null);
  const galleryImageRefs = useRef([]);

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
                <Image
                  src={src}
                  alt={`Aud Studios team ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Madeline Bio */}
        <div className="about-bio-section" ref={madelineBioRef}>
          <div className="about-bio-image">
            <Image src={data.madelineImage} alt={data.madelineName} fill sizes="(max-width: 768px) 100vw, 40vw" />
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
            <Image
              className="syd-mobile-img-position"
              src={data.sydImage}
              alt={data.sydName}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
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
              <Image
                src={src}
                alt={`Studio image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}