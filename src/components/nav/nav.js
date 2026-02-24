'use client';

import './nav.css';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link'; 

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.to(".nav-home", {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=300px top",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left nav-home">
          <Link href="/">
            <img src="/images/audwordmark_nav.svg" alt="Aud Studios wordmark logo" />
          </Link>
        </div>
        <div className="nav-right">
          <div className="nav-menu">
            <Link href="/work">
              <p className={`nav-link ${isActive('/work') ? 'active' : ''}`} data-text="Work">Work</p>
            </Link>
            <Link href="/about">
              <p className={`nav-link ${isActive('/about') ? 'active' : ''}`} data-text="About">About</p>
            </Link>
            <Link href="/contact">
              <p className={`nav-link ${isActive('/contact') ? 'active' : ''}`} data-text="Contact">Contact</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}