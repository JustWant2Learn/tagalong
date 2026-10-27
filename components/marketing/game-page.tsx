import Link from "next/link"

import { GameArt } from "@/components/art/game-art"
import { FaqList } from "@/components/marketing/faq-list"
import { GuideCard } from "@/components/marketing/guide-card"
import { JsonLd } from "@/components/marketing/json-ld"
import { Reveal } from "@/components/marketing/reveal"
import { Section, SectionHeading } from "@/components/marketing/section"
import { ServiceCard } from "@/components/marketing/service-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { brand } from "@/lib/brand"
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
import type { GameConfig } from "@/lib/games"
import { affiliationDisclaimer } from "@/lib/site"
import { cn } from "@/lib/utils"

export function GamePageView({ game }: { game: GameConfig }) {
  const services = listServices(game.slug)
  const guides = listGuides({ gameSlug: game.slug, featured: true })
  const faqs = listFaqs(game.slug)
  const events = getActiveEventServices().filter((service) => service.gameSlug === game.slug)
  const isArc = game.slug === "arc-raiders"

  return (
    <div className={gameAccentClass(game.slug)}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${game.name} play-with on ${brand.name}`,
          description: game.seo.description,
          provider: { "@type": "Organization", name: brand.name },
        }}
      />
      <section className="border-b border-border/70">
        <Reveal className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-game-accent">{game.hero.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">{game.hero.headline}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{game.hero.subheadline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <Badge key={platform} variant="secondary">
                  {platformLabel(platform)}
                </Badge>
              ))}
              {game.crossplay ? <Badge variant="outline">Crossplay</Badge> : null}
              <Badge variant="outline">Squad up to {game.maxSquadSize}</Badge>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/app/book?game=${game.slug}`} className={cn(buttonVariants({ size: "lg" }))}>
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
        <SectionHeading eyebrow="Services" title={`${game.name} catalog`} />
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
        <SectionHeading eyebrow="Join" title={`How a Guide joins you in ${game.name}`} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {game.joinMethods.map((method) => (
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

      <Section className="pt-0">
        <SectionHeading eyebrow="Guides" title={`Featured ${game.name} Guides`} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="FAQ" title={`${game.name} questions`} />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqList items={faqs} />
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">{affiliationDisclaimer}</p>
      </Section>
    </div>
  )
}
