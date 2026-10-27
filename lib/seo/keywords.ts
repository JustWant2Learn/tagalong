export type SearchIntent = "transactional" | "informational" | "navigational"

export type KeywordRecord = {
  path: string
  primary: string
  secondary: string[]
  intent: SearchIntent
  indexable: boolean
}

const VALUE_PROP = "No account sharing. Real players. Book in minutes."

function record(
  path: string,
  primary: string,
  secondary: string[],
  intent: SearchIntent,
  indexable = true
): KeywordRecord {
  return { path, primary, secondary, intent, indexable }
}

const staticKeywords: KeywordRecord[] = [
  record("/", "Play co-op with a real player", ["hire a game buddy", "play with someone online", "co-op partner for hire"], "transactional"),
  record("/arc-raiders", "ARC Raiders carry service", ["play ARC Raiders with someone", "ARC Raiders squad", "ARC Raiders escort", "ARC Raiders play with"], "transactional"),
  record("/valheim", "Valheim boss help", ["Valheim play with", "Valheim co-op partner", "Valheim guide for hire", "Valheim escort"], "transactional"),
  record("/enshrouded", "Enshrouded play with", ["Enshrouded escort", "Enshrouded Elixir Well help", "Enshrouded co-op partner"], "transactional"),
  record("/minecraft", "Minecraft play with service", ["hire someone to play Minecraft with", "Minecraft co-op partner", "Minecraft squad"], "transactional"),
  record("/services/arc-raiders-squad-up", "play ARC Raiders with a squad", ["ARC Raiders duo partner", "ARC Raiders play with", "ARC Raiders teammate"], "transactional"),
  record("/services/arc-raiders-safe-extraction", "ARC Raiders extraction escort", ["ARC Raiders extract help", "safe extraction escort", "ARC Raiders raid escort"], "transactional"),
  record("/services/arc-raiders-quest-project-help", "ARC Raiders quest help", ["ARC Raiders project help", "ARC Raiders hideout help"], "transactional"),
  record("/services/arc-raiders-blueprint-farming", "ARC Raiders farming help", ["ARC Raiders blueprint farm", "ARC Raiders loot runs"], "transactional"),
  record("/services/arc-raiders-hunt-event", "ARC Raiders hunt help", ["ARC Raiders event assist", "ARC Raiders boss hunt"], "transactional"),
  record("/services/arc-raiders-new-raider", "ARC Raiders new player coach", ["ARC Raiders beginner help", "learn ARC Raiders"], "transactional"),
  record("/services/arc-raiders-map-mastery", "ARC Raiders map tour", ["ARC Raiders map guide for hire", "ARC Raiders routes"], "transactional"),
  record("/services/arc-raiders-frozen-trail", "ARC Raiders Frozen Trail squad", ["Pendola Pass help", "Frozen Trail event squad"], "transactional"),
  record("/services/valheim-play-with", "play Valheim with someone", ["Valheim co-op session", "Valheim teammate for hire"], "transactional"),
  record("/services/valheim-boss-assist", "Valheim boss assist", ["Valheim boss coach", "hire Valheim boss help"], "transactional"),
  record("/services/valheim-biome-escort", "Valheim biome escort", ["Valheim swamp help", "Valheim Ashlands escort"], "transactional"),
  record("/services/valheim-base-building", "Valheim base building help", ["Valheim hall builder", "Valheim building partner"], "transactional"),
  record("/services/valheim-new-viking", "Valheim beginner coach", ["new Viking onboarding", "learn Valheim with someone"], "transactional"),
  record("/services/enshrouded-play-with", "play Enshrouded with someone", ["Enshrouded co-op session", "Enshrouded teammate"], "transactional"),
  record("/services/enshrouded-boss-elixir", "Enshrouded Elixir Well help", ["Enshrouded boss assist", "Fell Thunderbrute help"], "transactional"),
  record("/services/enshrouded-biome-escort", "Enshrouded biome escort", ["Enshrouded Kindlewastes help", "Enshrouded region push"], "transactional"),
  record("/services/enshrouded-base-building", "Enshrouded base building help", ["Enshrouded crafter hall help"], "transactional"),
  record("/services/enshrouded-new-flameborn", "Enshrouded beginner coach", ["new Flameborn onboarding"], "transactional"),
  record("/services/minecraft-play-with", "play Minecraft with someone", ["Minecraft co-op session", "Minecraft teammate for hire"], "transactional"),
  record("/services/minecraft-build-together", "Minecraft build service", ["Minecraft builder for hire", "Minecraft house help"], "transactional"),
  record("/services/minecraft-farm-redstone", "Minecraft farm help", ["Minecraft redstone help", "Minecraft iron farm builder"], "transactional"),
  record("/services/minecraft-boss-assist", "Minecraft boss help", ["Ender Dragon help", "Wither help Minecraft"], "transactional"),
  record("/services/minecraft-nether-end-escort", "Minecraft Nether escort", ["Minecraft End city help", "Minecraft elytra help"], "transactional"),
  record("/services/minecraft-hardcore-buddy", "Minecraft hardcore buddy", ["hardcore Minecraft co-op"], "transactional"),
  record("/services/minecraft-modpack-coop", "Minecraft modpack co-op", ["play a Minecraft modpack together"], "transactional"),
  record("/services/minecraft-new-player", "Minecraft beginner coach", ["Minecraft onboarding", "learn Minecraft with someone"], "transactional"),
  record("/services/minecraft-family-session", "Minecraft family session", ["play Minecraft with kids supervised"], "transactional"),
  record("/guides", "Tagalong play-with Guides", ["hire a co-op Guide", "find a game buddy"], "navigational"),
  record("/pricing", "Tagalong play-with pricing", ["how much is a co-op Guide", "session rates"], "informational"),
  record("/how-it-works", "how play-with sessions work", ["how a Guide joins your game", "no account sharing play with"], "informational"),
  record("/help", "Tagalong help center", ["play-with FAQ", "booking help"], "informational"),
  record("/contact", "contact Tagalong", ["Tagalong support email"], "navigational"),
  record("/terms", "Tagalong terms of service", ["play-with terms"], "navigational"),
  record("/privacy", "Tagalong privacy policy", ["Tagalong data policy"], "navigational"),
  record("/refunds", "Tagalong refunds and raid policy", ["play-with refunds", "ARC Raiders raid policy"], "informational"),
  record("/code-of-conduct", "Tagalong code of conduct", ["Guide conduct rules"], "informational"),
  record("/guide-agreement", "Tagalong Guide agreement", ["become a play-with Guide terms"], "informational"),
  record("/about", "about Tagalong", ["who runs Tagalong", "play-with marketplace Philippines"], "informational"),
  record("/youth-safety", "Tagalong youth safety rules", ["Minecraft family session rules"], "informational"),
  record("/compare/play-with-vs-boosting", "is game boosting safe", ["play with vs boosting", "why account sharing is risky"], "informational"),
  record("/learn", "co-op game guides", ["how to beat bosses", "play-with tips"], "informational"),
  record("/learn/arc-raiders", "ARC Raiders guides", ["ARC Raiders tips", "extraction guides"], "informational"),
  record("/learn/valheim", "Valheim guides", ["Valheim boss guides", "Valheim tips"], "informational"),
  record("/learn/enshrouded", "Enshrouded guides", ["Enshrouded tips", "Elixir Well guides"], "informational"),
  record("/learn/minecraft", "Minecraft guides", ["Minecraft farm guides", "Minecraft boss guides"], "informational"),
]

export const VALUE_PROP_PHRASE = VALUE_PROP

export function staticKeywordRecords() {
  return staticKeywords
}

export function keywordsByPath() {
  return Object.fromEntries(staticKeywords.map((item) => [item.path, item])) as Record<string, KeywordRecord>
}

export function getKeywords(path: string) {
  return keywordsByPath()[path]
}
