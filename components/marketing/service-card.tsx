import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatUsdRange, priceLabel } from "@/lib/format"
import { gameAccentClass } from "@/lib/game-theme"
import type { Service } from "@/lib/seed/types"
import { cn } from "@/lib/utils"

export function ServiceCard({
  service,
  priceRange,
}: {
  service: Service
  priceRange: { min: number; max: number }
}) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <Card className={cn("h-full transition-colors hover:bg-muted/30", gameAccentClass(service.gameSlug))}>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{service.pricingType.replace("_", " ")}</Badge>
            {service.isEvent ? <Badge>Event</Badge> : null}
          </div>
          <CardTitle className="text-lg">{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-base font-medium">
            {priceRange.min === priceRange.max
              ? priceLabel(service)
              : `${formatUsdRange(priceRange.min, priceRange.max)}`}
          </p>
          <p className="text-xs text-muted-foreground">per Guide · USD</p>
        </CardContent>
      </Card>
    </Link>
  )
}
