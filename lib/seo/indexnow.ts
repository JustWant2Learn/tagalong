import { absoluteUrl } from "@/lib/seo/site-url"

export async function pingIndexNow(paths: string[]) {
  const key = process.env.INDEXNOW_KEY
  if (!key || paths.length === 0) return { skipped: true as const }
  const host = new URL(absoluteUrl("/")).host
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: absoluteUrl(`/${key}.txt`),
      urlList: paths.map((path) => absoluteUrl(path)),
    }),
  })
  return { skipped: false as const, ok: response.ok, status: response.status }
}
