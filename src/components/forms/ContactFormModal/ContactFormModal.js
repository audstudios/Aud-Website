'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ContactFormModal.css';

export default function ContactFormModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      onComplete: () => {
        onClose();
        // Reset form state after close animation
        setErrors({});
        setSubmitStatus(null);
        if (formRef.current) {
          formRef.current.reset();
        }
      },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    
    const newErrors = {};

    // Validate name
    if (!name) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!message) {
      newErrors.message = 'Please leave us a message';
    }

    // If there are errors, show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        formRef.current.reset();
        // Close modal after 2 seconds on success
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef} 
      className="contact-form-modal"
      style={{ opacity: 1 }}
    >
      <div
        ref={overlayRef}
        className="contact-form-modal-overlay"
        onClick={handleOverlayClick}
        style={{ opacity: 0 }}
      >
        <div
          ref={contentRef}
          className="contact-form-modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ opacity: 0 }}
        >
          <button className="contact-form-modal-close" onClick={handleClose}>
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
          
          <div className="contact-form-wrapper">
            <div className="contact-form-container">
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="contact-form-header">
                  <h2 className="contact-form-title">
                    <em>Contact Us</em>
                  </h2>
                </div>
                
                <div className="contact-form-body">
                  <div className="contact-form-field">
                    <label className="contact-form-label"> 
                      Name 
                      <em className="contact-form-required"> *</em> 
                    </label>
                    <div className="contact-form-input-wrapper">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Your name"
                        onChange={() => setErrors(prev => ({ ...prev, name: '' }))}
                      />
                      {errors.name && (
                        <p className="contact-form-error">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="contact-form-field">
                    <label className="contact-form-label">  
                      Email 
                      <em className="contact-form-required"> *</em> 
                    </label>
                    <div className="contact-form-input-wrapper">
                      <input 
                        type="text" 
                        name="email" 
                        placeholder="your.email@example.com"
                        onChange={() => setErrors(prev => ({ ...prev, email: '' }))}
                      /> 
                      {errors.email && (
                        <p className="contact-form-error">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="contact-form-field">
                    <label className="contact-form-label">  
                      Leave us a message 
                      <em className="contact-form-required"> *</em> 
                    </label>
                    <div className="contact-form-input-wrapper">
                      <textarea 
                        name="message" 
                        placeholder="Tell us about your project..."
                        onChange={() => setErrors(prev => ({ ...prev, message: '' }))}
                      ></textarea> 
                      {errors.message && (
                        <p className="contact-form-error">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="contact-form-success">
                      Thank you! We'll be in touch soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="contact-form-error-message">
                      Something went wrong. Please try again or email us directly at web@audstudios.com
                    </div>
                  )}
                </div>
                
                <div className="contact-form-footer">
                  <button 
                    type="submit" 
                    className="contact-form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}