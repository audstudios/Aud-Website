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

    const attemptPlay = () => {
      if (video) {
        video
          .play()
          .then(() => {
            console.log("Video autoplayed or triggered by interaction.");
          })
          .catch((error) => {
            console.warn("Autoplay prevented, waiting for user interaction.");
          });
      }
    };

    // First try: after short delay (ensure video has had time to load)
    setTimeout(attemptPlay, 100);

    // Fallback: user interaction
    const handleInteraction = () => {
      attemptPlay();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <div className="landvideo-background">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="auto"
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
