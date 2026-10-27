export type SeedModSetup = {
  loader: "vanilla" | "fabric" | "forge" | "neoforge" | "quilt"
  loaderVersion?: string
  modpackName?: string
  modpackVersion?: string
  modpackUrl?: string
}

export type SeedOrder = {
  id: string
  gameSlug: string
  serviceSlug: string
  variant?: string
  gameVersion?: string
  modSetup?: SeedModSetup
  joinMethodId: string
  assignedGuideHandle?: string
  familySession?: boolean
  adultPresentConfirmed?: boolean
  worldBackupConfirmed?: boolean
  playerCount?: number
  status: "open" | "accepted" | "setup-mismatch" | "in-session" | "completed"
}

export const demoOrders: SeedOrder[] = [
  {
    id: "ord-mc-modded-java",
    gameSlug: "minecraft",
    serviceSlug: "minecraft-modpack-coop",
    variant: "java",
    gameVersion: "1.20.1",
    joinMethodId: "server_address",
    assignedGuideHandle: "loom",
    modSetup: {
      loader: "forge",
      loaderVersion: "47.3.0",
      modpackName: "All the Mods 9",
      modpackVersion: "0.3.5",
      modpackUrl: "https://www.curseforge.com/minecraft/modpacks/all-the-mods-9",
    },
    worldBackupConfirmed: true,
    status: "accepted",
  },
  {
    id: "ord-mc-bedrock-realms",
    gameSlug: "minecraft",
    serviceSlug: "minecraft-play-with",
    variant: "bedrock",
    gameVersion: "1.21.4",
    joinMethodId: "realms_invite",
    assignedGuideHandle: "pebble",
    status: "open",
  },
  {
    id: "ord-mc-family",
    gameSlug: "minecraft",
    serviceSlug: "minecraft-family-session",
    variant: "java",
    gameVersion: "1.21.4",
    joinMethodId: "realms_invite",
    assignedGuideHandle: "loom",
    familySession: true,
    adultPresentConfirmed: true,
    playerCount: 3,
    status: "accepted",
  },
]
