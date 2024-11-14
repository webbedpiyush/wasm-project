export default function VideoDisplay({ videoUrl }: { videoUrl: string }) {
  return (
    <video
      id="condense-video-player"
      controls
      className="h-full w-full rounded-3xl"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
