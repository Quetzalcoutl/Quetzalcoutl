"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslations } from "@/lib/i18n"

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.2)
  const { t } = useTranslations()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Label */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="font-mrrobot text-xs tracking-[0.3em] uppercase text-primary">
              001 / About
            </span>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            <p
              className={`text-2xl md:text-3xl lg:text-4xl font-sans font-light leading-relaxed text-foreground/90 text-balance transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("aboutIntro1")}
              <span className="text-primary font-medium">{t("aboutIntro1Tech")}</span> and{' '}
              <span className="text-primary font-medium">{t("aboutIntro1Creativity")}</span>
              {t("aboutIntro1End")}
            </p>

            <p
              className={`text-base md:text-lg font-sans text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("aboutIntro2")}
            </p>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 pt-8 border-t border-border transition-all duration-700 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: "15+", label: t("statsYearsCreating") },
                { value: "25+", label: t("statsProjects") },
                { value: "5", label: t("statsDisciplines") },
                { value: "Global", label: t("statsReach") },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span className="text-3xl md:text-4xl font-sans font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
