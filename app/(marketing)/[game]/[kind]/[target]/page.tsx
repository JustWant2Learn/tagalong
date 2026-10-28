import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { LegalNotice } from "@/components/marketing/legal-notice"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { RelatedLinks } from "@/components/seo/related-links"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getService } from "@/lib/catalog"
import { formatUsd } from "@/lib/format"
import { gameAccentClass } from "@/lib/game-theme"
import { getGame, isGameSlug } from "@/lib/games"
import { resolveKeywords } from "@/lib/seo/dynamic-keywords"
import { relatedForTarget } from "@/lib/seo/links"
import { buildMetadata } from "@/lib/seo/metadata"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { serviceSchema } from "@/lib/seo/schema"
import { getCatalogTarget, listCatalogTargets } from "@/lib/seo/targets"
import { targetSeoCopy } from "@/lib/seed/seo-copy"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return listCatalogTargets().map((target) => ({
    game: target.gameSlug,
    kind: target.kindPath,
    target: target.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; kind: string; target: string }>
}): Promise<Metadata> {
  const { game, kind, target: slug } = await params
  const target = getCatalogTarget(game, kind, slug)
  if (!target) return {}
  const path = target.href
  const copy = targetSeoCopy[target.key]
  return buildMetadata({
    path,
    keywords: resolveKeywords(path),
    description: copy?.intro ?? `${target.name} help with a real player.`,
    index: isIndexableTarget(target),
  })
}

export default async function TargetPage({
  params,
}: {
  params: Promise<{ game: string; kind: string; target: string }>
}) {
  const { game: gameSlug, kind, target: slug } = await params
  if (!isGameSlug(gameSlug)) notFound()
  const target = getCatalogTarget(gameSlug, kind, slug)
  const game = getGame(gameSlug)
  if (!target || !game) notFound()

  const copy = targetSeoCopy[target.key]
  const keywords = resolveKeywords(target.href)
  const ready = isIndexableTarget(target)

  return (
    <div className={gameAccentClass(gameSlug)}>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: game.name, path: `/${gameSlug}` },
          { name: target.name, path: target.href },
        ]}
      />
      <PageJsonLd
        data={serviceSchema({
          name: keywords?.primary ?? `${target.name} help`,
          description: copy?.intro ?? target.name,
          path: target.href,
          priceCents: target.priceCents,
        })}
      />
      <Section>
        <p className="text-xs uppercase tracking-[0.18em] text-game-accent">{game.name}</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          {keywords?.primary ?? `${target.name} help`}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {copy?.intro ?? `Book a Guide for ${target.name}. They join on their own account.`}
        </p>
        {!ready ? (
          <p className="mt-3 text-sm text-muted-foreground">
            This page is live for booking but is not in the sitemap yet — the editorial quality gate is incomplete.
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">{formatUsd(target.priceCents)} from</Badge>
          {copy?.typicalMinutes ? <Badge variant="outline">~{copy.typicalMinutes} min</Badge> : null}
          {copy?.difficulty ? <Badge variant="outline">{copy.difficulty}</Badge> : null}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/${gameSlug}`}
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "min-h-11 sm:w-auto")}
          >
            All {game.name} services
          </Link>
          <Link
            href={`/app/book?game=${gameSlug}&service=${target.serviceSlugs[0] ?? ""}`}
            className={cn(buttonVariants({ size: "lg" }), "min-h-11 sm:w-auto")}
          >
            Book {target.name} help
          </Link>
        </div>
      </Section>

      {copy ? (
        <Section className="pt-0">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
              {copy.body.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={copy.imageSrc}
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  unoptimized={copy.imageSrc.endsWith(".svg")}
                  className="object-cover"
                />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Session facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {copy.prep?.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                  <p>From {formatUsd(target.priceCents)}. No account sharing.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>
      ) : null}

      <Section className="pt-0">
        <SectionHeading title="Book this target" />
        <ul className="mt-6 space-y-2 text-sm">
          {target.serviceSlugs.map((slug) => {
            const service = getService(slug)
            return (
              <li key={slug}>
                <Link href={`/services/${slug}`} className="underline-offset-4 hover:underline">
                  {service?.name ?? slug}
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section className="pt-0">
        <RelatedLinks title="Related pages" links={relatedForTarget(target.key)} />
        {game.legalNotice ? <LegalNotice notice={game.legalNotice} className="mt-8" /> : null}
      </Section>
    </div>
  )
}
