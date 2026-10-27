import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage } from "@/components/marketing/legal-page"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Guide agreement",
  description: `Independent contractor terms for ${brand.name} Guides.`,
}

export default function GuideAgreementPage() {
  return (
    <LegalPage title="Guide agreement" updated="27 Oct 2026">
      <p>
        Guides on {brand.name} are independent contractors, not employees. You set availability, accept jobs, and are
        paid after sessions confirm. The platform keeps a commission (default 30–35%, configurable per service).
      </p>
      <h2>Eligibility</h2>
      <p>You must be 18+. Approval is per game. We can suspend or remove approval after strikes, disputes or policy breaches.</p>
      <h2>Payouts</h2>
      <p>
        Earnings stay pending until confirmation or the dispute window closes. Available balances are paid in the next
        manual payout batch via Wise, PayPal or GCash. You are responsible for local tax reporting.
      </p>
      <h2>Conduct</h2>
      <p>
        You agree to the <Link href="/code-of-conduct">code of conduct</Link>. You play on your own accounts. You never
        request customer credentials or off-platform payment.
      </p>
    </LegalPage>
  )
}
