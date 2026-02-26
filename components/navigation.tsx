"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "@/lib/i18n"

export default function Navigation() {
  const { t, locale } = useTranslations()

  const links = [
    { label: t("about"), href: "#about" },
    { label: t("disciplines"), href: "#disciplines" },
    { label: t("work"), href: "#work" },
    { label: t("manifesto"), href: "#manifesto" },
    { label: t("architecture"), href: "#architecture" },
    { label: t("contact"), href: "#contact" },
  ]

  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sections = links.map((link) => link.href.slice(1))

    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      let current = ""

      for (const section of sections) {
        const el = document.getElementById(section)
        if (!el) continue

        const rect = el.getBoundingClientRect()

        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section
          break
        }
      }

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [links])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-sm tracking-widest text-foreground hover:text-primary transition-colors duration-300"
        >
          Q.
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const sectionId = link.href.slice(1)
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-primary" />
                )}
              </a>
            )
          })}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {t("building")}
          </span>
          {/* simple locale toggle */}
          <Link
            href={locale === "pt" ? "/en" : "/pt"}
            className="ml-4 font-mono text-xs uppercase"
          >
            {locale === "pt" ? "EN" : "PT"}
          </Link>
        </div>
      </div>
    </nav>
  )
}
