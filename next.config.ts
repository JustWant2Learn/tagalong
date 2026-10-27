import { createRequire } from "node:module"

import type { NextConfig } from "next"

import { permanentRedirects } from "./lib/seo/redirects"

const require = createRequire(import.meta.url)

const nextConfig: NextConfig = {
  trailingSlash: false,
  redirects: async () => permanentRedirects,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: [require.resolve("@tailwindcss/turbopack")],
        as: "*.css",
      },
    },
  },
}

export default nextConfig;
