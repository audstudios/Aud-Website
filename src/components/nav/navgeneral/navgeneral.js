'use client';

import './navgeneral.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link'; 

export default function NavigationGeneral() {
  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <Link href="/test">
          <div className="nav-left">
            <img src="/images/audwordmark_nav.svg" alt="Logo" />
          </div>
        </Link>
        <div className="nav-right">
          <div className="nav-menu">
            <Link href="/prod/work">
              <p className="nav-link">Work</p>
            </Link>
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
