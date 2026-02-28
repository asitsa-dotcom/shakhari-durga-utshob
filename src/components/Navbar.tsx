import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const navKeys = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/activities", key: "nav.activities" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/leadership", key: "nav.leadership" },
  { to: "/live", key: "nav.live" },
  { to: "/contact", key: "nav.contact" },
];

const languages: { code: Language; label: string }[] = [
  { code: "bn", label: "বাংলা" },
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="hidden text-lg font-bold text-primary sm:inline">
            {t("home.title")}
          </span>
        </Link>

        {/* Desktop nav + lang */}
        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-1">
            {navKeys.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-primary",
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/80"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          {/* Language switcher */}
          <div className="ml-3 flex items-center gap-0.5 rounded-md border border-border bg-muted p-0.5">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  "rounded px-2 py-1 text-xs font-medium transition-colors",
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: lang + toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted p-0.5">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors",
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navKeys.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                location.pathname === link.to
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground/80 hover:bg-accent/20"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
