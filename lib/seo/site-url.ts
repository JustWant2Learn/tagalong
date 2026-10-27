import { brand } from "@/lib/brand"

export function siteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  return fromEnv && fromEnv.length > 0 ? fromEnv : brand.url
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${siteUrl()}${normalized === "/" ? "" : normalized}`
}
