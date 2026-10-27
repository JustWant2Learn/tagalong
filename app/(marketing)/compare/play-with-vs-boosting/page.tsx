import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage } from "@/components/marketing/legal-page"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  path: "/compare/play-with-vs-boosting",
  keywords: getKeywords("/compare/play-with-vs-boosting"),
  description:
    "Boosting often means someone else on your account. Play-with means a real player joins your game. Here is why that difference matters.",
})

export default function ComparePage() {
  return (
    <div>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Play-with vs boosting", path: "/compare/play-with-vs-boosting" },
        ]}
      />
      <LegalPage title="Is game boosting safe?" updated="27 Oct 2026">
        <p>
          Most “boost” listings imply account sharing or remote access. That can break a game’s terms and it puts your
          login in someone else’s hands. Tagalong does not sell that. We sell a player who joins you.
        </p>
        <h2>Play-with</h2>
        <p>
          You stay at the keyboard. The Guide launches their own client, joins your squad, Realm or world, and leaves
          when the session ends. You learn the route because you walked it.
        </p>
        <h2>Typical boosting</h2>
        <p>
          Someone else plays your character. Progress appears that you did not earn. If the account is recovered or
          banned, you hold the risk. We will not do this, and we will not use “boost” as a service name.
        </p>
        <h2>When to book us</h2>
        <p>
          If you want company, a calmer extract, a boss pull, or a build partner — <Link href="/how-it-works">see how joining works</Link>{" "}
          and <Link href="/app/book">book a session</Link>.
        </p>
      </LegalPage>
    </div>
  )
}
