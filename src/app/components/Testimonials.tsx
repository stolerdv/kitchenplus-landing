import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Анна Сергеева",
    role: "Мама троих детей, Москва",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    text: "Наконец-то перестала думать что готовить! Составляю меню на воскресенье — и вся неделя спланирована. Список покупок генерируется сам, в магазине хожу только по нему. Сэкономила и деньги, и нервы.",
  },
  {
    name: "Екатерина Волкова",
    role: "Нутрициолог, 47 клиентов",
    avatar: "https://i.pravatar.cc/80?img=44",
    rating: 5,
    text: "Работаю с клиентами стало в разы проще. Раньше отправляла PDF — теряли, не открывали. Сейчас отправляю ссылку — клиент открывает в браузере, видит меню и список покупок. Конверсия в соблюдение плана выросла до 80%.",
  },
  {
    name: "Дмитрий Ковалёв",
    role: "Фитнес-тренер, Алматы",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    text: "Использую Premium уже 8 месяцев. Ведю 24 клиента в питании параллельно с тренировками. Что раньше занимало 2-3 часа на составление плана — теперь 15 минут. Клиенты в восторге от мобильной страницы.",
  },
  {
    name: "Марина Белова",
    role: "Мама, следит за питанием семьи",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
    text: "Муж наконец перестал спрашивать «что на ужин?» — просто смотрит в приложение. КБЖУ считаю для всей семьи, включая ребёнка. Офлайн работа — это очень важно, в магазине нет Wi-Fi.",
  },
];

export function Testimonials() {
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
    <section
      className="py-20 lg:py-28 bg-white"
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
            ОТЗЫВЫ
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
            50,000+ семей уже планируют <br />
            <span style={{ color: "#2D6A4F" }}>питание с KitchenPlus</span>
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
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
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D8F3DC] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#1B2A1A" }}>{t.name}</p>
                  <p style={{ fontSize: "12px", color: "#7A7A6A", marginTop: "1px" }}>{t.role}</p>
                  <div className="flex gap-0.5 mt-1.5">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <Star key={j} size={12} className="fill-[#F4A235] text-[#F4A235]" />
                    ))}
                  </div>
                </div>
                <Quote size={24} color="#D8F3DC" className="flex-shrink-0" />
              </div>
              <p style={{ fontSize: "14px", color: "#4A4A3A", lineHeight: 1.7 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
