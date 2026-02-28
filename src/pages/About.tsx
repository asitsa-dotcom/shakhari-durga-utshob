import { BookOpen, Users, Trophy, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const goals = [
    { icon: BookOpen, key: "about.obj1" },
    { icon: Users, key: "about.obj2" },
    { icon: Trophy, key: "about.obj3" },
    { icon: Shield, key: "about.obj4" },
  ];

  return (
    <div>
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-center text-4xl font-bold text-primary">
            {t("about.title")}
          </h1>
          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-card-foreground">
              {t("about.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-primary">
          {t("about.objectives")}
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {goals.map((goal) => (
            <div
              key={goal.key}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <goal.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg font-semibold text-card-foreground">{t(goal.key)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary">{t("about.address_label")}</h2>
          <p className="text-lg text-muted-foreground">{t("about.address")}</p>
        </div>
      </section>
    </div>
  );
};

export default About;
