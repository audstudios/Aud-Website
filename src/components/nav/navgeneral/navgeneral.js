'use client';

import './navgeneral.css';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link'; 

export default function NavigationGeneral() {
  const pathname = usePathname();

  const isActive = (path) => {
    // For home, exact match
    if (path === '/') return pathname === '/';
    // For other pages, check if pathname starts with the path
    return pathname.startsWith(path);
  };

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <Link href="/">
          <div className="nav-left">
            <img src="/images/audwordmark_nav.svg" alt="Aud Studios wordmark logo" />
          </div>
        </Link>
        <div className="nav-right">
          <div className="nav-menu">
            <Link href="/">
              <p className={`nav-link ${isActive('/') ? 'active' : ''}`} data-text="Home">Home</p>
            </Link>
            <Link href="/prod/work">
              <p className={`nav-link ${isActive('/prod/work') ? 'active' : ''}`} data-text="Work">Work</p>
            </Link>
            <Link href="/prod/about">
              <p className={`nav-link ${isActive('/prod/about') ? 'active' : ''}`} data-text="About">About</p>
            </Link>
            <Link href="/prod/contact">
              <p className={`nav-link ${isActive('/prod/contact') ? 'active' : ''}`} data-text="Contact">Contact</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
