import type { Metadata } from "next"

import { LegalPage } from "@/components/marketing/legal-page"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: "Code of conduct",
  description: "Respect, loot rules, no cheats, no off-platform payments.",
}

export default function CodeOfConductPage() {
  return (
    <LegalPage title="Code of conduct" updated="27 Oct 2026">
      <p>This code applies to customers and Guides on {brand.name}.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Be respectful in chat and voice. No harassment, slurs or griefing.</li>
        <li>Guides play on their own accounts. Nobody asks for or accepts a customer login.</li>
        <li>Do not take the customer’s loot unless they explicitly give it in chat.</li>
        <li>Do not damage the customer’s base or world.</li>
        <li>No cheats, exploits or third-party tools.</li>
        <li>No teaming with other squads against the customer.</li>
        <li>No off-platform payments. No exchanging personal contact details to leave the app.</li>
        <li>Guides are 18+. Customers accept the terms, including the minimum-age note.</li>
        <li>
          On Minecraft and other youth-risk games: no friend requests, gifts or personal info beyond the session. No
          Discord or voice on Family Sessions. Report child-safety concerns immediately.
        </li>
      </ul>
    </LegalPage>
  )
}
