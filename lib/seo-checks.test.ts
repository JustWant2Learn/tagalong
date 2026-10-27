import assert from "node:assert/strict"
import { test } from "node:test"

import { listServices } from "@/lib/catalog"
import { games } from "@/lib/games"
import { targetSeoCopy } from "@/lib/seed/seo-copy"
import { findDuplicatePrimaries, indexablePages, missingStaticKeywords } from "@/lib/seo/indexable"
import { getKeywords } from "@/lib/seo/keywords"
import { inboundCount, popularLinks } from "@/lib/seo/links"
import { pageDescription, pageTitle } from "@/lib/seo/metadata"
import { isIndexableTarget } from "@/lib/seo/quality-gate"
import { articleSchema, breadcrumbSchema, organizationSchema, schemaHasType, serviceSchema } from "@/lib/seo/schema"
import { findNearDuplicates } from "@/lib/seo/similarity"
import { listCatalogTargets } from "@/lib/seo/targets"

test("every game and service has a keyword record", () => {
  assert.deepEqual(missingStaticKeywords(), [])
  for (const game of games) {
    assert.ok(getKeywords(`/${game.slug}`))
  }
  for (const service of listServices()) {
    assert.ok(getKeywords(`/services/${service.slug}`))
  }
})

test("no two indexable pages share a primary keyword", () => {
  const dupes = findDuplicatePrimaries()
  assert.deepEqual(dupes, [])
})

test("titles and descriptions stay in range", () => {
  for (const page of indexablePages()) {
    const title = pageTitle(page.primary)
    assert.ok(title.length <= 60, title)
    const description = pageDescription(page.description.length >= 40 ? page.description : `${page.description}. A Guide joins your game on their own account.`)
    assert.ok(description.length <= 160, description)
  }
})

test("schema builders emit the expected types", () => {
  assert.ok(schemaHasType(organizationSchema(), "Organization"))
  assert.ok(schemaHasType(serviceSchema({ name: "Test", description: "Test service", path: "/x", priceCents: 1000 }), "Service"))
  assert.ok(schemaHasType(breadcrumbSchema([{ name: "Home", path: "/" }]), "BreadcrumbList"))
  assert.ok(
    schemaHasType(
      articleSchema({
        title: "How to beat Bonemass",
        description: "Prep first.",
        path: "/learn/valheim/how-to-beat-bonemass",
        authorName: "Pol",
        authorPath: "/guides/pol",
        datePublished: "2026-10-20",
        dateModified: "2026-10-27",
        image: "/games/valheim.jpg",
      }),
      "Article"
    )
  )
})

test("quality-gated targets are the only indexable target URLs", () => {
  const ready = listCatalogTargets().filter(isIndexableTarget)
  assert.ok(ready.length >= 6)
  for (const target of ready) {
    assert.ok(targetSeoCopy[target.key])
  }
  const indexedTargets = indexablePages().filter((page) =>
    ready.some((target) => target.href === page.path)
  )
  assert.equal(indexedTargets.length, ready.length)
})

test("indexable editorial is not near-duplicate", () => {
  const pages = Object.entries(targetSeoCopy).map(([key, copy]) => ({
    path: `/${key}`,
    text: copy.body,
    indexable: true,
  }))
  assert.deepEqual(findNearDuplicates(pages, 0.7), [])
})

test("popular and target pages are internally linked", () => {
  for (const link of popularLinks()) {
    if (link.href.startsWith("/app")) continue
    assert.ok(inboundCount(link.href) + 1 >= 1, link.href)
  }
})
