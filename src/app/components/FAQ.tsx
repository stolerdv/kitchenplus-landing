import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "../../contexts/LangContext";

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
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

  return (
    <div
      ref={ref}
      className="border border-[#E8E4DC] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#B7DEC9]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        transitionDelay: `${index * 0.07}s`,
        boxShadow: open ? "0 4px 20px rgba(45,106,79,0.08)" : "none",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ background: open ? "#F0F7F4" : "white" }}
        onClick={() => setOpen(!open)}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: open ? "#2D6A4F" : "#1B2A1A",
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          color={open ? "#2D6A4F" : "#7A7A6A"}
          className="flex-shrink-0 ml-3 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-4 pt-0">
          <p style={{ fontSize: "14px", color: "#5A5A4A", lineHeight: 1.7 }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
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

  const faqs = [
    { q: t.faq_1_q, a: t.faq_1_a },
    { q: t.faq_2_q, a: t.faq_2_a },
    { q: t.faq_3_q, a: t.faq_3_a },
    { q: t.faq_4_q, a: t.faq_4_a },
    { q: t.faq_5_q, a: t.faq_5_a },
    { q: t.faq_6_q, a: t.faq_6_a },
  ];

  return (
    <section
      id="faq"
      className="py-20 lg:py-28"
      style={{ background: "#F7F3EE", fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            className="inline-block bg-white text-[#2D6A4F] border border-[#B7DEC9] rounded-full px-4 py-1.5 mb-4"
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {t.faq_badge}
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              color: "#1B2A1A",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {t.faq_h2}
          </h2>
          <p className="mt-3" style={{ fontSize: "16px", color: "#7A7A6A" }}>
            {t.faq_sub}
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
