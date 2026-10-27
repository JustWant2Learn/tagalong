import { brand } from "@/lib/brand"
import { games } from "@/lib/games"

export const marketingNav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guides", label: "Guides" },
  { href: "/help", label: "Help" },
] as const

export const gameNav = games.map((game) => ({
  href: `/${game.slug}`,
  label: game.name,
  slug: game.slug,
}))

export const footerColumns = [
  {
    title: "Play",
    links: [
      { href: "/app/book", label: "Book a session" },
      ...gameNav,
      { href: "/pricing", label: "Pricing" },
    ],
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
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/refunds", label: "Refunds & raid policy" },
    ],
  },
] as const

export const affiliationDisclaimer = `${brand.name} is not affiliated with ${brand.publishers.slice(0, -1).join(", ")} or ${brand.publishers[brand.publishers.length - 1]}.`
