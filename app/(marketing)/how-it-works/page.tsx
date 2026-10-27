import type { Metadata } from "next"
import Link from "next/link"

import { Section, SectionHeading } from "@/components/marketing/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listGames } from "@/lib/catalog"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "How it works",
  description: "Book, match, share join info, play together, confirm, and review — without ever sharing a password.",
}

const flow = [
  {
    title: "1. Book",
    body: "Pick a game, a service, options (map or boss, hours or raid count, extra Guide within the squad cap, voice), a time in your timezone, and either any available Guide or a specific one. Then pay.",
  },
  {
    title: "2. Match",
    body: "Any-available orders hit the Guide job board. First eligible Guide to accept wins the slot. A named request goes to that Guide first; if they do not accept in time it releases to the board. Admin can force-assign.",
  },
  {
    title: "3. Connect info",
    body: "Before the session you fill in how to join. The form is generated from each game’s join methods. Details are encrypted, visible only to assigned Guides, and auto-deleted 24 hours after the session.",
  },
  {
    title: "4. Chat",
    body: "An order thread opens in the app. Discord is optional. We block phone numbers, emails, payment handles and socials.",
  },
  {
    title: "5. Session",
    body: "The Guide starts and ends a timer. Fixed services can attach proof. ARC Raiders per-raid services log each raid with map, outcome and an optional screenshot.",
  },
  {
    title: "6. Confirm",
    body: "You confirm completion or open a dispute within 48 hours. Silence auto-confirms. Then you can leave a 1–5 review.",
  },
]

export default function HowItWorksPage() {
  const games = listGames()

  return (
    <Section>
      <SectionHeading
        eyebrow="The loop"
        title="You stay on your account. They join like a friend."
        description="This is the product. Every page and every rule is built around it."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {flow.map((step) => (
          <Card key={step.title}>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{step.body}</CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 font-display text-3xl">How joining works per game</h2>
      <div className="mt-6 grid gap-4">
        {games.map((game) => (
          <Card key={game.slug} id={game.slug}>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Identity: {game.identityField.label}. {game.identityField.help}
              </p>
              {game.joinMethods.map((method) => (
                <div key={method.id}>
                  <p className="font-medium text-foreground">{method.label}</p>
                  <p>{method.description}</p>
                  {method.notes?.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              ))}
              {game.slug === "arc-raiders" ? (
                <p>
                  Crossplay checklist: enable it in settings if platforms differ. Share preferred server region and a
                  short note on your current progress.
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/app/book" className={cn(buttonVariants())}>
          Book a session
        </Link>
        <Link href="/refunds" className={cn(buttonVariants({ variant: "outline" }))}>
          Raid and refund policy
        </Link>
      </div>
    </Section>
  )
}
