'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactFormModal from '@/components/forms/ContactFormModal/ContactFormModal';
import './project-cta.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctaRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section className="project-cta-section" ref={ctaRef}>
        <h2 className="project-cta-text" ref={textRef}>
          Reach out for our full capabilities deck
        </h2>
        <button 
          className="project-cta-button" 
          ref={buttonRef}
          onClick={() => setIsModalOpen(true)}
        >
          Get in touch
        </button>
      </section>

      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}