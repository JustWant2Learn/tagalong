import type { GameConfig } from "./types"

export const valheim: GameConfig = {
  slug: "valheim",
  name: "Valheim",
  shortName: "Valheim",
  genre: "survival-coop",
  maxSquadSize: 10,
  platforms: ["steam", "xbox", "gamepass"],
  crossplay: true,
  pvp: false,
  themeAccent: "valheim",
  coverImage: "/games/valheim.jpg",
  coverPosition: "center",
  serverRegions: [
    "US East",
    "US West",
    "EU",
    "Asia Southeast",
    "Oceania",
  ],
  identityField: {
    key: "steamFriendCode",
    label: "Steam friend code or character name",
    placeholder: "Your Viking name",
    help: "Used so the Guide can find you. Dedicated servers and join codes are collected on the order.",
  },
  joinMethods: [
    {
      id: "dedicated-server",
      label: "Dedicated server",
      description: "Share the IP:port and password. The Guide joins your world on their own account.",
      fields: [
        {
          key: "serverAddress",
          label: "Server IP and port",
          type: "text",
          required: true,
          placeholder: "123.45.67.89:2456",
        },
        {
          key: "serverPassword",
          label: "Server password",
          type: "password",
          required: true,
        },
      ],
    },
    {
      id: "join-code",
      label: "Crossplay join code",
      description:
        "Xbox and PC Game Pass players can join with a crossplay join code. No dedicated server required.",
      fields: [
        {
          key: "joinCode",
          label: "Join code",
          type: "text",
          required: true,
          placeholder: "XXXXXX",
        },
      ],
    },
    {
      id: "steam-friend",
      label: "Steam friend invite",
      description:
        "Add the Guide's Steam friend code shown on the order, then invite them to your hosted world.",
      fields: [
        {
          key: "characterName",
          label: "In-game character name",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  seo: {
    title: "Valheim Co-op Guides — Bosses, Biomes & Base Building",
    description:
      "Book a Viking to play with you in Valheim. Boss assists, biome escorts, base building and new-player onboarding. No account sharing.",
    keywords: [
      "Valheim play with",
      "Valheim boss help",
      "Valheim co-op partner",
      "Valheim guide",
      "Valheim base building help",
    ],
  },
  hero: {
    eyebrow: "Survival co-op",
    headline: "A Viking at your side.",
    subheadline:
      "Explore a new biome, take down a boss, raise a hall, or just stop playing alone. Guides join your world — they never log into your account.",
  },
}
