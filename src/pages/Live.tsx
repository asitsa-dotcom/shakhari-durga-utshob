import { Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Live = () => {
  const { t } = useLanguage();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Radio className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-primary">{t("live.title")}</h1>
        </div>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
          {t("live.description")}
        </p>

        <div className="mx-auto max-w-3xl">
          <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
            <div className="text-center text-muted-foreground">
              <Radio className="mx-auto mb-3 h-12 w-12 opacity-40" />
              <p className="text-lg font-medium">{t("live.coming_soon")}</p>
              <p className="mt-1 text-sm opacity-60">{t("live.watch_here")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
