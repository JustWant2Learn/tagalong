import type { Metadata } from "next"

import { LegalPage } from "@/components/marketing/legal-page"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { brand } from "@/lib/brand"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  path: "/about",
  keywords: getKeywords("/about"),
  description:
    "Tagalong is a play-with marketplace run from the Philippines. Guides join your game on their own accounts. We never ask for a login.",
})

export default function AboutPage() {
  return (
    <div>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <LegalPage title="About Tagalong" updated="27 Oct 2026">
        <p>
          {brand.name} is a marketplace for play-with sessions. You book time with a player who joins your squad or
          world on their own account. We are not a boosting service and we do not take your login.
        </p>
        <h2>Who runs this</h2>
        <p>
          The operator is based in the {brand.operatorCountry}. Support:{" "}
          <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.
        </p>
        <h2>What we will not do</h2>
        <p>
          No account sharing, no cheats, no guaranteed drops, no selling your character. Guides who ask for a password
          are banned.
        </p>
        <h2>Games</h2>
        <p>ARC Raiders, Valheim, Enshrouded and Minecraft. Minecraft pages carry the required Mojang notice.</p>
      </LegalPage>
    </div>
  )
}
