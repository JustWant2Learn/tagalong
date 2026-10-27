import type { NextConfig } from "next";

import { permanentRedirects } from "./lib/seo/redirects";

const nextConfig: NextConfig = {
  trailingSlash: false,
  redirects: async () => permanentRedirects,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
