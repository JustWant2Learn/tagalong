import assert from "node:assert/strict"
import { test } from "node:test"

import {
  addonsForBooking,
  applyChildSafetyReport,
  applySetupMismatch,
  bookingStepsForGame,
  canAcceptOrder,
  clampGuidesOnOrder,
  familySessionBookingOk,
  servicesForBooking,
} from "./booking-foundations"
import { getService } from "./catalog"
import {
  connectInfoSchema,
  gameVersionSchema,
  javaUsernameSchema,
  javaPortSchema,
  bedrockPortSchema,
  modpackUrlSchema,
} from "./connect-info"
import { getGame } from "./games"
import { filterYouthChat } from "./youth-safety"

test("edition step appears only for games with variants", () => {
  const arc = getGame("arc-raiders")
  const valheim = getGame("valheim")
  const enshrouded = getGame("enshrouded")
  const minecraft = getGame("minecraft")
  assert.ok(arc && valheim && enshrouded && minecraft)
  assert.deepEqual(bookingStepsForGame(arc), ["game", "service", "options", "connect", "schedule", "pay"])
  assert.deepEqual(bookingStepsForGame(valheim), bookingStepsForGame(arc))
  assert.deepEqual(bookingStepsForGame(enshrouded), bookingStepsForGame(arc))
  assert.ok(bookingStepsForGame(minecraft).includes("edition"))
  assert.equal(bookingStepsForGame(minecraft)[1], "edition")
})

test("services filter by variant and hide Modpack Co-op on Bedrock", () => {
  const java = servicesForBooking("minecraft", "java").map((service) => service.slug)
  const bedrock = servicesForBooking("minecraft", "bedrock").map((service) => service.slug)
  assert.ok(java.includes("minecraft-modpack-coop"))
  assert.ok(!bedrock.includes("minecraft-modpack-coop"))
  assert.ok(bedrock.includes("minecraft-play-with"))
})

test("max 2 Guides enforced for Minecraft", () => {
  const minecraft = getGame("minecraft")
  assert.ok(minecraft)
  assert.equal(clampGuidesOnOrder(minecraft, 8), 2)
  const arc = getGame("arc-raiders")
  assert.ok(arc)
  assert.ok(clampGuidesOnOrder(arc, 3) >= 2)
})

test("connect-info zod: Java username, ports, version, modpack allowlist", () => {
  assert.ok(javaUsernameSchema.safeParse("Steve_99").success)
  assert.ok(!javaUsernameSchema.safeParse("ab").success)
  assert.equal(javaPortSchema.parse(undefined), "25565")
  assert.equal(bedrockPortSchema.parse(""), "19132")
  assert.ok(gameVersionSchema.safeParse("1.21.4").success)
  assert.ok(gameVersionSchema.safeParse("latest").success)
  assert.ok(!gameVersionSchema.safeParse("snapshot-24").success)
  assert.ok(modpackUrlSchema.safeParse("https://www.curseforge.com/minecraft/modpacks/all-the-mods-9").success)
  assert.ok(!modpackUrlSchema.safeParse("https://example.com/pack").success)

  const minecraft = getGame("minecraft")
  assert.ok(minecraft)
  const parsed = connectInfoSchema(minecraft, "java", "server_address").safeParse({
    identity: "Builder_1",
    joinMethodId: "server_address",
    serverHost: "play.example.net",
    gameVersion: "1.21.4",
  })
  assert.ok(parsed.success)
})

test("job board matches edition, platform, modded and youth-cleared", () => {
  assert.equal(
    canAcceptOrder({ guideHandle: "cedar", gameSlug: "minecraft", variant: "java", platform: "pc" }),
    true
  )
  assert.equal(
    canAcceptOrder({ guideHandle: "cedar", gameSlug: "minecraft", variant: "bedrock" }),
    false
  )
  assert.equal(
    canAcceptOrder({ guideHandle: "pebble", gameSlug: "minecraft", variant: "bedrock", platform: "xbox" }),
    true
  )
  assert.equal(
    canAcceptOrder({ guideHandle: "cedar", gameSlug: "minecraft", familySession: true }),
    false
  )
  assert.equal(
    canAcceptOrder({ guideHandle: "loom", gameSlug: "minecraft", familySession: true, variant: "java" }),
    true
  )
  assert.equal(
    canAcceptOrder({ guideHandle: "cedar", gameSlug: "minecraft", variant: "java", modded: true }),
    false
  )
  assert.equal(
    canAcceptOrder({ guideHandle: "loom", gameSlug: "minecraft", variant: "java", modded: true }),
    true
  )
})

test("Family Session blocks voice and requires adult present", () => {
  const family = getService("minecraft-family-session")
  assert.ok(family)
  const addons = addonsForBooking(family).map((addon) => addon.code)
  assert.ok(!addons.includes("voice_preferred"))
  assert.equal(
    familySessionBookingOk({
      adultPresentConfirmed: false,
      bookerAgeConfirmed: true,
      voiceAddon: false,
      guideYouthCleared: true,
    }).ok,
    false
  )
  assert.equal(
    familySessionBookingOk({
      adultPresentConfirmed: true,
      bookerAgeConfirmed: true,
      voiceAddon: true,
      guideYouthCleared: true,
    }).ok,
    false
  )
  assert.equal(
    familySessionBookingOk({
      adultPresentConfirmed: true,
      bookerAgeConfirmed: true,
      voiceAddon: false,
      guideYouthCleared: true,
    }).ok,
    true
  )
})

test("Minecraft chat filter blocks Discord tags and add-me phrases", () => {
  assert.equal(filterYouthChat("see you in game").allowed, true)
  assert.equal(filterYouthChat("add me on discord").allowed, false)
  assert.equal(filterYouthChat("discord.gg/secret").allowed, false)
})

test("child-safety report pauses the order and suspends job-board access", () => {
  const action = applyChildSafetyReport("child-safety")
  assert.equal(action.pauseOrder, true)
  assert.equal(action.notifyAdmin, true)
  assert.equal(action.suspendGuideJobBoard, true)
})

test("setup mismatch does not start the timer", () => {
  const outcome = applySetupMismatch()
  assert.equal(outcome.timerStarts, false)
  assert.equal(outcome.customerFixMinutes, 30)
  assert.equal(outcome.afterFixExpires, "customer-no-show")
})

test("existing games stay variant-less", () => {
  for (const slug of ["arc-raiders", "valheim", "enshrouded"] as const) {
    const game = getGame(slug)
    assert.ok(game)
    assert.equal(game.variants, undefined)
    assert.ok(!bookingStepsForGame(game).includes("edition"))
  }
})
