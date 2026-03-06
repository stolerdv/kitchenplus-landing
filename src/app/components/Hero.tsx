import React, { useEffect, useRef } from "react";
import { CheckCircle2, Star, ChevronDown, Utensils, ShoppingCart, Users } from "lucide-react";
import { useLang } from "../../contexts/LangContext";
import { openDownloadModal } from "./DownloadModal";

function AppleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 814 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.9 0 133.5 2.6 198.3 99zM554.1 158.4c31.5-38 53.7-90.7 53.7-143.4 0-7.7-.6-15.4-1.9-21.8-50.7 1.9-110.7 33.7-147.2 77.6-28.2 32.7-54.4 85.4-54.4 138.7 0 8.3 1.3 16.6 1.9 19.2 3.2.6 8.3 1.3 13.4 1.3 45.3 0 102.3-30.3 134.5-71.6z"/>
    </svg>
  );
}

function GooglePlayLogo() {
  return <img src="/images/google-play.png" width={22} height={22} alt="Google Play" style={{ objectFit: "contain" }} />;
}

const heroImage = "/images/hero-family.jpg";

export function Hero() {
  const { t } = useLang();
  const imgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Desktop only: 3D tilt on mouse move
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    const reset = () => {
      el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    };
    window.addEventListener("mousemove", handler);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseleave", reset);
    };
  }, []);

  // Mobile entrance animation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "1";
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F7F3EE 0%, #EFF7F2 50%, #F7F3EE 100%)", fontFamily: "Manrope, sans-serif" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #52B788 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #E07A3D 0%, transparent 70%)" }}
        />
        {/* Mobile-only ambient blobs */}
        <div
          className="md:hidden absolute top-1/3 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2D6A4F 0%, transparent 70%)" }}
        />
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="md:hidden w-full pt-20 pb-10 px-5 flex flex-col items-center">

        {/* Social proof pill — top */}
        <div
          className="flex items-center gap-2 mb-6"
          style={{
            background: "rgba(45,106,79,0.08)",
            border: "1px solid rgba(45,106,79,0.18)",
            borderRadius: "100px",
            padding: "6px 14px",
            animation: "slideUpFade 0.5s ease forwards",
          }}
        >
          <div className="flex -space-x-1.5">
            {[
              "https://i.pravatar.cc/40?img=1",
              "https://i.pravatar.cc/40?img=5",
              "https://i.pravatar.cc/40?img=9",
            ].map((src, i) => (
              <img key={i} src={src} className="w-5 h-5 rounded-full border border-white object-cover" alt="user" />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={10} className="fill-[#F4A235] text-[#F4A235]" />
            ))}
          </div>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#2D6A4F" }}>
            <strong>{t.hero_social_thousands}</strong> {t.hero_social_use}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center mb-4"
          style={{
            fontSize: "clamp(32px, 9vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#1B2A1A",
            letterSpacing: "-0.025em",
            animation: "slideUpFade 0.55s ease 0.05s forwards",
            opacity: 0,
          }}
        >
          {t.hero_h1_1} <br />
          {t.hero_h1_2}{" "}
          <span
            style={{
              color: "#2D6A4F",
              background: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.hero_h1_accent}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-center mb-7 max-w-xs"
          style={{
            fontSize: "15px",
            color: "#5A5A4A",
            lineHeight: 1.65,
            animation: "slideUpFade 0.55s ease 0.1s forwards",
            opacity: 0,
          }}
        >
          {t.hero_sub}
        </p>

        {/* Phone Mockup — centered, hero element on mobile */}
        <div
          className="relative mb-7 w-full flex justify-center"
          style={{
            animation: "scaleIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.15s forwards",
            opacity: 0,
          }}
        >
          {/* Phone frame */}
          <div
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{
              background: "#1B2A1A",
              padding: "8px",
              aspectRatio: "9/17",
              width: "min(62vw, 240px)",
              maxWidth: "240px",
            }}
          >
            <div className="rounded-[2rem] overflow-hidden h-full">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "56% center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#e8e0d8",
                }}
              />
              {/* App UI overlay */}
              <div
                className="absolute inset-[8px] rounded-[2rem] overflow-hidden"
                style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(27,42,26,0.75) 100%)" }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-lg">
                    <p style={{ fontSize: "9px", color: "#2D6A4F", fontWeight: 700 }}>{t.hero_today_menu}</p>
                    <p style={{ fontSize: "12px", color: "#1B2A1A", fontWeight: 700, marginTop: "1px" }}>{t.hero_meal_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {[["320", t.hero_kcal], ["28г", t.hero_protein], ["12г", t.hero_fat]].map(([v, u]) => (
                        <div key={u as string} className="text-center">
                          <p style={{ fontSize: "10px", fontWeight: 700, color: "#2D6A4F" }}>{v}</p>
                          <p style={{ fontSize: "8px", color: "#888" }}>{u}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card — left */}
          <div
            className="absolute bg-white rounded-2xl shadow-xl p-2.5"
            style={{
              left: "8px",
              top: "22%",
              minWidth: "110px",
              animation: "float 4s ease-in-out infinite",
              zIndex: 10,
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-[#D8F3DC] rounded-lg flex items-center justify-center flex-shrink-0"><Utensils size={13} color="#2D6A4F" strokeWidth={2} /></div>
              <div>
                <p style={{ fontSize: "8px", color: "#888" }}>{t.hero_next_meal}</p>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#1B2A1A", whiteSpace: "nowrap" }}>{t.hero_lunch}</p>
              </div>
            </div>
          </div>

          {/* Floating card — right */}
          <div
            className="absolute bg-white rounded-2xl shadow-xl p-2.5"
            style={{
              right: "8px",
              top: "48%",
              minWidth: "110px",
              animation: "float 4s ease-in-out infinite 1.5s",
              zIndex: 10,
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-[#FFF3E0] rounded-lg flex items-center justify-center flex-shrink-0"><ShoppingCart size={13} color="#E07A3D" strokeWidth={2} /></div>
              <div>
                <p style={{ fontSize: "8px", color: "#888" }}>{t.hero_shopping_list}</p>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#1B2A1A", whiteSpace: "nowrap" }}>{t.hero_products}</p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Buttons — full width, premium feel */}
        <div
          className="w-full flex flex-col gap-3 mb-5"
          style={{
            animation: "slideUpFade 0.55s ease 0.25s forwards",
            opacity: 0,
            maxWidth: "320px",
          }}
        >
          <button
            onClick={openDownloadModal}
            className="flex items-center justify-center gap-3 text-white w-full rounded-2xl transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1B2A1A 0%, #2D4A2D 100%)",
              padding: "14px 20px",
              fontWeight: 600,
              fontSize: "15px",
              boxShadow: "0 8px 24px rgba(27,42,26,0.25), 0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <AppleLogo />
            <span>
              <span style={{ fontSize: "10px", display: "block", opacity: 0.65, lineHeight: 1 }}>{t.hero_download_in}</span>
              App Store
            </span>
          </button>
          <button
            onClick={openDownloadModal}
            className="flex items-center justify-center gap-3 text-white w-full rounded-2xl transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1B2A1A 0%, #2D4A2D 100%)",
              padding: "14px 20px",
              fontWeight: 600,
              fontSize: "15px",
              boxShadow: "0 8px 24px rgba(27,42,26,0.25), 0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <GooglePlayLogo />
            <span>
              <span style={{ fontSize: "10px", display: "block", opacity: 0.65, lineHeight: 1 }}>{t.hero_download_in}</span>
              Google Play
            </span>
          </button>
        </div>

        {/* Trust badges — compact row */}
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center mb-6"
          style={{ animation: "slideUpFade 0.55s ease 0.3s forwards", opacity: 0 }}
        >
          {[t.hero_trust_1, t.hero_trust_2, t.hero_trust_3].map((text) => (
            <div key={text} className="flex items-center gap-1">
              <CheckCircle2 size={12} color="#52B788" />
              <span style={{ fontSize: "12px", color: "#5A5A4A" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Scroll down hint — large bouncing arrow */}
        <div
          className="flex items-center justify-center mt-3"
          style={{ animation: "slideUpFade 0.55s ease 0.4s forwards", opacity: 0 }}
        >
          <ChevronDown size={32} color="#B0ADA5" style={{ animation: "bounceDown 1.8s ease-in-out infinite" }} />
        </div>
      </div>

      {/* ==================== DESKTOP LAYOUT (unchanged) ==================== */}
      <div className="hidden md:block relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <h1
              className="mb-5"
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#1B2A1A",
                letterSpacing: "-0.02em",
              }}
            >
              {t.hero_h1_1} <br />
              {t.hero_h1_2}{" "}
              <span style={{ color: "#2D6A4F" }}>{t.hero_h1_accent}</span>
            </h1>

            <p
              className="mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: "17px", color: "#5A5A4A", lineHeight: 1.65 }}
            >
              {t.hero_sub}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-7">
              <button
                onClick={openDownloadModal}
                className="flex items-center justify-center gap-3 bg-[#1B2A1A] hover:bg-[#0F1A0F] text-white px-6 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontWeight: 600, fontSize: "15px" }}
              >
                <AppleLogo />
                <span>
                  <span style={{ fontSize: "11px", display: "block", opacity: 0.7, lineHeight: 1 }}>{t.hero_download_in}</span>
                  App Store
                </span>
              </button>
              <button
                onClick={openDownloadModal}
                className="flex items-center justify-center gap-3 bg-[#1B2A1A] hover:bg-[#0F1A0F] text-white px-6 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontWeight: 600, fontSize: "15px" }}
              >
                <GooglePlayLogo />
                <span>
                  <span style={{ fontSize: "11px", display: "block", opacity: 0.7, lineHeight: 1 }}>{t.hero_download_in}</span>
                  Google Play
                </span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-8">
              {[t.hero_trust_1, t.hero_trust_2, t.hero_trust_3].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} color="#52B788" />
                  <span style={{ fontSize: "13px", color: "#5A5A4A" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[
                  "https://i.pravatar.cc/40?img=1",
                  "https://i.pravatar.cc/40?img=5",
                  "https://i.pravatar.cc/40?img=9",
                  "https://i.pravatar.cc/40?img=12",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    alt="user"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={12} className="fill-[#F4A235] text-[#F4A235]" />
                  ))}
                </div>
                <p style={{ fontSize: "12px", color: "#5A5A4A" }}>
                  <strong style={{ color: "#1B2A1A" }}>{t.hero_social_thousands}</strong> {t.hero_social_use}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={imgRef}
              className="relative transition-transform duration-200 ease-out w-[78%] sm:w-full"
              style={{ maxWidth: "480px" }}
            >
              {/* Phone frame */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[380px] sm:max-h-[500px] lg:max-h-[580px] mx-auto"
                style={{
                  background: "#1B2A1A",
                  padding: "10px",
                  aspectRatio: "9/17",
                }}
              >
                <div className="rounded-[2rem] overflow-hidden h-full">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${heroImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "56% center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#e8e0d8",
                    }}
                  />
                  {/* App UI overlay */}
                  <div
                    className="absolute inset-[10px] rounded-[2rem] overflow-hidden"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(27,42,26,0.7) 100%)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                      <div className="w-16 h-1 bg-white/80 rounded-full mx-auto" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                        <p style={{ fontSize: "11px", color: "#2D6A4F", fontWeight: 700 }}>{t.hero_today_menu}</p>
                        <p style={{ fontSize: "14px", color: "#1B2A1A", fontWeight: 700, marginTop: "2px" }}>{t.hero_meal_name}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          {[["320", t.hero_kcal], ["28г", t.hero_protein], ["12г", t.hero_fat], ["25г", t.hero_carbs]].map(([v, u]) => (
                            <div key={u as string} className="text-center">
                              <p style={{ fontSize: "12px", fontWeight: 700, color: "#2D6A4F" }}>{v}</p>
                              <p style={{ fontSize: "9px", color: "#888" }}>{u}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards — desktop only */}
              <div
                className="absolute left-0 md:-left-8 top-16 bg-white rounded-2xl shadow-xl p-3 min-w-[130px] md:min-w-[140px]"
                style={{ animation: "float 4s ease-in-out infinite" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#D8F3DC] rounded-xl flex items-center justify-center"><Utensils size={15} color="#2D6A4F" strokeWidth={2} /></div>
                  <div>
                    <p style={{ fontSize: "9px", color: "#888" }}>{t.hero_next_meal}</p>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#1B2A1A" }}>{t.hero_lunch}</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute right-0 md:right-4 top-1/3 bg-white rounded-2xl shadow-xl p-3 min-w-[130px] md:min-w-[150px]"
                style={{ animation: "float 4s ease-in-out infinite 1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FFF3E0] rounded-xl flex items-center justify-center"><ShoppingCart size={15} color="#E07A3D" strokeWidth={2} /></div>
                  <div>
                    <p style={{ fontSize: "9px", color: "#888" }}>{t.hero_shopping_list}</p>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#1B2A1A" }}>{t.hero_products}</p>
                  </div>
                </div>
              </div>

              <div
                className="hidden md:block absolute -left-10 bottom-44 bg-white rounded-2xl shadow-xl p-3 min-w-[150px]"
                style={{ animation: "float 4s ease-in-out infinite 0.75s" }}
              >
                <p style={{ fontSize: "10px", color: "#888" }}>{t.hero_whole_family}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-7 h-7 rounded-xl bg-[#D8F3DC] flex items-center justify-center">
                    <Users size={15} color="#2D6A4F" strokeWidth={2} />
                  </div>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#2D6A4F" }}>{t.hero_family_count}</p>
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
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
