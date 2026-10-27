import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { Section } from "@/components/marketing/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { games, getGame, isGameSlug } from "@/lib/games"
import { listPublishedArticles, articleHref } from "@/lib/seed/articles"
import { getKeywords } from "@/lib/seo/keywords"
import { buildMetadata } from "@/lib/seo/metadata"

export function generateStaticParams() {
  return games.map((game) => ({ game: game.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string }>
}): Promise<Metadata> {
  const { game: slug } = await params
  const path = `/learn/${slug}`
  return buildMetadata({
    path,
    keywords: getKeywords(path),
    description: `Guides for ${getGame(slug)?.name ?? slug}. Book a player when you want one in the session.`,
  })
}

export default async function LearnGamePage({
  params,
}: {
  params: Promise<{ game: string }>
}) {
  const { game: slug } = await params
  if (!isGameSlug(slug)) notFound()
  const game = getGame(slug)
  if (!game) notFound()
  const articles = listPublishedArticles(slug)

  return (
    <div>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/learn" },
          { name: game.name, path: `/learn/${slug}` },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl tracking-tight md:text-4xl">{game.name} guides</h1>
          <p className="mt-3 text-muted-foreground">Tips from people who take {game.name} sessions.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {articles.length === 0 ? (
            <p className="text-sm text-muted-foreground">Published guides for this game will land here.</p>
          ) : (
            articles.map((article) => (
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
            ))
          )}
        </div>
      </Section>
    </div>
  )
}
