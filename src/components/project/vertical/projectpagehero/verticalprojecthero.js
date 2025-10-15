import '../../projecthero.css';
import './verticalprojecthero.css';

import Link from 'next/link'; 

import GhostLogo from '@/components/global/ghostlogo/ghostlogo';

export default function VerticalProjectHero() {
  return (
    <div className='vertical-hero-container project-hero-container'>
        <GhostLogo />
        <div className='vertical-hero-wrapper project-hero-wrapper'>
            <div className="project-title-container">
                <h1 className="project-title">
                    PROJECT TITLES THAT ARE LONGER
                </h1>
                <div className="project-hero-info-container">
                    <div className="project-hero-info-wrapper">
                        <div className="project-hero-info-left">
                            <p className="project-hero-info-type">
                                Client
                            </p>
                            <p className="project-hero-info-type">
                                Type
                            </p>
                            <p className="project-hero-info-type">
                                Released
                            </p>
                        </div>
                        <div className="project-hero-info-right">
                            <p className="project-hero-info-type">
                                God
                            </p>
                            <p className="project-hero-info-type">
                                Movie
                            </p>
                            <p className="project-hero-info-type">
                                2024
                            </p>
                        </div>
                    </div>
                    <div className="project-hero-info-button">
                        <Link className="project-video-link" href="/test">
                            <p>WATCH IN FULL</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='project-vertical-video-container'>
                <div className="project-vertical-video-wrapper left-project-video-control">
                </div>
                <div className="project-vertical-video-wrapper right-project-video-control">
                </div>
            </div>
        </div>
    </div>
  );
}
