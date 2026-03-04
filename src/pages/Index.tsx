import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/images/durga-hero.jpg')] bg-cover bg-[center_top_25%] bg-no-repeat" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex min-h-[70vh] flex-col px-4 py-6 text-center">
          {/* Top: Title + Subtitle */}
          <div className="pt-0">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              {t("home.title")}
            </h1>
            <p className="mt-2 text-lg font-medium opacity-90 md:text-2xl">
              {t("home.subtitle")}
            </p>
          </div>

          {/* Spacer for face visibility */}
          <div className="flex-1" />

          {/* Bottom: Registration only */}
          <div className="pb-2">
            <div className="inline-block rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 backdrop-blur">
              <p className="text-sm opacity-90">{t("home.reg_label")}</p>
              <p className="mt-1 text-sm font-semibold">
                Registration No: S0062454 (2025–2026)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Song 2025 */}
      <section className="relative" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604423058082-00e1a3fabb5b?w=800')] bg-center bg-no-repeat opacity-[0.06]" />
        <div className="container relative z-10 mx-auto px-4 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary">
            {t("home.theme2025")}
          </h2>
          <div className="mx-auto max-w-3xl">
            <YouTubeEmbed videoId="zUTD7gZQ8pc" title="Official Theme Song 2025" />
          </div>
        </div>
      </section>

      {/* Theme Song 2024 */}
      <section className="relative bg-background">
        <div className="container relative z-10 mx-auto px-4 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary">
            {t("home.theme2024")}
          </h2>
          <div className="mx-auto max-w-3xl">
            <YouTubeEmbed videoId="pszClHCwCZw" title="Official Theme Song 2024" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
