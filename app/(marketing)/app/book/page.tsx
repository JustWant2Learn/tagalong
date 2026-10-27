import type { Metadata } from "next"

import { BookSession } from "@/components/booking/book-session"
import { listGames, listServices } from "@/lib/catalog"
import { getGame } from "@/lib/games"

export const instant = false

export const metadata: Metadata = {
  title: "Book a session",
  description: "Pick a game and a service. A Pro joins your squad or world on their own account.",
  robots: { index: false, follow: false },
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ game?: string; edition?: string; service?: string }>
}) {
  const params = await searchParams
  const games = listGames().map((game) => ({
    slug: game.slug,
    name: game.name,
    legalNotice: game.legalNotice,
    variants: game.variants?.map((variant) => ({ key: variant.key, label: variant.label })),
  }))
  const initialGame = params.game && getGame(params.game) ? params.game : undefined

  return (
    <BookSession
      games={games}
      services={listServices()}
      initialGame={initialGame}
      initialService={params.service}
    />
  )
}
