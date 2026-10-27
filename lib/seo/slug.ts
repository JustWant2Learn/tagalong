export function seoSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const kindPath = {
  boss: "bosses",
  map: "maps",
  quest: "quests",
  event: "events",
  item: "items",
  biome: "biomes",
  farm: "farms",
} as const

export type TargetKindPath = (typeof kindPath)[keyof typeof kindPath]

export function kindFromPath(path: string) {
  const entry = Object.entries(kindPath).find(([, value]) => value === path)
  return entry?.[0] as keyof typeof kindPath | undefined
}
