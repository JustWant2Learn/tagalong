export type SeedReport = {
  id: string
  orderId: string
  reporterId: string
  category: "no-show" | "conduct" | "griefing" | "setup-mismatch" | "child-safety"
  body: string
  status: "open" | "paused" | "resolved"
  handledBy?: string
}

export const demoReports: SeedReport[] = []
