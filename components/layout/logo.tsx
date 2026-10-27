import Link from "next/link"

import { brand } from "@/lib/brand"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklch,white_18%,transparent)]"
      >
        <svg viewBox="0 0 24 24" className="size-4.5" fill="none">
          <path
            d="M5 16.5 12 5l7 11.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.2" cy="17.2" r="1.5" fill="currentColor" />
          <circle cx="15.8" cy="17.2" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-lg tracking-tight">{brand.name}</span>
    </Link>
  )
}
