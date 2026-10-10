"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
type Language = "en" | "zh";
const Context = createContext({
  language: "zh" as Language,
  ready: false,
  setLanguage: (_: Language) => {},
});
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved =
        localStorage.getItem("aimatralab-language") ||
        localStorage.getItem("nexoralab-language");
      // Migrate a saved preference while keeping Chinese as the first-visit default.
      if (saved === "en" || saved === "zh")
        localStorage.setItem("aimatralab-language", saved);
    } catch {}
    setLanguage(saved === "en" ? "en" : "zh");
    setReady(true);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);
  const change = (value: Language) => {
    setLanguage(value);
    try {
      localStorage.setItem("aimatralab-language", value);
    } catch {}
  };
  return (
    <Context.Provider value={{ language, ready, setLanguage: change }}>
      {children}
    </Context.Provider>
  );
}
export function useLanguage() {
  const context = useContext(Context);
  return {
    ...context,
    text: (en: string, zh?: string) =>
      context.language === "zh" && zh ? zh : en,
  };
}
export function T({ children, zh }: { children: ReactNode; zh?: ReactNode }) {
  const { language } = useLanguage();
  const translated =
    zh !== undefined && (typeof zh !== "string" || !!zh.trim());
  return <>{language === "zh" && translated ? zh : children}</>;
}
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label="Language / 语言">
      <button
        type="button"
        lang="zh-CN"
        aria-pressed={language === "zh"}
        onClick={() => setLanguage("zh")}
      >
        中文
      </button>
      <button
        type="button"
        lang="en"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
