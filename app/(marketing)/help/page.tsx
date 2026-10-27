import type { Metadata } from "next"
import Link from "next/link"

import { Section, SectionHeading } from "@/components/marketing/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listHelpArticles } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Help center",
  description: "Booking, joining, raid policy, refunds, disputes, and Guide operations.",
}

export default function HelpIndexPage() {
  const customer = listHelpArticles("customer")
  const guide = listHelpArticles("guide")

  return (
    <Section>
      <SectionHeading
        eyebrow="Help"
        title="Answers before you need support"
        description="MDX articles will replace this skeleton in a later polish pass. The topics are the ones we actually operate on."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>For customers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {customer.map((article) => (
              <Link key={article.slug} href={`/help/${article.slug}`} className="block hover:underline">
                <p className="font-medium">{article.title}</p>
                <p className="text-muted-foreground">{article.summary}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Guides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {guide.map((article) => (
              <Link key={article.slug} href={`/help/${article.slug}`} className="block hover:underline">
                <p className="font-medium">{article.title}</p>
                <p className="text-muted-foreground">{article.summary}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
