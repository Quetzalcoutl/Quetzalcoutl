import en from "../locales/en.json";
import pt from "../locales/pt.json";

export type Locale = "en" | "pt";

const translations: Record<Locale, Record<string, string>> = {
  en,
  pt,
};

// simple translation helper; falls back to key or english
export function t(key: string, locale: Locale = "en") {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

// hook for client components - determine locale from cookie set by proxy
import { useEffect, useState, useMemo } from "react";

function readLocaleFromCookie(): Locale {
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=(pt|en)/);
  return (match ? (match[1] as Locale) : "en");
}

export function useTranslations() {
  // start with value injected by server, if available, otherwise default
  const initial =
    typeof window !== "undefined" && (window as any).__LOCALE__ ? (window as any).__LOCALE__ : "en";

  const [loc, setLoc] = useState<Locale>(initial as Locale);

  useEffect(() => {
    const fromCookie = readLocaleFromCookie();
    if (fromCookie !== loc) {
      setLoc(fromCookie);
    }
  }, []);

  return useMemo(() => {
    return {
      t: (key: string) => t(key, loc),
      locale: loc,
    };
  }, [loc]);
}
