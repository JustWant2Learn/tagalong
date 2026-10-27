import type { Metadata } from "next"

import { ApplyForm } from "@/components/guides/apply-form"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Card, CardContent } from "@/components/ui/card"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Become a Guide",
  description: `Apply to play with customers on ${brand.name}. 18+ only. Approved per game.`,
}

export default function ApplyPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Guides"
        title="Apply to play with people, not their accounts"
        description="Tell us the games you know, how you get paid, and why someone would want you in the squad. Review is manual and per game."
      />
      <Card className="mx-auto mt-10 max-w-3xl">
        <CardContent className="pt-6">
          <ApplyForm />
        </CardContent>
      </Card>
    </Section>
  )
}
