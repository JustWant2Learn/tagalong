import type { Metadata } from "next"
import Link from "next/link"

import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { Section } from "@/components/marketing/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listGames } from "@/lib/catalog"
import { listPublishedArticles, articleHref } from "@/lib/seed/articles"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildMetadata({
  path: "/learn",
  keywords: getKeywords("/learn"),
  description: "Guides written by Tagalong players: bosses, maps, farms and first nights. Then book a session if you want a person in the world.",
})

export default function LearnIndexPage() {
  const articles = listPublishedArticles()
  const games = listGames()

  return (
    <div>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/learn" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Learn</p>
          <h1 className="font-display text-3xl tracking-tight md:text-4xl">co-op game guides</h1>
          <p className="mt-3 text-muted-foreground">
            Written by players who take sessions. Drafts stay off the sitemap until a human finishes them.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          {games.map((game) => (
            <Link key={game.slug} href={`/learn/${game.slug}`} className="underline-offset-4 hover:underline">
              {game.name} guides
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug}>
              <CardHeader>
                <CardTitle>
                  <Link href={articleHref(article)} className="hover:underline">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{article.excerpt}</CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
