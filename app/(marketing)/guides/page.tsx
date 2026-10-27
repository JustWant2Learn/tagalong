import type { Metadata } from "next"

import { GuideDirectory } from "@/components/guides/guide-directory"
import { Section, SectionHeading } from "@/components/marketing/section"
import { listGames, listGuides } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Guides",
  description: "Browse play-with Guides by game, language, platform and rating.",
}

export default function GuidesPage() {
  const guides = listGuides()
  const games = listGames()

  return (
    <Section>
      <SectionHeading
        eyebrow="Directory"
        title="Meet the Guides"
        description="Filter by game, language and platform. Availability calendars arrive with matching in Phase 3."
      />
      <div className="mt-10">
        <GuideDirectory guides={guides} games={games} />
      </div>
    </Section>
  )
}
