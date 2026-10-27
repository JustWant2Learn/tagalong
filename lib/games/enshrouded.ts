import type { GameConfig } from "./types"

export const enshrouded: GameConfig = {
  slug: "enshrouded",
  name: "Enshrouded",
  shortName: "Enshrouded",
  genre: "survival-coop",
  maxSquadSize: 16,
  platforms: ["steam", "xbox", "gamepass"],
  crossplay: true,
  pvp: false,
  themeAccent: "enshrouded",
  coverImage: "/games/enshrouded.jpg",
  coverPosition: "center",
  serverRegions: [
    "US East",
    "US West",
    "EU",
    "Asia Southeast",
    "Oceania",
  ],
  identityField: {
    key: "characterName",
    label: "Flameborn name",
    placeholder: "Your character name",
    help: "Used so the Guide can find you in-world. Server details are collected on the order.",
  },
  joinMethods: [
    {
      id: "dedicated-server",
      label: "Dedicated server",
      description:
        "Share the server address and the user-group password you created for guests. The Guide joins as a guest on their own account.",
      fields: [
        {
          key: "serverAddress",
          label: "Server address",
          type: "text",
          required: true,
          placeholder: "play.yourserver.com",
        },
        {
          key: "guestPassword",
          label: "Guest / user-group password",
          type: "password",
          required: true,
          help: "The password for the guest group you created — not your admin password.",
        },
      ],
    },
    {
      id: "steam-friend",
      label: "Steam friend invite",
      description: "Invite the Guide to your hosted world via Steam.",
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
    title: "Enshrouded Co-op Guides — Bosses, Biomes & Base Setup",
    description:
      "Book a Flameborn to play with you in Enshrouded. Boss and Elixir Well help, biome escorts, base building and onboarding. No account sharing.",
    keywords: [
      "Enshrouded play with",
      "Enshrouded co-op",
      "Enshrouded boss help",
      "Enshrouded guide",
      "Enshrouded elixir well",
    ],
  },
  hero: {
    eyebrow: "Survival co-op",
    headline: "Push the flame together.",
    subheadline:
      "Need a partner for the next region, an Elixir Well, or a crafter hall? Guides join your world as guests — never with your login.",
  },
}
