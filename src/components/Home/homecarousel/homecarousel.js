// src/components/Home/homecarousel/homecarousel.js
// Updated with Cloudinary support

'use client';

import { getMediaUrl } from '@/lib/cloudinary';
import { clientLogos } from '@/data/projects';
import './homecarousel.css';

export default function HomeCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-title">
          <h3><span className='font-bold'>Who we&apos;ve worked with</span></h3>
        </div>

        <div className="carousel-controller">
          {/* Optional fade masks */}
          <div className="fade-wrapper">
            <div className="left-fade"></div>
            <div className="right-fade"></div>
          </div>

          {/* Repeating logo track */}
          <div className="carousel-track">
            <div className="carousel-images">
              {[...Array(2)].map((_, i) => (
                <div className="carousel-set" key={i}>
                  {clientLogos.map((logo, idx) => (
                    <img
                      key={`${i}-${idx}`}
                      src={getMediaUrl(logo.src, 'logo')}
                      alt={logo.alt}
                      loading="lazy"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}