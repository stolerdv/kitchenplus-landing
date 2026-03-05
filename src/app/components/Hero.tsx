import React, { useEffect, useRef } from "react";
import { CheckCircle2, Star } from "lucide-react";
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

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
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

  return (
    <section
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
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
              className="relative transition-transform duration-200 ease-out"
              style={{ maxWidth: "480px", width: "100%" }}
            >
              {/* Phone frame */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[380px] sm:max-h-[500px] lg:max-h-[580px]"
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
                            <div key={u} className="text-center">
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

              {/* Floating cards */}
              <div
                className="hidden md:block absolute -left-8 top-16 bg-white rounded-2xl shadow-xl p-3 min-w-[140px]"
                style={{ animation: "float 4s ease-in-out infinite" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#D8F3DC] rounded-xl flex items-center justify-center text-lg">🥗</div>
                  <div>
                    <p style={{ fontSize: "10px", color: "#888" }}>{t.hero_next_meal}</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#1B2A1A" }}>{t.hero_lunch}</p>
                  </div>
                </div>
              </div>

              <div
                className="hidden md:block absolute right-4 top-1/3 bg-white rounded-2xl shadow-xl p-3 min-w-[150px]"
                style={{ animation: "float 4s ease-in-out infinite 1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FFF3E0] rounded-xl flex items-center justify-center text-lg">🛒</div>
                  <div>
                    <p style={{ fontSize: "10px", color: "#888" }}>{t.hero_shopping_list}</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#1B2A1A" }}>{t.hero_products}</p>
                  </div>
                </div>
              </div>

              <div
                className="hidden md:block absolute -left-10 bottom-44 bg-white rounded-2xl shadow-xl p-3 min-w-[150px]"
                style={{ animation: "float 4s ease-in-out infinite 0.75s" }}
              >
                <p style={{ fontSize: "10px", color: "#888" }}>{t.hero_whole_family}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex -space-x-1">
                    {["👨", "👩", "🧒"].map((e, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-[#D8F3DC] flex items-center justify-center text-xs">
                        {e}
                      </div>
                    ))}
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
      `}</style>
    </section>
  );
}
