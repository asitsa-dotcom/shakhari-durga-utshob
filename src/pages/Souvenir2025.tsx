import { useState, useCallback, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Search, List, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { souvenir2025Toc, categoryLabels, type TocCategory } from "@/data/souvenir2025Toc";

const pages = Array.from({ length: 38 }, (_, i) => {
  const n = i + 1;
  const part = n <= 19 ? `p1-${String(n).padStart(2, "0")}` : `p2-${String(n - 19).padStart(2, "0")}`;
  return `/emagazine/2025-2026/${part}.jpg`;
});

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

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(pages.length - 1, i + 1)), []);

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
          <p className="mb-8 text-center text-sm font-medium text-foreground">
            {currentEntry.title[lang]}
          </p>
        )}

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
              alt={currentEntry ? currentEntry.title[lang] : `${t("emagazine.page")} ${index + 1}`}
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
