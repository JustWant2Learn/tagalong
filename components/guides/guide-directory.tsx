"use client"

import { useMemo, useState } from "react"

import { GuideCard } from "@/components/marketing/guide-card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { GameConfig, Platform } from "@/lib/games"
import type { SeedGuide } from "@/lib/seed/types"

function DirectorySelect({
  id,
  value,
  onValueChange,
  items,
}: {
  id: string
  value: string
  onValueChange: (value: string) => void
  items: { value: string; label: string }[]
}) {
  return (
    <Select
      value={value}
      items={items}
      onValueChange={(next) => {
        if (next) onValueChange(next)
      }}
    >
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

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
          <DirectorySelect
            id="guide-game"
            value={game}
            onValueChange={setGame}
            items={[
              { value: "all", label: "All games" },
              ...games.map((item) => ({ value: item.slug, label: item.name })),
            ]}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="guide-language">Language</FieldLabel>
          <DirectorySelect
            id="guide-language"
            value={language}
            onValueChange={setLanguage}
            items={[
              { value: "all", label: "Any language" },
              ...languages.map((item) => ({ value: item, label: item })),
            ]}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="guide-platform">Platform</FieldLabel>
          <DirectorySelect
            id="guide-platform"
            value={platform}
            onValueChange={setPlatform}
            items={[
              { value: "all", label: "Any platform" },
              ...platforms.map((item) => ({ value: item, label: item as Platform })),
            ]}
          />
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
