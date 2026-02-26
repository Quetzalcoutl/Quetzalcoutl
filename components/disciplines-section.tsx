"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Code, Terminal, Megaphone, Hash } from "lucide-react"

const disciplines = [
  {
    icon: Code,
    number: "01",
    title: "Systems Architect",
    philosophy: "Scale with integrity.",
    description:
      "Designing full-stack infrastructures that scale from local communities to planetary networks. High-performance applications built with intention and long-term vision.",
    tools: ["Next.js", "Rust", "Elixir", "Redis", "Kafka", "System Design"],
  },
  {
    icon: Hash,
    number: "02",
    title: "Green Blockchain Engineer",
    philosophy: "Finance should heal.",
    description:
      "Engineering sustainable financial systems. Stablecoins, smart contracts, NFTs, and tokenized environmental impact aligned with ecological regeneration.",
    tools: ["Solidity", "Ethereum", "Tokenomics", "IPFS", "DAO Governance"],
  },
  {
    icon: Terminal,
    number: "03",
    title: "AI Infrastructure Builder",
    philosophy: "Intelligence as augmentation.",
    description:
      "Building distributed AI systems that enhance human capability. Middleware orchestration, indexing, and scalable architectures for real-world impact.",
    tools: ["LLMs", "Python", "APIs", "Indexers", "Distributed Systems"],
  },
  {
    icon: Megaphone,
    number: "04",
    title: "Amazon Regeneration Activist",
    philosophy: "Technology must serve life.",
    description:
      "Using technology as leverage for ecological and social rebalance. Platforms that fund forests, empower creators, and decentralize opportunity.",
    tools: ["Reforestation", "Civic Tech", "Digital Rights", "Community Tech"],
  },
]

export default function DisciplinesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1)

  return (
    <section
      id="disciplines"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col gap-4">
            <span className="font-mrrobot text-xs tracking-[0.3em] uppercase text-primary">
              002 / Disciplines
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground text-balance">
              Building the infrastructure
              <br />
              for the next civilization.
            </h2>
          </div>

          <p className="text-muted-foreground font-sans text-base max-w-md leading-relaxed">
            Technology, ecology, intelligence, and culture are not separate
            domains. They are layers of the same system. Every discipline feeds
            the others.
          </p>
        </div>

        {/* Discipline cards */}
        <div className="flex flex-col gap-0">
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon

            return (
              <div
                key={discipline.title}
                className={`group relative border-t border-border py-12 md:py-16 transition-all duration-700 hover:bg-primary/5 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${(index + 1) * 120}ms`,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Number + Icon */}
                  <div className="md:col-span-1 flex items-center gap-4 md:flex-col md:items-start md:gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {discipline.number}
                    </span>

                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                  </div>

                  {/* Title + Philosophy */}
                  <div className="md:col-span-3">
                    <h3 className="text-2xl md:text-3xl font-sans font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                      {discipline.title}
                    </h3>

                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {discipline.philosophy}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="font-sans text-muted-foreground leading-relaxed">
                      {discipline.description}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="md:col-span-3">
                    <div className="flex flex-wrap gap-2">
                      {discipline.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-primary/80 transition-all duration-500"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated top accent line */}
                <div className="absolute left-0 top-0 w-0 group-hover:w-full h-px bg-primary transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
              </div>
            )
          })}

          {/* Bottom border */}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  )
}