import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Section } from "@/components/marketing/section"
import { getHelpArticle, listHelpArticles } from "@/lib/catalog"

export const instant = false

export function generateStaticParams() {
  return listHelpArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getHelpArticle(slug)
  if (!article) return {}
  return { title: article.title, description: article.summary }
}

export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getHelpArticle(slug)
  if (!article) notFound()

  return (
    <Section>
      <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
        ← Help center
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">{article.audience}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{article.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{article.summary}</p>
      <div className="mt-8 max-w-3xl space-y-6">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl">{section.heading}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </Section>
  )
}
