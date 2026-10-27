import type { Metadata } from "next"
import Link from "next/link"

import { LegalNotice } from "@/components/marketing/legal-notice"
import { Section, SectionHeading } from "@/components/marketing/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bookingStepsForGame } from "@/lib/booking-foundations"
import { getService, listGames, listServices, serviceStartingPrice } from "@/lib/catalog"
import { priceLabel } from "@/lib/format"
import { getGame } from "@/lib/games"
import { cn } from "@/lib/utils"

export const instant = false

export const metadata: Metadata = {
  title: "Book a session",
  description: "The live booking stepper ships in Phase 2. Browse games and services now.",
  robots: { index: false, follow: false },
}

export default async function BookPlaceholderPage({
  searchParams,
}: {
  searchParams: Promise<{ game?: string; edition?: string; service?: string }>
}) {
  const params = await searchParams
  const games = listGames()
  const services = listServices()
  const selectedService = params.service ? getService(params.service) : undefined
  const selected = params.game
    ? getGame(params.game)
    : selectedService
      ? getGame(selectedService.gameSlug)
      : undefined
  const selectedVariant = selected?.variants?.find((item) => item.key === params.edition) ?? selected?.variants?.[0]

  return (
    <Section>
      <SectionHeading
        eyebrow="Booking"
        title="The stepper is next. The catalog is ready."
        description="Phase 2 adds the full book flow with server-side pricing and squad caps. Create an account now, or browse what you’ll book."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/signup" className={cn(buttonVariants())}>
          Create an account
        </Link>
        <Link href="/how-it-works" className={cn(buttonVariants({ variant: "outline" }))}>
          How it works
        </Link>
      </div>

      {selected ? (
        <Card className="mx-auto mt-10 max-w-2xl">
          <CardHeader>
            <CardTitle>{selected.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Planned steps: {bookingStepsForGame(selected).join(" → ")}
              {selected.variants ? ". Edition is required before services and Guides are filtered." : null}
            </p>
            {selectedService ? <p>Service: {selectedService.name}.</p> : null}
            {selectedVariant ? (
              <p>
                Edition: {selectedVariant.label}. Identity: {selectedVariant.identityField.label}.
              </p>
            ) : null}
            {selected.audienceRisk === "youth" ? (
              <p>
                Booking repeats: I am 18 or older and the account holder. Family Sessions also require the adult
                present in-game, a player count, and text-only chat.
              </p>
            ) : null}
            {selected.legalNotice ? <LegalNotice notice={selected.legalNotice} className="pt-2 text-left" /> : null}
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {games.map((game) => (
          <Card key={game.slug}>
            <CardHeader>
              <CardTitle>
                <Link href={`/${game.slug}`} className="hover:underline">
                  {game.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {game.variants ? <p>Java or Bedrock — pick an edition when you book.</p> : null}
              {services
                .filter((service) => service.gameSlug === game.slug && !service.isEvent)
                .slice(0, 4)
                .map((service) => {
                  const range = serviceStartingPrice(service)
                  return (
                    <p key={service.id}>
                      <Link href={`/services/${service.slug}`} className="text-foreground hover:underline">
                        {service.name}
                      </Link>{" "}
                      · {range.min === range.max ? priceLabel(service) : priceLabel({ ...service, basePriceCents: range.min })}
                    </p>
                  )
                })}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
