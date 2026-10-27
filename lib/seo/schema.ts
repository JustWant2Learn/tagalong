import type { Article, BreadcrumbList, Organization, Service, WebSite, WithContext } from "schema-dts"

import { brand } from "@/lib/brand"
import { absoluteUrl } from "@/lib/seo/site-url"

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.url,
    email: brand.supportEmail,
    sameAs: [brand.discordUrl, brand.twitterUrl],
    description: brand.description,
  }
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    publisher: { "@type": "Organization", name: brand.name, url: brand.url },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  path: string
  priceCents: number
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: { "@type": "Organization", name: brand.name, url: brand.url },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: (input.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(input.path),
    },
  }
}

export function articleSchema(input: {
  title: string
  description: string
  path: string
  authorName: string
  authorPath: string
  datePublished: string
  dateModified: string
  image: string
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    author: {
      "@type": "Person",
      name: input.authorName,
      url: absoluteUrl(input.authorPath),
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    image: absoluteUrl(input.image),
    mainEntityOfPage: absoluteUrl(input.path),
  }
}

export function schemaHasType(value: object, expected: string) {
  return "@type" in value && value["@type"] === expected
}
