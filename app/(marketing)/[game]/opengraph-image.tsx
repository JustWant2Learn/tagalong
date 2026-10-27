import { ImageResponse } from "next/og"

import { brand } from "@/lib/brand"
import { getGame } from "@/lib/games"
import { getKeywords } from "@/lib/seo/keywords"

export const alt = "Tagalong game session"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function GameOpenGraphImage({
  params,
}: {
  params: Promise<{ game: string }>
}) {
  const { game: slug } = await params
  const game = getGame(slug)
  const keywords = getKeywords(`/${slug}`)
  const accent = brand.colors.games[slug as keyof typeof brand.colors.games]?.accent ?? "#C4A574"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12110F",
          color: "#F6F1E8",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: accent }}>
          {brand.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, lineHeight: 1.1 }}>{keywords?.primary ?? game?.name}</div>
          <div style={{ fontSize: 26 }}>No account sharing. Real players. Book in minutes.</div>
        </div>
      </div>
    ),
    size
  )
}
