export type PricingType = "hourly" | "fixed" | "per_raid"

export type ServiceTargetKind = "boss" | "map" | "quest" | "event" | "item" | "biome"

export type ServiceTarget = {
  id: string
  serviceId: string
  name: string
  kind: ServiceTargetKind
  tier: number
  priceCents: number
  sort: number
}

export type Service = {
  id: string
  gameSlug: string
  slug: string
  name: string
  description: string
  pricingType: PricingType
  basePriceCents: number
  estMinutes: number
  includes: string[]
  excludes: string[]
  prerequisites: string[]
  active: boolean
  commissionPct: number
  availableFrom?: string
  availableUntil?: string
  isEvent: boolean
  eventBanner?: string
  minGuides: number
  maxGuides: number
}

export type Addon = {
  id: string
  code: string
  name: string
  description: string
  gameSlug: string | null
  pricingRule: {
    type: "percent_of_guide_rate" | "percent_of_order" | "flat"
    value: number
  }
}

export type Bundle = {
  id: string
  kind: "hours" | "raids"
  gameSlug: string | null
  name: string
  quantity: number
  discountPct: number
}

export type SeedGuide = {
  id: string
  handle: string
  displayName: string
  bio: string
  country: string
  timezone: string
  languages: string[]
  platforms: string[]
  games: string[]
  services: string[]
  ratingAvg: number
  reviewCount: number
  sessionsCompleted: number
  raidsExtracted?: number
  extractionRate?: number
  featured: boolean
  flair: string
  hoursPlayed: Record<string, number>
}

export type SeedReview = {
  id: string
  guideHandle: string
  serviceSlug: string
  gameSlug: string
  rating: number
  body: string
  author: string
  visible: boolean
}

export type FaqItem = {
  id: string
  question: string
  answer: string
  games?: string[]
}

export type HelpArticle = {
  slug: string
  title: string
  audience: "customer" | "guide" | "both"
  summary: string
  sections: { heading: string; body: string }[]
}
