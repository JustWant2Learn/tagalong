import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { languageLabel, platformLabel } from "@/lib/format"
import { gamesBySlug } from "@/lib/games"
import type { SeedGuide } from "@/lib/seed/types"

export function GuideCard({ guide }: { guide: SeedGuide }) {
  const initials = guide.displayName.slice(0, 2).toUpperCase()

  return (
    <Link href={`/guides/${guide.handle}`} className="block h-full">
      <Card className="h-full transition-colors hover:bg-muted/30">
        <CardHeader className="flex-row items-start gap-3">
          <Avatar className="size-12">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{guide.displayName}</p>
            <p className="text-sm text-muted-foreground">@{guide.handle}</p>
            <p className="mt-1 text-xs text-game-accent">{guide.flair}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">{guide.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {guide.games.map((slug) => (
              <Badge key={slug} variant="secondary">
                {gamesBySlug[slug]?.name ?? slug}
              </Badge>
            ))}
            {guide.gameApprovals?.flatMap((approval) =>
              approval.variants.map((variant) => (
                <Badge key={`${approval.gameSlug}-${variant}`} variant="outline">
                  {variant}
                </Badge>
              ))
            )}
            {guide.gameApprovals?.some((approval) => approval.moddedExperience) ? (
              <Badge variant="outline">Modded</Badge>
            ) : null}
            {guide.youthCleared ? <Badge variant="outline">Youth-cleared</Badge> : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {guide.ratingAvg.toFixed(1)} · {guide.sessionsCompleted} sessions
            {guide.raidsExtracted
              ? ` · ${guide.raidsExtracted} extracts (${Math.round((guide.extractionRate ?? 0) * 100)}%)`
              : null}
          </p>
          <p className="text-xs text-muted-foreground">
            {guide.languages.map(languageLabel).join(", ")} · {guide.platforms.map(platformLabel).join(", ")}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
