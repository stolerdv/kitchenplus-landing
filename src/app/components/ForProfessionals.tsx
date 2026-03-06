import React, { useRef, useEffect, useState } from "react";
import { Clock, Sparkles, TrendingUp, Users } from "lucide-react";
import { useLang } from "../../contexts/LangContext";

const professionalImg = "/images/professional.jpg";

export function ForProfessionals() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { num: "1", label: t.prof_step_1 },
    { num: "2", label: t.prof_step_2 },
    { num: "3", label: t.prof_step_3 },
    { num: "4", label: t.prof_step_4 },
  ];

  const benefits = [
    { icon: <Clock size={20} />, title: t.prof_benefit_1_title, desc: t.prof_benefit_1_desc },
    { icon: <Sparkles size={20} />, title: t.prof_benefit_2_title, desc: t.prof_benefit_2_desc },
    { icon: <TrendingUp size={20} />, title: t.prof_benefit_3_title, desc: t.prof_benefit_3_desc },
    { icon: <Users size={20} />, title: t.prof_benefit_4_title, desc: t.prof_benefit_4_desc },
  ];

  return (
    <section
      id="specialists"
      ref={ref}
      className="overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #1B2A1A 0%, #0F1A0F 60%, #1A2A20 100%)",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #2D6A4F 0%, transparent 50%), radial-gradient(circle at 80% 20%, #52B788 0%, transparent 40%)"
        }} />
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden">
        {/* Full-bleed hero image with dark overlay */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "300px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <img
            src={professionalImg}
            alt="Нутрициолог"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 25%" }}
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(15,26,15,0.05) 0%, rgba(15,26,15,0.85) 100%)" }}
          />
          {/* Title over image bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2
              style={{
                fontSize: "clamp(26px, 7vw, 34px)",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {t.prof_h2_1} <br />
              {t.prof_h2_2}
            </h2>
          </div>
        </div>

        {/* Content below image */}
        <div
          className="px-5 pt-5 pb-7"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          {/* Badge — moved out of image so it doesn't cover faces */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
            style={{ background: "rgba(82,183,136,0.15)", border: "1px solid rgba(82,183,136,0.35)" }}
          >
            <Sparkles size={11} color="#52B788" />
            <span style={{ fontSize: "11px", color: "#52B788", fontWeight: 700, letterSpacing: "0.07em" }}>
              {t.prof_badge}
            </span>
          </div>

          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "20px" }}>
            {t.prof_desc}
          </p>

          {/* Description box */}
          <div
            className="rounded-2xl p-4 mb-6"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              {t.prof_box}
            </p>
          </div>

          {/* Steps — horizontal flow */}
          <div className="mb-6">
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "12px" }}>
              КАК ЭТО РАБОТАЕТ
            </p>
            <div className="flex items-start gap-0 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {steps.map((step, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center text-center" style={{ minWidth: "72px" }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
                      style={{ background: "#2D6A4F", color: "white", fontWeight: 700, fontSize: "14px" }}
                    >
                      {step.num}
                    </div>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, maxWidth: "64px" }}>
                      {step.label}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="h-0.5 w-4 flex-shrink-0 mb-5"
                      style={{ background: "rgba(82,183,136,0.4)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits 2x2 grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-xl p-3 flex flex-col gap-2"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.5s ease ${0.3 + i * 0.07}s`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(82,183,136,0.2)", color: "#52B788" }}
                >
                  {b.icon}
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{b.title}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginTop: "2px" }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== DESKTOP LAYOUT (unchanged) ==================== */}
      <div className="hidden lg:block py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* === TEXT COLUMN === */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-40px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                style={{ background: "rgba(82, 183, 136, 0.15)", border: "1px solid rgba(82,183,136,0.3)" }}
              >
                <Sparkles size={13} color="#52B788" />
                <span style={{ fontSize: "12px", color: "#52B788", fontWeight: 700, letterSpacing: "0.07em" }}>
                  {t.prof_badge}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                {t.prof_h2_1} <br />
                {t.prof_h2_2}
              </h2>

              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {t.prof_desc}
              </p>

              {/* Description box */}
              <div
                className="rounded-2xl p-5 mt-6 mb-6"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                  {t.prof_box}
                </p>
              </div>

              {/* Steps */}
              <div className="flex items-start gap-0 mb-6 overflow-x-auto pb-2">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center text-center min-w-[80px]">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center mb-2 flex-shrink-0"
                        style={{ background: "#2D6A4F", color: "white", fontWeight: 700, fontSize: "14px" }}
                      >
                        {step.num}
                      </div>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4, maxWidth: "72px" }}>
                        {step.label}
                      </p>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="h-0.5 w-5 flex-shrink-0 mb-5"
                        style={{ background: "rgba(82,183,136,0.4)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3.5 flex items-start gap-2.5"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(82,183,136,0.2)", color: "#52B788" }}
                    >
                      {b.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{b.title}</p>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.4, marginTop: "2px" }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* === IMAGE COLUMN === */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(40px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.2s",
              }}
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={professionalImg}
                    alt="Нутрициолог"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,26,15,0.6) 0%, transparent 50%)" }}
                  />
                </div>

                {/* Floating stats */}
                <div
                  className="absolute -left-5 top-44 bg-white rounded-2xl shadow-xl p-4"
                  style={{ animation: "float 4s ease-in-out infinite" }}
                >
                  <p style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.prof_card_1_label}</p>
                  <p style={{ fontSize: "16px", fontWeight: 800, color: "#1B2A1A", lineHeight: 1 }}>{t.prof_card_1_name}</p>
                  <p style={{ fontSize: "11px", color: "#2D6A4F", marginTop: "4px", fontWeight: 600 }}>{t.prof_card_1_note}</p>
                </div>

                <div
                  className="absolute -right-5 bottom-16 bg-white rounded-2xl shadow-xl p-4"
                  style={{ animation: "float 4s ease-in-out infinite 1s" }}
                >
                  <p style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.prof_card_2_label}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#1B2A1A" }}>{t.prof_card_2_status}</p>
                  </div>
                  <p style={{ fontSize: "11px", color: "#5A5A4A", marginTop: "2px" }}>{t.prof_card_2_note}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
