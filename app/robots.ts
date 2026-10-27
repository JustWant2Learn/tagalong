import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/seo/site-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/app/",
        "/guide/",
        "/admin/",
        "/api/",
        "/login",
        "/signup",
        "/reset-password",
        "/*?*edition=",
        "/*?*page=",
        "/*?*language=",
        "/*?*platform=",
      ],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  }
}
