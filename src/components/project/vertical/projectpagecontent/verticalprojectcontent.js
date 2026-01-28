'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectCTA from '@/components/projects/project-cta';
import '../../projecthero.css';
import './verticalprojectcontent.css';

gsap.registerPlugin(ScrollTrigger);

export default function VerticalProjectContent({ project }) {
  const mainlineRef = useRef(null);
  const contentRefs = useRef([]);
  const mainImageRef = useRef(null);
  const subImagesRefs = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Animate main image
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { opacity: 0, y: 60, rotation: -3 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainImageRef.current,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate mainline
      if (mainlineRef.current) {
        gsap.fromTo(
          mainlineRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainlineRef.current,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate content paragraphs
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // Animate sub images
      subImagesRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, y: 40, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: ref,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // Animate logo
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: logoRef.current,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [project]);

  if (!project) {
    return (
      <>
        <div className='vertical-project-content-container'>
          <div className='vertical-project-content-wrapper'>
            <div className='vertical-project-left-content'>
              <div className='project-content-vertical-mainimages'>Placeholder</div>
            </div>
            <div className='project-right-content'>
              <h3 className='project-content-mainline'>Loading...</h3>
            </div>
          </div>
        </div>
        <ProjectCTA />
      </>
    );
  }

  return (
    <>
      <div className='vertical-project-content-container'>
        <div className='vertical-project-content-wrapper'>
          <div className='vertical-project-left-content'>
            {project.mainImages && project.mainImages[0] && (
              <div 
                className='project-content-vertical-mainimages'
                ref={mainImageRef}
                style={{ opacity: 0 }}
              >
                <img 
                  src={project.mainImages[0]} 
                  alt={`${project.title} main vertical project image`}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            )}
            <div className='project-content-lower-wrapper'>
              {project.subImages?.map((image, index) => (
                <div 
                  key={index} 
                  className='project-content-vertical-subimages'
                  ref={(el) => (subImagesRefs.current[index] = el)}
                  style={{ opacity: 0 }}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} vertical detail ${index + 1}`}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='project-right-content'>
            <h3 
              className='project-content-mainline' 
              ref={mainlineRef}
              style={{ opacity: 0 }}
            >
              {project.mainline}
            </h3>
            
            {project.content?.map((paragraph, index) => (
              <p 
                key={index} 
                className='project-content-subcontent'
                ref={(el) => (contentRefs.current[index] = el)}
                style={{ opacity: 0 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
            
            {project.brandLogo && (
              <div 
                ref={logoRef}
                style={{ opacity: 0 }}
              >
                <img 
                  className='project-brand-logo' 
                  src={project.brandLogo}
                  alt={`${project.client} brand logo`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ProjectCTA />
    </>
  );
}