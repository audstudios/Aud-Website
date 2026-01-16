'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './aboutcontent.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutContent() {
  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const madelineBioRef = useRef(null);
  const sydBioRef = useRef(null);

  useEffect(() => {
    // Animate main content on load
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        para1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        para2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

    // Animate bios on scroll
    gsap.fromTo(
      madelineBioRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: madelineBioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      sydBioRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sydBioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div className="about-content-container">
      <div className="about-content-wrapper">
        <h1 className="about-content-title page-title" ref={titleRef}>
          About
        </h1>
        <p className="about-content-paragraph" ref={para1Ref}>
          For the past decade we've partnered with some of the world's most iconic brands,
          working side by side as collaborators and friends. Along the way, we reimagined how
          production and strategy could work, more agile, intentional, and dynamic.
        </p>
        <p className="about-content-paragraph" ref={para2Ref}>
          So we created <span className="bolded">aud studios</span>: a founder-led creative
          strategy and production agency built for those who want to work directly with the
          people doing the work.
        </p>

        {/* Madeline Bio */}
        <div className="about-bio-section" ref={madelineBioRef} style={{ opacity: 0 }}>
          <div className="about-bio-image">
            <img
              src="/images/about/AUD_AboutMaddie01.jpg"
              alt="Madeline Corley"
            />
          </div>
          <div className="about-bio-content">
            <h2 className="about-bio-name">Madeline Corley</h2>
            <p className="about-bio-text">
              Madeline Corley is a producer and marketing strategist who bridges vision and execution, aligning creative and strategy teams to bring ideas to life.
            </p>
            <p className="about-bio-text">
              With experience across commercial, social, and celebrity experiential production, Madeline has led everything from social stunts to large-scale campaigns— including spots for the Super Bowl, NYFW, and 3D and anamorphic productions featured in Times Square. She integrates seamlessly into teams, executing with clarity, perspective, and a premium production sensibility.
            </p>
            <p className="about-bio-text">
              Outside of the studio, you'll find her singing in an NYC choir, planning her next trip, or enjoying theatre.
            </p>
          </div>
        </div>

        {/* Syd Bio */}
        <div className="about-bio-section" ref={sydBioRef} style={{ opacity: 0 }}>
          <div className="about-bio-image">
            <img
              src="/images/about/AUD_AboutSyd01.jpg"
              alt="Syd Ross"
            />
          </div>
          <div className="about-bio-content">
            <h2 className="about-bio-name">Syd Ross</h2>
            <p className="about-bio-text">
              Syd Ross is an NYC-based Creative Producer and writer whose work spans commercial,
              digital, and studio projects. She blends narrative thinking and creative vision
              with hands-on producing, and her work has been featured in WWD, USA Today, and Ad
              Age.
            </p>
            <p className="about-bio-text">
              Originally from Canton, Georgia, Syd earned her MFA in Emerging Media from the
              University of Georgia's New Media Institute. She was an artist in residence at
              Ilahela Art Residency in Summer 2025.
            </p>
            <p className="about-bio-text">
              Day to day, she enjoys playing basketball, meeting new people, reading and
              traveling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}