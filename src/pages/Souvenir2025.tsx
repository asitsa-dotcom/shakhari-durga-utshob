import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const pages = Array.from({ length: 38 }, (_, i) => {
  const n = i + 1;
  const part = n <= 19 ? `p1-${String(n).padStart(2, "0")}` : `p2-${String(n - 19).padStart(2, "0")}`;
  return `/emagazine/2025-2026/${part}.jpg`;
});

const Souvenir2025 = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(pages.length - 1, i + 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const progress = ((index + 1) / pages.length) * 100;

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-2 text-center text-3xl font-bold text-primary md:text-4xl">
          {t("emagazine.souvenir2025")}
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t("emagazine.page_counter", { current: index + 1, total: pages.length })}
        </p>

        <div className="mx-auto flex max-w-3xl items-stretch justify-center gap-2 md:gap-4">
          <button
            onClick={goPrev}
            disabled={index === 0}
            aria-label={t("emagazine.prev")}
            className="flex w-10 items-center justify-center rounded-md border border-border bg-card text-primary shadow-sm transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40 md:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative flex-1 rounded-lg border border-border bg-card p-2 shadow-sm">
            <button
              onClick={() => setLightbox(true)}
              aria-label={t("emagazine.zoom")}
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent/30"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <img
              src={pages[index]}
              alt={`${t("emagazine.page")} ${index + 1}`}
              className="mx-auto block max-h-[70vh] w-auto rounded object-contain"
            />
          </div>

          <button
            onClick={goNext}
            disabled={index === pages.length - 1}
            aria-label={t("emagazine.next")}
            className="flex w-10 items-center justify-center rounded-md border border-border bg-card text-primary shadow-sm transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40 md:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("emagazine.progress")}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("emagazine.thumbnails")}
          </p>
          <div className="flex gap-2 overflow-x-auto rounded-lg border border-border bg-card p-3">
            {pages.map((url, i) => (
              <button
                key={url}
                onClick={() => setIndex(i)}
                className={`relative shrink-0 overflow-hidden rounded border transition-all ${
                  i === index
                    ? "border-primary ring-1 ring-primary"
                    : "border-border opacity-70 hover:opacity-100"
                }`}
                style={{ width: "60px", aspectRatio: "1075/1521" }}
                aria-label={`${t("emagazine.page")} ${i + 1}`}
              >
                <img
                  src={url}
                  alt={`${t("emagazine.page")} ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-white backdrop-blur transition-colors hover:bg-background/40"
            aria-label={t("emagazine.close")}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={pages[index]}
            alt={`${t("emagazine.page")} ${index + 1}`}
            className="max-h-[92vh] max-w-[96vw] rounded object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Souvenir2025;
