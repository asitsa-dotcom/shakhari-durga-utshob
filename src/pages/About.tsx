import { BookOpen, Users, Trophy, Shield } from "lucide-react";

const goals = [
  { icon: BookOpen, title: "সাংস্কৃতিক চর্চার প্রসার" },
  { icon: Users, title: "সামাজিক উদ্যোগ গ্রহণ" },
  { icon: Trophy, title: "যুব সমাজকে এগিয়ে আনা" },
  { icon: Shield, title: "ঐতিহ্য সংরক্ষণ" },
];

const About = () => {
  return (
    <div>
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-center text-4xl font-bold text-primary">
            আমাদের কথা
          </h1>
          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-card-foreground">
              শাঁখারিটোলা দুর্গোৎসব সমিতি একটি নিবন্ধিত সামাজিক ও সাংস্কৃতিক সংগঠন। এলাকার মানুষের পারস্পরিক বন্ধন, ঐতিহ্য রক্ষা ও সাংস্কৃতিক চর্চাকে কেন্দ্র করে এই সমিতির পথচলা। দুর্গাপূজাকে কেন্দ্র করে আমরা শুধু উৎসবই নয়, সারাবছর বিভিন্ন সামাজিক ও সাংস্কৃতিক কর্মসূচির আয়োজন করে থাকি।
            </p>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-primary">
          আমাদের লক্ষ্য
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {goals.map((goal) => (
            <div
              key={goal.title}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <goal.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg font-semibold text-card-foreground">{goal.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Address */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary">ঠিকানা</h2>
          <p className="text-lg text-muted-foreground">
            ৬/১বি/১এ, ক্রীক লেন, কলকাতা – ৭০০০১৪
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
