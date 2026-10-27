import type { GameConfig } from "./types"

export const arcRaiders: GameConfig = {
  slug: "arc-raiders",
  name: "ARC Raiders",
  shortName: "ARC",
  genre: "extraction-shooter",
  maxSquadSize: 3,
  platforms: ["steam", "epic", "ps5", "xbox"],
  crossplay: true,
  pvp: true,
  themeAccent: "arc",
  coverImage: "/games/arc-raiders.jpg",
  coverPosition: "78% center",
  serverRegions: [
    "US East",
    "US West",
    "EU West",
    "EU Central",
    "Asia Southeast",
    "Asia East",
    "Oceania",
    "South America",
  ],
  identityField: {
    key: "embarkId",
    label: "Embark ID",
    placeholder: "name#1234",
    help: "Your Embark ID looks like name#tag. The Guide sends a friend or party invite to this ID — we never ask for your password.",
    pattern: "^.+#\\d+$",
  },
  joinMethods: [
    {
      id: "embark-invite",
      label: "Embark ID party invite",
      description:
        "Share your Embark ID. The assigned Guide (or you) sends a friend or party invite. Enable crossplay if you are on different platforms.",
      fields: [
        {
          key: "embarkId",
          label: "Your Embark ID",
          type: "text",
          required: true,
          placeholder: "name#1234",
          help: "Shown as name#tag in your Embark / ARC Raiders profile.",
          pattern: "^.+#\\d+$",
        },
        {
          key: "platform",
          label: "Platform",
          type: "select",
          required: true,
          options: [
            { value: "steam", label: "Steam" },
            { value: "epic", label: "Epic Games" },
            { value: "ps5", label: "PlayStation 5" },
            { value: "xbox", label: "Xbox" },
          ],
        },
        {
          key: "serverRegion",
          label: "Preferred server region",
          type: "select",
          required: true,
          help: "Used for latency matching. We prefer Guides near this region.",
        },
        {
          key: "progress",
          label: "Current progress",
          type: "textarea",
          required: false,
          placeholder: "e.g. workshop level, quests in progress, loadout notes",
        },
      ],
      notes: [
        "Turn on crossplay in game settings if your Guide is on another platform.",
        "Guides play on their own account and join your squad through a normal invite.",
        "Bring your own loadout — Guides do not supply gear.",
      ],
    },
  ],
  seo: {
    title: "ARC Raiders Play-With Squads, Escorts & Raid Help",
    description:
      "Book a skilled Raider to squad up with you. Safe extraction escorts, quest help, blueprint farming, map tours and new Raider onboarding — no account sharing.",
    keywords: [
      "ARC Raiders carry",
      "ARC Raiders squad",
      "play ARC Raiders with someone",
      "ARC Raiders extraction escort",
      "ARC Raiders duo",
      "ARC Raiders play with",
    ],
  },
  hero: {
    eyebrow: "Flagship · PvPvE extraction",
    headline: "Squad up. Extract together.",
    subheadline:
      "Tired of dying to other squads and losing loot? Book up to two Guides who join your raid on their own accounts — escorts, quests, farms, or a reliable third.",
  },
}
