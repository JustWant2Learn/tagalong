import type { Metadata } from "next"
import Link from "next/link"
import {
  Check,
  Clock3,
  KeyRound,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"

import { FaqList } from "@/components/marketing/faq-list"
import { GameSlideshow } from "@/components/marketing/game-slideshow"
import { GuideCarousel } from "@/components/marketing/guide-carousel"
import { JsonLd } from "@/components/marketing/json-ld"
import { Reveal } from "@/components/marketing/reveal"
import { Section, SectionHeading } from "@/components/marketing/section"
import { ServiceTabs } from "@/components/marketing/service-tabs"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { brand } from "@/lib/brand"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"
import {
  getActiveEventServices,
  listFaqs,
  listGames,
  listGuides,
  listReviews,
  listServices,
  serviceStartingPrice,
} from "@/lib/catalog"
import { localEstimates, priceLabel } from "@/lib/format"
import { gameAccentClass } from "@/lib/game-theme"
import { affiliationDisclaimer } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = buildMetadata({
  path: "/",
  keywords: getKeywords("/"),
  description:
    "Book skilled players to squad up in ARC Raiders, Valheim, Enshrouded and Minecraft. No account sharing. Real players. Book in minutes.",
})

const steps = [
  { title: "Book", body: "Pick a game, a service, options and a time in your timezone. Pay upfront." },
  { title: "Get matched", body: "Any available goes to the job board. A named Guide gets a window to accept first." },
  { title: "Play together", body: "Share join info (encrypted). They join your squad or world on their own account." },
  { title: "Rate", body: "Confirm the session, leave a review. Guides are paid after confirmation." },
]

export default function HomePage() {
  const games = listGames()
  const services = listServices()
  const featuredGuides = listGuides({ featured: true })
  const visibleReviews = listReviews()
  const events = getActiveEventServices()
  const faqs = listFaqs()
  const priceByService = Object.fromEntries(
    services.map((service) => [service.id, serviceStartingPrice(service)])
  )

  return (
    <div>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${brand.name} play-with sessions`,
            description: brand.description,
            provider: { "@type": "Organization", name: brand.name, url: brand.url },
            areaServed: "Worldwide",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: "6",
              highPrice: "40",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/70">
        <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
        <Reveal className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Play-with, never account sharing
            </Badge>
            <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-balance md:text-6xl">
              {brand.tagline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{brand.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/app/book" className={cn(buttonVariants({ size: "lg" }))}>
                Book a session
              </Link>
              <Link href="/how-it-works" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                How it works
              </Link>
            </div>
          </div>
          <GameSlideshow games={games} />
        </Reveal>
      </section>

      <div className="border-b border-border/70 bg-card/40">
        <Reveal className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-5 sm:flex-row sm:gap-10">
          {[
            { icon: KeyRound, title: "We never ask for your password" },
            { icon: Users, title: "Guides play on their own accounts" },
            { icon: ShieldCheck, title: "Pay only for completed sessions" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 text-sm">
              <item.icon className="size-4 shrink-0 text-primary" />
              <p>{item.title}</p>
            </div>
          ))}
        </Reveal>
      </div>

      {events[0] ? (
        <Link
          href={`/services/${events[0].slug}`}
          className={cn(
            "block border-b border-border/70 bg-game-accent text-game-accent-foreground",
            gameAccentClass(events[0].gameSlug)
          )}
        >
          <Reveal>
            <p className="px-4 py-3 text-center text-sm font-medium">
              {events[0].eventBanner ?? `${events[0].name} is live — book an event squad.`}
            </p>
          </Reveal>
        </Link>
      ) : null}

      <Section id="how-it-works">
        <SectionHeading
          eyebrow="How it works"
          title="Book. Get matched. Play together. Rate."
          description="The same loop for a raid escort, a boss, or a quiet building night."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <CardHeader>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">0{index + 1}</p>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{step.body}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Services"
          title="What you can book"
          description="Starting prices from the live catalog. Filter by game — ARC Raiders first."
        />
        <div className="mt-10">
          <ServiceTabs games={games} services={services} priceByService={priceByService} />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Guides" title="People you actually want in voice" />
        <div className="mt-10">
          <GuideCarousel guides={featuredGuides} />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Why us vs boosting"
          title="You play. They play. Nobody logs into your account."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="size-4 text-primary" /> {brand.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Guides join your squad or world on their own accounts.</p>
              <p>No ban risk from handing over a login.</p>
              <p>You stay at the keyboard — you learn the routes and the fights.</p>
              <p>It is social on purpose. Company is part of what you buy.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <X className="size-4 text-destructive" /> Typical boosting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Often asks for your password or remote access.</p>
              <p>Account-sharing risk sits on you.</p>
              <p>Someone else plays your character. You wake up to progress you did not earn.</p>
              <p>No session, no stories, no skill that sticks.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Pricing" title="Clear starting rates. Calculator on each service." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["hourly", "per_raid", "fixed"].map((type) => {
            const sample = services.find((service) => service.pricingType === type)
            if (!sample) return null
            return (
              <Card key={type}>
                <CardHeader>
                  <CardTitle className="capitalize">{type.replace("_", " ")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-medium">{priceLabel(sample)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">≈ {localEstimates(sample.basePriceCents)}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Display estimates in PHP, AUD, EUR and GBP. You always pay in USD.
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="mt-6 text-center">
          <Link href="/pricing" className={cn(buttonVariants({ variant: "outline" }))}>
            Full pricing
          </Link>
        </div>
      </Section>

      {visibleReviews.length >= 5 ? (
        <Section className="pt-0">
          <SectionHeading eyebrow="Reviews" title="From people who stayed in the session" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    {"★".repeat(review.rating)}
                    <span className="font-sans text-sm font-normal text-muted-foreground">{review.author}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{review.body}</CardContent>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="faq" className="pt-0">
        <SectionHeading eyebrow="FAQ" title="The questions we get before the first book" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <Section className="pt-0">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Guides</p>
              <h2 className="mt-2 font-display text-3xl">Play with people. Get paid for the hours you already love.</h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Apply from the Philippines, SEA or anywhere you can keep a stable connection. 18+ only. Approved per
                game. Payouts via Wise, PayPal or GCash.
              </p>
              <Link href="/guides/apply" className={cn(buttonVariants(), "mt-6 inline-flex")}>
                Become a Guide
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-3 bg-muted/40 p-8 text-sm">
              <p className="flex items-center gap-2">
                <Clock3 className="size-4" /> Set weekly availability in your timezone
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4" /> Own-account only. No boosting logins.
              </p>
              <p className="flex items-center gap-2">
                <Users className="size-4" /> Job board with first-accept-wins
              </p>
            </div>
          </div>
        </Card>
        <p className="mt-8 text-center text-xs text-muted-foreground">{affiliationDisclaimer}</p>
      </Section>
    </div>
  )
}
