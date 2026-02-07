const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  poster="/video-poster.jpg"
  className="fixed inset-0 w-full h-full
  object-cover scale-100
  -z-10
  will-change-transform
  transform-gpu"
>
  <source
    src="/FinTrackVideo.mp4"
    type="video/mp4"
  />
</video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 "></div>
    </div>
  );
};

export default BackgroundVideo;
