export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Политика конфиденциальности", href: "/legal/privacy-policy-ru.html" },
    { label: "Условия использования", href: "/legal/terms-of-service-ru.html" },
    { label: "Поддержка", href: "#" },
  ];

  const socials = [
    { name: "Telegram", icon: "✈️", href: "#" },
    { name: "VK", icon: "💬", href: "#" },
    { name: "Instagram", icon: "📸", href: "#" },
  ];

  return (
    <footer
      className="py-12"
      style={{
        background: "#1B2A1A",
        fontFamily: "Manrope, sans-serif",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-2">
              <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="3" width="14" height="2" rx="1" fill="white" />
                  <rect x="2" y="8" width="10" height="2" rx="1" fill="white" />
                  <rect x="2" y="13" width="12" height="2" rx="1" fill="white" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "18px", color: "white" }}>KitchenPlus</span>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
              Планировщик питания для семьи
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
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

          {/* Social */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                title={s.name}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", fontSize: "16px" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }}>
          <p className="text-center" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            © {currentYear} KitchenPlus. Все права защищены. · Россия, Казахстан
          </p>
        </div>
      </div>
    </footer>
  );
}
