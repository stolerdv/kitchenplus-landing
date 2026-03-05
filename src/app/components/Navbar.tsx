import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "../../hooks/useRegion";

const LOCALE_TO_LANG: Record<Locale, string> = { ru: "RU", kk: "KZ", en: "EN" };

export function Navbar({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState(() => LOCALE_TO_LANG[locale] ?? "RU");

  useEffect(() => {
    setLang(LOCALE_TO_LANG[locale] ?? "RU");
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Возможности", href: "#features" },
    { label: "Для специалистов", href: "#specialists" },
    { label: "Тарифы", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{ fontFamily: "Manrope, sans-serif" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E4DC]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="3" width="14" height="2" rx="1" fill="white" />
                  <rect x="2" y="8" width="10" height="2" rx="1" fill="white" />
                  <rect x="2" y="13" width="12" height="2" rx="1" fill="white" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "18px", color: "#1B2A1A" }}>
                KitchenPlus
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  style={{ fontSize: "15px", color: "#4A4A3A", fontWeight: 500 }}
                  className="hover:text-[#2D6A4F] transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language */}
              <div className="flex items-center gap-1.5">
                {["RU", "EN", "KZ"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      fontSize: "13px",
                      fontWeight: lang === l ? 700 : 400,
                      color: lang === l ? "#2D6A4F" : "#888",
                    }}
                    className="px-1 hover:text-[#2D6A4F] transition-colors"
                  >
                    {l}
                  </button>
                ))}
              </div>
              {/* CTA */}
              <a
                href="#download"
                onClick={(e) => handleScroll(e, "#download")}
                className="bg-[#2D6A4F] hover:bg-[#245840] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                Скачать
              </a>
            </div>

            {/* Mobile Burger */}
            <button
              className="md:hidden p-2 rounded-lg text-[#1B2A1A]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#E8E4DC] px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block py-2.5 px-3 rounded-lg text-[#1B2A1A] hover:bg-[#F0F7F4] transition-colors"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E8E4DC] mt-2">
              <a
                href="#download"
                onClick={(e) => handleScroll(e, "#download")}
                className="block w-full bg-[#2D6A4F] text-white text-center py-3 rounded-xl"
                style={{ fontSize: "15px", fontWeight: 600 }}
              >
                Скачать бесплатно
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
