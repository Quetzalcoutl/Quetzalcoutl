"use client"

import { useTranslations } from "@/lib/i18n"

export default function Footer() {
  const { t } = useTranslations()

  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-8 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground tracking-[0.15em]">
          {t("copyright")}
        </span>
        <span className="font-mono text-xs text-muted-foreground tracking-[0.1em]">
          {t("crafted")}
        </span>
        <a
          href="#"
          className="font-mono text-xs text-muted-foreground hover:text-primary tracking-[0.15em] transition-colors duration-300"
        >
          {t("backToTop")}
        </a>
      </div>
    </footer>
  )
}
