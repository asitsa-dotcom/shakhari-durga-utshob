import { Flower2, Flag, Music, Trophy, Heart, Sun, Award, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const activityKeys = [
  { icon: Flower2, titleKey: "activities.durga", descKey: "activities.durga_desc" },
  { icon: Sun, titleKey: "activities.khuti", descKey: "activities.khuti_desc" },
  { icon: Heart, titleKey: "activities.dol", descKey: "activities.dol_desc" },
  { icon: Flag, titleKey: "activities.independence", descKey: "activities.independence_desc" },
  { icon: Award, titleKey: "activities.republic", descKey: "activities.republic_desc" },
  { icon: Music, titleKey: "activities.rabindra", descKey: "activities.rabindra_desc" },
  { icon: Trophy, titleKey: "activities.sports", descKey: "activities.sports_desc" },
  { icon: Users, titleKey: "activities.social", descKey: "activities.social_desc" },
];

const Activities = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          {t("activities.title")}
        </h1>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {activityKeys.map((activity) => (
            <div
              key={activity.titleKey}
              className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">{t(activity.titleKey)}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t(activity.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
