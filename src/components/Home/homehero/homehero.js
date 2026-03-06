// src/components/Home/homehero/homehero.js
// Updated to fetch hero assets from Sanity

'use client';

import { useEffect, useState } from 'react';
import { getMediaUrl, getCloudinaryAssetUrl } from '@/lib/cloudinary';
import { client } from '@/sanity/lib/client';
import { homeHeroQuery } from '@/sanity/lib/queries';
import './homehero.css';

// Fallback paths (current hardcoded values)
const FALLBACK_VIDEO = '/videos/JPGHeroFinal_Land.mp4';
const FALLBACK_LOGO = '/images/AudGlassLogoV02.png';

export default function Homehero() {
  const [videoUrl, setVideoUrl] = useState(getMediaUrl(FALLBACK_VIDEO, 'heroVideo'));
  const [logoUrl, setLogoUrl] = useState(getMediaUrl(FALLBACK_LOGO, 'logo'));

  useEffect(() => {
    async function fetchHero() {
      try {
        if (client) {
          const data = await client.fetch(homeHeroQuery);
          if (data) {
            if (data.backgroundVideo) {
              setVideoUrl(getCloudinaryAssetUrl(data.backgroundVideo, 'heroVideo'));
            }
            if (data.logo) {
              setLogoUrl(getCloudinaryAssetUrl(data.logo, 'logo'));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching home hero:', error);
      }
    }
    fetchHero();
  }, []);

  return (
    <div className="home-hero-container">
      <video
        className="background-video"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />
      <img
        className="hero-logo"
        src={logoUrl}
        alt="Aud Studios glass logo"
      />
      <div className="hero-fade"></div>
    </div>
  );
}