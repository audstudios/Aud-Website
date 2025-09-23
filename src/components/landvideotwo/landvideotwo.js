"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./landvideotwo.css";

export default function LandVideoTwo({ src = "/videos/audbgvid_nologo2.mp4" }) {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Animate overlay on load
    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.5,
    });

    const video = videoRef.current;

    // Try to autoplay video immediately
    const attemptPlay = () => {
      if (video) {
        video.play().catch((error) => {
          console.warn("Autoplay was prevented:", error);
        });
      }
    };

    attemptPlay(); // initial attempt

    // Also try on first user interaction
    const handleUserInteraction = () => {
      attemptPlay();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div className="landvideo-background">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="video-bg"
      />
      <div ref={overlayRef} className="video-overlay-content">
        <p className="landing-content">
          <span className="aud-inline">aud studios</span> is a boutique creative + production agency based in NYC. 
        </p>
        <div className="connect-container">
          <p className="cta-content">
            Let’s work together!{" "}
            <a className="cta-btn" href="mailto:hello@audstudios.com?subject=Hello&body=Hi%20there!">
              hello@audstudios.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
