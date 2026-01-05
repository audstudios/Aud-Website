// src/components/project/horizontal/projectpagehero/horizontalprojecthero.js
'use client';

import { useState, useRef, useEffect } from 'react';
import '../../projecthero.css';
import './horizontalprojecthero.css';
import GhostLogo from '@/components/global/ghostlogo/ghostlogo';
import VideoModal from '@/components/videomodal/VideoModal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function HorizontalProjectHero({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimelineChange = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
            <div className="video-placeholder">No video available</div>
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
          <div 
            className="project-horizontal-video-container"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {project.heroVideo && (
              <>
                <video
                  ref={videoRef}
                  src={project.heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className={`video-controls ${showControls ? 'show' : ''}`}>
                  <div className="video-controls-wrapper">
                    <input
                      type="range"
                      className="video-timeline"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleTimelineChange}
                    />
                    <div className="video-controls-bottom">
                      <div className="video-controls-left">
                        <button onClick={togglePlay} className="video-control-btn">
                          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>
                        <button onClick={toggleMute} className="video-control-btn">
                          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </button>
                        <span className="video-time">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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