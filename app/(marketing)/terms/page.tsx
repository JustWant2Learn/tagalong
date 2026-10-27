import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage } from "@/components/marketing/legal-page"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Terms of service",
  description: `Terms for using ${brand.name}.`,
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="27 Oct 2026">
      <p>
        These terms govern use of {brand.name} ({brand.domain}). By creating an account or booking, you agree to them.
        Customers must accept these terms to book. The service is intended for adults; see the minimum-age note below.
      </p>
      <h2>What we sell</h2>
      <p>
        {brand.name} is a marketplace for play-with sessions. You book time and help from a Guide who joins your own
        game on their own account. We do not sell account access, cheats, loot, or guaranteed drops.
      </p>
      <h2>Accounts and age</h2>
      <p>
        Guides must be 18 or older. Customers must be 18 or older and the account holder. If a minor will be in a
        session, an adult must book a Family Session and stay in the game the entire time. We may close accounts that
        fail age checks.
      </p>
      <h2>No account sharing</h2>
      <p>
        You will never be asked for a game login password. Sharing credentials with a Guide, or asking a customer for
        theirs, is a material breach and can result in an immediate ban.
      </p>
      <h2>Bookings and money</h2>
      <p>
        Prices are in USD. Commission, cancellations, raid counting and disputes are described in the{" "}
        <Link href="/refunds">refunds and raid policy</Link>. Platform fees are calculated on the server.
      </p>
      <h2>Acceptable use</h2>
      <p>
        No harassment, no cheats or exploits, no off-platform payments, no scraping, and no using the service to
        violate a game’s terms beyond ordinary multiplayer squad play. See the{" "}
        <Link href="/code-of-conduct">code of conduct</Link>.
      </p>
      <h2>Youth-risk games</h2>
      <p>
        On Minecraft and any other youth-risk catalog entry, contact stays in order chat. Family Sessions are text-only
        inside the app. Guides will not request friend requests, gifts or personal information beyond the session.
        Child-safety reports pause the order and the Guide’s job-board access pending review.
      </p>
      <h2>Affiliation</h2>
      <p>
        {brand.name} is not affiliated with Embark Studios, Nexon, Iron Gate, Coffee Stain, Keen Games, Valve, Mojang
        or Microsoft. Game names are used only to describe the services we offer. Minecraft pages also carry: NOT AN
        OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
      </p>
      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.
      </p>
    </LegalPage>
  )
}
