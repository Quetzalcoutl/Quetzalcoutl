"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useRef } from "react"
import { ArrowDown } from "lucide-react"
import ErrorBoundary from "@/components/error-boundary"
import { useTranslations } from "@/lib/i18n"

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />,
})

// roles are also translatable
const roles = [
  ["coder", "developer", "activist"],
] as const

interface RotatingTextProps {
  t: (key: string) => string
}

function RotatingText({ t }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const localizedRoles = roles[0].map((key) => t(key))

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % localizedRoles.length)
        setIsAnimating(false)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [localizedRoles.length])

  return (
    <span className="relative inline-block overflow-hidden h-[1.2em] align-bottom">
      <span
        className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isAnimating
            ? "translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <span className="text-primary">{localizedRoles[currentIndex]}</span>
      </span>
    </span>
  )
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [sceneVisible, setSceneVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  // delay content fade-in
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // pause/unmount 3D canvas when hero section is offscreen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        setSceneVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const { t, locale } = useTranslations()

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <ErrorBoundary>
        {sceneVisible && <HeroScene />}
      </ErrorBoundary>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div
          className={`transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            {t("templeOf")}
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-[8rem] font-mrrobot tracking-tighter leading-none text-balance glow-text">
            Quetzalcoutl
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mt-6 text-xl md:text-2xl font-sans font-light text-foreground/80">
            <RotatingText t={t} />
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mt-12 flex items-center gap-6">
            <a
              href="#about"
              className="group flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <span>{t("explore")}</span>
              <ArrowDown className="w-3 h-3 animate-bounce" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Side indicators */}
      <div className="absolute left-6 md:left-12 bottom-12 z-10 flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground rotate-180 [writing-mode:vertical-lr]">
          {t("scroll")}
        </span>
      </div>
    </section>
  )
}
