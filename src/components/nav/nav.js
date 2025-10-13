"use client"

import './nav.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  useEffect(() => {
    gsap.to(".nav-left", {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=300px top",
        toggleActions: "play none none reverse", // optional
      },
    });
  }, []);

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <img src="/images/audwordmark_nav.svg" alt="Logo" />
        </div>
        <div className="nav-right">
          <div className="nav-menu">
            <p className="nav-link">Work</p>
            <p className="nav-link">About</p>
            <p className="nav-link">Services</p>
            <p className="nav-link">Contact</p>
            <p className="nav-link">Aud Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
