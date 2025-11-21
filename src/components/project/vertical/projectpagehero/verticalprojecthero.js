// src/components/project/vertical/projectpagehero/verticalprojecthero.js
'use client';

import { useState } from 'react';
import '../../projecthero.css';
import './verticalprojecthero.css';
import GhostLogo from '@/components/global/ghostlogo/ghostlogo';
import VideoModal from '@/components/videomodal/VideoModal';

export default function VerticalProjectHero({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) {
    return (
      <div className='vertical-hero-container project-hero-container'>
        <GhostLogo />
        <div className='vertical-hero-wrapper project-hero-wrapper'>
          <div className="project-title-container">
            <h1 className="project-title">PROJECT TITLES THAT ARE LONGER</h1>
          </div>
          <div className='project-vertical-video-container'>
            <div className="project-vertical-video-wrapper left-project-video-control"></div>
            <div className="project-vertical-video-wrapper right-project-video-control"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='vertical-hero-container project-hero-container'>
        <GhostLogo />
        <div className='vertical-hero-wrapper project-hero-wrapper'>
          <div className="project-title-container">
            <h1 className="project-title">{project.title}</h1>
            <div className="project-hero-info-container">
              <div className="project-hero-info-wrapper">
                <div className="project-hero-info-left">
                  <p className="project-hero-info-type">Client</p>
                  <p className="project-hero-info-type">Type</p>
                  <p className="project-hero-info-type">Released</p>
                </div>
                <div className="project-hero-info-right">
                  <p className="project-hero-info-type">{project.client}</p>
                  <p className="project-hero-info-type">{project.type}</p>
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
          <div className='project-vertical-video-container'>
            {project.heroVideos && project.heroVideos[0] && (
              <div className="project-vertical-video-wrapper left-project-video-control">
                <video
                  src={project.heroVideos[0]}
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
              </div>
            )}
            {project.heroVideos && project.heroVideos[1] && (
              <div className="project-vertical-video-wrapper right-project-video-control">
                <video
                  src={project.heroVideos[1]}
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
              </div>
            )}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={project.fullVideo || project.heroVideos?.[0]}
      />
    </>
  );
}