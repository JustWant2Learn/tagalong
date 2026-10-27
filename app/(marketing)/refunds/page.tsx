import type { Metadata } from "next"

import { LegalPage } from "@/components/marketing/legal-page"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Refunds and raid policy",
  description: "Cancellation windows, ARC Raiders raid counting, and what is never refunded.",
}

export default function RefundsPage() {
  return (
    <LegalPage title="Refunds and raid policy" updated="27 Oct 2026">
      <h2>Cancellations</h2>
      <p>Free cancel more than 12 hours before the scheduled start.</p>
      <p>50% store credit if you cancel between 2 and 12 hours before start.</p>
      <p>No refund under 2 hours, except Guide no-shows and approved disputes. Windows are configurable by admin.</p>
      <h2>Guide no-show</h2>
      <p>
        If the Guide has not pressed Start within 15 minutes of the scheduled start, you may mark a no-show for a full
        refund or a free rebook. The Guide receives a strike. Three strikes pause the account pending review.
      </p>
      <h2>Customer no-show</h2>
      <p>
        If you do not provide connect info or join within 20 minutes, the Guide may mark a customer no-show. The Guide
        earns 50% of the first hour (or one raid). The rest returns to you as credit.
      </p>
      <h2>Fixed-service failure</h2>
      <p>
        If a boss or listed objective is not completed, you choose: one free retry within 7 days, or a 50% refund.
      </p>
      <h2 id="raid-policy">ARC Raiders raid policy</h2>
      <p>A raid counts as used when logged as extracted, or squad wiped with cause customer_error or other_squad.</p>
      <p>Raids lost to guide_error or a Guide disconnect are replaced free and are not counted.</p>
      <p>Aborted before deployment does not count.</p>
      <p>
        Gear, loot and items lost in any raid are never refundable. Guides do not supply gear. You bring your own
        loadout.
      </p>
      <p>No guaranteed drops. Farming and blueprint services are billed by time only.</p>
      <p>
        Guides never take loot you have not explicitly given them in chat. Anything they pick up for you is handed over
        before the session ends.
      </p>
      <h2>Minecraft setup and hardcore</h2>
      <p>
        If the Guide cannot join because the version, loader or pack on the order was wrong, they mark Setup mismatch.
        The session timer does not start. You have 30 minutes to fix the details. After that the order follows the
        customer no-show rule.
      </p>
      <p>
        Build and farm sessions require a confirmed world backup before start. Hardcore Buddy Runs end if the character
        dies; billed time is not refundable.
      </p>
      <h2>Disputes</h2>
      <p>
        Open a dispute within 48 hours of the session ending. Funds stay pending. Raid logs and screenshots are the
        primary evidence for ARC Raiders. Admin may issue a full refund, partial refund, replacement raids, or release
        funds to the Guide.
      </p>
      <h2>Questions</h2>
      <p>
        <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
      </p>
    </LegalPage>
  )
}
