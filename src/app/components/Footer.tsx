import React from "react";
import { useLang } from "../../contexts/LangContext";

export function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  const links = [
    { label: t.footer_privacy, href: "/legal/privacy-policy-ru.html" },
    { label: t.footer_terms, href: "/legal/terms-of-service-ru.html" },
    { label: t.footer_support, href: "#" },
  ];

  return (
    <footer
      className="py-8"
      style={{
        background: "#1B2A1A",
        fontFamily: "Manrope, sans-serif",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="2" rx="1" fill="white" />
                <rect x="2" y="8" width="10" height="2" rx="1" fill="white" />
                <rect x="2" y="13" width="12" height="2" rx="1" fill="white" />
              </svg>
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: "15px", color: "white" }}>KitchenPlus</span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginLeft: "6px" }}>
                {t.footer_tagline}
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "20px", paddingTop: "16px" }}>
          <p className="text-center" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            {t.footer_copyright(currentYear)}
          </p>
        </div>
      </div>
    </footer>
  );
}
