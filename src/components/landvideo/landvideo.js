import './LandVideo.css';

export default function LandVideo({
    src = '/videos/Aud_Land_Video.mp4',
    width = 720,
    autoPlay = true,
    loop = true,
    muted = true
}) {
  return (
    <div className="landvideo-container">
      <video
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        width={width}
      />
    </div>
  );
}
