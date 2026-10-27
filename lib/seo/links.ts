import { listServices } from "@/lib/catalog"
import { listPublishedArticles, articleHref } from "@/lib/seed/articles"
import { getGame } from "@/lib/games"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { listCatalogTargets, listTargetsForGame } from "@/lib/seo/targets"

export type RelatedLink = {
  href: string
  label: string
  rank: number
}

export function relatedForGame(gameSlug: string): RelatedLink[] {
  const game = getGame(gameSlug)
  const services = listServices(gameSlug).map((service) => ({
    href: `/services/${service.slug}`,
    label: `${game?.name ?? gameSlug} ${service.name}`,
    rank: 20,
  }))
  const targets = listTargetsForGame(gameSlug)
    .filter(isIndexableTarget)
    .map((target) => ({
      href: target.href,
      label: `${target.name} help`,
      rank: 10,
    }))
  const articles = listPublishedArticles(gameSlug).map((article) => ({
    href: articleHref(article),
    label: article.title,
    rank: 30,
  }))
  return [...targets, ...services, ...articles]
}

export function relatedForService(serviceSlug: string, gameSlug: string): RelatedLink[] {
  const siblings = listServices(gameSlug)
    .filter((service) => service.slug !== serviceSlug)
    .slice(0, 4)
    .map((service) => ({
      href: `/services/${service.slug}`,
      label: service.name,
      rank: 20,
    }))
  const targets = listCatalogTargets()
    .filter((target) => target.serviceSlugs.includes(serviceSlug) && isIndexableTarget(target))
    .map((target) => ({
      href: target.href,
      label: `${target.name} help`,
      rank: 10,
    }))
  const articles = listPublishedArticles(gameSlug)
    .filter((article) => article.relatedServiceSlug === serviceSlug)
    .map((article) => ({
      href: articleHref(article),
      label: article.title,
      rank: 15,
    }))
  return [...targets, ...articles, ...siblings]
}

export function relatedForTarget(targetKey: string): RelatedLink[] {
  const target = listCatalogTargets().find((item) => item.key === targetKey)
  if (!target) return []
  const services = target.serviceSlugs.map((slug) => {
    const service = listServices().find((item) => item.slug === slug)
    return {
      href: `/services/${slug}`,
      label: service?.name ?? slug,
      rank: 10,
    }
  })
  const siblings = listTargetsForGame(target.gameSlug)
    .filter((item) => item.key !== target.key && isIndexableTarget(item))
    .slice(0, 3)
    .map((item) => ({
      href: item.href,
      label: `${item.name} help`,
      rank: 20,
    }))
  const articles = listPublishedArticles(target.gameSlug)
    .filter((article) => article.relatedTargetKey === target.key)
    .map((article) => ({
      href: articleHref(article),
      label: article.title,
      rank: 15,
    }))
  return [
    { href: `/${target.gameSlug}`, label: `${getGame(target.gameSlug)?.name ?? target.gameSlug} play-with`, rank: 5 },
    ...services,
    ...articles,
    ...siblings,
  ]
}

export function popularLinks(): RelatedLink[] {
  return [
    { href: "/arc-raiders", label: "ARC Raiders carry service", rank: 1 },
    { href: "/services/arc-raiders-safe-extraction", label: "ARC Raiders extraction escort", rank: 2 },
    { href: "/arc-raiders/maps/buried-city", label: "Buried City help", rank: 3 },
    { href: "/valheim", label: "Valheim boss help", rank: 4 },
    { href: "/valheim/bosses/bonemass", label: "Valheim Bonemass help", rank: 5 },
    { href: "/minecraft", label: "Minecraft play with service", rank: 6 },
    { href: "/services/minecraft-build-together", label: "Minecraft build service", rank: 7 },
    { href: "/enshrouded", label: "Enshrouded play with", rank: 8 },
    { href: "/learn/valheim/how-to-beat-bonemass", label: "How to beat Bonemass", rank: 9 },
    { href: "/compare/play-with-vs-boosting", label: "Play-with vs boosting", rank: 10 },
    { href: "/guides", label: "Meet the Guides", rank: 11 },
    { href: "/how-it-works", label: "How joining works", rank: 12 },
  ]
}

export function inboundCount(href: string) {
  const pool = [
    ...popularLinks(),
    ...listCatalogTargets().flatMap((target) => relatedForTarget(target.key)),
    ...listServices().flatMap((service) => relatedForService(service.slug, service.gameSlug)),
  ]
  return pool.filter((link) => link.href === href).length
}
