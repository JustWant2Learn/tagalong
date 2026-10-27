import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { GamePageView } from "@/components/marketing/game-page"
import { brand } from "@/lib/brand"
import { games, getGame, isGameSlug } from "@/lib/games"

export const instant = false

export function generateStaticParams() {
  return games.map((game) => ({ game: game.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string }>
}): Promise<Metadata> {
  const { game: slug } = await params
  const game = getGame(slug)
  if (!game) return {}
  return {
    title: game.seo.title,
    description: game.seo.description,
    keywords: [...game.seo.keywords],
    openGraph: {
      title: `${game.seo.title} · ${brand.name}`,
      description: game.seo.description,
    },
  }
}

export default async function GameRoute({ params }: { params: Promise<{ game: string }> }) {
  const { game: slug } = await params
  if (!isGameSlug(slug)) notFound()
  const game = getGame(slug)
  if (!game) notFound()
  return <GamePageView game={game} />
}
