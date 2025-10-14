import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './services.css';
import Expandiblelist from './expandablelist/expandablelist';

gsap.registerPlugin(ScrollTrigger); 

export default function Services() {
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          autoAlpha: 0,
          yPercent: 20
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%', // when top of element hits 80% of viewport
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        paraRef.current,
        {
          autoAlpha: 0,
          yPercent: 20
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paraRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert(); // clean up GSAP context on unmount
  }, []);

  return (
    <div className="services-container">
      <div className="services-wrapper">
        <div className="services-left">
          <div className="services-content">
            <h3 className="services-title" ref={titleRef}>
              <span className="font-bold">Our Approach</span>
            </h3>
            <p ref={paraRef}>
              As a founder-led creative agency, we step in where you need us most. We bring fresh perspective, initiative, and hands-on expertise that move in sync with your team from ideation to production to wrap.
            </p>
          </div>
        </div>
        <div className="services-right">
          <div className="service-dropdown-container">
            <Expandiblelist />
          </div>
        </div>
      </div>
    </div>
  );
}
