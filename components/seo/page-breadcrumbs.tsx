import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PageJsonLd } from "@/components/seo/page-json-ld"
import { breadcrumbSchema } from "@/lib/seo/schema"

export type Crumb = { name: string; path: string }

export function PageBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="border-b border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <span key={item.path} className="contents">
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {index === items.length - 1 ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={item.path} />}>{item.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PageJsonLd data={breadcrumbSchema(items)} />
    </div>
  )
}
