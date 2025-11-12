import '../../projecthero.css';
import './verticalprojecthero.css';
import Link from 'next/link';
import GhostLogo from '@/components/global/ghostlogo/ghostlogo';

export default function VerticalProjectHero({ project }) {
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
            {project.watchLink && (
              <div className="project-hero-info-button">
                <Link className="project-video-link" href={project.watchLink} target="_blank">
                  <p>WATCH IN FULL</p>
                </Link>
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
  );
}