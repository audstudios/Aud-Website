'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function TransitionLink({ href, children, ...props }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e) => {
    if (href === pathname) return;

    e.preventDefault();

    const main = document.querySelector('main');
    if (!main) {
      router.push(href);
      return;
    }

    gsap.to(main, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push(href);
      },
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
