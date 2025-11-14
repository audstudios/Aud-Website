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
                    <h3><span className='font-bold'>Let’s make something great together. </span></h3>
                </div>
                <div className="homecontact-button">
                    <a className="homecontact-link" href="#">We&apos;d love to connect</a>
                </div>
            </div>
            <div className="homecontact-logos">
                <img className="homecontact-image" src="/images/Aud_LogoGradientStack.png"></img>
            </div>
        </div>
    </div>
  );
}
