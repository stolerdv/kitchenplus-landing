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
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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
      className="py-14 lg:py-28 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #1B2A1A 0%, #0F1A0F 60%, #1A2A20 100%)",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #2D6A4F 0%, transparent 50%), radial-gradient(circle at 80% 20%, #52B788 0%, transparent 40%)"
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div
            className="order-2 lg:order-1 min-w-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
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
                marginBottom: "16px",
              }}
            >
              {t.prof_h2_1} <br />
              {t.prof_h2_2}
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "32px" }}>
              {t.prof_desc}
            </p>

            {/* Description box */}
            <div
              className="rounded-2xl p-5 mb-8"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                {t.prof_box}
              </p>
            </div>

            {/* Steps */}
            <div className="flex items-start gap-0 mb-8 overflow-x-auto pb-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center text-center min-w-[90px]">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-2 flex-shrink-0"
                      style={{ background: "#2D6A4F", color: "white", fontWeight: 700, fontSize: "15px" }}
                    >
                      {step.num}
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4, maxWidth: "80px" }}>
                      {step.label}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="h-0.5 w-6 flex-shrink-0 mb-5"
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

          {/* Right: Image */}
          <div
            className="order-1 lg:order-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.2s",
            }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl max-h-72 sm:max-h-none" style={{ aspectRatio: "4/5" }}>
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
                className="hidden lg:block absolute -left-5 top-44 bg-white rounded-2xl shadow-xl p-4"
                style={{ animation: "float 4s ease-in-out infinite" }}
              >
                <p style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.prof_card_1_label}</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#1B2A1A", lineHeight: 1 }}>{t.prof_card_1_name}</p>
                <p style={{ fontSize: "11px", color: "#2D6A4F", marginTop: "4px", fontWeight: 600 }}>{t.prof_card_1_note}</p>
              </div>

              <div
                className="hidden lg:block absolute -right-5 bottom-16 bg-white rounded-2xl shadow-xl p-4"
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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
