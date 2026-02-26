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

// hook for client components
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function useTranslations() {
  const { locale } = useRouter();
  const loc = (locale as Locale) || "en";
  return useMemo(() => {
    return {
      t: (key: string) => t(key, loc),
      locale: loc,
    };
  }, [loc]);
}
