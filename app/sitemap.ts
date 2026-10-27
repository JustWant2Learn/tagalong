import type { MetadataRoute } from "next"

import { indexablePages } from "@/lib/seo/indexable"
import { absoluteUrl } from "@/lib/seo/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages().map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    changeFrequency: page.path === "/" ? "daily" : "weekly",
    priority: page.path === "/" || page.path.split("/").length <= 2 ? 0.8 : 0.6,
  }))
}
