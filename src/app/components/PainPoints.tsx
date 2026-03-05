import { useRef, useEffect, useState } from "react";
import { useLang } from "../../contexts/LangContext";

const PAIN_COLORS = [
  { color: "#FFF3E0", border: "#FFD9A0", emoji: "😩" },
  { color: "#FFF0F0", border: "#FFCDD2", emoji: "🛒" },
  { color: "#F3F0FF", border: "#D1C4E9", emoji: "👨‍👩‍👧" },
  { color: "#E8F5E9", border: "#C8E6C9", emoji: "📊" },
  { color: "#E3F2FD", border: "#BBDEFB", emoji: "📄" },
];

function PainCard({
  title,
  desc,
  emoji,
  color,
  border,
  index,
}: {
  title: string;
  desc: string;
  emoji: string;
  color: string;
  border: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-5 border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-default"
      style={{
        background: color,
        borderColor: border,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3
        style={{ fontSize: "16px", fontWeight: 700, color: "#1B2A1A", lineHeight: 1.3, marginBottom: "6px" }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "#5A5A4A", lineHeight: 1.55 }}>{desc}</p>
    </div>
  );
}

export function PainPoints() {
  const { t } = useLang();
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleVisible(true);
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const pains = [
    { title: t.pain_1_title, desc: t.pain_1_desc },
    { title: t.pain_2_title, desc: t.pain_2_desc },
    { title: t.pain_3_title, desc: t.pain_3_desc },
    { title: t.pain_4_title, desc: t.pain_4_desc },
    { title: t.pain_5_title, desc: t.pain_5_desc },
  ];

  return (
    <section className="py-20 lg:py-28" style={{ background: "#F7F3EE", fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-14"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            className="inline-block bg-[#1B2A1A] text-white rounded-full px-4 py-1.5 mb-5"
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {t.pain_badge}
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#1B2A1A",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {t.pain_h2_1} <br />
            <span style={{ color: "#2D6A4F" }}>{t.pain_h2_accent}</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontSize: "17px", color: "#5A5A4A", lineHeight: 1.6 }}>
            {t.pain_sub}
          </p>
        </div>

        {/* Pain cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pains.map((pain, i) => (
            <PainCard
              key={i}
              title={pain.title}
              desc={pain.desc}
              emoji={PAIN_COLORS[i].emoji}
              color={PAIN_COLORS[i].color}
              border={PAIN_COLORS[i].border}
              index={i}
            />
          ))}
          {/* Arrow card */}
          <div
            className="rounded-2xl p-5 border-2 border-dashed border-[#B7DEC9] flex flex-col items-center justify-center text-center min-h-[150px]"
            style={{ background: "transparent" }}
          >
            <div className="text-4xl mb-2">✨</div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#2D6A4F" }}>
              {t.pain_cta}
            </p>
            <p style={{ fontSize: "13px", color: "#7A7A6A", marginTop: "4px" }}>{t.pain_cta_sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
