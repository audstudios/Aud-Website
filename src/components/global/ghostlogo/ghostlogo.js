'use client';

import { useEffect, useRef } from 'react';
import './ghostlogo.css';

export default function GhostLogo() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer-container');
      if (!footer || !ref.current) return;

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      ref.current.style.opacity = footerTop <= windowHeight ? '0' : '1';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='ghostlogo' ref={ref}>
      <img
        src="/images/global/aud_ghostlogo.svg"
        alt="AUD studios ghost logo"
        role="presentation"
      />
    </div>
  );
}
