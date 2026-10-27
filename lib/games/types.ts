export const platforms = [
  "steam",
  "epic",
  "ps5",
  "xbox",
  "gamepass",
  "pc",
  "windows",
  "ps",
  "switch",
  "ios",
  "android",
] as const

export type Platform = (typeof platforms)[number]

export const genres = ["extraction-shooter", "survival-coop", "sandbox-survival"] as const

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

export type GameVariant = {
  key: string
  label: string
  platforms: Platform[]
  crossplayWithin: boolean
  identityField: GameIdentityField
  joinMethods: JoinMethod[]
  supportsMods: boolean
}

export type GameConfig = {
  slug: "arc-raiders" | "valheim" | "enshrouded" | "minecraft" | (string & {})
  name: string
  shortName: string
  genre: Genre
  maxSquadSize: number
  maxGuidesPerOrder?: number
  platforms: Platform[]
  crossplay: boolean
  joinMethods: JoinMethod[]
  identityField: GameIdentityField
  sessionFields?: JoinField[]
  variants?: GameVariant[]
  requiresVersion?: boolean
  audienceRisk?: "standard" | "youth"
  legalNotice?: string
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
  if (game.maxGuidesPerOrder != null) return game.maxGuidesPerOrder
  return Math.max(0, game.maxSquadSize - 1)
}

export function gameAudienceRisk(game: GameConfig): "standard" | "youth" {
  return game.audienceRisk ?? "standard"
}

export function resolveVariant(game: GameConfig, variantKey?: string): GameVariant | undefined {
  if (!game.variants?.length) return undefined
  return game.variants.find((variant) => variant.key === variantKey) ?? game.variants[0]
}

export function joinContext(game: GameConfig, variantKey?: string) {
  const variant = resolveVariant(game, variantKey)
  return {
    variant,
    joinMethods: variant?.joinMethods ?? game.joinMethods,
    identityField: variant?.identityField ?? game.identityField,
    platforms: variant?.platforms ?? game.platforms,
    supportsMods: variant?.supportsMods ?? false,
    sessionFields: [
      ...(game.sessionFields ?? []),
      ...(variant?.supportsMods
        ? ([
            {
              key: "loader",
              label: "Mod loader",
              type: "select" as const,
              required: false,
              options: [
                { value: "vanilla", label: "Vanilla" },
                { value: "fabric", label: "Fabric" },
                { value: "forge", label: "Forge" },
                { value: "neoforge", label: "NeoForge" },
                { value: "quilt", label: "Quilt" },
              ],
            },
            {
              key: "loaderVersion",
              label: "Loader version",
              type: "text" as const,
              required: false,
              placeholder: "0.16.9",
            },
            {
              key: "modpackName",
              label: "Modpack name",
              type: "text" as const,
              required: false,
              placeholder: "All the Mods 10",
            },
            {
              key: "modpackVersion",
              label: "Modpack version",
              type: "text" as const,
              required: false,
            },
            {
              key: "modpackUrl",
              label: "Modpack link",
              type: "text" as const,
              required: false,
              placeholder: "https://www.curseforge.com/minecraft/modpacks/…",
              help: "CurseForge or Modrinth URL only.",
            },
          ] satisfies JoinField[])
        : []),
    ],
  }
}
