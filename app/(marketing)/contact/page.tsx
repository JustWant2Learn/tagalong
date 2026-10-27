import type { Metadata } from "next"

import { ContactForm } from "@/components/contact/contact-form"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Card, CardContent } from "@/components/ui/card"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${brand.name} at ${brand.supportEmail}.`,
}

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Support"
        title="Talk to a human"
        description={`We read ${brand.supportEmail}. For live session issues, use the order page once booking is live.`}
      />
      <Card className="mx-auto mt-10 max-w-xl">
        <CardContent className="pt-6">
          <ContactForm />
        </CardContent>
      </Card>
    </Section>
  )
}
