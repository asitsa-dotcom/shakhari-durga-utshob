import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("contact.success_title"),
      description: t("contact.success_desc"),
    });
    setForm({ name: "", mobile: "", message: "" });
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-4xl font-bold text-primary">
          {t("contact.title")}
        </h1>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm">
            <div>
              <Label htmlFor="name">{t("contact.name")}</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("contact.name_placeholder")}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mobile">{t("contact.mobile")}</Label>
              <Input
                id="mobile"
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder={t("contact.mobile_placeholder")}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("contact.message_placeholder")}
                required
                rows={5}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" /> {t("contact.send")}
            </Button>
          </form>

          <div className="space-y-6">
            <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-border bg-muted">
              <div className="text-center text-muted-foreground">
                <MapPin className="mx-auto mb-2 h-10 w-10 opacity-40" />
                <p className="text-sm">{t("contact.map_placeholder")}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 text-center shadow-sm">
              <MapPin className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-semibold text-card-foreground">{t("contact.address")}</p>
              <p className="mt-1 text-muted-foreground">
                {t("about.address")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
