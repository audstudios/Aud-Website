"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./landvideotwo.css";

export default function LandVideoTwo({ src = "/videos/audbgvid_nologo2.mp4" }) {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
  
    if (video) {
      // Trick iOS into acknowledging the video
      video.load();
      video.currentTime = 0.001;
  
      const attemptPlay = () => {
        video
          .play()
          .then(() => {
            console.log("Video playing");
          })
          .catch((err) => {
            console.warn("Autoplay failed, waiting for interaction", err);
          });
      };
  
      // Try once right away
      setTimeout(attemptPlay, 100);
  
      // Try again on first interaction
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
    }
  
    // Fade in overlay
    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.5,
    });
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
            <a className="cta-btn" href="mailto:hello@audstudios.com?subject=Hello&body=Hi%20there!">
              hello@audstudios.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
