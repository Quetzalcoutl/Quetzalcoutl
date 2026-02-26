"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(false)
      }
    }

    // Smooth follow animation
    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px)`
      }

      requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    animate()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <>
      {/* Outer ring - smooth follow */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block transition-[width,height,border-color] duration-300 ease-out rounded-full border ${
          isHovering
            ? "w-14 h-14 border-primary bg-primary/5"
            : "w-10 h-10 border-muted-foreground/30"
        }`}
        style={{ willChange: "transform" }}
      />
      {/* Inner dot - instant follow */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block rounded-full transition-[width,height,opacity] duration-200 ${
          isHovering
            ? "w-1.5 h-1.5 bg-primary opacity-100"
            : "w-1.5 h-1.5 bg-foreground opacity-80"
        }`}
        style={{ willChange: "transform" }}
      />
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
