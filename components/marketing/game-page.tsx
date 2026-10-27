import Link from "next/link"

import { GameArt } from "@/components/art/game-art"
import { FaqList } from "@/components/marketing/faq-list"
import { GuideCard } from "@/components/marketing/guide-card"
import { LegalNotice } from "@/components/marketing/legal-notice"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { RelatedLinks } from "@/components/seo/related-links"
import { Reveal } from "@/components/marketing/reveal"
import { Section, SectionHeading } from "@/components/marketing/section"
import { ServiceCard } from "@/components/marketing/service-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getActiveEventServices,
  getServiceTargets,
  listFaqs,
  listGuides,
  listServices,
  serviceStartingPrice,
} from "@/lib/catalog"
import { formatUsd, platformLabel } from "@/lib/format"
import { gameAccentClass } from "@/lib/game-theme"
import { joinContext, resolveVariant, type GameConfig } from "@/lib/games"
import { getKeywords } from "@/lib/seo/keywords"
import { relatedForGame } from "@/lib/seo/links"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { serviceSchema } from "@/lib/seo/schema"
import { listTargetsForGame } from "@/lib/seo/targets"
import { gameSeoCopy } from "@/lib/seed/seo-copy"
import { affiliationDisclaimer } from "@/lib/site"
import { preSessionChecklist } from "@/lib/youth-safety"
import { cn } from "@/lib/utils"

export function GamePageView({ game, edition }: { game: GameConfig; edition?: string }) {
  const variant = resolveVariant(game, edition)
  const context = joinContext(game, variant?.key)
  const services = listServices(game.slug, variant?.key)
  const guides = listGuides({
    gameSlug: game.slug,
    featured: true,
    variant: variant?.key,
  })
  const faqs = listFaqs(game.slug)
  const events = getActiveEventServices().filter((service) => service.gameSlug === game.slug)
  const isArc = game.slug === "arc-raiders"
  const isYouth = game.audienceRisk === "youth"
  const keywords = getKeywords(`/${game.slug}`)
  const copy = gameSeoCopy[game.slug]
  const indexableTargets = listTargetsForGame(game.slug).filter(isIndexableTarget)
  const starting = services[0] ? serviceStartingPrice(services[0]) : { min: 0, max: 0 }

  return (
    <div className={gameAccentClass(game.slug)}>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: game.name, path: `/${game.slug}` },
        ]}
      />
      <PageJsonLd
        data={serviceSchema({
          name: keywords?.primary ?? `${game.name} play-with`,
          description: copy?.intro ?? game.seo.description,
          path: `/${game.slug}`,
          priceCents: starting.min,
        })}
      />
      {game.legalNotice ? (
        <div className="border-b border-border/70 bg-muted/40 px-4 py-3">
          <LegalNotice notice={game.legalNotice} />
        </div>
      ) : null}
      <section className="border-b border-border/70">
        <Reveal className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-game-accent">{game.hero.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
              {game.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{copy?.intro ?? game.hero.subheadline}</p>
            {game.variants ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {game.variants.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${game.slug}?edition=${item.key}`}
                    className={cn(
                      buttonVariants({ size: "sm", variant: variant?.key === item.key ? "default" : "outline" })
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2">
              {context.platforms.map((platform) => (
                <Badge key={platform} variant="secondary">
                  {platformLabel(platform)}
                </Badge>
              ))}
              {game.crossplay ? <Badge variant="outline">Crossplay</Badge> : null}
              {variant?.crossplayWithin ? <Badge variant="outline">Crossplay within edition</Badge> : null}
              <Badge variant="outline">Squad up to {game.maxSquadSize}</Badge>
              {game.maxGuidesPerOrder ? (
                <Badge variant="outline">Max {game.maxGuidesPerOrder} Guides</Badge>
              ) : null}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={
                  variant
                    ? `/app/book?game=${game.slug}&edition=${variant.key}`
                    : `/app/book?game=${game.slug}`
                }
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Book {game.shortName}
              </Link>
              <Link href="/how-it-works" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                How joining works
              </Link>
            </div>
          </div>
          <GameArt
            slug={game.slug}
            priority
            className="min-h-72 rounded-2xl ring-1 ring-foreground/10 md:min-h-full"
          />
        </Reveal>
      </section>

      {isArc ? (
        <Section className="pb-6">
          <Alert>
            <AlertTitle>Raid policy</AlertTitle>
            <AlertDescription>
              Gear and loot lost in a raid are never refundable. You bring your own loadout. If a wipe is the Guide’s
              error or they disconnect, that raid is replaced free. Farming is billed by time — no drop guarantees.
            </AlertDescription>
          </Alert>
        </Section>
      ) : null}

      {events.length > 0 ? (
        <Section className="pt-8">
          <SectionHeading eyebrow="Live events" title="Time-limited services" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {events.map((service) => (
              <ServiceCard key={service.id} service={service} priceRange={serviceStartingPrice(service)} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <SectionHeading
          eyebrow="Services"
          title={`${game.name} catalog`}
          description={variant ? `Showing ${variant.label}.` : undefined}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services
            .filter((service) => !service.isEvent)
            .map((service) => (
              <ServiceCard key={service.id} service={service} priceRange={serviceStartingPrice(service)} />
            ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Targets" title="Maps, bosses and objectives" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const targets = getServiceTargets(service.id)
            if (targets.length === 0) return null
            return (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {targets.map((target) => (
                      <li key={target.id} className="flex items-center justify-between gap-4">
                        <span>
                          {target.name}
                          <span className="ml-2 text-xs text-muted-foreground">{target.kind}</span>
                        </span>
                        <span>{formatUsd(target.priceCents)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>

      {isArc ? (
        <Section className="pt-0">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Crossplay checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Share your Embark ID as name#tag.</p>
                <p>If platforms differ, enable crossplay in game settings.</p>
                <p>Confirm preferred server region for latency.</p>
                <p>Bring your own loadout. Guides do not drop you kits.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Server regions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {game.serverRegions?.join(" · ")}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Raid packs</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                3, 5 and 10 Safe Extraction raids, stored as prepaid credits. Unused raids stay on your wallet.
              </CardContent>
            </Card>
          </div>
        </Section>
      ) : null}

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Join"
          title={`How a Guide joins you in ${game.name}`}
          description={context.identityField.help}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {context.joinMethods.map((method) => (
            <Card key={method.id}>
              <CardHeader>
                <CardTitle>{method.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{method.description}</p>
                {method.notes?.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {context.supportsMods ? (
        <Section className="pt-0">
          <SectionHeading eyebrow="Modded" title="We match your pack" />
          <Card className="mx-auto mt-8 max-w-3xl">
            <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
              <p>Java only. Send a CurseForge or Modrinth link, the loader, and versions.</p>
              <p>The Guide must be approved for modded play and confirms the install before the timer starts.</p>
              <p>Bedrock Marketplace add-ons are out of scope for now.</p>
            </CardContent>
          </Card>
        </Section>
      ) : null}

      {isYouth ? (
        <Section className="pt-0">
          <SectionHeading eyebrow="Family safety" title="Minors only join through a Family Session" />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Who can book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>The booker is 18+ and the account holder.</p>
                <p>A child may only be in a Family Session with that adult present in-game the entire time.</p>
                <p>Text chat only, inside the app. No voice. No Discord.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Before the session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {preSessionChecklist({
                  variantLabel: variant?.label ?? game.name,
                  requiresVersion: Boolean(game.requiresVersion),
                  supportsMods: context.supportsMods,
                  requiresWorldBackup: true,
                }).map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>
      ) : null}

      <Section className="pt-0">
        <SectionHeading eyebrow="Guides" title={`Featured ${game.name} Guides`} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </Section>

      {copy ? (
        <Section className="pt-0">
          <SectionHeading eyebrow="What to expect" title={`Playing ${game.name} with a Guide`} />
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
            {copy.body.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {indexableTargets.length > 0 ? (
        <Section className="pt-0">
          <SectionHeading eyebrow="Targets" title={`${game.name} maps, bosses and farms`} />
          <ul className="mt-8 grid gap-2 text-sm md:grid-cols-2">
            {indexableTargets.map((target) => (
              <li key={target.key}>
                <Link href={target.href} className="underline-offset-4 hover:underline">
                  {target.name} help
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section className="pt-0">
        <RelatedLinks title="Related pages" links={relatedForGame(game.slug)} />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title={`${game.name} questions`} />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqList items={faqs} />
        </div>
        {game.legalNotice ? <LegalNotice notice={game.legalNotice} className="mt-8" /> : null}
        <p className="mt-3 text-center text-xs text-muted-foreground">{affiliationDisclaimer}</p>
      </Section>
    </div>
  )
}
