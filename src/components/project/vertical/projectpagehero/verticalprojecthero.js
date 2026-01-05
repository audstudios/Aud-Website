// src/components/project/vertical/projectpagehero/verticalprojecthero.js
'use client';

import { useState, useRef, useEffect } from 'react';
import '../../projecthero.css';
import './verticalprojecthero.css';
import GhostLogo from '@/components/global/ghostlogo/ghostlogo';
import VideoModal from '@/components/videomodal/VideoModal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function VerticalProjectHero({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video1Playing, setVideo1Playing] = useState(true);
  const [video2Playing, setVideo2Playing] = useState(true);
  const [video1Muted, setVideo1Muted] = useState(true);
  const [video2Muted, setVideo2Muted] = useState(true);
  const [video1Time, setVideo1Time] = useState(0);
  const [video2Time, setVideo2Time] = useState(0);
  const [video1Duration, setVideo1Duration] = useState(0);
  const [video2Duration, setVideo2Duration] = useState(0);
  const [showControls1, setShowControls1] = useState(false);
  const [showControls2, setShowControls2] = useState(false);
  
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (video1) {
      const handleTimeUpdate1 = () => setVideo1Time(video1.currentTime);
      const handleLoadedMetadata1 = () => setVideo1Duration(video1.duration);
      
      video1.addEventListener('timeupdate', handleTimeUpdate1);
      video1.addEventListener('loadedmetadata', handleLoadedMetadata1);

      return () => {
        video1.removeEventListener('timeupdate', handleTimeUpdate1);
        video1.removeEventListener('loadedmetadata', handleLoadedMetadata1);
      };
    }
  }, []);

  useEffect(() => {
    const video2 = video2Ref.current;

    if (video2) {
      const handleTimeUpdate2 = () => setVideo2Time(video2.currentTime);
      const handleLoadedMetadata2 = () => setVideo2Duration(video2.duration);
      
      video2.addEventListener('timeupdate', handleTimeUpdate2);
      video2.addEventListener('loadedmetadata', handleLoadedMetadata2);

      return () => {
        video2.removeEventListener('timeupdate', handleTimeUpdate2);
        video2.removeEventListener('loadedmetadata', handleLoadedMetadata2);
      };
    }
  }, []);

  const togglePlay1 = () => {
    if (video1Ref.current) {
      if (video1Playing) {
        video1Ref.current.pause();
      } else {
        video1Ref.current.play();
      }
      setVideo1Playing(!video1Playing);
    }
  };

  const togglePlay2 = () => {
    if (video2Ref.current) {
      if (video2Playing) {
        video2Ref.current.pause();
      } else {
        video2Ref.current.play();
      }
      setVideo2Playing(!video2Playing);
    }
  };

  const toggleMute1 = () => {
    if (video1Ref.current) {
      video1Ref.current.muted = !video1Muted;
      setVideo1Muted(!video1Muted);
    }
  };

  const toggleMute2 = () => {
    if (video2Ref.current) {
      video2Ref.current.muted = !video2Muted;
      setVideo2Muted(!video2Muted);
    }
  };

  const handleTimeline1Change = (e) => {
    const time = parseFloat(e.target.value);
    if (video1Ref.current) {
      video1Ref.current.currentTime = time;
      setVideo1Time(time);
    }
  };

  const handleTimeline2Change = (e) => {
    const time = parseFloat(e.target.value);
    if (video2Ref.current) {
      video2Ref.current.currentTime = time;
      setVideo2Time(time);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!project) {
    return (
      <div className='vertical-hero-container project-hero-container'>
        <GhostLogo />
        <div className='vertical-hero-wrapper project-hero-wrapper'>
          <div className="project-title-container vert-control-herobox">
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
                <div className='project-hero-client-wrapper'>
                    <p className="project-hero-info-type project-title-width">Client</p>
                    <p className="project-hero-info-type project-sub-width">{project.client}</p>
                </div>
                <div className='project-hero-client-wrapper'>
                    <p className="project-hero-info-type project-title-width">Our Role</p>
                    <p className="project-hero-info-type project-sub-width">{project.type}</p>
                </div>
                <div className='project-hero-client-wrapper'>
                    <p className="project-hero-info-type project-title-width">Released</p>
                    <p className="project-hero-info-type project-sub-width">{project.year}</p>
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
              <div 
                className="project-vertical-video-wrapper left-project-video-control"
                onMouseEnter={() => setShowControls1(true)}
                onMouseLeave={() => setShowControls1(false)}
              >
                <video
                  ref={video1Ref}
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
                <div className={`video-controls-vertical ${showControls1 ? 'show' : ''}`}>
                  <div className="video-controls-wrapper-vertical">
                    <input
                      type="range"
                      className="video-timeline-vertical"
                      min="0"
                      max={video1Duration}
                      value={video1Time}
                      onChange={handleTimeline1Change}
                    />
                    <div className="video-controls-bottom-vertical">
                      <button onClick={togglePlay1} className="video-control-btn-vertical">
                        {video1Playing ? <PauseIcon /> : <PlayArrowIcon />}
                      </button>
                      <button onClick={toggleMute1} className="video-control-btn-vertical">
                        {video1Muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                      </button>
                    </div>
                    <span className="video-time-vertical">
                      {formatTime(video1Time)} / {formatTime(video1Duration)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {project.heroVideos && project.heroVideos[1] && (
              <div 
                className="project-vertical-video-wrapper right-project-video-control"
                onMouseEnter={() => setShowControls2(true)}
                onMouseLeave={() => setShowControls2(false)}
              >
                <video
                  ref={video2Ref}
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
                <div className={`video-controls-vertical ${showControls2 ? 'show' : ''}`}>
                  <div className="video-controls-wrapper-vertical">
                    <input
                      type="range"
                      className="video-timeline-vertical"
                      min="0"
                      max={video2Duration}
                      value={video2Time}
                      onChange={handleTimeline2Change}
                    />
                    <div className="video-controls-bottom-vertical">
                      <button onClick={togglePlay2} className="video-control-btn-vertical">
                        {video2Playing ? <PauseIcon /> : <PlayArrowIcon />}
                      </button>
                      <button onClick={toggleMute2} className="video-control-btn-vertical">
                        {video2Muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                      </button>
                    </div>
                    <span className="video-time-vertical">
                      {formatTime(video2Time)} / {formatTime(video2Duration)}
                    </span>
                  </div>
                </div>
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