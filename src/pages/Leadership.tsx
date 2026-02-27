import { User } from "lucide-react";

const leaders = [
  { role: "সভাপতি", name: "—" },
  { role: "সহ-সভাপতি", name: "—" },
  { role: "সম্পাদক", name: "—" },
  { role: "সহ-সম্পাদক", name: "—" },
  { role: "কোষাধ্যক্ষ", name: "—" },
];

const executiveMembers = Array.from({ length: 6 }, (_, i) => ({
  role: "কার্যকরী সদস্য",
  name: "—",
  id: i,
}));

const Leadership = () => {
  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          সমিতির নেতৃত্ব
        </h1>

        {/* Main leaders */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-6 shadow-sm text-center"
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-bold text-card-foreground">{leader.role}</p>
              <p className="mt-1 text-muted-foreground">{leader.name}</p>
            </div>
          ))}
        </div>

        {/* Executive Members */}
        <h2 className="mb-8 text-center text-2xl font-bold text-primary">
          কার্যকরী সদস্যবৃন্দ
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {executiveMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-card-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
