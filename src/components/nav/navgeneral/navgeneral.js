'use client';

import './navgeneral.css';
import { usePathname } from 'next/navigation';
import TransitionLink from '@/components/transition/TransitionLink';

export default function NavigationGeneral() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <TransitionLink href="/">
          <div className="nav-left">
            <img src="/images/audwordmark_nav.svg" alt="Aud Studios wordmark logo" />
          </div>
        </TransitionLink>
        <div className="nav-right">
          <div className="nav-menu">
            <TransitionLink href="/">
              <p className={`nav-link ${isActive('/') ? 'active' : ''}`} data-text="Home">Home</p>
            </TransitionLink>
            <TransitionLink href="/work">
              <p className={`nav-link ${isActive('/work') ? 'active' : ''}`} data-text="Work">Work</p>
            </TransitionLink>
            <TransitionLink href="/about">
              <p className={`nav-link ${isActive('/about') ? 'active' : ''}`} data-text="About">About</p>
            </TransitionLink>
            <TransitionLink href="/contact">
              <p className={`nav-link ${isActive('/contact') ? 'active' : ''}`} data-text="Contact">Contact</p>
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}