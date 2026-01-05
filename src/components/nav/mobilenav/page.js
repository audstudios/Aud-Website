"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import "./menu.css";

import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';

const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/prod/work", label: "Projects" },
    { path: "/prod/about", label: "About" },
    { path: "/prod/contact", label: "Contact" },
];

const MobileMenu = () => {
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tl = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(
        () => {
          gsap.set(".menu-link-item-holder", {y: 75});

          tl.current = gsap
            .timeline({ pasued: true })
            .to(".menu-overlay", {
              duration: 1.25,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
              ease: "power4.inOut",
            })
            .to(".menu-link-item-holder", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut",
                delay: -0.75,
            });
        }, 
        {scope: container }
    );

    useEffect(() => {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }, [isMenuOpen])

    return (
        <div className="menu-container" ref={container}>
            <div className="menu-bar">
                <div className="menu-logo">
                    <Link href="/">
                      <img 
                        className="mobile-menu-logo" 
                        src="/images/logos/Aud_Logo_MM_Black.svg"
                        alt="Aud Studios mobile menu logo"
                      />
                    </Link>
                </div>
                <div className="menu-open">
                    <button 
                      onClick={toggleMenu}
                      aria-label="Open navigation menu"
                      aria-expanded={isMenuOpen}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <p>Menu</p>
                    </button>
                </div>
            </div>
        <nav className="menu-overlay" aria-label="Main navigation">
            <div className="menu-overlay-bar">
                <div className="menu-logo menu-logo-open">
                    <Link href="/">
                        <img 
                          className="mobile-menu-logo" 
                          src="/images/logos/Aud_Logo_MM.svg"
                          alt="Aud Studios mobile menu logo"
                        />
                    </Link>
                </div>
                <div className="menu-close">
                    <button 
                      onClick={toggleMenu}
                      aria-label="Close navigation menu"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <p>Close</p>
                    </button>
                </div>
            </div>
            <button 
              className="menu-close-icon" 
              onClick={toggleMenu}
              aria-label="Close navigation menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <p>&#x2715;</p>
            </button>
            <div className="menu-copy">
                <div className="menu-links">
                    {menuLinks.map((link, index) =>(
                        <div className="menu-link-item" key={index}>
                            <div className="menu-link-item-holder"  onClick={toggleMenu}>
                                <Link href={link.path} className="menu-link">
                                    {link.label}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="menu-info">
                    <div className="menu-info-col">
                    </div>
                    <div className="menu-info-col">
                    </div>
                </div>
            </div>
            <div className="menu-preview">
            </div>
        </nav>
    </div>
    );
};

export default MobileMenu
