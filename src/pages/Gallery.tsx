import { ImageIcon, Video } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const placeholderPhotos = Array.from({ length: 6 }, (_, i) => i + 1);

const Gallery = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          গ্যালারি
        </h1>

        {/* Photo Grid */}
        <section className="mb-16">
          <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-primary">
            <ImageIcon className="h-6 w-6" /> ছবি
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderPhotos.map((num) => (
              <div
                key={num}
                className="flex aspect-[4/3] items-center justify-center rounded-lg border border-border bg-muted"
              >
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p className="text-sm">ছবি {num}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section>
          <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-primary">
            <Video className="h-6 w-6" /> ভিডিও
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <YouTubeEmbed videoId="zUTD7gZQ8pc" title="Theme Song 2025" />
            <YouTubeEmbed videoId="pszClHCwCZw" title="Theme Song 2024" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
