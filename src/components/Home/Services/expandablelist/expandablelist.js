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

    const listItems = el.querySelectorAll('li');

    // Create a timeline for the opening animation
    const tl = gsap.timeline();

    // First, expand the container
    tl.fromTo(
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

    // Then, stagger the list items
    tl.fromTo(
      listItems,
      { 
        opacity: 0, 
        y: 10 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.08, // 0.08s delay between each item
      },
      '-=0.2' // Start 0.2s before container finishes expanding
    );
  };

  const animateClose = (key) => {
    const el = contentRefs.current[key];
    if (!el) return;

    const listItems = el.querySelectorAll('li');

    // Create a timeline for the closing animation
    const tl = gsap.timeline();

    // First, fade out list items in reverse
    tl.to(listItems, {
      opacity: 0,
      y: -5,
      duration: 0.2,
      ease: 'power2.in',
      stagger: {
        each: 0.05,
        from: 'end', // Animate from bottom to top
      },
    });

    // Then, collapse the container
    tl.to(
      el,
      {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      },
      '-=0.1' // Start 0.1s before items finish fading
    );
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
      key: 'creative',
      title: 'Creative',
      items: [
        'Creative Direction',
        'Campaign Development',
        'Brand Campaigns & Branded Content',
        'Campaign concepting & ideation',
      ],
    },
    {
      key: 'production',
      title: 'Production',
      items: [
        'Full-service video & film production',
        'Experiential & Event Content Production',
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
        'Content & Communications Planning',
        'Digital & Social Strategy',
        'Influencer Strategy',
        'Research & Measurement',
      ],
    },
    {
      key: 'consulting',
      title: 'Consulting & Account Services',
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