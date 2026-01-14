import './homehero.css';

export default function Homehero() {
  return (
    <div className="home-hero-container">
      <video
        className="background-video"
        src="/videos/JPGHeroFinal_Land.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <img
        className="hero-logo"
        src="/images/AudGlassLogoV02.png"
        alt="Aud Studios glass logo"
      />
      <div className="hero-fade"></div>
    </div>
  );
}