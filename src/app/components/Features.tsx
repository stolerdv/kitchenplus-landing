import React, { useEffect, useRef, useState } from "react";
import { Calendar, ShoppingCart, BarChart2, Users, BookOpen, Camera, Check } from "lucide-react";
import { useLang } from "../../contexts/LangContext";

const groceryImg = "/images/happy-family-shopping.jpg";
const mealPrepImg = "/images/woman-shopping.jpg";
const foodFlatImg = "/images/flatlay-groceries-scale.jpg";
const familyImg = "/images/family-kitchen.jpg";
const recipeImg = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const receiptImg = "/images/woman-phone.jpg";

type Feature = {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
  img: string;
  imgAlt: string;
  reverse: boolean;
  accent: string;
  iconBg: string;
};

function FeatureBlock({ feature }: { feature: Feature }) {
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

  const isReverse = feature.reverse;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReverse ? "direction-rtl" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: "0.1s",
      }}
    >
      {/* Text side */}
      <div className={isReverse ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: feature.iconBg,
              letterSpacing: "0.05em",
            }}
          >
            {feature.num}
          </span>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={{ background: feature.iconBg }}
          >
            {feature.icon}
          </div>
        </div>
        <h3
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 800,
            color: "#1B2A1A",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            marginBottom: "14px",
          }}
        >
          {feature.title}
        </h3>
        <p style={{ fontSize: "16px", color: "#5A5A4A", lineHeight: 1.7, marginBottom: "18px" }}>
          {feature.desc}
        </p>
        <div className="space-y-2.5">
          {feature.bullets.map((b) => (
            <div key={b} className="flex items-start gap-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: feature.accent, border: `1.5px solid ${feature.iconBg}30` }}
              >
                <Check size={11} color={feature.iconBg} strokeWidth={3} />
              </div>
              <span style={{ fontSize: "14px", color: "#3A3A2A", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Image side */}
      <div className={`${isReverse ? "lg:order-1" : ""} relative`}>
        <div
          className="rounded-3xl overflow-hidden shadow-2xl relative"
          style={{ background: feature.accent }}
        >
          <img
            src={feature.img}
            alt={feature.imgAlt}
            className="w-full object-cover"
            style={{ height: "340px" }}
          />
          <div className="absolute bottom-4 left-4">
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                style={{ background: feature.iconBg }}
              >
                {feature.icon}
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#1B2A1A" }}>
                {feature.title.split(" ").slice(0, 3).join(" ")}...
              </span>
            </div>
          </div>
        </div>
        <div
          className="absolute -z-10 w-64 h-64 rounded-full opacity-30"
          style={{
            background: feature.accent,
            top: isReverse ? "auto" : "-20px",
            bottom: isReverse ? "-20px" : "auto",
            right: isReverse ? "auto" : "-20px",
            left: isReverse ? "-20px" : "auto",
          }}
        />
      </div>
    </div>
  );
}

export function Features() {
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

  const features: Feature[] = [
    {
      num: "01",
      icon: <Calendar size={22} />,
      title: t.feat_1_title,
      desc: t.feat_1_desc,
      bullets: [t.feat_1_b1, t.feat_1_b2, t.feat_1_b3],
      img: mealPrepImg,
      imgAlt: t.feat_1_alt,
      reverse: false,
      accent: "#D8F3DC",
      iconBg: "#2D6A4F",
    },
    {
      num: "02",
      icon: <ShoppingCart size={22} />,
      title: t.feat_2_title,
      desc: t.feat_2_desc,
      bullets: [t.feat_2_b1, t.feat_2_b2, t.feat_2_b3],
      img: groceryImg,
      imgAlt: t.feat_2_alt,
      reverse: true,
      accent: "#FFF3E0",
      iconBg: "#E07A3D",
    },
    {
      num: "03",
      icon: <BarChart2 size={22} />,
      title: t.feat_3_title,
      desc: t.feat_3_desc,
      bullets: [t.feat_3_b1, t.feat_3_b2, t.feat_3_b3],
      img: foodFlatImg,
      imgAlt: t.feat_3_alt,
      reverse: false,
      accent: "#F3F0FF",
      iconBg: "#7B5EA7",
    },
    {
      num: "04",
      icon: <Users size={22} />,
      title: t.feat_4_title,
      desc: t.feat_4_desc,
      bullets: [t.feat_4_b1, t.feat_4_b2, t.feat_4_b3],
      img: familyImg,
      imgAlt: t.feat_4_alt,
      reverse: true,
      accent: "#FFF0F0",
      iconBg: "#E05858",
    },
    {
      num: "05",
      icon: <BookOpen size={22} />,
      title: t.feat_5_title,
      desc: t.feat_5_desc,
      bullets: [t.feat_5_b1, t.feat_5_b2, t.feat_5_b3],
      img: recipeImg,
      imgAlt: t.feat_5_alt,
      reverse: false,
      accent: "#E8F5E9",
      iconBg: "#388E3C",
    },
    {
      num: "06",
      icon: <Camera size={22} />,
      title: t.feat_6_title,
      desc: t.feat_6_desc,
      bullets: [t.feat_6_b1, t.feat_6_b2, t.feat_6_b3],
      img: receiptImg,
      imgAlt: t.feat_6_alt,
      reverse: true,
      accent: "#E3F2FD",
      iconBg: "#1976D2",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            className="inline-block bg-[#D8F3DC] text-[#2D6A4F] rounded-full px-4 py-1.5 mb-4"
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {t.feat_badge}
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
            {t.feat_h2_1} <br />
            <span style={{ color: "#2D6A4F" }}>{t.feat_h2_accent}</span>
          </h2>
        </div>

        {/* Feature blocks */}
        <div className="space-y-20 lg:space-y-28">
          {features.map((f, i) => (
            <FeatureBlock key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
