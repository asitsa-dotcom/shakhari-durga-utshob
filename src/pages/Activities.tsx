import { Flower2, Flag, Music, Trophy, Heart, Sun, Award, Users } from "lucide-react";

const activities = [
  {
    icon: Flower2,
    title: "দুর্গাপূজা",
    description: "প্রতিবছর ثبতিগতভাবে মহাসমারোহে দুর্গাপূজা আয়োজন করা হয়। শিল্পীদের তৈরি অপূর্ব প্রতিমা ও সাংস্কৃতিক অনুষ্ঠান আমাদের পূজার অন্যতম আকর্ষণ।",
  },
  {
    icon: Sun,
    title: "খুঁটি পূজা",
    description: "দুর্গাপূজার সূচনা হিসেবে ঐতিহ্যবাহী খুঁটি পূজার আয়োজন করা হয়। এটি আমাদের উৎসবের শুভ সূচনা।",
  },
  {
    icon: Heart,
    title: "দোল উৎসব",
    description: "রঙের উৎসব দোলযাত্রা উদযাপন করা হয় সকলের অংশগ্রহণে। আনন্দ ও সৌহার্দ্যের এক অনন্য উদযাপন।",
  },
  {
    icon: Flag,
    title: "স্বাধীনতা দিবস উদযাপন",
    description: "প্রতিবছর ১৫ই আগস্ট জাতীয় পতাকা উত্তোলন ও সাংস্কৃতিক অনুষ্ঠানের মাধ্যমে স্বাধীনতা দিবস পালন করা হয়।",
  },
  {
    icon: Award,
    title: "প্রজাতন্ত্র দিবস",
    description: "২৬শে জানুয়ারি প্রজাতন্ত্র দিবস উপলক্ষে পতাকা উত্তোলন ও বিভিন্ন সামাজিক কর্মসূচি পালিত হয়।",
  },
  {
    icon: Music,
    title: "রবীন্দ্রজয়ন্তী",
    description: "কবিগুরু রবীন্দ্রনাথ ঠাকুরের জন্মজয়ন্তী উপলক্ষে সাংস্কৃতিক সন্ধ্যা ও স্মরণানুষ্ঠানের আয়োজন।",
  },
  {
    icon: Trophy,
    title: "ক্রীড়া প্রতিযোগিতা",
    description: "এলাকার যুব সমাজের জন্য বিভিন্ন ক্রীড়া প্রতিযোগিতার আয়োজন করা হয়। খেলাধুলার মাধ্যমে সুস্থ প্রতিযোগিতার চর্চা।",
  },
  {
    icon: Users,
    title: "সামাজিক কর্মসূচি",
    description: "রক্তদান শিবির, স্বাস্থ্য পরীক্ষা শিবির ও অন্যান্য সামাজিক কর্মকাণ্ডের আয়োজন করা হয় সারাবছর।",
  },
];

const Activities = () => {
  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          আমাদের কার্যক্রম
        </h1>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">{activity.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
