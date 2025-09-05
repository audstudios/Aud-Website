import './landvideotwo.css';

export default function LandVideoTwo({ src = '/videos/Aud_Land_Video.mp4' }) {
  return (
    <div className="landvideo-background">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="video-bg"
      />
      <div className="video-overlay-content">
      <p><span className='aud-inline'>aud studios</span>  is a boutique production agency founded by longtime co-producers Madeline Corley and Syd Ross. We specialize in luxury experiential capture, brand campaigns, and full-scale commercial production, bringing strategic thinking, creativity, and precision to every project </p>
      </div>
    </div>
  );
}
