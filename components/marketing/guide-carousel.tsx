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
    <Carousel opts={{ align: "start", loop: true }} className="md:px-12">
      <CarouselContent className="-ml-3 md:-ml-4">
        {guides.map((guide) => (
          <CarouselItem
            key={guide.id}
            className="min-w-0 basis-[85%] pl-3 sm:basis-[70%] md:basis-1/2 md:pl-4 xl:basis-1/3"
          >
            <GuideCard guide={guide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-5 flex items-center justify-center gap-2 md:contents">
        <CarouselPrevious className="static left-auto size-9 translate-y-0 md:absolute md:inset-y-0 md:-left-12 md:my-auto md:size-7" />
        <CarouselNext className="static right-auto size-9 translate-y-0 md:absolute md:inset-y-0 md:-right-12 md:my-auto md:size-7" />
      </div>
    </Carousel>
  )
}
