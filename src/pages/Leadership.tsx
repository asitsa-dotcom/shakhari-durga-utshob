import { User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import siddharthaPhoto from "@/assets/siddhartha-chakraborty.jpg.asset.json";
import asimPhoto from "@/assets/asim-chakraborty.jpg.asset.json";

const leaders = [
  { key: "leadership.president", bn: "শ্রী অসীম চক্রবর্তী", en: "ASIM CHAKRABORTY", photo: asimPhoto.url },
  { key: "leadership.vice_president", bn: "শ্রী অশোক ভট্টাচার্য", en: "ASHOKE BHATTACHARYA", photo: null },
  { key: "leadership.secretary", bn: "শ্রী সিদ্ধার্থ চক্রবর্তী", en: "SIDDHARTHA CHAKRABORTY", photo: siddharthaPhoto.url },
  { key: "leadership.joint_secretary", bn: "শ্রী শান্তনু দাস", en: "SANTANU DAS", photo: null },
  { key: "leadership.treasurer", bn: "শ্রী অসিত কুমার সরকার", en: "ASIT KUMAR SARKAR", photo: "/images/treasurer.jpg" },
];

const Leadership = () => {
  const { t } = useLanguage();

  const executiveMembers = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="py-16" style={{ backgroundColor: "#F9F9F9" }}>
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-center text-4xl font-bold text-primary">
          {t("leadership.title")}
        </h1>
        <p className="mx-auto mb-14 max-w-2xl text-center text-muted-foreground">
          {t("leadership.subtitle")}
        </p>

        <div className="mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {leaders.map((leader) => (
            <div
              key={leader.key}
              className="flex flex-col items-center rounded-xl bg-card px-6 py-8 text-center shadow-md"
            >
              {leader.photo ? (
                <img src={leader.photo} alt={leader.en} className="h-24 w-24 rounded-full object-cover object-top" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-8 w-8 text-primary" />
                </div>
              )}
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                {t(leader.key)}
              </p>
              <p className="mt-2 text-xl font-bold text-card-foreground">{leader.bn}</p>
              <p className="mt-0.5 text-xs tracking-wide text-muted-foreground">
                ({leader.en})
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-8 text-center text-2xl font-bold text-primary">
          {t("leadership.executive")}
        </h2>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-3">
          {executiveMembers.map((id) => (
            <div
              key={id}
              className="flex flex-col items-center rounded-xl bg-card px-4 py-6 text-center shadow-md"
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
