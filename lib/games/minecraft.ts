import type { GameConfig, JoinMethod } from "./types"

const javaServer: JoinMethod = {
  id: "server_address",
  label: "Dedicated server",
  description: "Share the host or IP. The Guide joins on their own Java account. Default port is 25565.",
  fields: [
    {
      key: "serverHost",
      label: "Server host or IP",
      type: "text",
      required: true,
      placeholder: "play.example.net",
    },
    {
      key: "serverPort",
      label: "Port",
      type: "text",
      required: false,
      placeholder: "25565",
      help: "Leave blank to use 25565.",
    },
  ],
  notes: [
    "Add the Guide's Java username to your whitelist. It is shown once a Guide is assigned.",
  ],
}

const javaRealms: JoinMethod = {
  id: "realms_invite",
  label: "Realms invite",
  description: "Invite the Guide's Java username to your Realm before the session.",
  fields: [
    {
      key: "realmsInviteSent",
      label: "I'll send the Realms invite before the session",
      type: "select",
      required: true,
      options: [
        { value: "yes", label: "Yes — I will send the invite" },
        { value: "need-username", label: "I need the Guide's username first" },
      ],
    },
  ],
}

const javaHostedMod: JoinMethod = {
  id: "hosted_world_mod",
  label: "Hosted world (Essential or similar)",
  description: "The Guide joins the world you are hosting through a Java hosting mod.",
  fields: [
    {
      key: "hostingMod",
      label: "Hosting mod or tool",
      type: "select",
      required: true,
      options: [
        { value: "essential", label: "Essential" },
        { value: "e4mc", label: "e4mc" },
        { value: "lan-tunnel", label: "LAN tunnel / other" },
      ],
    },
    {
      key: "inviteInstructions",
      label: "How the Guide should join",
      type: "textarea",
      required: true,
      placeholder: "Friend me in Essential, then accept the world invite.",
    },
  ],
}

const otherMethod: JoinMethod = {
  id: "other",
  label: "Other",
  description: "Describe how the Guide should join. We still never need your password.",
  fields: [
    {
      key: "otherJoin",
      label: "Join instructions",
      type: "textarea",
      required: true,
    },
  ],
}

const bedrockServer: JoinMethod = {
  id: "server_address_port",
  label: "Dedicated server",
  description: "Share the Bedrock address and port. Default port is 19132.",
  fields: [
    {
      key: "serverHost",
      label: "Server address",
      type: "text",
      required: true,
      placeholder: "play.example.net",
    },
    {
      key: "serverPort",
      label: "Port",
      type: "text",
      required: false,
      placeholder: "19132",
      help: "Leave blank to use 19132.",
    },
  ],
}

const bedrockRealms: JoinMethod = {
  id: "realms_invite",
  label: "Realms invite",
  description: "Invite the Guide's Microsoft / Xbox Gamertag to your Realm before the session.",
  fields: [
    {
      key: "realmsInviteSent",
      label: "I'll send the Realms invite before the session",
      type: "select",
      required: true,
      options: [
        { value: "yes", label: "Yes — I will send the invite" },
        { value: "need-gamertag", label: "I need the Guide's Gamertag first" },
      ],
    },
  ],
}

const bedrockFriend: JoinMethod = {
  id: "friend_join",
  label: "Friend join",
  description: "Add the Guide's Gamertag as a friend and enable Friends can join on your world.",
  fields: [
    {
      key: "friendsCanJoin",
      label: "Friends can join is enabled",
      type: "select",
      required: true,
      options: [
        { value: "yes", label: "Yes — friends can join my world" },
      ],
    },
  ],
}

export const minecraftLegalNotice =
  "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT."

export const minecraft: GameConfig = {
  slug: "minecraft",
  name: "Minecraft",
  shortName: "Minecraft",
  genre: "sandbox-survival",
  maxSquadSize: 10,
  maxGuidesPerOrder: 2,
  platforms: ["pc", "windows", "xbox", "ps", "switch", "ios", "android"],
  crossplay: false,
  pvp: false,
  requiresVersion: true,
  audienceRisk: "youth",
  legalNotice: minecraftLegalNotice,
  themeAccent: "minecraft",
  coverImage: "/games/minecraft.jpg",
  coverPosition: "center 58%",
  sessionFields: [
    {
      key: "gameVersion",
      label: "Game version",
      type: "text",
      required: true,
      placeholder: "1.21.4 or latest",
      help: "Use a version like 1.21.4, or latest.",
      pattern: "^(latest|\\d+\\.\\d+(?:\\.\\d+)?)$",
    },
  ],
  identityField: {
    key: "java_username",
    label: "Minecraft Java username",
    placeholder: "Steve",
    help: "Your in-game name, 3–16 letters, numbers or underscores. Bedrock uses a Microsoft Gamertag instead — pick an edition when you book.",
    pattern: "^[A-Za-z0-9_]{3,16}$",
  },
  joinMethods: [javaServer, javaRealms, javaHostedMod, otherMethod],
  variants: [
    {
      key: "java",
      label: "Java Edition (PC)",
      platforms: ["pc"],
      crossplayWithin: true,
      supportsMods: true,
      identityField: {
        key: "java_username",
        label: "Minecraft Java username",
        placeholder: "Steve",
        help: "Your in-game name, 3–16 letters, numbers or underscores.",
        pattern: "^[A-Za-z0-9_]{3,16}$",
      },
      joinMethods: [javaServer, javaRealms, javaHostedMod, otherMethod],
    },
    {
      key: "bedrock",
      label: "Bedrock Edition (Windows, console, mobile)",
      platforms: ["windows", "xbox", "ps", "switch", "ios", "android"],
      crossplayWithin: true,
      supportsMods: false,
      identityField: {
        key: "xbox_gamertag",
        label: "Microsoft / Xbox Gamertag",
        placeholder: "YourGamertag",
        help: "Bedrock uses your Microsoft account Gamertag on every platform.",
      },
      joinMethods: [bedrockServer, bedrockRealms, bedrockFriend, otherMethod],
    },
  ],
  seo: {
    title: "Minecraft Co-op Guides — Build, Farms, Bosses & Family Sessions",
    description:
      "Book a player to join your Minecraft world on their own account. Java or Bedrock, your version and pack. No official Minecraft product. No account sharing.",
    keywords: [
      "Minecraft play with",
      "Minecraft co-op partner",
      "Minecraft builder help",
      "Minecraft farm help",
      "Minecraft family session",
    ],
  },
  hero: {
    eyebrow: "Sandbox survival",
    headline: "Same world. Same version. Their own account.",
    subheadline:
      "Java or Bedrock, vanilla or a named pack. Guides join your server, Realm or hosted world — they never log into your account.",
  },
}
