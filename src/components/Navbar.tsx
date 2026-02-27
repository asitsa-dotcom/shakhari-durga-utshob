import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "হোম" },
  { to: "/about", label: "আমাদের কথা" },
  { to: "/activities", label: "কার্যক্রম" },
  { to: "/gallery", label: "গ্যালারি" },
  { to: "/leadership", label: "নেতৃত্ব" },
  { to: "/live", label: "লাইভ" },
  { to: "/contact", label: "যোগাযোগ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-lg font-bold text-primary">শাঁখারিটোলা দুর্গোৎসব সমিতি</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
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
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
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
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
