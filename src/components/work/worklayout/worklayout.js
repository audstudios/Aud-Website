// src/components/work/worklayout/worklayout.js
// Updated to handle Cloudinary assets from Sanity

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/transition/TransitionLink';
import Image from 'next/image';
import './worklayout.css';

gsap.registerPlugin(ScrollTrigger);

export default function WorkLayout({ projects = [] }) {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (projects.length === 0) return;

    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card) => {
      const title = card.querySelector('.project-card-title');
      const subtitle = card.querySelector('.project-card-subtitle');
      const line = card.querySelector('.project-card-line');
      const button = card.querySelector('.project-card-button');
      const meta = card.querySelector('.project-card-meta');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        title,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      tl.fromTo(
        line,
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      tl.fromTo(
        button,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      tl.fromTo(
        meta,
        { opacity: 0, y: 20 },
        { opacity: 0.8, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="work-layout-container" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p style={{ color: '#fff' }}>No projects found</p>
      </div>
    );
  }

  return (
    <div className="work-layout-container" ref={containerRef}>
      <div className="work-layout-grid">
        {projects.map((project, index) => (
          <TransitionLink href={project.link} key={project.id}>
            <div
              className="project-card"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="project-card-background">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>

              <div className="project-card-overlay" />

              <div className="project-card-content">
                <h2 className="project-card-title">{project.title}</h2>
                
                {project.subtitle && (
                  <p className="project-card-subtitle">{project.subtitle}</p>
                )}

                <div className="project-card-button-wrapper">
                  <div className="project-card-line" />
                  <button className="project-card-button">
                    view
                  </button>
                </div>
              </div>

              <div className="project-card-meta">
                <div className="project-card-client">{project.client}</div>
                <div className="project-card-type">
                  {project.type}<br />{project.year}
                </div>
              </div>

              {index === 0 && (
                <div className="scroll-indicator">
                  <div className="scroll-indicator-line" />
                  <div className="scroll-indicator-text">Scroll</div>
                </div>
              )}
            </div>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}