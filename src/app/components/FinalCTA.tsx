import { useRef, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "../../contexts/LangContext";
import { openDownloadModal } from "./DownloadModal";

function AppleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.9 0 133.5 2.6 198.3 99zM554.1 158.4c31.5-38 53.7-90.7 53.7-143.4 0-7.7-.6-15.4-1.9-21.8-50.7 1.9-110.7 33.7-147.2 77.6-28.2 32.7-54.4 85.4-54.4 138.7 0 8.3 1.3 16.6 1.9 19.2 3.2.6 8.3 1.3 13.4 1.3 45.3 0 102.3-30.3 134.5-71.6z"/>
    </svg>
  );
}

function GooglePlayLogo() {
  return <img src="/images/google-play.png" width={22} height={22} alt="Google Play" style={{ objectFit: "contain" }} />;
}

export function FinalCTA() {
  const { t } = useLang();
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
            {t.cta_eyebrow}
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
          {t.cta_h2_1} <br />
          <span style={{ color: "#A8DCBC" }}>{t.cta_h2_accent}</span>
        </h2>

        <p
          style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "36px" }}
        >
          {t.cta_sub}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={openDownloadModal}
            className="flex items-center justify-center gap-3 bg-white hover:bg-[#F0F7F4] text-[#1B2A1A] px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontWeight: 700, fontSize: "16px" }}
          >
            <AppleLogo />
            <span>
              <span style={{ fontSize: "11px", display: "block", opacity: 0.6, lineHeight: 1, fontWeight: 500 }}>{t.cta_download_for}</span>
              iPhone
            </span>
          </button>
          <button
            onClick={openDownloadModal}
            className="flex items-center justify-center gap-3 bg-white hover:bg-[#F0F7F4] text-[#1B2A1A] px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontWeight: 700, fontSize: "16px" }}
          >
            <GooglePlayLogo />
            <span>
              <span style={{ fontSize: "11px", display: "block", opacity: 0.6, lineHeight: 1, fontWeight: 500 }}>{t.cta_download_for}</span>
              Android
            </span>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {[t.cta_badge_1, t.cta_badge_2, t.cta_badge_3, t.cta_badge_4].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <CheckCircle2 size={14} color="#52B788" />
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
