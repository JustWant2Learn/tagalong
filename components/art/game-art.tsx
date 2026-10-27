import Image from "next/image"

import { getGame } from "@/lib/games"
import { cn } from "@/lib/utils"

export function GameArt({
  slug,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 720px, 100vw",
}: {
  slug: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const game = getGame(slug)
  const src = game?.coverImage ?? "/games/arc-raiders.jpg"
  const alt = game ? `${game.name} gameplay` : "Game artwork"
  const isSvg = src.endsWith(".svg")

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={isSvg}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: game?.coverPosition ?? "center" }}
      />
    </div>
  )
}
