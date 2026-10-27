import { targetSeoCopy } from "@/lib/seed/seo-copy"
import { listPublishedArticles } from "@/lib/seed/articles"
import type { CatalogTarget } from "@/lib/seo/targets"

export type QualityGap = "editorial" | "facts" | "image" | "internal-links"

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function targetQuality(target: CatalogTarget) {
  const copy = targetSeoCopy[target.key]
  const missing: QualityGap[] = []
  if (!copy || wordCount(copy.body) < 200) missing.push("editorial")
  if (!copy?.prep?.length || !copy.difficulty || !copy.typicalMinutes) missing.push("facts")
  if (!copy?.imageSrc || !copy.imageAlt) missing.push("image")
  const outbound = 2 + target.serviceSlugs.length
  const inbound =
    1 +
    listPublishedArticles(target.gameSlug).filter((article) => article.relatedTargetKey === target.key).length
  if (outbound + inbound < 3) missing.push("internal-links")
  return {
    ready: missing.length === 0,
    missing,
    words: copy ? wordCount(copy.body) : 0,
  }
}

export function isIndexableTarget(target: CatalogTarget) {
  return targetQuality(target).ready
}
