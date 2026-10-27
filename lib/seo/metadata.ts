import type { Metadata } from "next"

import { brand } from "@/lib/brand"
import { VALUE_PROP_PHRASE, getKeywords, type KeywordRecord } from "@/lib/seo/keywords"
import { absoluteUrl, siteUrl } from "@/lib/seo/site-url"

const TITLE_MAX = 60
const DESC_MIN = 140
const DESC_MAX = 160

export function displayTitle(primary: string) {
  if (!primary) return primary
  return primary.charAt(0).toUpperCase() + primary.slice(1)
}

export function pageTitle(primary: string) {
  const heading = displayTitle(primary)
  const title = `${heading} | ${brand.name}`
  return title.length <= TITLE_MAX ? title : `${heading.slice(0, TITLE_MAX - brand.name.length - 3)} | ${brand.name}`
}

export function pageDescription(lead: string) {
  const trimmed = lead.trim()
  if (trimmed.length >= DESC_MIN && trimmed.length <= DESC_MAX) return trimmed
  if (trimmed.length > DESC_MAX) {
    const cut = trimmed.slice(0, DESC_MAX - 1)
    const lastSpace = cut.lastIndexOf(" ")
    return `${cut.slice(0, lastSpace > 80 ? lastSpace : DESC_MAX - 1)}.`
  }
  const suffix = ` ${VALUE_PROP_PHRASE}`
  const combined = `${trimmed}${trimmed.endsWith(".") ? "" : "."}${suffix}`
  if (combined.length <= DESC_MAX) return combined
  return combined.slice(0, DESC_MAX - 1).replace(/\s+\S*$/, ".")
}

export function buildMetadata(input: {
  path: string
  keywords?: KeywordRecord
  description: string
  index?: boolean
  ogImage?: string
}): Metadata {
  const keywords = input.keywords ?? getKeywords(input.path)
  const title = pageTitle(keywords?.primary ?? brand.tagline)
  const description = pageDescription(input.description)
  const canonical = absoluteUrl(input.path)
  const index = input.index ?? keywords?.indexable ?? true

  return {
    metadataBase: new URL(siteUrl()),
    title: { absolute: title },
    description,
    keywords: keywords?.secondary,
    alternates: { canonical },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: brand.name,
      type: "website",
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function noindexMetadata(title: string, description: string): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: { absolute: `${title} | ${brand.name}` },
    description,
    robots: { index: false, follow: false },
  }
}
