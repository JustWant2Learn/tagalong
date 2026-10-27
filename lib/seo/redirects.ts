export type SeoRedirect = {
  source: string
  destination: string
  permanent: true
}

/**
 * Permanent moves only. Existing public URLs stay put until you approve a rename:
 * - people directory remains `/guides` and `/guides/[handle]`
 * - services remain `/services/[slug]`
 * Content hub lives at `/learn` so it does not collide with people profiles.
 */
export const permanentRedirects: SeoRedirect[] = [
  {
    source: "/raid-policy",
    destination: "/refunds#raid-policy",
    permanent: true,
  },
  {
    source: "/youth-safety-rules",
    destination: "/youth-safety",
    permanent: true,
  },
]
