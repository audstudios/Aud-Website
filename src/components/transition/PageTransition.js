'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    gsap.set(main, { opacity: 0 });
    gsap.to(main, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [pathname]);

  return null;
}
