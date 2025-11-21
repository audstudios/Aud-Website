'use client';

import './nav.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link'; 

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
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

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left nav-home">
          <Link href="/">
            <img src="/images/audwordmark_nav.svg" alt="Logo" />
          </Link>
        </div>
        <div className="nav-right">
          <div className="nav-menu">
            <Link href="/prod/work">
              <p className="nav-link">Work</p>
            </Link>
            <Link href="/prod/about">
              <p className="nav-link">About</p>
            </Link>
            <Link href="/prod/contact">
              <p className="nav-link">Contact</p>
            </Link>
{/* <p className="nav-link">Services</p> */}
{/* <p className="nav-link">Contact</p> */}
{/* <p className="nav-link">Aud Jobs</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
