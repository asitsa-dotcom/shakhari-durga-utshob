import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const EMagazine = () => {
  const { t } = useLanguage();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-center text-4xl font-bold text-primary">
          {t("emagazine.title")}
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          {t("emagazine.subtitle")}
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/emagazine/2025-2026"
            className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-card-foreground group-hover:text-primary">
              {t("emagazine.souvenir2025")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("emagazine.souvenir2025_desc")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EMagazine;
