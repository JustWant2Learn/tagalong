import type { MetadataRoute } from "next"

import { brand } from "@/lib/brand"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app/", "/guide/", "/admin/", "/login", "/signup", "/reset-password"],
    },
    sitemap: `${brand.url}/sitemap.xml`,
  }
}
