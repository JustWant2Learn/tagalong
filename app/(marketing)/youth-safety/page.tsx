import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage } from "@/components/marketing/legal-page"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  path: "/youth-safety",
  keywords: getKeywords("/youth-safety"),
  description:
    "Customers are 18+. Minors may only appear in a Family Session with an adult present. Text chat only. Youth-cleared Guides.",
})

export default function YouthSafetyPage() {
  return (
    <div>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Youth safety", path: "/youth-safety" },
        ]}
      />
      <LegalPage title="Youth safety rules" updated="27 Oct 2026">
        <p>These rules apply to Minecraft and any other youth-risk game we add.</p>
        <h2>Age</h2>
        <p>The account holder is 18 or older. Signup asks you to confirm that.</p>
        <h2>Family Sessions</h2>
        <p>
          A minor may only be in a Family Session. The adult booker stays in the game the entire time. Chat is text-only
          inside the app. Voice and Discord are off. Only youth-cleared Guides can accept.
        </p>
        <h2>Contact</h2>
        <p>
          No friend requests, gifts or personal info beyond the session. Child-safety reports pause the order and the
          Guide’s job-board access. See the <Link href="/code-of-conduct">code of conduct</Link>.
        </p>
      </LegalPage>
    </div>
  )
}
