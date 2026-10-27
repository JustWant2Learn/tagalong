# Off-site SEO playbook

Code cannot rank the site by itself. Use this list weekly. Do not buy links, run PBNs, fake reviews, gate reviews, or scrape competitor guides.

## Search consoles

1. Verify Google Search Console and Bing Webmaster Tools with the env meta tags (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
2. Submit `https://tagalong.gg/sitemap.xml`.
3. Once a week: coverage, queries, and pages that jumped or dropped. Note the landing page → `/app/book` conversion in analytics.

## IndexNow

Set `INDEXNOW_KEY` and host `/{key}.txt` when a catalog row or article is published. Ping on publish and on material edits (boss patches, map changes).

## Community

- Answer real questions in game subreddits and Discords. Follow each community’s self-promo rules. One honest “I take play-with sessions on Tagalong” in a relevant thread beats ten identical comments.
- Never drop links in LFG channels that ban services.

## Video

Short clips from real sessions only, with customer consent. Link the game hub, not a thin target page, until that target passes the quality gate.

## Links you can ask for

- Guest boss or map write-ups on small gaming blogs, with original screenshots.
- Listings in directories that accept marketplaces.
- Creator mentions when a streamer actually booked a session.
- Digital PR around patch notes or player-count posts you researched yourself.

## Tracking

Keep a sheet of primary keywords from `/lib/seo/keywords.ts`. Check ranks weekly. After each major patch, refresh the matching article and bump `dateModified`.

## Forbidden

Buying links, PBNs, fake reviews, review gating (“review us for a discount, but only if it’s 5 stars”), cloaking, doorway pages, scraped or spun content.
