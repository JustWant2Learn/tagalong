import Link from "next/link"

import type { RelatedLink } from "@/lib/seo/links"

export function RelatedLinks({
  title,
  links,
}: {
  title: string
  links: RelatedLink[]
}) {
  if (links.length === 0) return null
  const ordered = [...links].sort((a, b) => a.rank - b.rank).slice(0, 8)
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {ordered.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-foreground underline-offset-4 hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
