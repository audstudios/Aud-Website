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
            <Link href="/">
              <p className="nav-link">Home</p>
            </Link>
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
{/* <p className="nav-link">Aud Jobs</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
