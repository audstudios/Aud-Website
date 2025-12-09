import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './services.css';
import Expandiblelist from './expandablelist/expandablelist';

gsap.registerPlugin(ScrollTrigger); 

export default function Services() {
  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const expandibleListRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for staggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // Stagger the animations with smooth timing
      tl.fromTo(
        titleRef.current,
        {
          autoAlpha: 0,
          y: 30
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      )
      .fromTo(
        para1Ref.current,
        {
          autoAlpha: 0,
          y: 30
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.5' // Start 0.5s before previous animation ends
      )
      .fromTo(
        para2Ref.current,
        {
          autoAlpha: 0,
          y: 30
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.6' // Start 0.6s before previous animation ends
      )
      .fromTo(
        expandibleListRef.current,
        {
          autoAlpha: 0,
          y: 30
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.5' // Start 0.5s before previous animation ends
      );
    });

    return () => ctx.revert(); // clean up GSAP context on unmount
  }, []);

  return (
    <div className="services-container" ref={containerRef}>
      <div className="services-wrapper">
        <div className="services-left">
          <div className="services-content">
            <h3 className="services-title" ref={titleRef} style={{ opacity: 0 }}>
              <span className="font-bold">Our Approach</span>
            </h3>
            <p ref={para1Ref} style={{ opacity: 0 }}>
              As a founder-led <span className='bolded'>creative strategy</span> and <span className='bolded'>production</span> agency, collaboration is at the heart of everything we do. We partner as a true extension of your in-house team, aligning strategy and production to move as one. 
            </p>
            <p className="p-spacer" ref={para2Ref} style={{ opacity: 0 }}>
              From creating viral social moments to OOH campaigns, we bring brands to life through thoughtful strategy and premium production, moving at the speed the moment demands. 
            </p>
          </div>
        </div>
        <div className="services-right">
          <div className="service-dropdown-container" ref={expandibleListRef} style={{ opacity: 0 }}>
            <Expandiblelist />
          </div>
        </div>
      </div>
    </div>
  );
}