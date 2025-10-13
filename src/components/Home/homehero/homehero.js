import './homehero.css';

export default function Homehero() {
  return (
    <div className="home-hero-container">
      <video
        className="background-video"
        src="/videos/Aud_Land_Video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <h1 className="hero-title">we are not the standard.<span className='font-bold'> we are aud studios.</span></h1>
      <img className="hero-logo" src="/images/AudGlassLogoV02.png"></img>
      <div className='hero-fade'></div>
    </div>
  );
}
