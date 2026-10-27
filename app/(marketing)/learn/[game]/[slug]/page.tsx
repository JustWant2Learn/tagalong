import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { LegalNotice } from "@/components/marketing/legal-notice"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { Section } from "@/components/marketing/section"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGuide, getService } from "@/lib/catalog"
import { getGame, isGameSlug } from "@/lib/games"
import { articles, getArticle, listPublishedArticles } from "@/lib/seed/articles"
import { resolveKeywords } from "@/lib/seo/dynamic-keywords"
import { buildMetadata, noindexMetadata } from "@/lib/seo/metadata"
import { articleSchema } from "@/lib/seo/schema"
import { listCatalogTargets } from "@/lib/seo/targets"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return articles.map((article) => ({ game: article.gameSlug, slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; slug: string }>
}): Promise<Metadata> {
  const { game, slug } = await params
  const article = getArticle(game, slug)
  if (!article) return {}
  const path = `/learn/${game}/${slug}`
  if (article.status !== "published") {
    return noindexMetadata(article.title, article.excerpt)
  }
  return buildMetadata({
    path,
    keywords: resolveKeywords(path),
    description: article.excerpt,
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ game: string; slug: string }>
}) {
  const { game: gameSlug, slug } = await params
  if (!isGameSlug(gameSlug)) notFound()
  const article = getArticle(gameSlug, slug)
  const game = getGame(gameSlug)
  if (!article || !game) notFound()
  const author = getGuide(article.authorHandle)
  const relatedTarget = article.relatedTargetKey
    ? listCatalogTargets().find((target) => target.key === article.relatedTargetKey)
    : undefined
  const relatedService = article.relatedServiceSlug ? getService(article.relatedServiceSlug) : undefined
  const more = listPublishedArticles(gameSlug).filter((item) => item.slug !== article.slug)

  return (
    <article>
      <PageBreadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/learn" },
          { name: game.name, path: `/learn/${gameSlug}` },
          { name: article.title, path: `/learn/${gameSlug}/${slug}` },
        ]}
      />
      {article.status === "published" ? (
        <PageJsonLd
          data={articleSchema({
            title: article.title,
            description: article.excerpt,
            path: `/learn/${gameSlug}/${slug}`,
            authorName: author?.displayName ?? article.authorHandle,
            authorPath: `/guides/${article.authorHandle}`,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
            image: article.imageSrc,
          })}
        />
      ) : null}
      <Section>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {game.name}
          {article.status !== "published" ? " · Draft" : null}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{article.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          By{" "}
          <Link href={`/guides/${article.authorHandle}`} className="underline-offset-4 hover:underline">
            {author?.displayName ?? article.authorHandle}
          </Link>
          {" · "}
          Updated {article.dateModified}
        </p>
        <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            unoptimized={article.imageSrc.endsWith(".svg")}
            className="object-cover"
          />
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <Card className="mx-auto mt-10 max-w-3xl">
          <CardHeader>
            <CardTitle>Need a hand? Book a {game.name} session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>A Guide joins your game on their own account. No password. No boosting login.</p>
            {relatedTarget ? (
              <Link href={relatedTarget.href} className={cn(buttonVariants(), "inline-flex")}>
                Book {relatedTarget.name} help
              </Link>
            ) : relatedService ? (
              <Link href={`/services/${relatedService.slug}`} className={cn(buttonVariants(), "inline-flex")}>
                Book {relatedService.name}
              </Link>
            ) : (
              <Link href={`/${gameSlug}`} className={cn(buttonVariants(), "inline-flex")}>
                Book {game.name}
              </Link>
            )}
          </CardContent>
        </Card>
        {more.length > 0 ? (
          <div className="mx-auto mt-10 max-w-3xl text-sm">
            <p className="font-medium">More from this game</p>
            <ul className="mt-2 space-y-1">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link href={`/learn/${item.gameSlug}/${item.slug}`} className="underline-offset-4 hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {game.legalNotice ? <LegalNotice notice={game.legalNotice} className="mt-8" /> : null}
      </Section>
    </article>
  )
}
