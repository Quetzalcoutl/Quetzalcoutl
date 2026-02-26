"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "@/lib/i18n"

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/quetzalcoutl" },
  { label: "WhatsApp", href: "https://wa.me/5592982610073" },
]

export default function ContactSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15)
  const { t } = useTranslations()

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="font-mrrobot text-xs tracking-[0.3em] uppercase text-primary">
                004 / {t("contact")}
              </span>
            </div>

            <h2
              className={`text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-foreground leading-tight text-balance transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {t("contactHeaderLine1")}
              <br />
              {t("contactHeaderLine2")}
              <br />
              <span className="text-primary">{t("contactHeaderLine3")}</span>
            </h2>

            <div
              className={`mt-4 transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-xl md:text-2xl font-mono text-muted-foreground">
                {t("contactFollow")}
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/quetzalcoutl"
                  className="group inline-flex items-center gap-3 text-xl md:text-2xl font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <span>@quetzalcoutl</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
                <a
                  href="https://wa.me/5592982610073"
                  className="group inline-flex items-center gap-3 text-xl md:text-2xl font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <span>+55 (92) 98261‑0073</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 flex flex-col justify-end gap-8">
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="font-sans text-muted-foreground leading-relaxed mb-10">
                {t("contactParagraph")}
              </p>

              <div className="flex flex-col gap-4">
                {socials.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group flex items-center justify-between py-3 border-b border-border hover:border-primary/30 transition-all duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="font-sans text-foreground group-hover:text-primary transition-colors duration-300">
                      {social.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
