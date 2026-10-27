import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { GamePageView } from "@/components/marketing/game-page"
import { games, getGame, isGameSlug } from "@/lib/games"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"
import { gameSeoCopy } from "@/lib/seed/seo-copy"

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
  const path = `/${slug}`
  return buildMetadata({
    path,
    keywords: getKeywords(path),
    description: gameSeoCopy[slug]?.intro ?? game.seo.description,
  })
}

export default async function GameRoute({
  params,
  searchParams,
}: {
  params: Promise<{ game: string }>
  searchParams: Promise<{ edition?: string }>
}) {
  const { game: slug } = await params
  const { edition } = await searchParams
  if (!isGameSlug(slug)) notFound()
  const game = getGame(slug)
  if (!game) notFound()
  return <GamePageView game={game} edition={edition} />
}
