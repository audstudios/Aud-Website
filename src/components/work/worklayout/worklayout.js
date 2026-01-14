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
    client: "North Six // Jean Paul Gaultier",
    type: "Experiential Production",
    year: "2025",
    image: '/images/work/WorkPageCard_JPG.jpg',
    link: '/prod/work/projects/pages/jeanpaulgautier'
  },
  {
    id: 2,
    title: "Cardi B x DoorDash",
    client: "Get Engaged Media",
    type: "Full-Service Production",
    year: "2025",
    image: '/images/work/WorkPageCard_Doordash.jpg',
    link: '/prod/work/projects/pages/cardibdoordash'
  },
  {
    id: 3,
    title: "The Rizzwich",
    client: "Hardee's",
    type: "Commercial",
    year: "2025",
    image: '/images/work/WorkPageCard_Rizzwich.jpg',
    link: '/prod/work/projects/pages/rizzlerHardees'
  },
  {
    id: 4,
    title: "Flav Campaign",
    client: "Flav",
    type: "Campaign Development",
    year: "2025",
    image: '/images/work/WorkPageCard_Flav.jpg',
    link: '/prod/work/projects/pages/flav'
  }
];

export default function WorkLayout() {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    // Staggered fade-in animation
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Variable parallax speeds based on column position
      const media = card.querySelector('.project-card-media');
      if (media) {
        // Column 1 (index % 3 === 0): Slow parallax
        // Column 2 (index % 3 === 1): Medium parallax
        // Column 3 (index % 3 === 2): Fast parallax
        const columnIndex = index % 3;
        let parallaxAmount = -5; // default
        
        if (columnIndex === 0) {
          parallaxAmount = -3; // slow
        } else if (columnIndex === 1) {
          parallaxAmount = -8; // fast
        } else {
          parallaxAmount = -5; // medium
        }

        gsap.to(media, {
          yPercent: parallaxAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
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
              <div className="project-card-media">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.style.background = '#1a1a1a';
                  }}
                />
              </div>
              <div className="project-card-overlay">
                <h3 className="project-card-title">{project.title}</h3>
                <div className="project-card-meta">
                  <div className="project-card-client">{project.client}</div>
                  <div className="project-card-type">
                    {project.type}<br />{project.year}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}