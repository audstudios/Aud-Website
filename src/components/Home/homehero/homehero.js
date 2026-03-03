// src/components/Home/homehero/homehero.js
// Updated with Cloudinary support

'use client';

import { CloudinaryVideo } from '@/components/media';
import { getMediaUrl } from '@/lib/cloudinary';
import './homehero.css';

export default function Homehero() {
  return (
    <div className="home-hero-container">
      <CloudinaryVideo
        src="/videos/JPGHeroFinal_Land.mp4"
        className="background-video"
        transformation="heroVideo"
        autoPlay
        muted
        loop
        playsInline
        priority
      />
      <img
        className="hero-logo"
        src={getMediaUrl('/images/AudGlassLogoV02.png', 'logo')}
        alt="Aud Studios glass logo"
      />
      <div className="hero-fade"></div>
    </div>
  );
}