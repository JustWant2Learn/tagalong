export const brand = {
  name: "Tagalong",
  legalName: "Tagalong",
  domain: "tagalong.gg",
  url: "https://tagalong.gg",
  supportEmail: "support@tagalong.gg",
  tagline: "Never raid or roam alone again.",
  description:
    "Book skilled players to squad up with you in ARC Raiders, Valheim, Enshrouded and Minecraft — safer extractions, bosses, builds, or just good company.",
  discordUrl: "https://discord.gg/tagalong",
  twitterUrl: "https://x.com/tagalong",
  colors: {
    brandAccent: "#C4A574",
    brandAccentForeground: "#161310",
    ink: "#12110F",
    paper: "#F6F1E8",
    games: {
      "arc-raiders": {
        accent: "#FF7A3D",
        accentSoft: "#2DD4BF",
        accentForeground: "#1A0E08",
      },
      valheim: {
        accent: "#E8913A",
        accentSoft: "#F5C16C",
        accentForeground: "#1C1006",
      },
      enshrouded: {
        accent: "#7C6CFF",
        accentSoft: "#3D9DFF",
        accentForeground: "#0D0B1A",
      },
      minecraft: {
        accent: "#5A9A3A",
        accentSoft: "#8B5A2B",
        accentForeground: "#12200C",
      },
    },
  },
  publishers: [
    "Embark Studios",
    "Nexon",
    "Iron Gate",
    "Coffee Stain",
    "Keen Games",
    "Valve",
    "Mojang",
    "Microsoft",
  ],
  operatorCountry: "Philippines",
  defaultCommissionPct: 30,
  currencies: {
    display: "USD",
    estimates: ["PHP", "AUD", "EUR", "GBP"] as const,
  },
} as const

export type Brand = typeof brand
export type BrandGameSlug = keyof typeof brand.colors.games
