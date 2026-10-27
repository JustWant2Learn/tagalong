import type { Metadata } from "next"
import Link from "next/link"

import { Section, SectionHeading } from "@/components/marketing/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listGames, listServices, serviceStartingPrice } from "@/lib/catalog"
import { priceLabel } from "@/lib/format"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Book a session",
  description: "The live booking stepper ships in Phase 2. Browse games and services now.",
}

export default function BookPlaceholderPage() {
  const games = listGames()
  const services = listServices()

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
