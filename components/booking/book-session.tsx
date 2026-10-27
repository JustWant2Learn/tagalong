"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  BookOpen,
  Flag,
  Flame,
  GraduationCap,
  Hammer,
  Heart,
  Puzzle,
  Search,
  Shield,
  ShieldCheck,
  Snowflake,
  Swords,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react"

import { LegalNotice } from "@/components/marketing/legal-notice"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatUsd } from "@/lib/format"
import { gameAccentClass } from "@/lib/game-theme"
import type { Service } from "@/lib/seed/types"
import { cn } from "@/lib/utils"

const steps = [
  { id: "game", label: "Game" },
  { id: "service", label: "Service" },
  { id: "details", label: "Details" },
  { id: "schedule", label: "Time & Pro" },
  { id: "pay", label: "Pay" },
] as const

type StepId = (typeof steps)[number]["id"]

type BookGame = {
  slug: string
  name: string
  legalNotice?: string
  variants?: { key: string; label: string }[]
}

export function BookSession({
  games,
  services,
  initialGame,
  initialService,
}: {
  games: BookGame[]
  services: Service[]
  initialGame?: string
  initialService?: string
}) {
  const [step, setStep] = useState<StepId>(initialService ? "details" : "service")
  const [gameSlug, setGameSlug] = useState(initialGame ?? games[0]?.slug ?? "arc-raiders")
  const [serviceSlug, setServiceSlug] = useState(initialService)
  const [edition, setEdition] = useState<string | undefined>(
    games.find((game) => game.slug === (initialGame ?? games[0]?.slug))?.variants?.[0]?.key
  )

  const game = games.find((item) => item.slug === gameSlug) ?? games[0]
  const gameServices = useMemo(
    () => services.filter((service) => service.gameSlug === gameSlug && service.active && !service.isEvent),
    [gameSlug, services]
  )
  const selectedService = gameServices.find((service) => service.slug === serviceSlug)
  const currentIndex = steps.findIndex((item) => item.id === step)

  function selectGame(slug: string) {
    setGameSlug(slug)
    setServiceSlug(undefined)
    setEdition(games.find((item) => item.slug === slug)?.variants?.[0]?.key)
    setStep("service")
  }

  function selectService(slug: string) {
    setServiceSlug(slug)
    setStep("details")
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <ol className="mx-auto flex max-w-3xl items-center justify-between gap-1">
        {steps.map((item, index) => {
          const done = index < currentIndex
          const active = item.id === step
          return (
            <li key={item.id} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                onClick={() => {
                  if (item.id === "details" && !selectedService) return
                  if ((item.id === "schedule" || item.id === "pay") && !selectedService) return
                  setStep(item.id)
                }}
                className="flex min-h-11 cursor-pointer items-center gap-2"
              >
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-medium",
                    active || done
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm sm:inline",
                    active ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </button>
              {index < steps.length - 1 ? (
                <span className="mx-2 h-px flex-1 bg-border sm:mx-3" aria-hidden />
              ) : null}
            </li>
          )
        })}
      </ol>

      {step === "service" || step === "game" ? (
        <ServiceStep
          games={games}
          game={game}
          services={gameServices}
          allServices={services}
          selectedSlug={serviceSlug}
          onSelectGame={selectGame}
          onSelectService={selectService}
        />
      ) : null}

      {step === "details" && selectedService && game ? (
        <div className="mt-10">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">Session details</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {selectedService.name} in {game.name}. A Pro joins on their own account.
          </p>
          {game.variants ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {game.variants.map((variant) => (
                <button
                  key={variant.key}
                  type="button"
                  onClick={() => setEdition(variant.key)}
                  className={cn(
                    "min-h-11 cursor-pointer rounded-full border px-4 text-sm",
                    edition === variant.key
                      ? "border-foreground/20 bg-card ring-1 ring-foreground/15"
                      : "border-transparent bg-muted/60 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          ) : null}
          <Card className="mt-8 max-w-xl">
            <CardContent className="space-y-2 pt-1">
              <p className="font-medium">{serviceTitle(selectedService.name)}</p>
              <p className="text-sm text-muted-foreground">{selectedService.description}</p>
              <p className="pt-2 text-lg font-medium">{servicePrice(selectedService)}</p>
              {game.legalNotice ? <LegalNotice notice={game.legalNotice} className="pt-2 text-left" /> : null}
            </CardContent>
          </Card>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" variant="outline" className="min-h-11 px-5" onClick={() => setStep("service")}>
              Back to services
            </Button>
            <Button size="lg" className="min-h-11 px-5" onClick={() => setStep("schedule")}>
              Continue
            </Button>
          </div>
        </div>
      ) : null}

      {step === "schedule" && selectedService && game ? (
        <div className="mt-10">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">Time and Pro</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Availability calendars and named Pro matching ship with live booking. This session is ready to hold
            as next available.
          </p>
          <Card className="mt-8 max-w-xl">
            <CardContent className="space-y-2 pt-1">
              <p className="font-medium">Next available Pro</p>
              <p className="text-sm text-muted-foreground">
                First eligible Guide for {game.name} · {serviceTitle(selectedService.name)}
              </p>
            </CardContent>
          </Card>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setStep("pay")}>
              Continue
            </Button>
            <Button size="lg" variant="outline" onClick={() => setStep("details")}>
              Back
            </Button>
          </div>
        </div>
      ) : null}

      {step === "pay" && selectedService && game ? (
        <div className="mt-10">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">Pay</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Checkout is next. Create an account now so this booking can charge when payments go live.
          </p>
          <Card className="mt-8 max-w-xl">
            <CardContent className="space-y-2 pt-1">
              <p className="font-medium">
                {game.name} · {serviceTitle(selectedService.name)}
              </p>
              {edition ? <p className="text-sm text-muted-foreground">Edition: {edition}</p> : null}
              <p className="text-lg font-medium">{servicePrice(selectedService)}</p>
            </CardContent>
          </Card>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }))}>
              Create an account
            </Link>
            <Button size="lg" variant="outline" onClick={() => setStep("schedule")}>
              Back
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ServiceStep({
  games,
  game,
  services,
  allServices,
  selectedSlug,
  onSelectGame,
  onSelectService,
}: {
  games: BookGame[]
  game?: BookGame
  services: Service[]
  allServices: Service[]
  selectedSlug?: string
  onSelectGame: (slug: string) => void
  onSelectService: (slug: string) => void
}) {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">What do you need help with?</h1>
          <p className="mt-3 text-muted-foreground">
            Pick a game, then a service. A Pro joins your squad or world on their own account. We never ask for
            your password.
          </p>
        </div>
        <Badge variant="outline" className="h-8 gap-1.5 rounded-full px-3">
          <ShieldCheck className="size-3.5" />
          No account sharing
        </Badge>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {games.map((item) => {
          const count = allServices.filter((service) => service.gameSlug === item.slug && service.active && !service.isEvent).length
          const selected = item.slug === game?.slug
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => onSelectGame(item.slug)}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-sm transition-colors",
                gameAccentClass(item.slug),
                selected
                  ? "border-foreground/15 bg-card shadow-sm"
                  : "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="size-2 rounded-full bg-game-accent" />
              {item.name}
              <span className="text-muted-foreground">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServicePickCard
            key={service.id}
            service={service}
            selected={service.slug === selectedSlug}
            mostBooked={service.slug === "arc-raiders-safe-extraction"}
            onSelect={() => onSelectService(service.slug)}
          />
        ))}
      </div>
    </div>
  )
}

function ServicePickCard({
  service,
  selected,
  mostBooked,
  onSelect,
}: {
  service: Service
  selected: boolean
  mostBooked: boolean
  onSelect: () => void
}) {
  const Icon = serviceIcon(service)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex min-h-48 cursor-pointer flex-col rounded-2xl border bg-card p-5 text-left shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        selected ? "border-foreground/25 ring-1 ring-foreground/15" : "border-border/80"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="size-5" />
        </span>
        {mostBooked ? (
          <Badge className="rounded-full bg-primary text-primary-foreground">Most booked</Badge>
        ) : null}
      </div>
      <p className="mt-4 font-heading text-lg font-medium">{serviceTitle(service.name)}</p>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <p className="text-lg font-medium">{servicePrice(service)}</p>
        <p className="text-sm text-muted-foreground">{serviceMeta(service)}</p>
      </div>
    </button>
  )
}

function serviceTitle(name: string) {
  return name.replace(" (Play-With)", "").replace(" / Item Farming Runs", " & Item Farming")
}

function servicePrice(service: Service) {
  const amount = formatUsd(service.basePriceCents)
  if (service.pricingType === "hourly") return `${amount}/hr`
  if (service.pricingType === "per_raid") return `${amount}/raid`
  if (service.slug.includes("map-mastery")) return `${amount}/map`
  return service.pricingType === "fixed" && service.estMinutes >= 120 ? amount : `from ${amount}`
}

function serviceMeta(service: Service) {
  const guides =
    service.minGuides === service.maxGuides
      ? `${service.maxGuides} Pro${service.maxGuides > 1 ? "s" : ""}`
      : `${service.minGuides}–${service.maxGuides} Pros`

  if (service.pricingType === "hourly") {
    return service.maxGuides > 1 ? `${guides} · hourly` : "Hourly"
  }
  if (service.pricingType === "per_raid") return "Per raid"
  const hours = service.estMinutes / 60
  if (hours >= 1) {
    const label = Number.isInteger(hours) ? String(hours) : hours.toFixed(1)
    return `~${label} hour${hours === 1 ? "" : "s"}`
  }
  return "Fixed"
}

function serviceIcon(service: Service): LucideIcon {
  const slug = service.slug
  if (slug.includes("extraction") || slug.includes("escort")) return Shield
  if (slug.includes("quest") || slug.includes("project")) return Flag
  if (slug.includes("farming") || slug.includes("blueprint") || slug.includes("farm")) return Search
  if (slug.includes("new-raider") || slug.includes("new-viking") || slug.includes("new-player") || slug.includes("new-flameborn")) {
    return GraduationCap
  }
  if (slug.includes("map")) return BookOpen
  if (slug.includes("frozen")) return Snowflake
  if (slug.includes("hunt") || slug.includes("boss")) return Swords
  if (slug.includes("biome")) return Trees
  if (slug.includes("build") || slug.includes("base")) return Hammer
  if (slug.includes("family")) return Heart
  if (slug.includes("nether") || slug.includes("end")) return Flame
  if (slug.includes("modpack")) return Puzzle
  if (slug.includes("squad") || slug.includes("play-with") || slug.includes("hardcore")) return Users
  return Users
}
