"use client"

import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import DisciplinesSection from "@/components/disciplines-section"
import WorkSection from "@/components/work-section"
import MarqueeSection from "@/components/marquee-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import ManifestoSection from "@/components/ManifestoSection"
import ArchitectureSection from "@/components/ArchitectureSection"
import NewtonChat from "@/components/chat-window"

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <DisciplinesSection />
      <WorkSection />
      <ManifestoSection />
      <ArchitectureSection />
      <ContactSection />
      <Footer />
      <NewtonChat />
    </main>
  )
}
