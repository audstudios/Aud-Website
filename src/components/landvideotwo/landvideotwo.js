"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./landvideotwo.css";

export default function LandVideoTwo({ src = "/videos/audbgvid_nologo2.mp4" }) {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const onVideoReady = () => {
      setVideoReady(true);
      video.currentTime = 0.001; // Force a repaint
      video.play().catch((err) => {
        console.warn("Autoplay blocked, waiting for user interaction", err);
      });
    };

    const attemptPlay = () => {
      video.play().catch((err) => {
        console.warn("Autoplay failed", err);
      });
    };

    const handleInteraction = () => {
      attemptPlay();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    if (video) {
      video.addEventListener("canplaythrough", onVideoReady);
      video.load(); // force browser to prepare video
    }

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    // GSAP overlay animation
    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.5,
    });

    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", onVideoReady);
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <div className="landvideo-background">
      {!videoReady && (
        <div className="video-preloader">
          <p>Loading video...</p>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="auto"
        className={`video-bg ${videoReady ? "show" : "hidden"}`}
        playsinline="true"
        webkit-playsinline="true"
      />

      <div ref={overlayRef} className="video-overlay-content">
        <p className="landing-content">
          <span className="aud-inline">aud studios</span> is a boutique creative + production agency based in NYC.
        </p>
        <div className="connect-container">
          <p className="cta-content">
            Let’s work together!{" "}
            <a
              className="cta-btn"
              href="mailto:hello@audstudios.com?subject=Hello&body=Hi%20there!"
            >
              hello@audstudios.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
