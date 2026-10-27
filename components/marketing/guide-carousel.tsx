"use client"

import { GuideCard } from "@/components/marketing/guide-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { SeedGuide } from "@/lib/seed/types"

export function GuideCarousel({ guides }: { guides: SeedGuide[] }) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="px-12">
      <CarouselContent>
        {guides.map((guide) => (
          <CarouselItem key={guide.id} className="md:basis-1/2 xl:basis-1/3">
            <GuideCard guide={guide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
