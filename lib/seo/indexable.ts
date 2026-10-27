import { getGuide, listGuides, listHelpArticles, listReviews, listServices } from "@/lib/catalog"
import { games } from "@/lib/games"
import { articles } from "@/lib/seed/articles"
import { getKeywords, staticKeywordRecords } from "@/lib/seo/keywords"
import { resolveKeywords } from "@/lib/seo/dynamic-keywords"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { listCatalogTargets } from "@/lib/seo/targets"

export type IndexablePage = {
  path: string
  lastModified: string
  primary: string
  title: string
  description: string
}

const LAST_MODIFIED = "2026-10-27"

export function indexablePages(): IndexablePage[] {
  const pages: IndexablePage[] = []

  for (const record of staticKeywordRecords()) {
    if (!record.indexable) continue
    if (record.path.startsWith("/app") || record.path.startsWith("/login")) continue
    pages.push({
      path: record.path,
      lastModified: LAST_MODIFIED,
      primary: record.primary,
      title: `${record.primary} | Tagalong`,
      description: record.primary,
    })
  }

  for (const guide of listGuides()) {
    const path = `/guides/${guide.handle}`
    const keywords = resolveKeywords(path)
    if (!keywords?.indexable) continue
    pages.push({
      path,
      lastModified: LAST_MODIFIED,
      primary: keywords.primary,
      title: `${keywords.primary} | Tagalong`,
      description: getGuide(guide.handle)?.bio ?? keywords.primary,
    })
  }

  for (const article of listHelpArticles()) {
    const path = `/help/${article.slug}`
    pages.push({
      path,
      lastModified: LAST_MODIFIED,
      primary: article.title,
      title: `${article.title} | Tagalong`,
      description: article.summary,
    })
  }

  for (const target of listCatalogTargets()) {
    if (!isIndexableTarget(target)) continue
    const keywords = resolveKeywords(target.href)
    if (!keywords?.indexable) continue
    pages.push({
      path: target.href,
      lastModified: LAST_MODIFIED,
      primary: keywords.primary,
      title: `${keywords.primary} | Tagalong`,
      description: keywords.primary,
    })
  }

  for (const article of articles) {
    const path = `/learn/${article.gameSlug}/${article.slug}`
    if (article.status !== "published") continue
    pages.push({
      path,
      lastModified: article.dateModified,
      primary: article.title,
      title: `${article.title} | Tagalong`,
      description: article.excerpt,
    })
  }

  return pages
}

export function findDuplicatePrimaries(pages = indexablePages()) {
  const seen = new Map<string, string[]>()
  for (const page of pages) {
    const key = page.primary.toLowerCase()
    seen.set(key, [...(seen.get(key) ?? []), page.path])
  }
  return [...seen.entries()].filter(([, paths]) => paths.length > 1)
}

export function missingStaticKeywords() {
  const required = [
    "/",
    ...games.map((game) => `/${game.slug}`),
    ...listServices().map((service) => `/services/${service.slug}`),
  ]
  return required.filter((path) => !getKeywords(path))
}

export function reviewsForHandle(handle: string) {
  return listReviews({ guideHandle: handle })
}
