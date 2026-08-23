import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Search, List, ArrowRight, Download, Maximize2, BookOpen, Plus, Minus, RotateCcw } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useLanguage } from "@/contexts/LanguageContext";
import { souvenir2025Toc, categoryLabels, type TocCategory } from "@/data/souvenir2025Toc";

const pdfUrl = "/emagazine/2025-2026/sankharitola-souvenir-2025-2026.pdf";

// নতুন সংযুক্ত সংস্করণ — ৩৮ পৃষ্ঠা, কোনো পৃষ্ঠা বাদ নেই
const pages = Array.from(
  { length: 38 },
  (_, i) => `/emagazine/2025-2026/page-${String(i + 1).padStart(2, "0")}.jpg`
);


const bnDigits = "০১২৩৪৫৬৭৮৯";
const hiDigits = "०१२३४५६७८९";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .split("")
    .map((ch) => {
      const b = bnDigits.indexOf(ch);
      if (b > -1) return String(b);
      const h = hiDigits.indexOf(ch);
      if (h > -1) return String(h);
      return ch;
    })
    .join("")
    .replace(/[\u200c\u200d]/g, "")
    .trim();

const toBengaliNumber = (n: number, lang: string) => {
  if (lang !== "bn") return String(n);
  return String(n)
    .split("")
    .map((d) => bnDigits[Number(d)] ?? d)
    .join("");
};

const Souvenir2025 = () => {
  const { t, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TocCategory | "all">("all");
  const [tocOpen, setTocOpen] = useState(true);
  const [gotoValue, setGotoValue] = useState("");
  const [gotoError, setGotoError] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [flip, setFlip] = useState<"next" | "prev" | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const zoomedRef = useRef(false);

  const goPrev = useCallback(() => {
    setIndex((i) => {
      if (i === 0) return i;
      setFlip("prev");
      return i - 1;
    });
  }, []);
  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i === pages.length - 1) return i;
      setFlip("next");
      return i + 1;
    });
  }, []);

  useEffect(() => {
    if (!flip) return;
    const id = window.setTimeout(() => setFlip(null), 340);
    return () => window.clearTimeout(id);
  }, [flip, index]);

  const flipClass = flip === "next" ? "animate-page-next" : flip === "prev" ? "animate-page-prev" : "";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        if (e.key === "Escape") setLightbox(false);
        return;
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const categories = useMemo(() => {
    const set = new Set<TocCategory>();
    souvenir2025Toc.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, []);

  const results = useMemo(() => {
    const q = normalize(query);
    return souvenir2025Toc.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false;
      if (!q) return true;
      const haystack = normalize(
        [
          String(entry.page),
          toBengaliNumber(entry.page, "bn"),
          ...Object.values(entry.title),
          ...Object.values(categoryLabels[entry.category]),
          ...entry.keywords,
        ].join(" ")
      );
      return haystack.includes(q);
    });
  }, [query, category]);

  const currentEntry = souvenir2025Toc.find((e) => e.page === index + 1);
  const progress = ((index + 1) / pages.length) * 100;

  const openPage = (page: number) => {
    setIndex(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoto = () => {
    const normalized = normalize(gotoValue);
    const page = parseInt(normalized, 10);
    if (!isNaN(page) && page >= 1 && page <= pages.length) {
      openPage(page);
      setGotoValue("");
      setGotoError(false);
    } else {
      setGotoError(true);
    }
  };

  useEffect(() => {
    const els = [viewerRef.current, lightboxRef.current].filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    let start: { x: number; y: number } | null = null;
    const handleStart = (e: TouchEvent) => {
      if (e.touches.length > 1 || zoomedRef.current) {
        start = null;
        return;
      }
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleEnd = (e: TouchEvent) => {
      if (!start || zoomedRef.current) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = start.x - endX;
      const diffY = start.y - endY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX > 0) goNext();
        else goPrev();
      }
      start = null;
    };
    els.forEach((el) => {
      el.addEventListener("touchstart", handleStart, { passive: true });
      el.addEventListener("touchend", handleEnd, { passive: true });
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("touchstart", handleStart);
        el.removeEventListener("touchend", handleEnd);
      });
    };
  }, [goPrev, goNext, lightbox]);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-2 text-center text-3xl font-bold text-primary md:text-4xl">
          {t("emagazine.souvenir2025")}
        </h1>
        <p className="mb-2 text-center text-sm text-muted-foreground">
          {t("emagazine.page_counter", {
            current: toBengaliNumber(index + 1, lang),
            total: toBengaliNumber(pages.length, lang),
          })}
        </p>
        {currentEntry && (
          <p className="mb-2 text-center text-sm font-medium text-foreground">
            {currentEntry.title[lang]}
          </p>
        )}

        <div className="mx-auto mb-6 flex max-w-xs flex-col items-center gap-2">
          <div className="flex w-full items-center gap-2">
            <input
              id="goto-page"
              type="text"
              inputMode="numeric"
              value={gotoValue}
              onChange={(e) => {
                setGotoValue(e.target.value);
                setGotoError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGoto();
              }}
              placeholder={t("emagazine.goto_placeholder")}
              aria-label={t("emagazine.goto")}
              className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              onClick={handleGoto}
              className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <span className="hidden sm:inline">{t("emagazine.goto")}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {gotoError && (
            <p className="text-center text-xs text-destructive">
              {t("emagazine.goto_invalid")}
            </p>
          )}
        </div>

        <div className="mx-auto mb-4 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <a
            href={pdfUrl}
            download="Sankharitola-Souvenir-2025-2026.pdf"
            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Download className="h-4 w-4" />
            {t("emagazine.download_pdf")}
          </a>
          <button
            onClick={() => setReadMode((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/20"
          >
            {readMode ? <Maximize2 className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            {readMode ? t("emagazine.fit_screen") : t("emagazine.read_mode")}
          </button>
        </div>

        <div className="mx-auto flex max-w-3xl items-stretch justify-center gap-2 md:gap-4">
          <button
            onClick={goPrev}
            disabled={index === 0}
            aria-label={t("emagazine.prev")}
            className="flex w-10 items-center justify-center rounded-md border border-border bg-card text-primary shadow-sm transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40 md:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={viewerRef}
            className="relative min-w-0 flex-1 rounded-lg border border-border bg-card p-2 shadow-sm touch-pan-y"
          >
            <button
              onClick={() => setLightbox(true)}
              aria-label={t("emagazine.zoom")}
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent/30"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            {readMode ? (
              <div className="max-h-[75dvh] overflow-auto rounded">
                <img
                  src={pages[index]}
                  alt={currentEntry ? currentEntry.title[lang] : `${t("emagazine.page")} ${index + 1}`}
                  onClick={() => setLightbox(true)}
                  className={`block w-full cursor-zoom-in rounded [image-rendering:-webkit-optimize-contrast] ${flipClass}`}
                />
              </div>
            ) : (
              <img
                src={pages[index]}
                alt={currentEntry ? currentEntry.title[lang] : `${t("emagazine.page")} ${index + 1}`}
                onClick={() => setLightbox(true)}
                className={`mx-auto block h-auto max-h-[70dvh] w-full max-w-full cursor-zoom-in rounded object-contain [image-rendering:-webkit-optimize-contrast] ${flipClass}`}
              />
            )}
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

        <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">
          {t("emagazine.swipe_hint")}
        </p>

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

        {/* সূচিপত্র ও সার্চ */}
        <section className="mx-auto mt-10 max-w-4xl rounded-lg border border-border bg-card p-4 shadow-sm md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
              <List className="h-5 w-5" />
              {t("emagazine.toc")}
            </h2>
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/20"
            >
              {tocOpen ? t("emagazine.hide_toc") : t("emagazine.show_toc")}
            </button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setTocOpen(true);
              }}
              aria-label={t("emagazine.search_label")}
              placeholder={t("emagazine.search_placeholder")}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label={t("emagazine.clear")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", ...categories] as (TocCategory | "all")[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-accent/20"
                }`}
              >
                {c === "all" ? t("emagazine.filter_all") : categoryLabels[c][lang]}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {t("emagazine.results", { count: toBengaliNumber(results.length, lang) })}
          </p>

          {tocOpen && (
            <div className="mt-3 max-h-[420px] overflow-y-auto rounded-md border border-border">
              {results.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  {t("emagazine.no_results")}
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {results.map((entry) => (
                    <li key={entry.page}>
                      <button
                        onClick={() => openPage(entry.page)}
                        className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/20 ${
                          entry.page === index + 1 ? "bg-accent/20" : ""
                        }`}
                      >
                        <span className="mt-0.5 min-w-9 rounded bg-primary/10 px-1.5 py-0.5 text-center text-xs font-semibold text-primary">
                          {toBengaliNumber(entry.page, lang)}
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-foreground">
                            {entry.title[lang]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {categoryLabels[entry.category][lang]}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

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
        <div ref={lightboxRef} className="fixed inset-0 z-50 bg-black/95">
          <div className="fixed right-4 top-4 z-20 flex items-center gap-2">
            <button
              onClick={() => {
                setLightbox(false);
                setLightboxZoom(false);
              }}
              className="rounded-full bg-background/20 p-2 text-primary-foreground backdrop-blur transition-colors hover:bg-background/40"
              aria-label={t("emagazine.close")}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={6}
            doubleClick={{ mode: "toggle", step: 1.6 }}
            wheel={{ step: 0.12 }}
            pinch={{ step: 5 }}
            centerOnInit
            onTransform={(ref) => {
              const zoomed = ref.state.scale > 1.01;
              zoomedRef.current = zoomed;
              setLightboxZoom(zoomed);
              setScale(ref.state.scale);
            }}
          >
            {({ zoomIn, zoomOut, resetTransform, setTransform, instance }) => (
              <>
                <div className="fixed right-4 top-16 z-20 sm:top-4 sm:right-14">
                  <button
                    onClick={() => {
                      resetTransform();
                      setLightboxZoom(false);
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-background/20 px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur transition-colors hover:bg-background/40"
                    aria-label={t("emagazine.fit_screen")}
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("emagazine.fit_screen")}</span>
                  </button>
                </div>
                <div className="fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-background/20 px-2 py-1.5 backdrop-blur">
                  <button
                    onClick={() => zoomOut()}
                    aria-label="Zoom out"
                    className="rounded-full p-1.5 text-primary-foreground transition-colors hover:bg-background/40"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      resetTransform();
                      setLightboxZoom(false);
                    }}
                    aria-label={t("emagazine.fit_screen")}
                    className="rounded-full p-1.5 text-primary-foreground transition-colors hover:bg-background/40"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => zoomIn()}
                    aria-label={t("emagazine.zoom")}
                    className="rounded-full p-1.5 text-primary-foreground transition-colors hover:bg-background/40"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <TransformComponent
                  wrapperClass="!h-[100dvh] !w-screen"
                  contentClass="!h-[100dvh] !w-screen items-center justify-center"
                >
                  <img
                    src={pages[index]}
                    alt={currentEntry ? currentEntry.title[lang] : `${t("emagazine.page")} ${index + 1}`}
                    draggable={false}
                    className={`mx-auto max-h-[100dvh] w-full max-w-[100vw] select-none object-contain [image-rendering:-webkit-optimize-contrast] ${
                      lightboxZoom ? "cursor-grab" : "cursor-zoom-in"
                    } ${flipClass}`}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
          <p className="pointer-events-none fixed left-1/2 top-4 z-10 -translate-x-1/2 text-xs text-primary-foreground/70">
            {t("emagazine.pinch_hint")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Souvenir2025;
