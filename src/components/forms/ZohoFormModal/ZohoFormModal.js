'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ZohoFormModal.css';

export default function ZohoFormModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // GSAP animation for opening
      const tl = gsap.timeline();
      
      // Fade in overlay
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Scale and fade in content
      tl.fromTo(
        contentRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      );
    } else {
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    // GSAP animation for closing
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    
    // Scale down and fade out content
    tl.to(contentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
    
    // Fade out overlay
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      },
      '-=0.1'
    );
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const validateEmail = (email) => {
    const emailExp = /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
    return emailExp.test(email.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('Name_First')?.trim() || '';
    const lastName = formData.get('Name_Last')?.trim() || '';
    const email = formData.get('Email')?.trim() || '';
    const message = formData.get('MultiLine')?.trim() || '';
    
    const newErrors = {};

    // Validate first name
    if (!firstName) {
      newErrors.Name = 'First name is required';
    }

    // Validate last name
    if (!lastName) {
      newErrors.Name = 'Last name is required';
    }

    // Validate email
    if (!email) {
      newErrors.Email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.Email = 'Please enter a valid email address';
    }

    // Validate message
    if (!message) {
      newErrors.MultiLine = 'Please leave us a message';
    }

    // If there are errors, show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    
    // Submit the form
    e.target.submit();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef} 
      className="zoho-form-modal"
      style={{ opacity: 1 }}
    >
      <div
        ref={overlayRef}
        className="zoho-form-modal-overlay"
        onClick={handleOverlayClick}
        style={{ opacity: 0 }}
      >
        <div
          ref={contentRef}
          className="zoho-form-modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ opacity: 0 }}
        >
          <button className="zoho-form-modal-close" onClick={handleClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="zoho-form-wrapper">
            <div className="zf-templateWidth">
              <form 
                ref={formRef}
                action='https://forms.zohopublic.com/webaudst1/form/ContactUs/formperma/xzFbK-sIk0kkdwv8TrSOpd6_95LKypEbk3rwfc1vxm8/htmlRecords/submit' 
                name='form'
                method='POST'
                onSubmit={handleSubmit}
                acceptCharset='UTF-8' 
                encType='multipart/form-data' 
                id='form'
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                
                <div className="zf-templateWrapper">
                  <ul className="zf-tempHeadBdr">
                    <li className="zf-tempHeadContBdr">
                      <h2 className="zf-frmTitle">
                        <em>Contact Us</em>
                      </h2>
                      <p className="zf-frmDesc"></p>
                      <div className="zf-clearBoth"></div>
                    </li>
                  </ul>
                  
                  <div className="zf-subContWrap zf-topAlign">
                    <ul>	
                      <div className="zf-tempFrmWrapper zf-name zf-namelarge">
                        <label className="zf-labelName"> 
                          Full name 
                          <em className="zf-important"> *</em> 
                        </label>
                        <div className="zf-tempContDiv zf-twoType">
                          <div className="zf-nameWrapper">
                            <span> 
                              <input 
                                type="text" 
                                maxLength="255" 
                                name="Name_First" 
                                data-fieldtype="7" 
                                placeholder=""
                                onChange={() => setErrors(prev => ({ ...prev, Name: '' }))}
                              />
                              <label>First</label> 
                            </span>
                            <span> 
                              <input 
                                type="text" 
                                maxLength="255" 
                                name="Name_Last" 
                                data-fieldtype="7" 
                                placeholder=""
                                onChange={() => setErrors(prev => ({ ...prev, Name: '' }))}
                              />
                              <label>Last</label> 
                            </span>
                            <div className="zf-clearBoth"></div>
                          </div>
                          {errors.Name && (
                            <p className="zf-errorMessage" style={{display:'block'}}>
                              {errors.Name}
                            </p>
                          )}
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      
                      <div className="zf-tempFrmWrapper zf-large">
                        <label className="zf-labelName">  
                          Email 
                          <em className="zf-important"> *</em> 
                        </label>
                        <div className="zf-tempContDiv">
                          <span> 
                            <input 
                              type="text" 
                              name="Email" 
                              data-checktype="c5" 
                              defaultValue="" 
                              maxLength="255" 
                              data-fieldtype="9" 
                              placeholder=""
                              onChange={() => setErrors(prev => ({ ...prev, Email: '' }))}
                            /> 
                          </span>
                          {errors.Email && (
                            <p className="zf-errorMessage" style={{display: 'block'}}>
                              {errors.Email}
                            </p>
                          )}
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      
                      <div className="zf-tempFrmWrapper zf-large">
                        <label className="zf-labelName">  
                          Leave us a few words 
                          <em className="zf-important"> *</em> 
                        </label>
                        <div className="zf-tempContDiv">
                          <span> 
                            <textarea 
                              name="MultiLine" 
                              data-checktype="c1" 
                              maxLength="65535" 
                              placeholder=""
                              onChange={() => setErrors(prev => ({ ...prev, MultiLine: '' }))}
                            ></textarea> 
                          </span>
                          {errors.MultiLine && (
                            <p className="zf-errorMessage" style={{display: 'block'}}>
                              {errors.MultiLine}
                            </p>
                          )}
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                    </ul>
                  </div>
                  
                  <ul>
                    <li className="zf-fmFooter">
                      <button type="submit" className="zf-submitColor">Submit</button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}