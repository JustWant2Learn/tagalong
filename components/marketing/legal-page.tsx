import type { ReactNode } from "react"

import { Section } from "@/components/marketing/section"

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <Section>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Updated {updated}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{title}</h1>
      <div className="prose-legal mt-8 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-foreground [&_a]:underline">
        {children}
      </div>
    </Section>
  )
}
