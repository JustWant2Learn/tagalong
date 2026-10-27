"use client"

import { useMemo, useState } from "react"

import { GuideCard } from "@/components/marketing/guide-card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { GameConfig, Platform } from "@/lib/games"
import type { SeedGuide } from "@/lib/seed/types"

export function GuideDirectory({
  guides,
  games,
}: {
  guides: SeedGuide[]
  games: GameConfig[]
}) {
  const [game, setGame] = useState("all")
  const [language, setLanguage] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [query, setQuery] = useState("")

  const languages = useMemo(
    () => Array.from(new Set(guides.flatMap((guide) => guide.languages))),
    [guides]
  )
  const platforms = useMemo(
    () => Array.from(new Set(guides.flatMap((guide) => guide.platforms))),
    [guides]
  )

  const filtered = guides.filter((guide) => {
    if (game !== "all" && !guide.games.includes(game)) return false
    if (language !== "all" && !guide.languages.includes(language)) return false
    if (platform !== "all" && !guide.platforms.includes(platform)) return false
    if (query && !`${guide.displayName} ${guide.handle} ${guide.bio}`.toLowerCase().includes(query.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-border/80 p-4 md:grid-cols-4">
        <Field>
          <FieldLabel htmlFor="guide-search">Search</FieldLabel>
          <Input
            id="guide-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, handle, bio"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="guide-game">Game</FieldLabel>
          <select
            id="guide-game"
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            value={game}
            onChange={(event) => setGame(event.target.value)}
          >
            <option value="all">All games</option>
            {games.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor="guide-language">Language</FieldLabel>
          <select
            id="guide-language"
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="all">Any language</option>
            {languages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor="guide-platform">Platform</FieldLabel>
          <select
            id="guide-platform"
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            <option value="all">Any platform</option>
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item as Platform}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">No Guides match those filters yet.</p>
      ) : null}
    </div>
  )
}
