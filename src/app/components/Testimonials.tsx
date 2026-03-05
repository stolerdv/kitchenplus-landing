import React, { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useLang } from "../../contexts/LangContext";

const AVATARS: Record<string, string[]> = {
  ru: [
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=44",
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=32",
  ],
  en: [
    "https://i.pravatar.cc/80?img=10",
    "https://i.pravatar.cc/80?img=20",
    "https://i.pravatar.cc/80?img=3",
    "https://i.pravatar.cc/80?img=45",
  ],
  kk: [
    "https://i.pravatar.cc/80?img=36",  // Айгерім — женщина
    "https://i.pravatar.cc/80?img=26",  // Дана — женщина
    "https://i.pravatar.cc/80?img=52",  // Арман — мужчина
    "https://i.pravatar.cc/80?img=49",  // Жанна — женщина
  ],
};

export function Testimonials() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const avatars = AVATARS[lang] ?? AVATARS.ru;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    { name: t.test_1_name, role: t.test_1_role, avatar: avatars[0], rating: 5, text: t.test_1_text },
    { name: t.test_2_name, role: t.test_2_role, avatar: avatars[1], rating: 5, text: t.test_2_text },
    { name: t.test_3_name, role: t.test_3_role, avatar: avatars[2], rating: 5, text: t.test_3_text },
    { name: t.test_4_name, role: t.test_4_role, avatar: avatars[3], rating: 5, text: t.test_4_text },
  ];

  return (
    <section
      className="py-14 lg:py-28 bg-white"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            className="inline-block bg-[#FFF3E0] text-[#E07A3D] rounded-full px-4 py-1.5 mb-4"
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {t.test_badge}
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              color: "#1B2A1A",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {t.test_h2_1} <br />
            <span style={{ color: "#2D6A4F" }}>{t.test_h2_accent}</span>
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border border-[#E8E4DC] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "#FAFAFA",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D8F3DC] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#1B2A1A" }}>{testimonial.name}</p>
                  <p style={{ fontSize: "12px", color: "#7A7A6A", marginTop: "1px" }}>{testimonial.role}</p>
                  <div className="flex gap-0.5 mt-1.5">
                    {Array(testimonial.rating).fill(0).map((_, j) => (
                      <Star key={j} size={12} className="fill-[#F4A235] text-[#F4A235]" />
                    ))}
                  </div>
                </div>
                <Quote size={24} color="#D8F3DC" className="flex-shrink-0" />
              </div>
              <p style={{ fontSize: "14px", color: "#4A4A3A", lineHeight: 1.7 }}>{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
