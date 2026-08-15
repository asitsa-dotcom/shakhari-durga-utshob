import type { Language } from "@/contexts/LanguageContext";

export type TocCategory =
  | "cover"
  | "article"
  | "poem"
  | "art"
  | "committee"
  | "gallery"
  | "accounts"
  | "ad";

export interface TocEntry {
  /** 1-based page number in the viewer */
  page: number;
  title: Record<Language, string>;
  category: TocCategory;
  /** extra search terms (author names, topics) */
  keywords: string[];
}

export const categoryLabels: Record<TocCategory, Record<Language, string>> = {
  cover: { bn: "প্রচ্ছদ", en: "Cover", hi: "आवरण" },
  article: { bn: "প্রবন্ধ", en: "Article", hi: "लेख" },
  poem: { bn: "কবিতা", en: "Poem", hi: "कविता" },
  art: { bn: "চিত্রকলা", en: "Artwork", hi: "चित्रकला" },
  committee: { bn: "কমিটি", en: "Committee", hi: "समिति" },
  gallery: { bn: "ছবির অ্যালবাম", en: "Photo Album", hi: "फ़ोटो एल्बम" },
  accounts: { bn: "হিসাব", en: "Accounts", hi: "हिसाब" },
  ad: { bn: "বিজ্ঞাপন", en: "Advertisement", hi: "विज्ञापन" },
};

export const souvenir2025Toc: TocEntry[] = [
  {
    page: 1,
    title: { bn: "প্রচ্ছদ — শুভ দুর্গা পুজো ২০২৫", en: "Cover — Shubho Durga Puja 2025", hi: "आवरण — शुभ दुर्गा पूजा 2025" },
    category: "cover",
    keywords: ["cover", "প্রচ্ছদ", "souvenir", "স্মারক", "2025"],
  },
  {
    page: 2,
    title: { bn: "শুভেচ্ছা বিজ্ঞাপন", en: "Greetings Advertisement", hi: "शुभकामना विज्ञापन" },
    category: "ad",
    keywords: ["ad", "বিজ্ঞাপন", "compliments"],
  },
  {
    page: 3,
    title: { bn: "মাতৃপ্রতিমা", en: "Idol of Maa Durga", hi: "मातृ प्रतिमा" },
    category: "gallery",
    keywords: ["প্রতিমা", "idol", "durga", "photo", "ছবি"],
  },
  {
    page: 4,
    title: { bn: "দুর্গা পুজো ২০২৫ — ছবির অ্যালবাম", en: "Durga Puja 2025 — Photo Album", hi: "दुर्गा पूजा 2025 — फ़ोटो एल्बम" },
    category: "gallery",
    keywords: ["album", "ছবি", "photo", "মণ্ডপ", "pandal"],
  },
  {
    page: 5,
    title: { bn: "দুর্গা পুজো ২০২৫ — প্রস্তুতি ও শিল্পকর্ম", en: "Durga Puja 2025 — Preparation & Craft", hi: "दुर्गा पूजा 2025 — तैयारी एवं शिल्प" },
    category: "gallery",
    keywords: ["preparation", "প্রস্তুতি", "শিল্প", "craft", "pandal"],
  },
  {
    page: 6,
    title: { bn: "দুর্গা পুজো ২০২৫ — উৎসবের মুহূর্ত", en: "Durga Puja 2025 — Festive Moments", hi: "दुर्गा पूजा 2025 — उत्सव के क्षण" },
    category: "gallery",
    keywords: ["moments", "মুহূর্ত", "photo", "ছবি"],
  },
  {
    page: 7,
    title: { bn: "শুভেচ্ছাবার্তা — সজল ঘোষ, কাউন্সিলর ৫০ নং ওয়ার্ড", en: "Greetings — Sajal Ghosh, Councillor Ward 50", hi: "शुभकामना — सजल घोष, काउंसिलर वार्ड 50" },
    category: "article",
    keywords: ["সজল ঘোষ", "sajal ghosh", "councillor", "কাউন্সিলর", "kolkata municipal corporation", "শুভেচ্ছা", "message"],
  },
  {
    page: 8,
    title: { bn: "আমাদের কথা ২০২৫", en: "Our Words 2025", hi: "हमारी बात 2025" },
    category: "article",
    keywords: ["আমাদের কথা", "সমিতি", "samity", "পুজো", "সেরার সেরা", "editorial"],
  },
  {
    page: 9,
    title: { bn: "বিজ্ঞাপন — Shubho Durga Puja Garage", en: "Advertisement — Shubho Durga Puja Garage", hi: "विज्ञापन — Shubho Durga Puja Garage" },
    category: "ad",
    keywords: ["garage", "car service", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 10,
    title: { bn: "বিজ্ঞাপন — M/s Atrayee Automobile", en: "Advertisement — M/s Atrayee Automobile", hi: "विज्ञापन — M/s Atrayee Automobile" },
    category: "ad",
    keywords: ["atrayee", "automobile", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 11,
    title: { bn: "সভাপতির কলম — শ্রী অসীম চক্রবর্তী", en: "From the President's Pen — Asim Chakraborty", hi: "अध्यक्ष की कलम — असीम चक्रवर्ती" },
    category: "article",
    keywords: ["সভাপতি", "president", "অসীম চক্রবর্তী", "asim chakraborty", "কলম"],
  },
  {
    page: 12,
    title: { bn: "সহ-সভাপতির লেখনী — শ্রী অশোক ভট্টাচার্য", en: "From the Vice President's Pen — Ashok Bhattacharya", hi: "उपाध्यक्ष की कलम — अशोक भट्टाचार्य" },
    category: "article",
    keywords: ["সহ-সভাপতি", "vice president", "অশোক ভট্টাচার্য", "ashok bhattacharya"],
  },
  {
    page: 13,
    title: { bn: "সম্পাদকীয় — সিদ্ধার্থ চক্রবর্তী", en: "Editorial — Siddhartha Chakraborty", hi: "संपादकीय — सिद्धार्थ चक्रवर्ती" },
    category: "article",
    keywords: ["সম্পাদকীয়", "editorial", "সিদ্ধার্থ চক্রবর্তী", "siddhartha", "সম্পাদক"],
  },
  {
    page: 14,
    title: { bn: "যুগ্ম সম্পাদকের কিছু কথা", en: "A Few Words from the Joint Secretary", hi: "संयुक्त सचिव की कुछ बातें" },
    category: "article",
    keywords: ["যুগ্ম সম্পাদক", "joint secretary", "কথা"],
  },
  {
    page: 15,
    title: {
      bn: "দুর্গাপূজা: শুধু উৎসব নয়, বাংলার অর্থনীতির চালিকাশক্তি",
      en: "Durga Puja: Not Just a Festival, but Bengal's Economic Engine",
      hi: "दुर्गा पूजा: केवल उत्सव नहीं, बंगाल की अर्थव्यवस्था का इंजन",
    },
    category: "article",
    keywords: ["অর্থনীতি", "economy", "economic", "শিল্পী", "artisan", "প্রবন্ধ"],
  },
  {
    page: 16,
    title: { bn: "থিম সং ২০২৫", en: "Theme Song 2025", hi: "थीम सॉन्ग 2025" },
    category: "article",
    keywords: ["theme song", "থিম সং", "গান", "music", "recording"],
  },
  {
    page: 17,
    title: { bn: "প্রকৃতির সৌন্দর্য — কবিতা ও চিত্র", en: "Beauty of Nature — Poem & Painting", hi: "प्रकृति का सौंदर्य — कविता एवं चित्र" },
    category: "poem",
    keywords: ["কবিতা", "poem", "প্রকৃতি", "nature", "ছবি", "painting"],
  },
  {
    page: 18,
    title: { bn: "মূল কর্মনির্বাচন কমিটি", en: "Main Executive Committee", hi: "मुख्य कार्यकारी समिति" },
    category: "committee",
    keywords: [
      "কমিটি",
      "committee",
      "সভাপতি",
      "সহ সভাপতি",
      "পৃষ্ঠপোষক",
      "সাংস্কৃতিক সম্পাদক",
      "অসীম চক্রবর্তী",
      "অশোক ভট্টাচার্য",
      "সজল ঘোষ",
      "কৌশিক সেন",
    ],
  },
  {
    page: 19,
    title: { bn: "মূল অন্তর্বর্তী কমিটি", en: "Core Interim Committee", hi: "मुख्य अंतरिम समिति" },
    category: "committee",
    keywords: [
      "কমিটি",
      "committee",
      "সদস্য",
      "members",
      "দেবব্রত ব্যানার্জি",
      "রবি মিত্র",
      "সঞ্জয় মিত্র",
      "ইন্দ্রজিৎ কর্মকার",
      "প্রশান্ত সৎপতি",
      "শান্তনু দাস",
      "বিশ্বনাথ জানা",
      "শ্যামাপ্রসাদ মিত্র",
    ],
  },
  {
    page: 20,
    title: { bn: "চিন্ময়ী গ্রুপ (মহিলা মণ্ডলী) পরিচালিকা মণ্ডলী", en: "Chinmoyee Group (Women's Wing) Committee", hi: "चिन्मयी ग्रुप (महिला मंडली) समिति" },
    category: "committee",
    keywords: [
      "চিন্ময়ী",
      "chinmoyee",
      "মহিলা",
      "women",
      "সুভদ্রা চক্রবর্তী",
      "মুনমুন",
      "সুলেখা ভট্টাচার্য",
      "পূজা ঘোষ",
      "সোনালী সেন",
      "বন্দনা মিত্র",
      "মনীষা মণ্ডল",
      "রিয়া দাস",
    ],
  },
  {
    page: 21,
    title: { bn: "শারদীয়ার শুভেচ্ছা ও আন্তরিক অভিনন্দন", en: "Sharadiya Greetings", hi: "शारदीय शुभकामनाएँ" },
    category: "ad",
    keywords: ["শুভেচ্ছা", "greetings", "শারদীয়া", "অভিনন্দন"],
  },
  {
    page: 22,
    title: { bn: "স্বপ্নলীন — শম্পা পাল সরকার", en: "Swapnaleen — Shampa Pal Sarkar", hi: "स्वप्नलीन — शम्पा पाल सरकार" },
    category: "poem",
    keywords: ["কবিতা", "poem", "স্বপ্নলীন", "শম্পা পাল সরকার", "shampa pal sarkar"],
  },
  {
    page: 23,
    title: { bn: "চিত্রকলা — পদ্ম", en: "Artwork — Lotus", hi: "चित्रकला — कमल" },
    category: "art",
    keywords: ["চিত্র", "painting", "art", "পদ্ম", "lotus"],
  },
  {
    page: 24,
    title: { bn: "বিজ্ঞাপন — Justt Taste ও Perfect Sales Agency", en: "Advertisement — Justt Taste & Perfect Sales Agency", hi: "विज्ञापन — Justt Taste एवं Perfect Sales Agency" },
    category: "ad",
    keywords: ["justt taste", "perfect sales agency", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 25,
    title: { bn: "রঙ-তুলি", en: "Rong-Tuli (Colours & Brush)", hi: "रंग-तूलिका" },
    category: "article",
    keywords: ["রঙ", "তুলি", "শিল্পী", "art", "painting", "প্রবন্ধ", "article"],
  },
  {
    page: 26,
    title: { bn: "শুভেচ্ছা বিজ্ঞাপন", en: "Greetings Advertisement", hi: "शुभकामना विज्ञापन" },
    category: "ad",
    keywords: ["শুভেচ্ছা", "greetings", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 27,
    title: { bn: "চিত্রকলা — মাছ", en: "Artwork — Fish", hi: "चित्रकला — मछली" },
    category: "art",
    keywords: ["চিত্র", "painting", "art", "মাছ", "fish"],
  },
  {
    page: 28,
    title: { bn: "অনুষ্ঠান ২০২৫ — খুঁটি পূজা", en: "Events 2025 — Khuti Puja", hi: "कार्यक्रम 2025 — खूंटी पूजा" },
    category: "gallery",
    keywords: ["অনুষ্ঠান", "event", "খুঁটি পূজা", "khuti puja"],
  },
  {
    page: 29,
    title: { bn: "অনুষ্ঠান ২০২৫ — রথযাত্রা", en: "Events 2025 — Rathayatra", hi: "कार्यक्रम 2025 — रथयात्रा" },
    category: "gallery",
    keywords: ["অনুষ্ঠান", "event", "রথযাত্রা", "rathayatra", "ratha"],
  },
  {
    page: 30,
    title: { bn: "শুভেচ্ছা বিজ্ঞাপন", en: "Greetings Advertisement", hi: "शुभकामना विज्ञापन" },
    category: "ad",
    keywords: ["শুভেচ্ছা", "greetings", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 31,
    title: { bn: "“সেরার সেরা” ২০২৫ — পুরস্কার", en: "“Serar Sera” 2025 — Award", hi: "“सेरार सेरा” 2025 — पुरस्कार" },
    category: "gallery",
    keywords: ["পুরস্কার", "award", "সেরার সেরা", "serar sera", "prize"],
  },
  {
    page: 32,
    title: { bn: "অনুষ্ঠান ২০২৬ — নেতাজি জয়ন্তী", en: "Events 2026 — Netaji Jayanti", hi: "कार्यक्रम 2026 — नेताजी जयंती" },
    category: "gallery",
    keywords: ["অনুষ্ঠান", "event", "নেতাজি", "netaji", "jayanti", "2026"],
  },
  {
    page: 33,
    title: { bn: "বিজ্ঞাপন — Designiks", en: "Advertisement — Designiks", hi: "विज्ञापन — Designiks" },
    category: "ad",
    keywords: ["designiks", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 34,
    title: { bn: "শুভেচ্ছা বিজ্ঞাপন", en: "Greetings Advertisement", hi: "शुभकामना विज्ञापन" },
    category: "ad",
    keywords: ["শুভেচ্ছা", "greetings", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 35,
    title: { bn: "আয়-ব্যয়ের হিসাব ২০২৫-২৬", en: "Income & Expenditure 2025-26", hi: "आय-व्यय विवरण 2025-26" },
    category: "accounts",
    keywords: ["হিসাব", "আয়", "ব্যয়", "income", "expenditure", "accounts", "donation", "membership"],
  },
  {
    page: 36,
    title: { bn: "বিজ্ঞাপন — Finex ও Bagaria More", en: "Advertisement — Finex & Bagaria More", hi: "विज्ञापन — Finex एवं Bagaria More" },
    category: "ad",
    keywords: ["finex", "bagaria more", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 37,
    title: { bn: "শুভেচ্ছা বিজ্ঞাপন", en: "Greetings Advertisement", hi: "शुभकामना विज्ञापन" },
    category: "ad",
    keywords: ["শুভেচ্ছা", "greetings", "বিজ্ঞাপন", "ad"],
  },
  {
    page: 38,
    title: { bn: "শেষ প্রচ্ছদ — শুভ দুর্গা পুজো", en: "Back Cover — Happy Durga Puja", hi: "पिछला आवरण — शुभ दुर्गा पूजा" },
    category: "cover",
    keywords: ["back cover", "শেষ প্রচ্ছদ", "শুভেচ্ছা"],
  },
];
