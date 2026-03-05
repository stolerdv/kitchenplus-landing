import { useEffect, useRef, useState } from "react";
import { useLang } from "../../contexts/LangContext";

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

  const stats = [
    { value: 500, suffix: "+", label: t.stats_ingredients, icon: "🥦" },
    { value: 1000, suffix: "+", label: t.stats_recipes, icon: "🍽️" },
    { value: 5.0, suffix: "★", label: t.stats_rating, icon: "⭐" },
    { value: 3, suffix: "", label: t.stats_languages, icon: "🌍" },
  ];

  return (
    <section
      className="py-8 border-y border-[#E8E4DC]"
      style={{ background: "#FFFFFF", fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 py-2">
              <div className="w-12 h-12 rounded-2xl bg-[#D8F3DC] flex items-center justify-center text-2xl flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p
                  style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#1B2A1A", lineHeight: 1 }}
                >
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: "13px", color: "#7A7A6A", marginTop: "2px" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
