// src/components/Home/homecontact/homecontact.js
// Updated to fetch contact section content from Sanity

'use client';

import { useState, useEffect } from 'react';
import './homecontact.css';
import ContactFormModal from '@/components/forms/ContactFormModal/ContactFormModal';
import { client } from '@/sanity/lib/client';
import { contactSectionQuery } from '@/sanity/lib/queries';

// Hardcoded fallback
const FALLBACK = {
  subtitle: 'Contact Us',
  heading: "Whether you're at an agency, in-house, or a fellow creative, we'd love to connect.",
  buttonText: "Let's chat",
};

export default function HomeContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(FALLBACK);

  useEffect(() => {
    async function fetchContent() {
      try {
        if (client) {
          const data = await client.fetch(contactSectionQuery);
          if (data) {
            setContent({
              subtitle: data.subtitle || FALLBACK.subtitle,
              heading: data.heading || FALLBACK.heading,
              buttonText: data.buttonText || FALLBACK.buttonText,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching contact section:', error);
      }
    }
    fetchContent();
  }, []);

  return (
    <>
      <div className="homecontact-container">
        <div className="homecontact-wrapper">
          <div className="homecontact-box">
            <div className="homecontact-subtitle">
              <p>{content.subtitle}</p>
            </div>
            <div className="homecontact-maincontent">
              <h3><span className='font-bold'>{content.heading}</span></h3>
            </div>
            <div className="homecontact-button">
              <button 
                className="homecontact-link" 
                onClick={() => setIsModalOpen(true)}
              >
                {content.buttonText}
              </button>
            </div>
          </div>
          <div className="homecontact-logos">
            <img 
              className="homecontact-image" 
              src="/images/Aud_LogoGradientStack.png" 
              alt="Aud Studios gradient logo stack"
            />
          </div>
        </div>
      </div>

      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}