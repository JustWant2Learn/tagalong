import type { Service } from "@/lib/seed/types"

export const youthSafetyRules = {
  customerMinAge: 18,
  familySessionOnlyForMinors: true,
  familyVoiceDisabled: true,
  familyChatChannel: "in-app-text" as const,
  retainMessagesDays: 90,
  maxGuidesPerYouthGame: 2,
}

export type KycResult = {
  provider: string
  status: "pending" | "cleared" | "rejected" | "manual_review"
  checkedAt: string
  note?: string
}

export interface KycProvider {
  startVerification(guideId: string): Promise<{ sessionId: string }>
  getResult(sessionId: string): Promise<KycResult>
}

export class ManualReviewKycProvider implements KycProvider {
  async startVerification(guideId: string) {
    return { sessionId: `manual-${guideId}` }
  }

  async getResult(sessionId: string): Promise<KycResult> {
    return {
      provider: "manual-review",
      status: "manual_review",
      checkedAt: new Date().toISOString(),
      note: `Awaiting admin interview. Session ${sessionId}. Store the result only — never ID images.`,
    }
  }
}

export const reportCategories = [
  "no-show",
  "conduct",
  "griefing",
  "setup-mismatch",
  "child-safety",
] as const

export type ReportCategory = (typeof reportCategories)[number]

export type YouthSafetyAction = {
  pauseOrder: boolean
  notifyAdmin: boolean
  suspendGuideJobBoard: boolean
}

export function actionForReport(category: ReportCategory): YouthSafetyAction {
  if (category === "child-safety") {
    return { pauseOrder: true, notifyAdmin: true, suspendGuideJobBoard: true }
  }
  return { pauseOrder: false, notifyAdmin: true, suspendGuideJobBoard: false }
}

const blockedContact = [
  /\bdiscord(?:\.gg|app\.com)?\b/i,
  /\b(?:add me|dm me|message me|friend me)\b/i,
  /\b(?:instagram|tiktok|snapchat|whatsapp|telegram)\b/i,
  /\b[\w.+-]+@[\w-]+\.[\w.]+\b/i,
  /\b(?:\+?\d[\d\s.-]{7,}\d)\b/,
]

export function filterYouthChat(message: string): { allowed: boolean; reason?: string } {
  const hit = blockedContact.find((pattern) => pattern.test(message))
  if (hit) {
    return { allowed: false, reason: "Contact details and off-platform handles are blocked on youth-risk orders." }
  }
  return { allowed: true }
}

export function familySessionAllowed(input: {
  adultPresentConfirmed: boolean
  bookerAgeConfirmed: boolean
  voiceAddon: boolean
  guideYouthCleared: boolean
}) {
  if (!input.bookerAgeConfirmed) return { ok: false, reason: "Booker must be 18+ and the account holder." }
  if (!input.adultPresentConfirmed) return { ok: false, reason: "An adult must stay in the game for the entire session." }
  if (input.voiceAddon) return { ok: false, reason: "Family Sessions are text-only inside the app." }
  if (!input.guideYouthCleared) return { ok: false, reason: "Only youth-cleared Guides can accept Family Sessions." }
  return { ok: true }
}

export function isVoiceAllowed(service: Service) {
  return !service.familySession
}

export function preSessionChecklist(input: {
  variantLabel: string
  requiresVersion: boolean
  supportsMods: boolean
  requiresWorldBackup: boolean
}) {
  return [
    `Edition is ${input.variantLabel}`,
    input.requiresVersion ? "Game version matches the order" : null,
    "Whitelist, Realms invite or friend join is ready",
    input.supportsMods ? "Loader and modpack match (if modded)" : null,
    input.requiresWorldBackup ? "World backup is confirmed" : null,
  ].filter((item): item is string => item !== null)
}
