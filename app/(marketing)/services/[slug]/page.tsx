import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { FaqList } from "@/components/marketing/faq-list"
import { GuideCard } from "@/components/marketing/guide-card"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getService,
  getServiceTargets,
  listFaqs,
  listGuides,
  listReviews,
  listServices,
  serviceStartingPrice,
} from "@/lib/catalog"
import { formatUsd, formatUsdRange, localEstimates, priceLabel } from "@/lib/format"
import { gameAccentClass } from "@/lib/game-theme"
import { getGame } from "@/lib/games"
import { cn } from "@/lib/utils"

export const instant = false

export function generateStaticParams() {
  return listServices().map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const game = getGame(service.gameSlug)
  const targets = getServiceTargets(service.id)
  const range = serviceStartingPrice(service)
  const guides = listGuides({ serviceSlug: service.slug })
  const reviews = listReviews({ serviceSlug: service.slug })
  const faqs = listFaqs(service.gameSlug)

  return (
    <div className={gameAccentClass(service.gameSlug)}>
      <section className="border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-game-accent">{game?.name}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{service.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{service.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">{service.pricingType.replace("_", " ")}</Badge>
              <Badge variant="secondary">~{service.estMinutes} min</Badge>
              <Badge variant="secondary">
                {service.minGuides}–{service.maxGuides} Guides
              </Badge>
              {service.isEvent ? <Badge>Event</Badge> : null}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>From {formatUsdRange(range.min, range.max)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-2xl font-medium">{priceLabel(service)}</p>
              <p className="text-muted-foreground">≈ {localEstimates(range.min)}</p>
              <p className="text-muted-foreground">
                Extra Guide is +100% of the per-Guide rate, capped at {game?.maxSquadSize ?? 0} in the squad (you
                included).
              </p>
              <Link href={`/app/book?service=${service.slug}`} className={cn(buttonVariants(), "w-full justify-center")}>
                Book this service
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {service.includes.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Not included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {service.excludes.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {service.prerequisites.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {targets.length > 0 ? (
        <Section className="pt-0">
          <SectionHeading title="Choose a target" description="Admin-maintained list. Prices can vary by tier." />
          <Card className="mt-8">
            <CardContent className="pt-6">
              <ul className="divide-y divide-border">
                {targets.map((target) => (
                  <li key={target.id} className="flex items-center justify-between py-3 text-sm">
                    <span>
                      {target.name}{" "}
                      <span className="text-muted-foreground">
                        · {target.kind} · tier {target.tier}
                      </span>
                    </span>
                    <span>{formatUsd(target.priceCents)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Section>
      ) : null}

      {reviews.length > 0 ? (
        <Section className="pt-0">
          <SectionHeading title="Reviews for this service" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {"★".repeat(review.rating)} {review.author}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{review.body}</CardContent>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {guides.length > 0 ? (
        <Section className="pt-0">
          <SectionHeading title="Guides who offer this" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <FaqList items={faqs.slice(0, 5)} />
        </div>
      </Section>
    </div>
  )
}
