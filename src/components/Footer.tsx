import { Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg font-semibold">শাঁখারিটোলা দুর্গোৎসব সমিতি</p>
        <p className="mt-1 text-sm opacity-80">
          Registration No: S0062454 (2025–2026)
        </p>
        <div className="mt-4 border-t border-primary-foreground/20 pt-4">
          <p className="text-xs opacity-70">
            © 2026 শাঁখারিটোলা দুর্গোৎসব সমিতি
          </p>
          <p className="mt-1 text-xs opacity-70">
            Designed & Digitally Managed By{" "}
            <span className="font-semibold">ASIT KUMAR SARKAR</span>
          </p>
          <p className="text-xs opacity-60">AI & Technology Consultant</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
