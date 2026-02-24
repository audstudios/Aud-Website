'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import './worklayout.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Jean Paul Gaultier",
    subtitle: "Pride Event",
    client: "North Six // Jean Paul Gaultier",
    type: "Experiential Production",
    year: "2025",
    image: '/images/work/WorkPageCard_JPG.jpg',
    link: '/work/projects/pages/jeanpaulgautier'
  },
  {
    id: 2,
    title: "Cardi B × DoorDash",
    subtitle: "",
    client: "Get Engaged Media",
    type: "Full-Service Production",
    year: "2025",
    image: '/images/work/WorkPageCard_Doordash.jpg',
    link: '/work/projects/pages/cardibdoordash'
  },
  {
    id: 3,
    title: "The Rizzwich",
    subtitle: "Hardee's Campaign",
    client: "Hardee's",
    type: "Commercial",
    year: "2025",
    image: '/images/work/WorkPageCard_Rizzwich.jpg',
    link: '/work/projects/pages/rizzlerHardees'
  },
  {
    id: 4,
    title: "Flav",
    subtitle: "NYC Market Launch",
    client: "Flav",
    type: "Campaign Development",
    year: "2025",
    image: '/images/work/WorkPageCard_Flav.jpg',
    link: '/work/projects/pages/flav'
  }
];

export default function WorkLayout() {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="work-layout-container" ref={containerRef}>
      <div className="work-layout-grid">
        {projects.map((project, index) => (
          <Link href={project.link} key={project.id}>
            <div
              className="project-card"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="project-card-background">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.style.background = '#1a1a1a';
                  }}
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
          </Link>
        ))}
      </div>
    </div>
  );
}