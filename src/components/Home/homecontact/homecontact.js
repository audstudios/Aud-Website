'use client';

import { useState } from 'react';
import './homecontact.css';
import ContactFormModal from '@/components/forms/ContactFormModal/ContactFormModal';

export default function HomeContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
