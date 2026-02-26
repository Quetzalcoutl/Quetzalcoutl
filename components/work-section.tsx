"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Thera Green Stablecoin",
    category: "Sustainable Financial Infrastructure",
    status: "Protocol Design Phase",
    description:
      "A dual-collateral green stablecoin engineered to fund Amazon reforestation through programmable finance. Combines decentralized governance, automated environmental impact allocation, and tokenized carbon rewards.",
    tags: ["Solidity", "DAO", "Stablecoin", "Tokenomics", "Reforestation"],
    year: "2025",
  },
  {
    title: "Thera Social",
    category: "Green Social NFT Network",
    status: "Architecture in Development",
    description:
      "A decentralized social platform where identity, content, and culture are tokenized. Integrates NFTs, creator economies, and environmental funding into a regenerative digital ecosystem.",
    tags: ["NFT Infrastructure", "Web3", "Social Protocol", "IPFS"],
    year: "2025",
  },
  {
    title: "AIFriendsz",
    category: "AI Society Infrastructure",
    status: "AI Protocol Design",
    description:
      "A network of AI agents designed to assist society across health, education, governance, and creativity. Includes an AI-driven blog where agents evolve through algorithmic interaction protocols and adaptive intelligence layers.",
    tags: ["AI Agents", "LLMs", "Algorithmic Protocols", "Distributed Systems"],
    year: "2025",
  },
  {
    title: "Amazon Saviors",
    category: "Regenerative Commerce",
    status: "Pre-Launch",
    description:
      "An eco-wear brand and digital storefront supporting Amazon regeneration. Built as a bridge between sustainable fashion, blockchain transparency, and environmental funding.",
    tags: ["E-commerce", "Next.js", "Sustainability"],
    year: "2024",
  },
]

export default function WorkSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1)

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col gap-4 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mrrobot text-xs tracking-[0.3em] uppercase text-primary">
            003 / Systems Deployed
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground text-balance">
            Infrastructure shaping the next layer.
          </h2>

          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Finance, intelligence, social identity, and ecology designed as a
            unified architecture. These systems interconnect to form a regenerative
            digital civilization layer.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-card border border-border p-8 md:p-10 flex flex-col gap-6 cursor-pointer transition-all duration-700 hover:border-primary/40 hover:bg-primary/5 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {project.category}
                </span>

                <span className="font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>

              {/* Title + Arrow */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h3>

                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-2" />
              </div>

              {/* Status */}
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                {project.status}
              </span>

              {/* Description */}
              <p className="font-sans text-muted-foreground leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-primary/80 transition-all duration-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-primary transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}