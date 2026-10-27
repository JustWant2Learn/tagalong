"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

import { GameArt } from "@/components/art/game-art"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import type { GameConfig } from "@/lib/games/types"
import { gameAccentClass } from "@/lib/game-theme"
import { cn } from "@/lib/utils"

export function GameSlideshow({ games }: { games: GameConfig[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) return
    setSelected(embla.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  useEffect(() => {
    if (!api || paused) return
    const id = window.setInterval(() => {
      api.scrollNext()
    }, 5500)
    return () => window.clearInterval(id)
  }, [api, paused])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: "start" }}
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CarouselContent className="-ml-0">
        {games.map((game, index) => (
          <CarouselItem key={game.slug} className="pl-0">
            <Link
              href={`/${game.slug}`}
              className={cn(
                "group relative block min-h-72 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/10 md:min-h-80 dark:ring-white/10",
                gameAccentClass(game.slug)
              )}
            >
              <GameArt
                slug={game.slug}
                priority={index === 0}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                {index === 0 ? (
                  <p className="text-xs uppercase tracking-[0.16em] text-game-accent">Flagship</p>
                ) : null}
                <p className="font-display text-2xl text-white md:text-3xl">{game.name}</p>
                <p className="mt-1 max-w-xl text-sm text-white/80">{game.hero.subheadline}</p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 z-10 border-0 bg-white text-neutral-900 shadow-md hover:bg-white dark:bg-background/80 dark:text-foreground dark:hover:bg-background" />
      <CarouselNext className="right-3 z-10 border-0 bg-white text-neutral-900 shadow-md hover:bg-white dark:bg-background/80 dark:text-foreground dark:hover:bg-background" />
      <div className="mt-4 flex justify-center gap-2">
        {games.map((game, index) => (
          <button
            key={game.slug}
            type="button"
            aria-label={`Show ${game.name}`}
            aria-current={selected === index ? true : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all",
              selected === index ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  )
}
