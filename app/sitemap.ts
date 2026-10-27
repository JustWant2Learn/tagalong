import type { MetadataRoute } from "next"

import { brand } from "@/lib/brand"
import { listGuides, listHelpArticles, listServices } from "@/lib/catalog"
import { games } from "@/lib/games"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/pricing",
    "/how-it-works",
    "/guides",
    "/guides/apply",
    "/help",
    "/contact",
    "/terms",
    "/privacy",
    "/refunds",
    "/guide-agreement",
    "/code-of-conduct",
  ]

  const gamePaths = games.map((game) => `/${game.slug}`)
  const servicePaths = listServices().map((service) => `/services/${service.slug}`)
  const guidePaths = listGuides().map((guide) => `/guides/${guide.handle}`)
  const helpPaths = listHelpArticles().map((article) => `/help/${article.slug}`)

  return [...staticPaths, ...gamePaths, ...servicePaths, ...guidePaths, ...helpPaths].map((path) => ({
    url: `${brand.url}${path}`,
    lastModified: "2026-10-27",
  }))
}
