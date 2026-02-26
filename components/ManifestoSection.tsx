"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function ManifestoSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1)

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col gap-6 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mrrobot text-xs tracking-[0.3em] uppercase text-primary">
            004 / Manifesto
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground text-balance">
            Civilization is an engineering problem.
          </h2>
        </div>

        {/* Manifesto Content */}
        <div className="flex flex-col gap-12">
          {[
            "Financial systems today extract. They centralize power and externalize environmental cost.",
            "Social networks exploit attention. Intelligence systems optimize engagement, not wellbeing.",
            "The next layer must be regenerative by design.",
            "Finance should fund forests. Social identity should empower creators. AI should augment humanity — not replace it.",
            "Thera is not a product. It is infrastructure.",
          ].map((paragraph, index) => (
            <p
              key={index}
              className={`text-lg md:text-xl leading-relaxed text-muted-foreground transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 120}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}