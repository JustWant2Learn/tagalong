import { arcRaiders } from "./arc-raiders"
import { enshrouded } from "./enshrouded"
import { minecraft } from "./minecraft"
import type { GameConfig } from "./types"
import { valheim } from "./valheim"

export * from "./types"

export const games: GameConfig[] = [arcRaiders, valheim, enshrouded, minecraft]

export const gamesBySlug = Object.fromEntries(
  games.map((game) => [game.slug, game])
) as Record<string, GameConfig>

export function getGame(slug: string): GameConfig | undefined {
  return gamesBySlug[slug]
}

export function isGameSlug(slug: string): boolean {
  return slug in gamesBySlug
}

export function getGameOrThrow(slug: string): GameConfig {
  const game = getGame(slug)
  if (!game) {
    throw new Error(`Unknown game slug: ${slug}`)
  }
  return game
}
