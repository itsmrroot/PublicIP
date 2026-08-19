"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGUAGES, translations, type Dictionary, type Lang } from "@/lib/translations";

const STORAGE_KEY = "whereami-lang";
const DEFAULT_LANG: Lang = "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    const option = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = option.dir;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
