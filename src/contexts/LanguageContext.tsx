import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "bn" | "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { bn: "হোম", en: "Home", hi: "होम" },
  "nav.about": { bn: "আমাদের কথা", en: "About Us", hi: "हमारे बारे में" },
  "nav.activities": { bn: "কার্যক্রম", en: "Activities", hi: "गतिविधियाँ" },
  "nav.gallery": { bn: "গ্যালারি", en: "Gallery", hi: "गैलरी" },
  "nav.leadership": { bn: "নেতৃত্ব", en: "Leadership", hi: "नेतृत्व" },
  "nav.live": { bn: "লাইভ", en: "Live", hi: "लाइव" },
  "nav.emagazine": { bn: "ই-ম্যাগাজিন", en: "E-Magazine", hi: "ई-मैगज़ीन" },
  "nav.contact": { bn: "যোগাযোগ", en: "Contact", hi: "संपर्क" },

  // Home
  "home.title": { bn: "শাঁখারিটোলা দুর্গোৎসব সমিতি", en: "Shankharitola Durgatsav Samity", hi: "शांखारिटोला दुर्गोत्सव समिति" },
  "home.subtitle": { bn: "উৎসব • সংস্কৃতি • সামাজিক বন্ধন", en: "Festival • Culture • Community Bonding", hi: "उत्सव • संस्कृति • सामुदायिक एकता" },
  "home.reg_label": { bn: "নিবন্ধিত সমিতি (পশ্চিমবঙ্গ সমিতি নিবন্ধন আইন, ১৯৬১)", en: "Registered Society (West Bengal Societies Registration Act, 1961)", hi: "पंजीकृत संस्था (पश्चिम बंगाल सोसाइटी पंजीकरण अधिनियम, 1961)" },
  "home.theme2025": { bn: "🎵 Official Theme Song 2025", en: "🎵 Official Theme Song 2025", hi: "🎵 Official Theme Song 2025" },
  "home.theme2024": { bn: "🎵 Official Theme Song 2024", en: "🎵 Official Theme Song 2024", hi: "🎵 Official Theme Song 2024" },

  // About
  "about.title": { bn: "আমাদের কথা", en: "About Us", hi: "हमारे बारे में" },
  "about.description": {
    bn: "শাঁখারিটোলা দুর্গোৎসব সমিতি পশ্চিমবঙ্গ সমিতি নিবন্ধন আইন, ১৯৬১ অনুযায়ী নিবন্ধিত একটি সামাজিক ও সাংস্কৃতিক সংগঠন। এলাকার মানুষের পারস্পরিক সৌহার্দ্য, ঐতিহ্য রক্ষা এবং সাংস্কৃতিক চর্চার উদ্দেশ্য নিয়েই আমাদের যাত্রা শুরু। দুর্গাপূজাকে কেন্দ্র করে আমরা প্রতিবছর ধর্মীয় ও সাংস্কৃতিক অনুষ্ঠানের আয়োজন করি। সারাবছর বিভিন্ন সামাজিক ও সাংস্কৃতিক কর্মসূচির মাধ্যমে আমরা সমাজের পাশে থাকার চেষ্টা করি।",
    en: "Shankharitola Durgatsav Samity is a registered socio-cultural organization under the West Bengal Societies Registration Act, 1961. The organization promotes cultural heritage, community bonding, and organizes Durga Puja with devotion and dignity. Throughout the year, it conducts various social, cultural, and community welfare programs.",
    hi: "शांखारिटोला दुर्गोत्सव समिति पश्चिम बंगाल सोसाइटी पंजीकरण अधिनियम, 1961 के अंतर्गत पंजीकृत एक सामाजिक एवं सांस्कृतिक संस्था है। यह संस्था सामुदायिक एकता, सांस्कृतिक परंपराओं के संरक्षण तथा दुर्गा पूजा के आयोजन के लिए समर्पित है। वर्षभर विभिन्न सामाजिक एवं सांस्कृतिक कार्यक्रम आयोजित किए जाते हैं।",
  },
  "about.objectives": { bn: "আমাদের লক্ষ্য", en: "Our Objectives", hi: "हमारे उद्देश्य" },
  "about.obj1": { bn: "সাংস্কৃতিক চর্চার প্রসার", en: "Promotion of cultural heritage", hi: "सांस्कृतिक विरासत का संरक्षण" },
  "about.obj2": { bn: "সামাজিক উদ্যোগ গ্রহণ", en: "Social welfare initiatives", hi: "सामाजिक कल्याण कार्य" },
  "about.obj3": { bn: "যুব সমাজকে এগিয়ে আনা", en: "Youth engagement", hi: "युवाओं को प्रोत्साहन" },
  "about.obj4": { bn: "ঐতিহ্য সংরক্ষণ", en: "Preservation of tradition", hi: "परंपरा की रक्षा" },
  "about.address_label": { bn: "ঠিকানা", en: "Address", hi: "पता" },
  "about.address": { bn: "৬/১বি/১এ, ক্রীক লেন, কলকাতা – ৭০০০১৪", en: "6/1B/1A, Creek Lane, Kolkata – 700014", hi: "6/1B/1A, क्रीक लेन, कोलकाता – 700014" },

  // Activities
  "activities.title": { bn: "আমাদের কার্যক্রম", en: "Our Activities", hi: "हमारी गतिविधियाँ" },
  "activities.durga": { bn: "দুর্গাপূজা", en: "Durga Puja", hi: "दुर्गा पूजा" },
  "activities.durga_desc": { bn: "আমাদের প্রধান বার্ষিক অনুষ্ঠান।", en: "Grand annual celebration.", hi: "वार्षिक मुख्य उत्सव।" },
  "activities.khuti": { bn: "খুঁটি পূজা", en: "Khuti Puja", hi: "खूंटी पूजा" },
  "activities.khuti_desc": { bn: "পূজার সূচনালগ্ন।", en: "Ceremonial beginning.", hi: "शुभारंभ समारोह।" },
  "activities.dol": { bn: "দোল উৎসব", en: "Holi Festival", hi: "होली उत्सव" },
  "activities.dol_desc": { bn: "রঙের আনন্দঘন উৎসব।", en: "Celebration of colors.", hi: "रंगों का पर्व।" },
  "activities.independence": { bn: "স্বাধীনতা দিবস", en: "Independence Day", hi: "स्वतंत्रता दिवस" },
  "activities.independence_desc": { bn: "জাতীয় পতাকা উত্তোলন।", en: "National celebration.", hi: "राष्ट्रीय ध्वजारोहण।" },
  "activities.republic": { bn: "প্রজাতন্ত্র দিবস", en: "Republic Day", hi: "गणतंत्र दिवस" },
  "activities.republic_desc": { bn: "জাতীয় চেতনা উদযাপন।", en: "Honoring constitutional values.", hi: "राष्ट्रीय सम्मान।" },
  "activities.rabindra": { bn: "রবীন্দ্রজয়ন্তী", en: "Rabindra Jayanti", hi: "रवीन्द्र जयंती" },
  "activities.rabindra_desc": { bn: "সাংস্কৃতিক অনুষ্ঠান।", en: "Cultural tribute.", hi: "सांस्कृतिक कार्यक्रम।" },
  "activities.sports": { bn: "ক্রীড়া প্রতিযোগিতা", en: "Sports Events", hi: "खेल प्रतियोगिता" },
  "activities.sports_desc": { bn: "যুব সমাজকে উৎসাহ প্রদান।", en: "Youth encouragement.", hi: "युवा सहभागिता।" },
  "activities.social": { bn: "সামাজিক কর্মসূচি", en: "Social Initiatives", hi: "सामाजिक कार्यक्रम" },
  "activities.social_desc": { bn: "সমাজকল্যাণমূলক উদ্যোগ।", en: "Community welfare programs.", hi: "जनहित कार्य।" },
  "activities.bhog": { bn: "ভোগ বিতরণ", en: "Bhog Distribution", hi: "भोग वितरण" },
  "activities.bhog_desc": { bn: "পূজার ৩ দিন ৫০০ সাধারণ মানুষ এবং ১০০-র অধিক সদস্যদের খাওয়া-দাওয়ার ব্যবস্থা করা হয়।", en: "During the 3 days of Puja, food is arranged for 500 common people and over 100 members.", hi: "पूजा के 3 दिनों में 500 आम लोगों और 100 से अधिक सदस्यों के लिए भोजन की व्यवस्था की जाती है।" },
  "activities.health": { bn: "স্বাস্থ্য পরীক্ষা শিবির", en: "Health Checkup Camp", hi: "स्वास्थ्य जाँच शिविर" },
  "activities.health_desc": { bn: "এলাকাবাসীদের জন্য বিনামূল্যে স্বাস্থ্য পরীক্ষা শিবিরের আয়োজন করা হয়।", en: "Free health checkup camps are organized for the local community.", hi: "स्थानीय समुदाय के लिए निःशुल्क स्वास्थ्य जाँच शिविर आयोजित किए जाते हैं।" },
  "activities.cloth": { bn: "বস্ত্র বিতরণ", en: "Cloth Distribution", hi: "वस्त्र वितरण" },
  "activities.cloth_desc": { bn: "শীতকালে অসহায় ও দরিদ্র মানুষদের মধ্যে শীতবস্ত্র বিতরণ করা হয়।", en: "Winter clothes are distributed among the underprivileged and needy during winter.", hi: "सर्दियों में जरूरतमंद और गरीब लोगों को शीतवस्त्र वितरित किए जाते हैं।" },

  // Gallery
  "gallery.title": { bn: "গ্যালারি", en: "Gallery", hi: "गैलरी" },
  "gallery.photos": { bn: "ছবি", en: "Photos", hi: "फ़ोटो" },
  "gallery.videos": { bn: "ভিডিও", en: "Videos", hi: "वीडियो" },
  "gallery.photo_label": { bn: "ছবি", en: "Photo", hi: "फ़ोटो" },

  // Leadership
  "leadership.title": { bn: "সমিতির নেতৃত্ব", en: "Committee Leadership", hi: "समिति नेतृत्व" },
  "leadership.subtitle": { bn: "সমিতির অভিজ্ঞ ও দায়িত্বশীল নেতৃত্বের হাত ধরেই আমাদের কার্যক্রম সুষ্ঠুভাবে পরিচালিত হয়ে আসছে।", en: "Our activities are efficiently managed under the experienced and responsible leadership of the committee.", hi: "समिति के अनुभवी और जिम्मेदार नेतृत्व में हमारी गतिविधियाँ सुचारू रूप से संचालित होती हैं।" },
  "leadership.executive": { bn: "কার্যকরী সদস্যবৃন্দ", en: "Executive Members", hi: "कार्यकारी सदस्य" },
  "leadership.president": { bn: "সভাপতি", en: "President", hi: "अध्यक्ष" },
  "leadership.vice_president": { bn: "সহ-সভাপতি", en: "Vice President", hi: "उपाध्यक्ष" },
  "leadership.secretary": { bn: "সম্পাদক", en: "Secretary", hi: "सचिव" },
  "leadership.joint_secretary": { bn: "সহ-সম্পাদক", en: "Joint Secretary", hi: "संयुक्त सचिव" },
  "leadership.treasurer": { bn: "কোষাধ্যক্ষ", en: "Treasurer", hi: "कोषाध्यक्ष" },
  "leadership.executive_member": { bn: "কার্যকরী সদস্য", en: "Executive Member", hi: "कार्यकारी सदस्य" },

  // Live
  "live.title": { bn: "লাইভ সম্প্রচার", en: "Live Broadcast", hi: "लाइव प्रसारण" },
  "live.description": { bn: "দুর্গাপূজার সময় এখানে সরাসরি সম্প্রচার দেখা যাবে।", en: "Live streaming will be available here during Durga Puja.", hi: "दुर्गा पूजा के दौरान यहाँ लाइव प्रसारण उपलब्ध होगा।" },
  "live.coming_soon": { bn: "সরাসরি সম্প্রচার শীঘ্রই আসছে", en: "Live broadcast coming soon", hi: "लाइव प्रसारण जल्द आ रहा है" },
  "live.watch_here": { bn: "দুর্গাপূজার সময় এখানে লাইভ দেখুন", en: "Watch live here during Durga Puja", hi: "दुर्गा पूजा के दौरान यहाँ लाइव देखें" },

  // E-Magazine
  "emagazine.title": { bn: "ই-ম্যাগাজিন", en: "E-Magazine", hi: "ई-मैगज़ीन" },
  "emagazine.subtitle": { bn: "শাঁখারিটোলা দুর্গোৎসব সমিতির ডিজিটাল স্মারক সংকলন।", en: "Digital souvenir collection of Shankharitola Durgatsav Samity.", hi: "शांखारिटोला दुर्गोत्सव समिति का डिजिटल स्मारिका संग्रह।" },
  "emagazine.souvenir2025": { bn: "স্মারক ২০২৫-২০২৬", en: "Souvenir 2025-2026", hi: "स्मारिका 2025-2026" },
  "emagazine.souvenir2025_desc": { bn: "দুর্গাপূজা ২০২৫-এর বিশেষ সংখ্যা।", en: "Special issue for Durga Puja 2025.", hi: "दुर्गा पूजा 2025 की विशेष संख्या।" },
  "emagazine.page_counter": { bn: "পৃষ্ঠা {{current}} / {{total}}", en: "Page {{current}} / {{total}}", hi: "पृष्ठ {{current}} / {{total}}" },
  "emagazine.prev": { bn: "পূর্ববর্তী", en: "Previous", hi: "पिछला" },
  "emagazine.next": { bn: "পরবর্তী", en: "Next", hi: "अगला" },
  "emagazine.zoom": { bn: "বড় করুন", en: "Zoom", hi: "ज़ूम" },
  "emagazine.close": { bn: "বন্ধ করুন", en: "Close", hi: "बंद करें" },
  "emagazine.progress": { bn: "অগ্রগতি", en: "Progress", hi: "प्रगति" },
  "emagazine.thumbnails": { bn: "পৃষ্ঠার থাম্বনেইল", en: "Page thumbnails", hi: "पृष्ठ थंबनेल" },
  "emagazine.page": { bn: "পৃষ্ঠা", en: "Page", hi: "पृष्ठ" },
  "emagazine.toc": { bn: "সূচিপত্র", en: "Contents", hi: "सूचीपत्र" },
  "emagazine.search_label": { bn: "পৃষ্ঠা বা বিষয় খুঁজুন", en: "Search page or topic", hi: "पृष्ठ या विषय खोजें" },
  "emagazine.search_placeholder": {
    bn: "যেমন: সম্পাদকীয়, কবিতা, কমিটি, ১৫",
    en: "e.g. editorial, poem, committee, 15",
    hi: "जैसे: संपादकीय, कविता, समिति, 15",
  },
  "emagazine.clear": { bn: "মুছে ফেলুন", en: "Clear", hi: "साफ़ करें" },
  "emagazine.results": { bn: "{{count}} টি পৃষ্ঠা পাওয়া গেছে", en: "{{count}} pages found", hi: "{{count}} पृष्ठ मिले" },
  "emagazine.no_results": { bn: "কোনো পৃষ্ঠা পাওয়া যায়নি।", en: "No pages found.", hi: "कोई पृष्ठ नहीं मिला।" },
  "emagazine.show_toc": { bn: "সূচিপত্র দেখুন", en: "Show contents", hi: "सूचीपत्र देखें" },
  "emagazine.hide_toc": { bn: "সূচিপত্র লুকান", en: "Hide contents", hi: "सूचीपत्र छिपाएँ" },
  "emagazine.current_topic": { bn: "এই পৃষ্ঠার বিষয়", en: "Topic of this page", hi: "इस पृष्ठ का विषय" },
  "emagazine.filter_all": { bn: "সব", en: "All", hi: "सभी" },
  "emagazine.goto": { bn: "পৃষ্ঠায় যান", en: "Go to page", hi: "पृष्ठ पर जाएँ" },
  "emagazine.goto_placeholder": { bn: "পৃষ্ঠা নম্বর", en: "Page number", hi: "पृष्ठ संख्या" },
  "emagazine.goto_invalid": { bn: "১ থেকে ৩৮ এর মধ্যে একটি পৃষ্ঠা নম্বর লিখুন", en: "Enter a page number between 1 and 38", hi: "1 से 38 के बीच एक पृष्ठ संख्या दर्ज करें" },


  // Contact
  "contact.title": { bn: "যোগাযোগ করুন", en: "Contact Us", hi: "संपर्क करें" },
  "contact.name": { bn: "নাম", en: "Name", hi: "नाम" },
  "contact.name_placeholder": { bn: "আপনার নাম লিখুন", en: "Enter your name", hi: "अपना नाम लिखें" },
  "contact.mobile": { bn: "মোবাইল নম্বর", en: "Mobile Number", hi: "मोबाइल नंबर" },
  "contact.mobile_placeholder": { bn: "আপনার মোবাইল নম্বর", en: "Your mobile number", hi: "आपका मोबाइल नंबर" },
  "contact.message": { bn: "বার্তা", en: "Message", hi: "संदेश" },
  "contact.message_placeholder": { bn: "আপনার বার্তা লিখুন", en: "Write your message", hi: "अपना संदेश लिखें" },
  "contact.send": { bn: "পাঠান", en: "Send", hi: "भेजें" },
  "contact.success_title": { bn: "বার্তা পাঠানো হয়েছে!", en: "Message sent!", hi: "संदेश भेजा गया!" },
  "contact.success_desc": { bn: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।", en: "We will contact you soon.", hi: "हम जल्द ही आपसे संपर्क करेंगे।" },
  "contact.address": { bn: "ঠিকানা", en: "Address", hi: "पता" },
  "contact.map_placeholder": { bn: "Google Map এখানে যুক্ত হবে", en: "Google Map will be added here", hi: "Google Map यहाँ जोड़ा जाएगा" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("bn");

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let text = translations[key]?.[lang] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), String(v));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
