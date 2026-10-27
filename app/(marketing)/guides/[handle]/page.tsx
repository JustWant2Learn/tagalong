import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Section } from "@/components/marketing/section"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGuide, getService, listGuides, listReviews } from "@/lib/catalog"
import { languageLabel, platformLabel } from "@/lib/format"
import { gamesBySlug } from "@/lib/games"
import { cn } from "@/lib/utils"

export const instant = false

export function generateStaticParams() {
  return listGuides().map((guide) => ({ handle: guide.handle }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const guide = getGuide(handle)
  if (!guide) return {}
  return {
    title: `${guide.displayName} (@${guide.handle})`,
    description: guide.bio,
  }
}

export default async function GuideProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const guide = getGuide(handle)
  if (!guide) notFound()
  const reviews = listReviews({ guideHandle: guide.handle })

  return (
    <Section>
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader className="items-start gap-4">
            <Avatar size="lg" className="size-16">
              <AvatarFallback className="text-lg">{guide.displayName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-display text-3xl">{guide.displayName}</p>
              <p className="text-muted-foreground">@{guide.handle}</p>
              <p className="mt-2 text-sm text-game-accent">{guide.flair}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>{guide.bio}</p>
            <p className="text-muted-foreground">
              {guide.country} · {guide.timezone}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {guide.games.map((slug) => (
                <Badge key={slug} variant="secondary">
                  {gamesBySlug[slug]?.name ?? slug}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">
              {guide.languages.map(languageLabel).join(", ")} · {guide.platforms.map(platformLabel).join(", ")}
            </p>
            <p>
              {guide.ratingAvg.toFixed(1)} average · {guide.reviewCount} reviews · {guide.sessionsCompleted} sessions
            </p>
            {guide.raidsExtracted ? (
              <p>
                {guide.raidsExtracted} raids extracted on-platform
                {guide.extractionRate ? ` · ${Math.round(guide.extractionRate * 100)}% extract rate` : null}
              </p>
            ) : null}
            <Link
              href={`/app/book?guide=${guide.handle}`}
              className={cn(buttonVariants(), "w-full justify-center")}
            >
              Book with {guide.displayName}
            </Link>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hours played</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {Object.entries(guide.hoursPlayed).map(([slug, hours]) => (
                <p key={slug}>
                  {gamesBySlug[slug]?.name ?? slug}: {hours.toLocaleString()} hours
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Services offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {guide.services.map((slug) => {
                const service = getService(slug)
                return (
                  <Link key={slug} href={`/services/${slug}`} className="block hover:underline">
                    {service?.name ?? slug}
                  </Link>
                )
              })}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">Reviews show after three completed orders.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id}>
                    <p className="text-sm font-medium">
                      {"★".repeat(review.rating)} {review.author}
                    </p>
                    <p className="text-sm text-muted-foreground">{review.body}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}
