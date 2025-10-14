import './homecontact.css';

export default function HomeContact() {
  return (
    <div className="homecontact-container">
        <div className="homecontact-wrapper">
            <div className="homecontact-box">
                <div className="homecontact-subtitle">
                    <p>Contact Us</p>
                </div>
                <div className="homecontact-maincontent">
                    <h3><span className='font-bold'>Let’s collaborate to set a new standard and bring your ideas to life.</span></h3>
                    <h3>We&apos;d love to connect</h3>
                </div>
                <div className="homecontact-button">
                    <a className="homecontact-link" href="#">Let&apos;s talk</a>
                </div>
            </div>
            <div className="homecontact-logos">
                <img className="homecontact-image" src="/images/Aud_LogoGradientStack.png"></img>
            </div>
        </div>
    </div>
  );
}
