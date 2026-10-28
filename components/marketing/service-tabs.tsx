"use client"

import { ServiceCard } from "@/components/marketing/service-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { GameConfig } from "@/lib/games"
import type { Service } from "@/lib/seed/types"

export function ServiceTabs({
  games,
  services,
  priceByService,
  defaultSlug = "arc-raiders",
}: {
  games: GameConfig[]
  services: Service[]
  priceByService: Record<string, { min: number; max: number }>
  defaultSlug?: string
}) {
  return (
    <Tabs defaultValue={defaultSlug}>
      <TabsList className="mx-auto h-auto min-h-8 w-full max-w-full flex-wrap justify-center gap-1 group-data-horizontal/tabs:h-auto">
        {games.map((game) => (
          <TabsTrigger key={game.slug} value={game.slug} className="flex-none px-3">
            {game.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {games.map((game) => (
        <TabsContent key={game.slug} value={game.slug} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services
              .filter((service) => service.gameSlug === game.slug)
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  priceRange={priceByService[service.id] ?? { min: service.basePriceCents, max: service.basePriceCents }}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
