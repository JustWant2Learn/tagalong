import type { HelpArticle } from "./types"

export const helpArticles: HelpArticle[] = [
  {
    slug: "booking",
    title: "How booking works",
    audience: "customer",
    summary: "Pick a game, a service, a time, and pay. Matching happens next.",
    sections: [
      {
        heading: "The short version",
        body: "Choose a game and service, add options (hours, raids, extra Guide, voice), pick a time in your timezone, choose any available Guide or a specific one, then pay. Connect info can be filled after payment.",
      },
      {
        heading: "Squad size",
        body: "ARC Raiders squads are 3. You plus at most 2 Guides. Valheim and Enshrouded allow larger parties; we still cap extra Guides to the game’s max squad size.",
      },
    ],
  },
  {
    slug: "joining-arc-raiders",
    title: "Joining in ARC Raiders",
    audience: "customer",
    summary: "Embark ID invites, platforms, and the crossplay checklist.",
    sections: [
      {
        heading: "Embark ID",
        body: "Share your Embark ID as name#tag. The assigned Guide sends a friend or party invite. Their Embark ID appears on the order once they accept.",
      },
      {
        heading: "Crossplay checklist",
        body: "If you and the Guide are on different platforms (Steam, Epic, PS5, Xbox), turn crossplay on in your ARC Raiders settings before the session. We match platform when we can.",
      },
      {
        heading: "Server region",
        body: "Tell us your preferred region so we can keep latency sane. Guides are often PH/SEA-based; we still book worldwide.",
      },
    ],
  },
  {
    slug: "joining-valheim",
    title: "Joining in Valheim",
    audience: "customer",
    summary: "Dedicated servers, join codes, and Steam invites.",
    sections: [
      {
        heading: "Three ways in",
        body: "Dedicated server IP:port + password, a crossplay join code (Xbox / Game Pass friendly), or a Steam friend invite to your hosted world.",
      },
    ],
  },
  {
    slug: "joining-enshrouded",
    title: "Joining in Enshrouded",
    audience: "customer",
    summary: "Guest passwords and hosted worlds.",
    sections: [
      {
        heading: "Dedicated server",
        body: "Share the address and the guest user-group password you created — not your admin password.",
      },
      {
        heading: "Hosted world",
        body: "Invite the Guide on Steam to the world you are hosting.",
      },
    ],
  },
  {
    slug: "crossplay",
    title: "Crossplay",
    audience: "both",
    summary: "When you need it, and when we match platform instead.",
    sections: [
      {
        heading: "We prefer the same platform",
        body: "Matching your platform avoids extra settings. If we cannot, we require you to confirm crossplay is enabled before Start session.",
      },
    ],
  },
  {
    slug: "chat",
    title: "Chat rules",
    audience: "both",
    summary: "Stay in-app. We block contact details and off-platform payments.",
    sections: [
      {
        heading: "What gets flagged",
        body: "Phone numbers, emails, PayPal / GCash / crypto handles, and social accounts. Those messages are replaced with a warning and admins are notified.",
      },
    ],
  },
  {
    slug: "raid-policy",
    title: "ARC Raiders raid policy",
    audience: "both",
    summary: "What counts as a used raid, wipes, and loot rules.",
    sections: [
      {
        heading: "What counts",
        body: "A raid is used when logged as extracted, or squad wiped with cause customer error or other squad. Guide error and Guide disconnect are replaced free. Aborted before deployment does not count.",
      },
      {
        heading: "Gear is never refunded",
        body: "Loot and items lost in any raid are not refundable. Guides do not supply gear. Bring your own loadout.",
      },
      {
        heading: "Loot etiquette",
        body: "Guides never take loot you have not explicitly given them in chat. Anything they pick up for you is handed over before the session ends.",
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refunds and cancellations",
    audience: "customer",
    summary: "Windows, credits, and what is never refunded.",
    sections: [
      {
        heading: "Cancel windows",
        body: "Free cancel more than 12 hours before start. 50% credit from 2–12 hours. No refund under 2 hours, except Guide no-shows and approved disputes.",
      },
    ],
  },
  {
    slug: "disputes",
    title: "Disputes",
    audience: "customer",
    summary: "48 hours after the session. Raid logs and screenshots are the evidence.",
    sections: [
      {
        heading: "How to open one",
        body: "On the order page, choose Dispute within 48 hours of the session ending. Funds stay pending until an admin decides: full refund, partial, replace raids, or release to the Guide.",
      },
    ],
  },
  {
    slug: "safety",
    title: "Safety and account sharing",
    audience: "both",
    summary: "The rule that makes us different from boosting sites.",
    sections: [
      {
        heading: "Own accounts only",
        body: "We never ask for or accept customer login credentials. Guides play on their own accounts. Report anyone who asks otherwise.",
      },
    ],
  },
  {
    slug: "guide-getting-paid",
    title: "Getting paid",
    audience: "guide",
    summary: "Pending, available, and payout batches.",
    sections: [
      {
        heading: "When earnings unlock",
        body: "After the customer confirms, or 48 hours with no dispute. Earnings then move to available and are paid in the next manual payout cycle (Wise, PayPal or GCash).",
      },
    ],
  },
  {
    slug: "guide-rules",
    title: "Guide rules",
    audience: "guide",
    summary: "Conduct, loot, and what gets you suspended.",
    sections: [
      {
        heading: "The non-negotiables",
        body: "No cheats, exploits or third-party tools. No griefing. No taking customer loot unless they give it in chat. No damaging their base. No teaming with other squads against the customer. No off-platform payments. 18+ only.",
      },
    ],
  },
  {
    slug: "guide-ratings",
    title: "Ratings",
    audience: "guide",
    summary: "Shown after 3 reviews. Only completed orders can rate.",
    sections: [
      {
        heading: "What customers see",
        body: "Average rating after 3 reviews, session count, and for ARC Raiders Guides an extraction rate from raids logged on the platform.",
      },
    ],
  },
  {
    slug: "logging-raids",
    title: "Logging raids",
    audience: "guide",
    summary: "Two taps. Map, outcome, optional screenshot.",
    sections: [
      {
        heading: "Outcomes",
        body: "extracted, squad_wiped, or aborted. If wiped, add a cause. That cause decides whether the raid credit is consumed or replaced free.",
      },
    ],
  },
]
