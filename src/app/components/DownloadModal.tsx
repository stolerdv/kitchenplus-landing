import React, { useState, useEffect } from "react";
import { X, Heart } from "lucide-react";

const listeners: Array<() => void> = [];

export function openDownloadModal() {
  listeners.forEach((fn) => fn());
}

export function DownloadModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => { setOpen(true); setSubmitted(false); setEmail(""); };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(27,42,26,0.55)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-white rounded-3xl max-w-sm w-full text-center shadow-2xl overflow-hidden"
        style={{
          fontFamily: "Manrope, sans-serif",
          animation: "modalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top green band */}
        <div
          className="relative flex flex-col items-center justify-center pt-10 pb-8 px-8"
          style={{ background: "linear-gradient(135deg, #2D6A4F 0%, #1B5E3A 100%)" }}
        >
          {/* Decorative dots */}
          <div className="absolute top-3 left-5 w-2 h-2 rounded-full bg-white opacity-20" />
          <div className="absolute top-6 left-10 w-1.5 h-1.5 rounded-full bg-white opacity-15" />
          <div className="absolute top-4 right-7 w-2.5 h-2.5 rounded-full bg-white opacity-15" />
          <div className="absolute top-8 right-12 w-1 h-1 rounded-full bg-white opacity-20" />

          {/* Icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", fontSize: "40px" }}
          >
            🥗
          </div>

          <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "6px" }}>
            {submitted ? "Ура, записали! 🎉" : "Уже совсем скоро"}
          </h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            {submitted
              ? "Пришлём письмо в день релиза"
              : "Готовимся к запуску в App Store и Google Play"}
          </p>
        </div>

        {/* Bottom white content */}
        <div className="px-8 py-7">
          {!submitted ? (
            <>
              <p style={{ fontSize: "14px", color: "#5A5A4A", lineHeight: 1.65, marginBottom: "20px" }}>
                Оставь email — и ты будешь первым, кто узнает о запуске. Никакого спама, обещаем 💚
              </p>

              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E0DDD5] outline-none text-sm"
                  style={{ fontFamily: "Manrope, sans-serif", color: "#1B2A1A", transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0DDD5")}
                  onKeyDown={(e) => { if (e.key === "Enter" && email && !loading) (e.target as HTMLInputElement).blur(); }}
                />
                <button
                  onClick={async () => {
                    if (!email || loading) return;
                    setLoading(true);
                    try {
                      await fetch("/api/waitlist", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                      });
                    } catch (_) {}
                    setLoading(false);
                    setSubmitted(true);
                  }}
                  className="text-white px-4 py-2.5 rounded-xl transition-all text-sm font-semibold hover:-translate-y-0.5 hover:shadow-md"
                  style={{ fontFamily: "Manrope, sans-serif", background: "#2D6A4F", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "..." : "Уведомить"}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                <Heart size={11} className="fill-[#E05858] text-[#E05858]" />
                <p style={{ fontSize: "12px", color: "#BBBBAA" }}>Сделано с любовью в Казахстане</p>
              </div>
            </>
          ) : (
            <div className="py-2">
              <div className="text-4xl mb-3">💌</div>
              <p style={{ fontSize: "14px", color: "#5A5A4A", lineHeight: 1.65, marginBottom: "20px" }}>
                Отлично! Как только приложение появится в маркетах — сразу напишем на <strong style={{ color: "#2D6A4F" }}>{email}</strong>
              </p>
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "#2D6A4F" }}
              >
                Отлично, жду!
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <X size={14} color="rgba(255,255,255,0.8)" />
        </button>
      </div>

      <style>{`
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.92) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
