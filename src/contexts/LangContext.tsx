import { createContext, useContext, useState, useEffect } from "react";
import type { Locale } from "../hooks/useRegion";
import { translations, type Translations } from "../i18n/translations";

interface LangContextType {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "ru",
  setLang: () => {},
  t: translations.ru,
});

export function LangProvider({
  initialLang,
  children,
}: {
  initialLang: Locale;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Locale>(initialLang);

  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
