import './footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
        <div className="footer-wrapper">
            <div className="footer-logo-wrapper">
                <img className="footer-logo" src="/images/audfooterlogo.svg"></img>
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
                        <p>web@audstudios.com</p>
                        <p>@the.audstudios</p> 
                    </div>
                </div>
            </div>
            {/*<div className="footer-sitemap-wrapper">
                <a className="footer-link" href="#">Home</a>
                <a className="footer-link" href="#">Work</a>
                <a className="footer-link" href="#">About</a>
                <a className="footer-link" href="#">Services</a>
                <a className="footer-link" href="#">Aud Jobs</a>                
            </div>*/}
        </div>
    </div>
  );
}
