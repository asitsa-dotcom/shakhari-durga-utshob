import { User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const leaderKeys = [
  "leadership.president",
  "leadership.vice_president",
  "leadership.secretary",
  "leadership.joint_secretary",
  "leadership.treasurer",
];

const Leadership = () => {
  const { t } = useLanguage();

  const executiveMembers = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          {t("leadership.title")}
        </h1>

        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaderKeys.map((key) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-6 shadow-sm text-center"
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-bold text-card-foreground">{t(key)}</p>
              <p className="mt-1 text-muted-foreground">—</p>
            </div>
          ))}
        </div>

        <h2 className="mb-8 text-center text-2xl font-bold text-primary">
          {t("leadership.executive")}
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {executiveMembers.map((id) => (
            <div
              key={id}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-card-foreground">
                {t("leadership.executive_member")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
