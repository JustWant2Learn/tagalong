"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const revealIfNear = () => {
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight
      if (rect.top < viewport * 0.92 && rect.bottom > 72) {
        setVisible(true)
        return true
      }
      return false
    }

    if (revealIfNear()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.01, rootMargin: "0px 0px -64px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("reveal", visible && "reveal-visible", className)}>
      {children}
    </div>
  )
}
