import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { FaqList } from "@/components/marketing/faq-list"
import { GuideCard } from "@/components/marketing/guide-card"
import { LegalNotice } from "@/components/marketing/legal-notice"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { RelatedLinks } from "@/components/seo/related-links"
import { Reveal } from "@/components/marketing/reveal"
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
import { getKeywords } from "@/lib/seo/keywords"
import { relatedForService } from "@/lib/seo/links"
import { buildMetadata } from "@/lib/seo/metadata"
import { serviceSchema } from "@/lib/seo/schema"
import { listCatalogTargets } from "@/lib/seo/targets"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { serviceSeoCopy } from "@/lib/seed/seo-copy"
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
  const path = `/services/${slug}`
  return buildMetadata({
    path,
    keywords: getKeywords(path),
    description: serviceSeoCopy[slug]?.intro ?? service.description,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const game = getGame(service.gameSlug)
  const targets = getServiceTargets(service.id)
  const range = serviceStartingPrice(service)
  const guides = listGuides({ serviceSlug: service.slug, familySession: service.familySession })
  const reviews = listReviews({ serviceSlug: service.slug })
  const faqs = listFaqs(service.gameSlug)
  const path = `/services/${service.slug}`
  const keywords = getKeywords(path)
  const copy = serviceSeoCopy[service.slug]
  const linkedTargets = listCatalogTargets().filter(
    (target) => target.serviceSlugs.includes(service.slug) && isIndexableTarget(target)
  )

  return (
    <div className={gameAccentClass(service.gameSlug)}>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: game?.name ?? service.gameSlug, path: `/${service.gameSlug}` },
          { name: keywords?.primary ?? service.name, path },
        ]}
      />
      <PageJsonLd
        data={serviceSchema({
          name: keywords?.primary ?? service.name,
          description: copy?.intro ?? service.description,
          path,
          priceCents: range.min,
        })}
      />
      <section className="border-b border-border/70">
        <Reveal className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-game-accent">{game?.name}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              {keywords?.primary ?? service.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{copy?.intro ?? service.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">{service.pricingType.replace("_", " ")}</Badge>
              <Badge variant="secondary">~{service.estMinutes} min</Badge>
              <Badge variant="secondary">
                {service.minGuides}–{service.maxGuides} Guides
              </Badge>
              {service.isEvent ? <Badge>Event</Badge> : null}
              {service.variants?.map((variant) => (
                <Badge key={variant} variant="secondary">
                  {variant}
                </Badge>
              ))}
              {service.familySession ? <Badge variant="secondary">Family</Badge> : null}
              {service.hardcore ? <Badge variant="secondary">Hardcore</Badge> : null}
              {service.moddedOnly ? <Badge variant="secondary">Java mods</Badge> : null}
              {service.requiresWorldBackup ? <Badge variant="outline">World backup required</Badge> : null}
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
              {game?.maxGuidesPerOrder ? (
                <p className="text-muted-foreground">This game allows at most {game.maxGuidesPerOrder} Guides per order.</p>
              ) : null}
              {service.hardcore ? (
                <p className="text-muted-foreground">
                  Character death ends the run. Billed time is not refundable.
                </p>
              ) : null}
              {service.familySession ? (
                <p className="text-muted-foreground">
                  Adult booker present in-game the entire session. Text chat only — no voice, no Discord.
                </p>
              ) : null}
              {service.requiresWorldBackup ? (
                <p className="text-muted-foreground">
                  Confirm a world backup before the session starts. Damage disputes use screenshots and chat.
                </p>
              ) : null}
              <Link href={`/app/book?service=${service.slug}`} className={cn(buttonVariants(), "w-full justify-center")}>
                Book this service
              </Link>
            </CardContent>
          </Card>
        </Reveal>
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

      {copy?.body ? (
        <Section className="pt-0">
          <SectionHeading title="What to expect" />
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">{copy.body}</p>
        </Section>
      ) : null}

      {linkedTargets.length > 0 ? (
        <Section className="pt-0">
          <RelatedLinks
            title="Target pages"
            links={linkedTargets.map((target) => ({
              href: target.href,
              label: `${target.name} help`,
              rank: 10,
            }))}
          />
        </Section>
      ) : null}

      <Section className="pt-0">
        <RelatedLinks title="Related services" links={relatedForService(service.slug, service.gameSlug)} />
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <FaqList items={faqs.slice(0, 5)} />
        </div>
        {game?.legalNotice ? <LegalNotice notice={game.legalNotice} className="mt-8" /> : null}
      </Section>
    </div>
  )
}
