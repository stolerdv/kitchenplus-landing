import React, { useState, useRef, useEffect } from "react";
import { Check, Zap, Crown, Gift } from "lucide-react";
import type { Currency } from "../../hooks/useRegion";
import { useLang } from "../../contexts/LangContext";

const PRICES: Record<Currency, { proMonthly: number; proYearly: number; proYearTotal: number; premiumMonthly: number; premiumYearly: number; premiumYearTotal: number; symbol: string }> = {
  RUB: { proMonthly: 499,   proYearly: 416,  proYearTotal: 4990,  premiumMonthly: 1999,  premiumYearly: 1666, premiumYearTotal: 19990, symbol: "₽" },
  KZT: { proMonthly: 1290,  proYearly: 1083, proYearTotal: 12990, premiumMonthly: 4990,  premiumYearly: 4166, premiumYearTotal: 49990, symbol: "₸" },
  USD: { proMonthly: 4.99,  proYearly: 4.16, proYearTotal: 49.9,  premiumMonthly: 19.99, premiumYearly: 16.66, premiumYearTotal: 199.9, symbol: "$" },
};

export function Pricing({ currency }: { currency: Currency }) {
  const { t } = useLang();
  const [yearly, setYearly] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const p = PRICES[currency];

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

  const plans = [
    {
      id: "free",
      icon: <Gift size={22} />,
      name: t.price_free_name,
      desc: t.price_free_desc,
      priceMonthly: 0,
      priceYearly: 0,
      currency: p.symbol,
      period: t.price_period_forever,
      color: "#F7F3EE",
      border: "#E8E4DC",
      iconBg: "#D8F3DC",
      iconColor: "#2D6A4F",
      cta: t.price_free_cta,
      ctaBg: "#F7F3EE",
      ctaText: "#1B2A1A",
      ctaBorder: "#D0CBC0",
      features: [
        t.price_free_f1,
        t.price_free_f2,
        t.price_free_f3,
        t.price_free_f4,
        t.price_free_f5,
        t.price_free_f6,
      ],
    },
    {
      id: "pro",
      icon: <Zap size={22} />,
      name: "Pro",
      desc: t.price_pro_desc,
      priceMonthly: p.proMonthly,
      priceYearly: p.proYearly,
      currency: p.symbol,
      period: t.price_period_month,
      popular: true,
      color: "#1B2A1A",
      border: "#2D6A4F",
      iconBg: "#2D6A4F",
      iconColor: "#ffffff",
      cta: t.price_pro_cta,
      ctaBg: "#2D6A4F",
      ctaText: "#ffffff",
      ctaBorder: "transparent",
      yearNote: `${p.proYearTotal.toLocaleString("ru-RU")} ${p.symbol}${t.price_year_suffix}`,
      features: [
        t.price_pro_f1,
        t.price_pro_f2,
        t.price_pro_f3,
        t.price_pro_f4,
        t.price_pro_f5,
        t.price_pro_f6,
        t.price_pro_f7,
        t.price_pro_f8,
      ],
    },
    {
      id: "premium",
      icon: <Crown size={22} />,
      name: "Premium",
      desc: t.price_prem_desc,
      priceMonthly: p.premiumMonthly,
      priceYearly: p.premiumYearly,
      currency: p.symbol,
      period: t.price_period_month,
      color: "#FFFBF4",
      border: "#F4A235",
      iconBg: "#FFF3E0",
      iconColor: "#E07A3D",
      cta: t.price_prem_cta,
      ctaBg: "#E07A3D",
      ctaText: "#ffffff",
      ctaBorder: "transparent",
      yearNote: `${p.premiumYearTotal.toLocaleString("ru-RU")} ${p.symbol}${t.price_year_suffix}`,
      features: [
        t.price_prem_f1,
        t.price_prem_f2,
        t.price_prem_f3,
        t.price_prem_f4,
        t.price_prem_f5,
        t.price_prem_f6,
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-14 lg:py-28"
      style={{ background: "#F7F3EE", fontFamily: "Manrope, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            className="inline-block bg-[#D8F3DC] text-[#2D6A4F] rounded-full px-4 py-1.5 mb-4"
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {t.price_badge}
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#1B2A1A",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            {t.price_h2_1} <br />
            <span style={{ color: "#2D6A4F" }}>{t.price_h2_accent}</span>
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span style={{ fontSize: "15px", color: yearly ? "#7A7A6A" : "#1B2A1A", fontWeight: 600 }}>
              {t.price_monthly}
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{ background: yearly ? "#2D6A4F" : "#D0CBC0" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300"
                style={{ left: yearly ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
            <span style={{ fontSize: "15px", color: yearly ? "#1B2A1A" : "#7A7A6A", fontWeight: 600 }}>
              {t.price_yearly}{" "}
              <span
                className="ml-1 px-1.5 py-0.5 rounded"
                style={{ background: "#D8F3DC", color: "#2D6A4F", fontSize: "12px", fontWeight: 700 }}
              >
                -29%
              </span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className="relative rounded-3xl p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: plan.color,
                  border: `2px solid ${plan.border}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full"
                    style={{ background: "#2D6A4F", color: "white", fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em" }}
                  >
                    {t.price_popular}
                  </div>
                )}

                {/* Icon & name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: plan.iconBg, color: plan.iconColor }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", fontWeight: 800, color: plan.popular ? "#ffffff" : "#1B2A1A" }}>
                      {plan.name}
                    </p>
                    <p style={{ fontSize: "12px", color: plan.popular ? "rgba(255,255,255,0.55)" : "#7A7A6A" }}>
                      {plan.desc}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span
                      style={{
                        fontSize: "42px",
                        fontWeight: 800,
                        color: plan.popular ? "#ffffff" : "#1B2A1A",
                        lineHeight: 1,
                      }}
                    >
                      {price === 0 ? "0" : price.toLocaleString("ru-RU")}
                    </span>
                    {price > 0 && (
                      <span style={{ fontSize: "18px", fontWeight: 600, color: plan.popular ? "rgba(255,255,255,0.7)" : "#7A7A6A", marginBottom: "4px" }}>
                        {plan.currency}
                      </span>
                    )}
                    <span style={{ fontSize: "14px", color: plan.popular ? "rgba(255,255,255,0.55)" : "#7A7A6A", marginBottom: "4px" }}>
                      {plan.period}
                    </span>
                  </div>
                  {yearly && plan.yearNote && (
                    <p style={{ fontSize: "12px", color: plan.popular ? "rgba(255,255,255,0.5)" : "#7A7A6A", marginTop: "3px" }}>
                      {plan.yearNote}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <button
                  className="w-full py-3 rounded-xl mb-6 transition-all duration-200 hover:opacity-90"
                  style={{
                    background: plan.ctaBg,
                    color: plan.ctaText,
                    border: `1.5px solid ${plan.ctaBorder}`,
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div
                  className="mb-4"
                  style={{ borderTop: `1px solid ${plan.popular ? "rgba(255,255,255,0.1)" : "#E8E4DC"}` }}
                />

                {/* Features */}
                <div className="space-y-2.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: plan.popular ? "rgba(82,183,136,0.2)" : "#D8F3DC",
                          minWidth: "18px",
                          minHeight: "18px",
                          width: "18px",
                          height: "18px",
                        }}
                      >
                        <Check size={10} color={plan.popular ? "#52B788" : "#2D6A4F"} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: "13px", color: plan.popular ? "rgba(255,255,255,0.75)" : "#3A3A2A", lineHeight: 1.5 }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
