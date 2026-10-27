import { brand } from "@/lib/brand"

const estimateRates: Record<(typeof brand.currencies.estimates)[number], number> = {
  PHP: 58.2,
  AUD: 1.53,
  EUR: 0.86,
  GBP: 0.75,
}

const estimateFormatters: Record<(typeof brand.currencies.estimates)[number], Intl.NumberFormat> = {
  PHP: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }),
  AUD: new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }),
  EUR: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
  GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }),
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

export function formatUsdRange(minCents: number, maxCents: number): string {
  if (minCents === maxCents) {
    return formatUsd(minCents)
  }
  return `${formatUsd(minCents)}–${formatUsd(maxCents)}`
}

export function localEstimates(cents: number): string {
  const usd = cents / 100
  return brand.currencies.estimates
    .map((code) => estimateFormatters[code].format(usd * estimateRates[code]))
    .join(" · ")
}

export function priceLabel(service: {
  pricingType: "hourly" | "fixed" | "per_raid"
  basePriceCents: number
}): string {
  const amount = formatUsd(service.basePriceCents)
  if (service.pricingType === "hourly") return `${amount}/hr`
  if (service.pricingType === "per_raid") return `${amount}/raid`
  return `from ${amount}`
}

export function platformLabel(platform: string): string {
  const labels: Record<string, string> = {
    steam: "Steam",
    epic: "Epic",
    ps5: "PS5",
    xbox: "Xbox",
    gamepass: "Game Pass",
    pc: "PC",
    windows: "Windows",
    ps: "PlayStation",
    switch: "Switch",
    ios: "iOS",
    android: "Android",
  }
  return labels[platform] ?? platform
}

export function languageLabel(code: string): string {
  const labels: Record<string, string> = {
    en: "English",
    fil: "Filipino",
    tl: "Tagalog",
    id: "Indonesian",
    vi: "Vietnamese",
    th: "Thai",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    es: "Spanish",
    pt: "Portuguese",
    de: "German",
    fr: "French",
  }
  return labels[code] ?? code
}
