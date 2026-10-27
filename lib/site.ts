import { brand } from "@/lib/brand"
import { games } from "@/lib/games"
import { popularLinks } from "@/lib/seo/links"

export const marketingNav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/learn", label: "Learn" },
  { href: "/guides", label: "Guides" },
  { href: "/help", label: "Help" },
] as const

const gameNavCopy: Record<string, string> = {
  "arc-raiders": "Escorts, quests, farms, or a reliable third in your raid.",
  valheim: "Bosses, biomes, and halls. They join your world.",
  enshrouded: "Regions, Elixir Wells, and crafter halls as a guest.",
  minecraft: "Java or Bedrock. They join your server or Realm.",
}

export const gameNav = games.map((game) => ({
  href: `/${game.slug}`,
  label: game.name,
  slug: game.slug,
  description: gameNavCopy[game.slug] ?? game.hero.subheadline,
}))

export const footerColumns = [
  {
    title: "Play",
    links: [
      { href: "/app/book", label: "Book a session" },
      ...gameNav,
      { href: "/pricing", label: "Pricing" },
      { href: "/learn", label: "Guides & tips" },
    ],
  },
  {
    title: "Popular",
    links: popularLinks().map((link) => ({ href: link.href, label: link.label })),
  },
  {
    title: "Guides",
    links: [
      { href: "/guides", label: "Meet the Guides" },
      { href: "/guides/apply", label: "Become a Guide" },
      { href: "/guide-agreement", label: "Guide agreement" },
      { href: "/code-of-conduct", label: "Code of conduct" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/help", label: "Help center" },
      { href: "/contact", label: "Contact" },
      { href: brand.discordUrl, label: "Discord", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/about", label: "About" },
      { href: "/youth-safety", label: "Youth safety" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/refunds", label: "Refunds & raid policy" },
    ],
  },
]

export const affiliationDisclaimer = `${brand.name} is not affiliated with ${brand.publishers.slice(0, -1).join(", ")} or ${brand.publishers[brand.publishers.length - 1]}.`
