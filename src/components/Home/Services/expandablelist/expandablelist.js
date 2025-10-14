'use client'; // Needed for Next.js App Router

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './expandablelist.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandibleList() {
  const [openSection, setOpenSection] = useState(null);
  const contentRefs = useRef({});
  const containerRef = useRef(null);
  const headersRef = useRef([]);

  const toggleSection = (sectionKey) => {
    if (openSection === sectionKey) {
      animateClose(sectionKey);
      setOpenSection(null);
    } else {
      if (openSection) {
        animateClose(openSection);
      }
      setOpenSection(sectionKey);
      setTimeout(() => animateOpen(sectionKey), 10);
    }
  };

  const animateOpen = (key) => {
    const el = contentRefs.current[key];
    if (!el) return;

    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height: el.scrollHeight,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          el.style.height = 'auto';
        },
      }
    );
  };

  const animateClose = (key) => {
    const el = contentRefs.current[key];
    if (!el) return;

    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  // 👇 Animate section headers on scroll into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headersRef.current, {
        autoAlpha: 0,
        yPercent: 20,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      key: 'production',
      title: 'Production',
      items: [
        'Full-service video & film production',
        'Experiential and Event Content Production',
        'Editorial & lifestyle still photography',
        'Post-production & editing',
        'Motion graphics & visual effects',
      ],
    },
    {
      key: 'strategy',
      title: 'Strategy',
      items: [
        'Integrated Campaigns',
        'Content and Communications Planning',
        'Digital & Social Strategy',
        'Influencer Strategy',
        'Research & Measurement',
      ],
    },
    {
      key: 'creative',
      title: 'Creative',
      items: [
        'Creative Direction',
        'Campaign Development',
        'Brand Campaigns and Branded Content',
        'Campaign concepting & ideation',
      ],
    },
    {
      key: 'consulting',
      title: 'Consulting / Account Services',
      items: [
        'Creative strategy & campaign planning',
        'Brand positioning & audience engagement',
        'Production planning & project management',
      ],
    },
    {
      key: 'customsolutions',
      title: 'Custom Solutions',
      items: [
        'Tailored content & production services for unique projects',
        'Collaborations with artists, influencers, and creative partners',
      ],
    },
  ];

  return (
    <div className="expandiblelist-container" ref={containerRef}>
      {sections.map(({ key, title, items }, index) => (
        <div key={key} className="section">
          <div
            className="section-header"
            onClick={() => toggleSection(key)}
            ref={(el) => (headersRef.current[index] = el)}
          >
            <span className="expand-list-title font-bold">{title}</span>
            <div className="expand-symbol">{openSection === key ? '-' : '+'}</div>
          </div>

          <div
            className="section-content-wrapper"
            ref={(el) => (contentRefs.current[key] = el)}
            style={{ overflow: 'hidden', height: 0, opacity: 0 }}
          >
            <ul className="section-content">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}