import { useRef, useEffect, useState } from "react";
import { Apple, Play, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="download"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2D6A4F 0%, #1B5E3A 50%, #0F3D26 100%)",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #52B788 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D8F3DC 0%, transparent 70%)" }}
        />
        {/* Scattered food emojis */}
        <div className="absolute top-8 left-[10%] text-4xl opacity-10 rotate-12">🥗</div>
        <div className="absolute top-16 right-[15%] text-3xl opacity-10 -rotate-6">🥦</div>
        <div className="absolute bottom-12 left-[20%] text-3xl opacity-10 rotate-6">🍎</div>
        <div className="absolute bottom-8 right-[10%] text-4xl opacity-10 -rotate-12">🥕</div>
      </div>

      <div
        ref={ref}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <span className="w-2 h-2 bg-[#52B788] rounded-full animate-pulse" />
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            Бесплатно · Без кредитной карты
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 56px)",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          Начни планировать питание <br />
          <span style={{ color: "#A8DCBC" }}>семьи уже сегодня</span>
        </h2>

        <p
          style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "36px" }}
        >
          Бесплатно. Без кредитной карты. Первый план — за 5 минут.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            className="flex items-center justify-center gap-3 bg-white hover:bg-[#F0F7F4] text-[#1B2A1A] px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontWeight: 700, fontSize: "16px" }}
          >
            <Apple size={22} />
            <span>
              <span style={{ fontSize: "11px", display: "block", opacity: 0.6, lineHeight: 1, fontWeight: 500 }}>Скачать для</span>
              iPhone
            </span>
          </button>
          <button
            className="flex items-center justify-center gap-3 bg-white hover:bg-[#F0F7F4] text-[#1B2A1A] px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontWeight: 700, fontSize: "16px" }}
          >
            <Play size={20} className="fill-[#1B2A1A]" />
            <span>
              <span style={{ fontSize: "11px", display: "block", opacity: 0.6, lineHeight: 1, fontWeight: 500 }}>Скачать для</span>
              Android
            </span>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-5 justify-center">
          {[
            "Бесплатно навсегда",
            "Работает офлайн",
            "3 языка: RU, EN, KZ",
            "4.8★ в App Store",
          ].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <CheckCircle2 size={14} color="#52B788" />
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
