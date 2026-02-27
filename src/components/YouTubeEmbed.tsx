interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

const YouTubeEmbed = ({ videoId, title }: YouTubeEmbedProps) => {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-border shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  );
};

export default YouTubeEmbed;
