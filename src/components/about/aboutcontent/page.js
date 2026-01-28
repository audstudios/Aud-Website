'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './aboutcontent.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutContentIntegrated() {
  const titleRef = useRef(null);
  const introTextRefs = useRef([]);
  const introImageRefs = useRef([]);
  const madelineBioRef = useRef(null);
  const sydBioRef = useRef(null);
  const galleryImageRefs = useRef([]);

  useEffect(() => {
    // Animate title on load
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Animate intro text paragraphs
    introTextRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3 + index * 0.2,
            ease: 'power3.out',
          }
        );
      }
    });

    // Animate intro images with stagger
    introImageRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.5 + index * 0.15,
            ease: 'power3.out',
          }
        );
      }
    });

    // Animate bios on scroll
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

    // Animate gallery images on scroll
    galleryImageRefs.current.forEach((ref, index) => {
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
  }, []);

  return (
    <div className="about-content-container">
      <div className="about-content-wrapper">
        {/* Title */}
        <h1 className="about-content-title page-title" ref={titleRef}>
          About
        </h1>

        {/* Intro Section with Images */}
        <div className="about-intro-section">
          <div className="about-intro-text">
            <p
              className="about-content-paragraph"
              ref={(el) => (introTextRefs.current[0] = el)}
            >
              For the past decade we've partnered with some of the world's most iconic brands,
              working side by side as collaborators and friends. Along the way, we reimagined how
              production and strategy could work, more agile, intentional, and dynamic.
            </p>
            <p
              className="about-content-paragraph"
              ref={(el) => (introTextRefs.current[1] = el)}
            >
              So we created <span className="bolded">aud studios</span>: a founder-led creative
              strategy and production agency built for those who want to work directly with the
              people doing the work.
            </p>
          </div>

          <div className="about-intro-images">
            <div
              className="about-intro-image"
              ref={(el) => (introImageRefs.current[0] = el)}
            >
              <img src="/images/about/AUD_About02.jpg" alt="Aud Studios team" />
            </div>
            <div
              className="about-intro-image"
              ref={(el) => (introImageRefs.current[1] = el)}
            >
              <img src="/images/about/AUD_About05.jpg" alt="Creative workspace" />
            </div>
            <div
              className="about-intro-image"
              ref={(el) => (introImageRefs.current[2] = el)}
            >
              <img src="/images/about/AUD_About06.jpg" alt="Team collaboration" />
            </div>
          </div>
        </div>



        {/* Madeline Bio */}
        <div className="about-bio-section" ref={madelineBioRef}>
          <div className="about-bio-image">
            <img src="/images/about/AUD_AboutMaddie01.jpg" alt="Madeline Corley" />
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
        <div className="about-bio-section" ref={sydBioRef}>
          <div className="about-bio-image">
            <img className='syd-mobile-img-position' src="/images/about/AUD_AboutSyd01.jpg" alt="Syd Ross" />
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

        {/* Bottom Gallery */}
        <div className="about-gallery-section">
          <div
            className="about-gallery-image"
            ref={(el) => (galleryImageRefs.current[0] = el)}
          >
            <img src="/images/about/AUD_About03.jpg" alt="Studio detail" />
          </div>
          <div
            className="about-gallery-image"
            ref={(el) => (galleryImageRefs.current[1] = el)}
          >
            <img src="/images/about/AUD_About04.jpg" alt="Production setup" />
          </div>
          <div
            className="about-gallery-image"
            ref={(el) => (galleryImageRefs.current[2] = el)}
          >
            <img src="/images/about/AUD_About07.jpg" alt="Team moment" />
          </div>
        </div>
      </div>
    </div>
  );
}