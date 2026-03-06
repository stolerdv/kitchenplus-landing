import { useEffect, useRef, useState } from "react";
import { useLang } from "../../contexts/LangContext";
import React from "react";

function Counter({ target, suffix, duration = 1500 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(target * eased);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const display =
    target < 10
      ? count.toFixed(1)
      : Math.floor(count).toLocaleString("ru-RU");

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 500, suffix: "+", label: t.stats_ingredients, icon: "🥦", color: "#D8F3DC", iconColor: "#2D6A4F" },
    { value: 1000, suffix: "+", label: t.stats_recipes, icon: "🍽️", color: "#FFF3E0", iconColor: "#E07A3D" },
    { value: 5.0, suffix: "★", label: t.stats_rating, icon: "⭐", color: "#FFF9E6", iconColor: "#F4A235" },
    { value: 3, suffix: "", label: t.stats_languages, icon: "🌍", color: "#E3F2FD", iconColor: "#1976D2" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-8 border-y border-[#E8E4DC]"
      style={{ background: "#FFFFFF", fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: row */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center gap-4 py-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <p style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#1B2A1A", lineHeight: 1 }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: "13px", color: "#7A7A6A", marginTop: "2px" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: premium 2x2 card grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 flex flex-col"
              style={{
                background: s.color,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                style={{ background: "rgba(255,255,255,0.7)" }}
              >
                {s.icon}
              </div>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#1B2A1A",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: "12px", color: "#5A5A4A", marginTop: "4px", lineHeight: 1.3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
