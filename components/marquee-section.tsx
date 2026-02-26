"use client"

export default function MarqueeSection() {
  const words = [
    "CODE",
    "BLOCKCHAIN",
    "WEB3",
    "DEVELOPMENT",
    "ACTIVISM",
    "DESIGN",
    "INNOVATION",
    "JUSTICE",
  ]

  return (
    <section className="relative py-16 overflow-hidden border-y border-border">
      <div className="flex animate-[scroll_20s_linear_infinite]">
        {[...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-8 px-8 whitespace-nowrap"
          >
            <span className="text-4xl md:text-6xl lg:text-8xl font-mrrobot tracking-tight text-foreground/[0.04] hover:text-primary/20 transition-colors duration-500 cursor-default select-none">
              {word}
            </span>
            <span className="w-2 h-2 bg-primary/20 rotate-45 flex-shrink-0" />
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  )
}
