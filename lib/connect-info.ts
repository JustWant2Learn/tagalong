import { z } from "zod"

import { joinContext, type GameConfig } from "@/lib/games"

export const javaUsernameSchema = z
  .string()
  .regex(/^[A-Za-z0-9_]{3,16}$/, "Java usernames are 3–16 letters, numbers or underscores.")

export const gameVersionSchema = z
  .string()
  .regex(/^(latest|\d+\.\d+(?:\.\d+)?)$/, "Use a version like 1.21.4, or latest.")

export const modpackUrlSchema = z
  .string()
  .url()
  .refine((value) => {
    try {
      const host = new URL(value).hostname
      return host === "www.curseforge.com" || host === "curseforge.com" || host === "modrinth.com" || host === "www.modrinth.com"
    } catch {
      return false
    }
  }, "Modpack links must be CurseForge or Modrinth URLs.")

export const javaPortSchema = z
  .string()
  .optional()
  .transform((value) => (value && value.length > 0 ? value : "25565"))

export const bedrockPortSchema = z
  .string()
  .optional()
  .transform((value) => (value && value.length > 0 ? value : "19132"))

export const adultPresentSchema = z.literal(true, {
  error: "An adult account holder must confirm they will be present for the entire session.",
})

export const worldBackupSchema = z.literal(true, {
  error: "Confirm you backed up the world before a build or redstone session.",
})

export const modSetupSchema = z.object({
  loader: z.enum(["vanilla", "fabric", "forge", "neoforge", "quilt"]),
  loaderVersion: z.string().optional(),
  modpackName: z.string().optional(),
  modpackVersion: z.string().optional(),
  modpackUrl: z.union([z.literal(""), modpackUrlSchema]).optional(),
})

export function connectInfoSchema(game: GameConfig, variantKey?: string, joinMethodId?: string) {
  const context = joinContext(game, variantKey)
  const method = context.joinMethods.find((item) => item.id === joinMethodId) ?? context.joinMethods[0]
  const identity =
    context.identityField.key === "java_username"
      ? z.object({ identity: javaUsernameSchema })
      : z.object({ identity: z.string().min(2) })

  const join = z.object({
    joinMethodId: z.string(),
    serverHost: z.string().optional(),
    serverPort: variantKey === "bedrock" ? bedrockPortSchema : javaPortSchema,
    otherJoin: z.string().optional(),
    hostingMod: z.string().optional(),
    inviteInstructions: z.string().optional(),
    realmsInviteSent: z.string().optional(),
    friendsCanJoin: z.string().optional(),
  })

  const version = game.requiresVersion ? z.object({ gameVersion: gameVersionSchema }) : z.object({})
  const mods = context.supportsMods ? z.object({ modSetup: modSetupSchema.optional() }) : z.object({})

  return identity.and(join).and(version).and(mods).superRefine((value, ctx) => {
    if (!method) return
    if (method.id === "server_address" || method.id === "server_address_port") {
      if (!value.serverHost) {
        ctx.addIssue({ code: "custom", message: "Server address is required.", path: ["serverHost"] })
      }
    }
    if (method.id === "other" && !value.otherJoin) {
      ctx.addIssue({ code: "custom", message: "Describe how the Guide should join.", path: ["otherJoin"] })
    }
  })
}

export function defaultPortForVariant(variantKey?: string) {
  return variantKey === "bedrock" ? "19132" : "25565"
}
