import { getGame, games } from "@/lib/games"
import { addons, bundles, serviceTargets, services } from "@/lib/seed/catalog"
import { faqs, gameFaqs } from "@/lib/seed/faq"
import { guides } from "@/lib/seed/guides"
import { helpArticles } from "@/lib/seed/help"
import { demoOrders } from "@/lib/seed/orders"
import { demoReports } from "@/lib/seed/reports"
import { reviews } from "@/lib/seed/reviews"
import type { Service } from "@/lib/seed/types"

export function listGames() {
  return games
}

export function listServices(gameSlug?: string, variantKey?: string): Service[] {
  return services.filter((service) => {
    if (!service.active) return false
    if (gameSlug && service.gameSlug !== gameSlug) return false
    if (variantKey && service.variants?.length && !service.variants.includes(variantKey)) return false
    return true
  })
}

export function listAllServicesIncludingScheduled(): Service[] {
  return services
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getServiceTargets(serviceId: string) {
  return serviceTargets
    .filter((target) => target.serviceId === serviceId)
    .sort((a, b) => a.sort - b.sort)
}

export function getActiveEventServices() {
  return listServices().filter((service) => service.isEvent)
}

export function listAddons(gameSlug?: string) {
  return addons.filter((addon) => !addon.gameSlug || addon.gameSlug === gameSlug)
}

export function listBundles(gameSlug?: string) {
  return bundles.filter((bundle) => !bundle.gameSlug || bundle.gameSlug === gameSlug)
}

export function listGuides(filters?: {
  gameSlug?: string
  serviceSlug?: string
  language?: string
  platform?: string
  featured?: boolean
  variant?: string
  youthCleared?: boolean
  familySession?: boolean
}) {
  return guides.filter((guide) => {
    if (filters?.featured && !guide.featured) return false
    if (filters?.gameSlug && !guide.games.includes(filters.gameSlug)) return false
    if (filters?.serviceSlug && !guide.services.includes(filters.serviceSlug)) return false
    if (filters?.language && !guide.languages.includes(filters.language)) return false
    if (filters?.platform && !guide.platforms.includes(filters.platform)) return false
    if (filters?.youthCleared && !guide.youthCleared) return false
    if (filters?.familySession && !guide.youthCleared) return false
    if (filters?.variant && filters.gameSlug) {
      const approval = guide.gameApprovals?.find((item) => item.gameSlug === filters.gameSlug)
      if (approval && !approval.variants.includes(filters.variant)) return false
    }
    return true
  })
}

export function getGuide(handle: string) {
  return guides.find((guide) => guide.handle === handle)
}

export function listReviews(filters?: { gameSlug?: string; serviceSlug?: string; guideHandle?: string }) {
  return reviews.filter((review) => {
    if (!review.visible) return false
    if (filters?.gameSlug && review.gameSlug !== filters.gameSlug) return false
    if (filters?.serviceSlug && review.serviceSlug !== filters.serviceSlug) return false
    if (filters?.guideHandle && review.guideHandle !== filters.guideHandle) return false
    return true
  })
}

export function reviewStats() {
  const visible = listReviews()
  const count = visible.length
  const average =
    count === 0 ? 0 : visible.reduce((sum, review) => sum + review.rating, 0) / count
  const sessions = guides.reduce((sum, guide) => sum + guide.sessionsCompleted, 0)
  return { count, average, sessions }
}

export function listFaqs(gameSlug?: string) {
  if (gameSlug && gameFaqs[gameSlug]) return gameFaqs[gameSlug]
  return faqs
}

export function listHelpArticles(audience?: "customer" | "guide") {
  if (!audience) return helpArticles
  return helpArticles.filter((article) => article.audience === audience || article.audience === "both")
}

export function getHelpArticle(slug: string) {
  return helpArticles.find((article) => article.slug === slug)
}

export function serviceStartingPrice(service: Service) {
  const targets = getServiceTargets(service.id)
  if (targets.length === 0) return { min: service.basePriceCents, max: service.basePriceCents }
  const prices = targets.map((target) => target.priceCents)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export function serviceHref(service: Service) {
  return `/services/${service.slug}`
}

export function gameHref(slug: string) {
  return `/${slug}`
}

export function catalogGame(slug: string) {
  return getGame(slug)
}

export function listAddonsForService(service: Service) {
  return listAddons(service.gameSlug).filter((addon) => {
    if (addon.blockedServiceSlugs?.includes(service.slug)) return false
    if (service.familySession && addon.code === "voice_preferred") return false
    return true
  })
}

export function guideMatchesOrder(input: {
  guideHandle: string
  gameSlug: string
  variant?: string
  platform?: string
  familySession?: boolean
  modded?: boolean
}) {
  const guide = getGuide(input.guideHandle)
  if (!guide || !guide.games.includes(input.gameSlug)) return false
  if (input.familySession && !guide.youthCleared) return false
  const approval = guide.gameApprovals?.find((item) => item.gameSlug === input.gameSlug)
  if (input.variant && approval && !approval.variants.includes(input.variant)) return false
  if (input.platform && approval && !approval.platforms.includes(input.platform)) return false
  if (input.modded && approval && !approval.moddedExperience) return false
  return true
}

export function listDemoOrders() {
  return demoOrders
}

export function listDemoReports() {
  return demoReports
}
