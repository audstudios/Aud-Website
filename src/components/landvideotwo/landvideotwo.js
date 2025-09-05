"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./landvideotwo.css";

export default function LandVideoTwo({ src = "/videos/Aud_Land_Video.mp4" }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Fade in the overlay content on load
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
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="video-bg"
      />
      <div ref={overlayRef} className="video-overlay-content">
        <p className="landing-content">
          <span className="aud-inline">aud studios</span> is a boutique production agency founded by longtime collaborators Syd Ross and Madeline Corley. We specialize in luxury experiential content, brand campaigns, and full-scale commercial production, bringing strategic thinking, creativity, and precision to every project.
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
