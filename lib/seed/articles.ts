export type ArticleStatus = "draft" | "review" | "scheduled" | "published"

export type SeedArticle = {
  slug: string
  gameSlug: string
  title: string
  excerpt: string
  body: string[]
  authorHandle: string
  status: ArticleStatus
  datePublished: string
  dateModified: string
  relatedTargetKey?: string
  relatedServiceSlug?: string
  imageSrc: string
  imageAlt: string
}

export const articles: SeedArticle[] = [
  {
    slug: "how-to-beat-bonemass",
    gameSlug: "valheim",
    title: "How to beat Bonemass",
    excerpt: "Poison resist, dry ground, and a pull you can reset. Then book a Guide if you want someone in the fog with you.",
    authorHandle: "pol",
    status: "published",
    datePublished: "2026-10-20",
    dateModified: "2026-10-27",
    relatedTargetKey: "valheim/bosses/bonemass",
    relatedServiceSlug: "valheim-boss-assist",
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim artwork used to illustrate a Bonemass prep guide",
    body: [
      "Bonemass is a prep check. If the arena is wet and you skipped poison resist, the fight is already over.",
      "Bring swamp-tier food, poison resist mead, and a blunt option. Clear blobs before you kiss the altar. Keep a portal that is close but not inside the fog.",
      "Kite the edge. Do not stand in the poison puddles to finish a combo. If you wipe, eat again — do not run back hungry.",
      "A video cannot tell you that your rest bonus expired. A player in the world can. If you want that, book Valheim Bonemass help and keep this page for the checklist.",
    ],
  },
  {
    slug: "buried-city-loot-and-extraction",
    gameSlug: "arc-raiders",
    title: "ARC Raiders Buried City loot and extraction guide",
    excerpt: "Quieter rotates, when to drop loot, and why lingering in interiors gets you third-partied.",
    authorHandle: "vin",
    status: "published",
    datePublished: "2026-10-18",
    dateModified: "2026-10-27",
    relatedTargetKey: "arc-raiders/maps/buried-city",
    relatedServiceSlug: "arc-raiders-safe-extraction",
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders artwork used to illustrate a Buried City extraction guide",
    body: [
      "Buried City rewards people who leave. The interiors are rich and loud. If you clear two buildings and still feel empty, you are already late for extract.",
      "Pick a side of the city before you land. Change that plan only if audio says the side is dead. Do not cross the middle because a crate pinged.",
      "Quest items beat full bags. Drop junk when the extract is called. A Guide on an escort will say this once; after that it is on you.",
      "If you want a live run, book an ARC Raiders Buried City help session. This article stays the checklist you can read before the raid.",
    ],
  },
  {
    slug: "java-or-bedrock-which-do-i-have",
    gameSlug: "minecraft",
    title: "Java or Bedrock: which Minecraft edition do I have?",
    excerpt: "Launcher names, platforms, and why we match edition before we match a Guide.",
    authorHandle: "cedar",
    status: "published",
    datePublished: "2026-10-22",
    dateModified: "2026-10-27",
    relatedServiceSlug: "minecraft-play-with",
    imageSrc: "/games/minecraft.svg",
    imageAlt: "Original voxel illustration for a Minecraft edition explainer",
    body: [
      "Java is the PC launcher people mean when they say “Minecraft on a computer with mods.” Bedrock is Windows Bedrock, consoles, Switch and phones.",
      "They cannot play together unless your server runs a bridge. We do not assume you have one. Book the edition you actually launch.",
      "If you are unsure: look at the title screen and the store you bought it from. Marketplace and controller-first UI is Bedrock. Mods, Forge and a version folder named 1.21.x are Java.",
      "Need a player in the world tonight? Book a Minecraft play with service and pick the edition on the game page. This is not an official Minecraft product.",
    ],
  },
  {
    slug: "how-to-survive-first-raids",
    gameSlug: "arc-raiders",
    title: "How to survive your first ARC Raiders raids",
    excerpt: "Draft template — extract first, loot second.",
    authorHandle: "tokis",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    relatedServiceSlug: "arc-raiders-new-raider",
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders artwork for a beginner raid draft",
    body: ["Draft. Replace with a 600-word first-raid guide before publishing."],
  },
  {
    slug: "pendola-pass-event-routes",
    gameSlug: "arc-raiders",
    title: "Pendola Pass Frozen Trail routes",
    excerpt: "Draft template — seasonal routes.",
    authorHandle: "tralala",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    relatedTargetKey: "arc-raiders/maps/pendola-pass",
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders artwork for a Pendola Pass draft",
    body: ["Draft. Update after each Frozen Trail patch."],
  },
  {
    slug: "black-forest-first-week",
    gameSlug: "valheim",
    title: "Valheim Black Forest first week",
    excerpt: "Draft template — tin, copper, and not dying to trolls.",
    authorHandle: "nel",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim artwork for a Black Forest draft",
    body: ["Draft. Write the first-week loop before publishing."],
  },
  {
    slug: "how-to-beat-the-elder",
    gameSlug: "valheim",
    title: "How to beat The Elder",
    excerpt: "Draft template — fire, roots, and a clean pull.",
    authorHandle: "pol",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    relatedTargetKey: "valheim/bosses/the-elder",
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim artwork for The Elder draft",
    body: ["Draft. Expand the fire-arena checklist."],
  },
  {
    slug: "kindlewastes-first-push",
    gameSlug: "enshrouded",
    title: "Enshrouded Kindlewastes first push",
    excerpt: "Draft template — flasks and flame checkpoints.",
    authorHandle: "mond",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    relatedTargetKey: "enshrouded/events/elixir-well-kindlewastes",
    imageSrc: "/games/enshrouded.jpg",
    imageAlt: "Enshrouded artwork for a Kindlewastes draft",
    body: ["Draft. Add the well exit plan."],
  },
  {
    slug: "elixir-well-checklist",
    gameSlug: "enshrouded",
    title: "Elixir Well checklist",
    excerpt: "Draft template — timer, flame, leave.",
    authorHandle: "mond",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    imageSrc: "/games/enshrouded.jpg",
    imageAlt: "Enshrouded artwork for an Elixir Well draft",
    body: ["Draft. List flasks per region."],
  },
  {
    slug: "starter-base-first-nights",
    gameSlug: "enshrouded",
    title: "Enshrouded starter base, first nights",
    excerpt: "Draft template — altar, beds, crafters.",
    authorHandle: "mond",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    imageSrc: "/games/enshrouded.jpg",
    imageAlt: "Enshrouded artwork for a starter-base draft",
    body: ["Draft. Write the first-night build order."],
  },
  {
    slug: "survival-first-nights",
    gameSlug: "minecraft",
    title: "Minecraft survival first nights",
    excerpt: "Draft template — shelter, food, tools.",
    authorHandle: "pebble",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    relatedServiceSlug: "minecraft-new-player",
    imageSrc: "/games/minecraft.svg",
    imageAlt: "Original voxel illustration for a first-nights draft",
    body: ["Draft. Keep Java and Bedrock differences honest."],
  },
  {
    slug: "iron-farm-prep-checklist",
    gameSlug: "minecraft",
    title: "Minecraft iron farm prep checklist",
    excerpt: "Draft template — edition first, then materials.",
    authorHandle: "cedar",
    status: "draft",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    relatedTargetKey: "minecraft/farms/iron-farm",
    imageSrc: "/games/minecraft.svg",
    imageAlt: "Original voxel illustration for an iron farm draft",
    body: ["Draft. Split Java and Bedrock material lists."],
  },
]

export function listPublishedArticles(gameSlug?: string) {
  return articles.filter(
    (article) => article.status === "published" && (!gameSlug || article.gameSlug === gameSlug)
  )
}

export function getArticle(gameSlug: string, slug: string) {
  return articles.find((article) => article.gameSlug === gameSlug && article.slug === slug)
}

export function articleHref(article: Pick<SeedArticle, "gameSlug" | "slug">) {
  return `/learn/${article.gameSlug}/${article.slug}`
}
