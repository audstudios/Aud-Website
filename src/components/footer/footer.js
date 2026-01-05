import './footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
        <div className="footer-wrapper">
            <div className="footer-logo-wrapper">
                <img 
                  className="footer-logo" 
                  src="/images/audfooterlogo.svg"
                  alt="Aud Studios logo"
                />
                <div className="footer-logo-byline">
                    <span>We are not the standard.</span>
                    <span className='font-bold'>We are aud studios.</span>
                </div>
            </div>
            <div className="footer-contact-wrapper">
                <div className="footer-contact-title">
                    <h4>
                        Contact
                    </h4>
                    <div className="address">
                        <div className='footer-info-flex pb-15'>
                            <img 
                              className='footer-icons' 
                              src="/icons/mail.svg"
                              alt="mail icon"
                              role="presentation"
                            />
                            <p>web@audstudios.com</p>
                        </div>
                        <div className='footer-info-flex pb-15'>
                            <img 
                              className='footer-icons instagram-icon' 
                              src="/icons/instagram.svg"
                              alt="instagram icon"
                              role="presentation"
                            />
                            <p>
                              <a 
                                className='audlinks-white' 
                                href="https://www.instagram.com/the.audstudios/?igsh=NW9ycnc1YzJkaG5w#"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                @the.audstudios
                              </a>
                            </p> 
                        </div>
                        <div className='footer-info-flex'>
                            <img 
                              className='footer-icons instagram-icon' 
                              src="/icons/linkedin.svg"
                              alt="linkedin icon"
                              role="presentation"
                            />
                            <p>
                              <a 
                                className='audlinks-white' 
                                href="https://www.linkedin.com/company/aud-studios/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                LinkedIn
                              </a>
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
