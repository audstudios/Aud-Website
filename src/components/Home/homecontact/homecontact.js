'use client';

import { useState, useEffect } from 'react';
import './homecontact.css';
import ZohoFormModal from '@/components/forms/ZohoFormModal/ZohoFormModal';

export default function HomeContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load Zoho validation script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/zoho-validation.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="homecontact-container">
        <div className="homecontact-wrapper">
          <div className="homecontact-box">
            <div className="homecontact-subtitle">
              <p>Contact Us</p>
            </div>
            <div className="homecontact-maincontent">
              <h3><span className='font-bold'>Let&apos;s make something great together. </span></h3>
            </div>
            <div className="homecontact-button">
              <button 
                className="homecontact-link" 
                onClick={() => setIsModalOpen(true)}
              >
                We&apos;d love to connect
              </button>
            </div>
          </div>
          <div className="homecontact-logos">
            <img className="homecontact-image" src="/images/Aud_LogoGradientStack.png" alt="Aud Studios Logo"></img>
          </div>
        </div>
      </div>

      <ZohoFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}