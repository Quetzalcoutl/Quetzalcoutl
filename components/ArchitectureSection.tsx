"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const layers = [
  {
    title: "Thera Green Stablecoin",
    role: "Financial Layer",
    description:
      "Programmable green stablecoin funding Amazon regeneration through automated impact allocation.",
  },
  {
    title: "Thera Social",
    role: "Identity + Culture Layer",
    description:
      "NFT-driven social infrastructure where creators, communities, and environmental funding intersect.",
  },
  {
    title: "AIFriendsz",
    role: "Intelligence Layer",
    description:
      "Distributed AI agents assisting society across health, governance, education, and creative systems.",
  },
  {
    title: "Amazon Saviors",
    role: "Commerce Layer",
    description:
      "Regenerative e-commerce bridging physical goods and digital environmental funding.",
  },
]

export default function ArchitectureSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1)

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col gap-6 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mrrobot text-xs tracking-[0.3em] uppercase text-primary">
            005 / Architecture
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-foreground text-balance">
            A regenerative digital ecosystem.
          </h2>

          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Each layer operates independently. Together, they form a unified
            infrastructure designed for ecological, cultural, and technological rebalance.
          </p>
        </div>

        {/* Architecture Layers */}
        <div className="flex flex-col border-t border-border">
          {layers.map((layer, index) => (
            <div
              key={layer.title}
              className={`group relative border-b border-border py-12 transition-all duration-700 hover:bg-primary/5 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {layer.role}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                    {layer.title}
                  </h3>
                </div>

                <div className="md:col-span-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute left-0 top-0 w-0 group-hover:w-full h-px bg-primary transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}