// src/components/project/horizontal/projectpagehero/horizontalprojecthero.js
'use client';

import { useState } from 'react';
import '../../projecthero.css';
import './horizontalprojecthero.css';
import GhostLogo from '@/components/global/ghostlogo/ghostlogo';
import VideoModal from '@/components/videomodal/VideoModal';

export default function HorizontalProjectHero({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback to placeholder if no project data
  if (!project) {
    return (
      <div className='horizontal-hero-container project-hero-container'>
        <GhostLogo />
        <div className='horizontal-hero-wrapper project-hero-wrapper'>
          <div className="project-title-container">
            <h1 className="project-title">PROJECT TITLES THAT ARE LONGER</h1>
          </div>
          <div className="project-horizontal-video-container">
            {project?.heroVideo && (
            <video
              src={project.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='horizontal-hero-container project-hero-container'>
        <GhostLogo />
        <div className='horizontal-hero-wrapper project-hero-wrapper'>
          <div className="project-title-container">
            <h1 className="project-title">{project.title}</h1>
            <div className="project-hero-info-container">
              <div className="project-hero-info-wrapper">
                <div className='project-hero-client-wrapper'>
                    <p className="project-hero-info-type">Client</p>
                    <p className="project-hero-info-type">{project.client}</p>
                </div>
                <div className='project-hero-client-wrapper'>
                    <p className="project-hero-info-type">Our Role</p>
                    <p className="project-hero-info-type">{project.type}</p>
                </div>
                <div className='project-hero-client-wrapper'>
                    <p className="project-hero-info-type">Released</p>
                    <p className="project-hero-info-type">{project.year}</p>
                </div>
              </div>
              {project.watchLink && project.fullVideo && (
                <div className="project-hero-info-button">
                  <button 
                    className="project-video-link"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <p>WATCH IN FULL</p>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="project-horizontal-video-container">
            {project.heroVideo && (
              <video
                src={project.heroVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={project.fullVideo || project.heroVideo}
      />
    </>
  );
}