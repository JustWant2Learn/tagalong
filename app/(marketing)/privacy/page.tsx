import type { Metadata } from "next"

import { LegalPage } from "@/components/marketing/legal-page"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${brand.name} handles personal data.`,
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="27 Oct 2026">
      <p>
        {brand.name} is operated from the Philippines and serves customers worldwide. This policy explains what we
        collect and why.
      </p>
      <h2>What we collect</h2>
      <p>
        Account data (email, display name, timezone, optional Discord and platform handles), booking details, encrypted
        connect info, chat messages, raid logs, reviews, and payment references from our merchant-of-record provider.
        Guide applications include proof of play and payout preferences.
      </p>
      <h2>Connect info</h2>
      <p>
        Join details (Embark ID, server passwords, join codes) are encrypted, visible only to the customer and assigned
        Guides, and hard-deleted 24 hours after the session.
      </p>
      <h2>Payout details</h2>
      <p>Guide payout methods are stored encrypted and visible only to the Guide and admins.</p>
      <h2>Legal bases and sharing</h2>
      <p>
        We share data with payment processors, email, hosting and analytics providers as needed to run the service. We
        do not sell personal data.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy requests: <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.
      </p>
    </LegalPage>
  )
}
