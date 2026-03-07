import { Flower2, Flag, Music, Trophy, Heart, Sun, Award, Users, UtensilsCrossed, Stethoscope, ImagePlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const activityKeys = [
  { icon: Flower2, titleKey: "activities.durga", descKey: "activities.durga_desc" },
  { icon: Sun, titleKey: "activities.khuti", descKey: "activities.khuti_desc" },
  { icon: Heart, titleKey: "activities.dol", descKey: "activities.dol_desc" },
  { icon: Flag, titleKey: "activities.independence", descKey: "activities.independence_desc" },
  { icon: Award, titleKey: "activities.republic", descKey: "activities.republic_desc" },
  { icon: Music, titleKey: "activities.rabindra", descKey: "activities.rabindra_desc" },
  { icon: Trophy, titleKey: "activities.sports", descKey: "activities.sports_desc" },
];

const socialSubSections = [
  {
    icon: UtensilsCrossed,
    titleKey: "activities.bhog",
    descKey: "activities.bhog_desc",
    photos: [] as string[],
  },
  {
    icon: Stethoscope,
    titleKey: "activities.health",
    descKey: "activities.health_desc",
    photos: [] as string[],
  },
  {
    icon: Heart,
    titleKey: "activities.cloth",
    descKey: "activities.cloth_desc",
    photos: [] as string[],
  },
];

const Activities = () => {
  const { t } = useLanguage();
  const [subPhotos, setSubPhotos] = useState<Record<string, string[]>>({
    "activities.bhog": [],
    "activities.health": [],
    "activities.cloth": [],
  });

  const handlePhotoAdd = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos: string[] = [];
    Array.from(files).forEach((file) => {
      newPhotos.push(URL.createObjectURL(file));
    });
    setSubPhotos((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), ...newPhotos],
    }));
  };

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

          {/* সামাজিক কর্মসূচি - Main Card with Sub-sections */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground">{t("activities.social")}</h3>
            </div>
            <p className="mb-6 text-muted-foreground leading-relaxed">{t("activities.social_desc")}</p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {socialSubSections.map((sub) => (
                <div
                  key={sub.titleKey}
                  className="rounded-lg border border-border/60 bg-muted/30 p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <sub.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-card-foreground">{t(sub.titleKey)}</h4>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{t(sub.descKey)}</p>

                  {/* Photos Grid */}
                  {subPhotos[sub.titleKey]?.length > 0 && (
                    <div className="mb-3 grid grid-cols-3 gap-2">
                      {subPhotos[sub.titleKey].map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`${t(sub.titleKey)} ${idx + 1}`}
                          className="h-20 w-full rounded-md object-cover"
                        />
                      ))}
                    </div>
                  )}

                  {/* Add Photo Button */}
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-primary/40 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5">
                    <ImagePlus className="h-4 w-4" />
                    ছবি যোগ করুন
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotoAdd(sub.titleKey, e)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
