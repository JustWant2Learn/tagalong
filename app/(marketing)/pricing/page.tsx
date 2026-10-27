import type { Metadata } from "next"
import Link from "next/link"

import { Section, SectionHeading } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  listAddons,
  listBundles,
  listGames,
  listServices,
  serviceStartingPrice,
} from "@/lib/catalog"
import { formatUsd, formatUsdRange, localEstimates, priceLabel } from "@/lib/format"
import { gamesBySlug } from "@/lib/games"

export const metadata: Metadata = {
  title: "Pricing",
  description: "USD prices for play-with sessions, add-ons, hour packs and ARC Raiders raid packs.",
}

export default function PricingPage() {
  const games = listGames()
  const services = listServices()
  const addons = listAddons()
  const hourBundles = listBundles().filter((bundle) => bundle.kind === "hours")
  const raidBundles = listBundles("arc-raiders").filter((bundle) => bundle.kind === "raids")

  return (
    <Section>
      <SectionHeading
        eyebrow="Pricing"
        title="Pay for time and help. Not for loot RNG."
        description="All checkout is in USD. Local figures are estimates only."
      />

      {games.map((game) => (
        <div key={game.slug} className="mt-12">
          <h2 className="font-display text-3xl">{game.name}</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border/80">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Starting price</th>
                  <th className="px-4 py-3 font-medium">Local estimate</th>
                </tr>
              </thead>
              <tbody>
                {services
                  .filter((service) => service.gameSlug === game.slug)
                  .map((service) => {
                    const range = serviceStartingPrice(service)
                    return (
                      <tr key={service.id} className="border-t border-border/70">
                        <td className="px-4 py-3">
                          <Link href={`/services/${service.slug}`} className="hover:underline">
                            {service.name}
                          </Link>
                          {service.isEvent ? (
                            <Badge className="ml-2" variant="secondary">
                              Event
                            </Badge>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 capitalize">{service.pricingType.replace("_", " ")}</td>
                        <td className="px-4 py-3">
                          {range.min === range.max
                            ? priceLabel(service)
                            : `${formatUsdRange(range.min, range.max)}`}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{localEstimates(range.min)}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add-ons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {addons.map((addon) => (
              <div key={addon.id}>
                <p className="font-medium">
                  {addon.name}
                  {addon.gameSlug ? ` · ${gamesBySlug[addon.gameSlug]?.name}` : ""}
                </p>
                <p className="text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bundles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {hourBundles.map((bundle) => (
              <p key={bundle.id}>
                {bundle.name}: {bundle.quantity} hours stored in your wallet, {bundle.discountPct}% off.
              </p>
            ))}
            {raidBundles.map((bundle) => (
              <p key={bundle.id}>
                ARC Raiders {bundle.name}: {bundle.quantity} raid credits, {bundle.discountPct}% off a {formatUsd(800)}{" "}
                escort.
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Refund policy summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Free cancel more than 12 hours before start. 50% credit between 2 and 12 hours. No refund under 2 hours.</p>
          <p>Guide no-show: full refund or free rebook. Gear lost in a raid is never refunded.</p>
          <p>
            Full detail lives on the <Link href="/refunds">refunds and raid policy</Link> page.
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
