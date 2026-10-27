import { listAddonsForService, listServices, guideMatchesOrder } from "@/lib/catalog"
import { maxGuidesForGame, type GameConfig } from "@/lib/games"
import type { Service } from "@/lib/seed/types"
import { actionForReport, familySessionAllowed, type ReportCategory } from "@/lib/youth-safety"

export const bookingStepIds = [
  "game",
  "edition",
  "service",
  "options",
  "connect",
  "schedule",
  "pay",
] as const

export type BookingStepId = (typeof bookingStepIds)[number]

export function bookingStepsForGame(game: GameConfig): BookingStepId[] {
  const steps: BookingStepId[] = ["game"]
  if (game.variants?.length) steps.push("edition")
  steps.push("service", "options", "connect", "schedule", "pay")
  return steps
}

export function servicesForBooking(gameSlug: string, variantKey?: string): Service[] {
  return listServices(gameSlug, variantKey)
}

export function clampGuidesOnOrder(game: GameConfig, requested: number): number {
  const max = maxGuidesForGame(game)
  return Math.min(Math.max(1, requested), max)
}

export function addonsForBooking(service: Service) {
  return listAddonsForService(service)
}

export function canAcceptOrder(input: {
  guideHandle: string
  gameSlug: string
  variant?: string
  platform?: string
  familySession?: boolean
  modded?: boolean
}) {
  return guideMatchesOrder(input)
}

export const setupMismatchPolicy = {
  timerStarts: false,
  customerFixMinutes: 30,
  afterFixExpires: "customer-no-show",
} as const

export function applySetupMismatch() {
  return setupMismatchPolicy
}

export function applyChildSafetyReport(category: ReportCategory) {
  return actionForReport(category)
}

export function familySessionBookingOk(input: {
  adultPresentConfirmed: boolean
  bookerAgeConfirmed: boolean
  voiceAddon: boolean
  guideYouthCleared: boolean
}) {
  return familySessionAllowed(input)
}

export function hardcoreCopy() {
  return "Character death ends the run. Billed time is not refundable."
}
