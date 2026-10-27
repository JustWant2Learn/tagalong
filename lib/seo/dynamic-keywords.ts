import { articles } from "@/lib/seed/articles"
import { getGuide, listReviews } from "@/lib/catalog"
import type { KeywordRecord } from "@/lib/seo/keywords"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { listCatalogTargets, targetGameName } from "@/lib/seo/targets"

const overrides: Record<string, { primary: string; secondary: string[] }> = {
  "arc-raiders/maps/buried-city": {
    primary: "ARC Raiders Buried City help",
    secondary: ["Buried City extract", "Buried City escort"],
  },
  "arc-raiders/maps/dam-battlegrounds": {
    primary: "ARC Raiders Dam Battlegrounds help",
    secondary: ["Dam Battlegrounds extract", "Dam Battlegrounds escort"],
  },
  "arc-raiders/maps/pendola-pass": {
    primary: "ARC Raiders Pendola Pass help",
    secondary: ["Pendola Pass escort", "Frozen Trail Pendola Pass"],
  },
  "valheim/bosses/bonemass": {
    primary: "Bonemass help Valheim",
    secondary: ["how to beat Bonemass", "Valheim Bonemass assist"],
  },
  "valheim/bosses/the-elder": {
    primary: "The Elder help Valheim",
    secondary: ["Valheim Elder boss help"],
  },
  "valheim/bosses/fader": {
    primary: "Fader help Valheim",
    secondary: ["Valheim Ashlands Fader assist"],
  },
  "minecraft/farms/iron-farm": {
    primary: "Minecraft iron farm help",
    secondary: ["iron farm builder", "Java Bedrock iron farm"],
  },
  "minecraft/bosses/ender-dragon": {
    primary: "Ender Dragon help Minecraft",
    secondary: ["Minecraft dragon assist"],
  },
  "enshrouded/events/elixir-well-kindlewastes": {
    primary: "Kindlewastes Elixir Well help",
    secondary: ["Enshrouded Kindlewastes well"],
  },
}

export function targetKeyword(path: string): KeywordRecord | undefined {
  const target = listCatalogTargets().find((item) => item.href === path)
  if (!target) return undefined
  const ready = isIndexableTarget(target)
  const override = overrides[target.key]
  const primary = override?.primary ?? `${targetGameName(target.gameSlug)} ${target.name} help`
  return {
    path,
    primary,
    secondary: override?.secondary ?? [`${target.name} escort`, `${target.name} play with`],
    intent: "transactional",
    indexable: ready,
  }
}

export function articleKeyword(path: string): KeywordRecord | undefined {
  const article = articles.find((item) => `/learn/${item.gameSlug}/${item.slug}` === path)
  if (!article) return undefined
  return {
    path,
    primary: article.title.replace(/:$/, ""),
    secondary: [article.excerpt],
    intent: "informational",
    indexable: article.status === "published",
  }
}

export function profileKeyword(path: string): KeywordRecord | undefined {
  const handle = path.replace(/^\/guides\//, "")
  if (!handle || handle.includes("/")) return undefined
  const guide = getGuide(handle)
  if (!guide) return undefined
  const reviews = listReviews({ guideHandle: handle })
  const game = guide.games[0]?.replace(/-/g, " ") ?? "play-with"
  return {
    path,
    primary: `${guide.displayName} ${game} Guide`,
    secondary: [`@${guide.handle}`, `${guide.displayName} play with`],
    intent: "navigational",
    indexable: reviews.length >= 1,
  }
}

export function resolveKeywords(path: string) {
  return targetKeyword(path) ?? articleKeyword(path) ?? profileKeyword(path)
}
