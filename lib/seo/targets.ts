import { getGame } from "@/lib/games"
import { serviceTargets, services } from "@/lib/seed/catalog"
import type { ServiceTarget, ServiceTargetKind } from "@/lib/seed/types"
import { kindFromPath, kindPath, seoSlug } from "@/lib/seo/slug"

export type CatalogTarget = {
  key: string
  id: string
  name: string
  slug: string
  kind: ServiceTargetKind
  kindPath: string
  gameSlug: string
  href: string
  priceCents: number
  serviceIds: string[]
  serviceSlugs: string[]
  rows: ServiceTarget[]
}

export function listCatalogTargets(): CatalogTarget[] {
  const grouped = new Map<string, CatalogTarget>()

  for (const row of serviceTargets) {
    const service = services.find((item) => item.id === row.serviceId)
    const gameSlug = service?.gameSlug
    if (!gameSlug) continue
    const slug = seoSlug(row.name)
    const pathKind = kindPath[row.kind]
    const key = `${gameSlug}/${pathKind}/${slug}`
    const existing = grouped.get(key)
    if (existing) {
      existing.rows.push(row)
      if (!existing.serviceIds.includes(row.serviceId)) existing.serviceIds.push(row.serviceId)
      if (service && !existing.serviceSlugs.includes(service.slug)) existing.serviceSlugs.push(service.slug)
      existing.priceCents = Math.min(existing.priceCents, row.priceCents)
      continue
    }
    grouped.set(key, {
      key,
      id: row.id,
      name: row.name,
      slug,
      kind: row.kind,
      kindPath: pathKind,
      gameSlug,
      href: `/${gameSlug}/${pathKind}/${slug}`,
      priceCents: row.priceCents,
      serviceIds: [row.serviceId],
      serviceSlugs: service ? [service.slug] : [],
      rows: [row],
    })
  }

  return [...grouped.values()]
}

export function getCatalogTarget(gameSlug: string, kindSegment: string, slug: string) {
  const kind = kindFromPath(kindSegment)
  if (!kind) return undefined
  return listCatalogTargets().find(
    (target) => target.gameSlug === gameSlug && target.kind === kind && target.slug === slug
  )
}

export function listTargetsForGame(gameSlug: string) {
  return listCatalogTargets().filter((target) => target.gameSlug === gameSlug)
}

export function targetGameName(gameSlug: string) {
  return getGame(gameSlug)?.name ?? gameSlug
}
