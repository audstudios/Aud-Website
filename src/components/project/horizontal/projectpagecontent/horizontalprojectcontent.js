'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectCTA from '@/components/projects/project-cta';
import '../../projecthero.css';
import './horizontalprojectcontent.css';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalProjectContent({ project }) {
  const mainlineRef = useRef(null);
  const contentRefs = useRef([]);
  const mainImagesRefs = useRef([]);
  const subImagesRefs = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Animate mainline
      gsap.fromTo(
        mainlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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

      // Animate content paragraphs
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
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

      // Animate main images (fade in only, no parallax)
      mainImagesRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 85%',
                end: 'top 50%',
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
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
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
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
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
        <div className='horizontal-project-content-container'>
          <div className='horizontal-project-content-wrapper'>
            <div className='horizontal-project-left-content'>
              <div className='horizontal-project-content-img-main'></div>
              <div className='horizontal-project-content-img-main'></div>
              <div className='horizontal-project-content-img-main'></div>
            </div>
            <div className='project-right-content'>
              <h3 className='project-content-mainline'>Placeholder content...</h3>
            </div>
          </div>
        </div>
        <ProjectCTA />
      </>
    );
  }

  return (
    <>
      <div className='horizontal-project-content-container'>
        <div className='horizontal-project-content-wrapper'>
          <div className='horizontal-project-left-content'>
            {project.mainImages?.map((image, index) => (
              <div 
                key={index} 
                className='horizontal-project-content-img-main'
                ref={(el) => (mainImagesRefs.current[index] = el)}
                style={{ opacity: 0 }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} project image ${index + 1}`} 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            ))}
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
                className='project-brand-logo'
                ref={logoRef}
                style={{ opacity: 0 }}
              >
                <img 
                  className='project-brand-logo-img' 
                  src={project.brandLogo}
                  alt={`${project.client} brand logo`}
                />
              </div>
            )}
            
            <div className='project-content-subimages-wrapper'>
              {project.subImages?.map((image, index) => (
                <div 
                  key={index} 
                  className='project-content-horizontal-subimages'
                  ref={(el) => (subImagesRefs.current[index] = el)}
                  style={{ opacity: 0 }}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} additional detail ${index + 1}`} 
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProjectCTA />
    </>
  );
}