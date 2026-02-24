'use client';

import './navgeneral.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; 

export default function NavigationGeneral() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
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