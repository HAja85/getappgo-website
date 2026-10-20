import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { zillion, type ZillionCopy } from "@/content/zillion";

export type Lang = "en" | "ar";

const STORAGE_KEY = "zillion.lang";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  setLang: (lang: Lang) => void;
  copy: ZillionCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang | undefined {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "ar" || value === "en" ? value : undefined;
  } catch {
    return undefined;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Pre-rendered HTML is English; the stored choice is applied right after hydration.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: choice lasts for this visit */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isRtl: lang === "ar",
      setLang,
      copy: zillion[lang],
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function useCopy(): ZillionCopy {
  return useLanguage().copy;
}
