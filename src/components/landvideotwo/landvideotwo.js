"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./landvideotwo.css";

export default function LandVideoTwo({ src = "/videos/Aud_Land_Video.mp4" }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Fade in the overlay content on load
    gsap.from(overlayRef.current, {
      opacity: 0,   // start invisible
      duration: 1.5, // fade-in duration
      ease: "power2.out",
      delay: .5 
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
        <p>
          <span className="aud-inline">aud studios</span> is a boutique
          production agency founded by longtime co-producers Madeline Corley
          and Syd Ross. We specialize in luxury experiential capture, brand
          campaigns, and full-scale commercial production, bringing strategic
          thinking, creativity, and precision to every project
        </p>
      </div>
    </div>
  );
}
