export const platforms = [
  "steam",
  "epic",
  "ps5",
  "xbox",
  "gamepass",
] as const

export type Platform = (typeof platforms)[number]

export const genres = ["extraction-shooter", "survival-coop"] as const

export type Genre = (typeof genres)[number] | (string & {})

export type JoinFieldType = "text" | "password" | "select" | "textarea"

export type JoinField = {
  key: string
  label: string
  type: JoinFieldType
  required: boolean
  placeholder?: string
  help?: string
  options?: { value: string; label: string }[]
  pattern?: string
}

export type JoinMethod = {
  id: string
  label: string
  description: string
  fields: JoinField[]
  notes?: string[]
}

export type GameIdentityField = {
  key: string
  label: string
  placeholder: string
  help: string
  pattern?: string
}

export type GameConfig = {
  slug: "arc-raiders" | "valheim" | "enshrouded" | (string & {})
  name: string
  shortName: string
  genre: Genre
  maxSquadSize: number
  platforms: Platform[]
  crossplay: boolean
  joinMethods: JoinMethod[]
  identityField: GameIdentityField
  serverRegions?: string[]
  pvp: boolean
  themeAccent: string
  coverImage: string
  coverPosition: string
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
  }
}

export function maxGuidesForGame(game: GameConfig): number {
  return Math.max(0, game.maxSquadSize - 1)
}
