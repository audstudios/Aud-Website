import '../../projecthero.css';
import './horizontalprojecthero.css';

import Link from 'next/link'; 

import GhostLogo from '@/components/global/ghostlogo/ghostlogo';

export default function HorizontalProjectHero() {
  return (
    <div className='horizontal-hero-container project-hero-container'>
        <GhostLogo />
        <div className='horizontal-hero-wrapper project-hero-wrapper'>
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
            <div className="project-horizontal-video-container">

            </div>
        </div>
    </div>
  );
}
