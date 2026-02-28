import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-primary/90 to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604423058082-00e1a3fabb5b?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 px-4 py-16 text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-4 text-xl font-medium opacity-90 md:text-2xl">
            {t("home.subtitle")}
          </p>
          <div className="mt-6 inline-block rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 backdrop-blur">
            <p className="text-sm opacity-90">{t("home.reg_label")}</p>
            <p className="mt-1 text-sm font-semibold">
              Registration No: S0062454 (2025–2026)
            </p>
          </div>
        </div>
      </section>

      {/* Theme Song 2025 */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-primary">
          {t("home.theme2025")}
        </h2>
        <div className="mx-auto max-w-3xl">
          <YouTubeEmbed videoId="zUTD7gZQ8pc" title="Official Theme Song 2025" />
        </div>
      </section>

      {/* Theme Song 2024 */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
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
