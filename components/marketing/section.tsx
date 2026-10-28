import type { ReactNode } from "react"

import { Reveal } from "@/components/marketing/reveal"
import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-16 md:py-20", className)}>
      <Reveal>{children}</Reveal>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight text-balance md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-pretty text-muted-foreground">{description}</p> : null}
    </div>
  )
}
