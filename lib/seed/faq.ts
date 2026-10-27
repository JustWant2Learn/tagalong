import type { FaqItem } from "./types"

export const faqs: FaqItem[] = [
  {
    id: "login",
    question: "Do you need my account login?",
    answer:
      "No. Never. Guides always play on their own accounts and join you through normal multiplayer — a squad invite, join code, or your server. We will never ask for your password. If anyone does, report it.",
  },
  {
    id: "join",
    question: "How does the Guide join me?",
    answer:
      "It depends on the game. For ARC Raiders, you share your Embark ID (name#tag) and the Guide sends a friend or party invite. For Valheim, you share a dedicated server, a crossplay join code, or add the Guide on Steam. For Enshrouded, you share a dedicated server plus guest password, or invite them to your hosted world.",
  },
  {
    id: "no-server",
    question: "What if I don't have a dedicated server (Valheim / Enshrouded)?",
    answer:
      "You don't need one. Valheim supports crossplay join codes and Steam invites. Enshrouded supports Steam friend invites to a hosted world. Dedicated servers are optional and often nicer for latency.",
  },
  {
    id: "wipe",
    question: "What if we die in a raid and I lose my gear?",
    answer:
      "Gear and loot lost in a raid are not refundable — that is the raid policy. You always bring your own loadout. If the wipe was caused by a Guide error or a Guide disconnect, that raid is replaced for free and does not consume a raid credit.",
    games: ["arc-raiders"],
  },
  {
    id: "blueprint",
    question: "Can you guarantee a specific blueprint or item?",
    answer:
      "No. Farming and blueprint services are billed by time. We run the right rooms with you; drops stay RNG. We will not sell you a guaranteed drop.",
  },
  {
    id: "crossplay",
    question: "Do I need crossplay on?",
    answer:
      "Only if your Guide is on another platform. We match platform when we can. If the match is cross-platform, we ask you to confirm crossplay is enabled before the session starts.",
  },
  {
    id: "pick-guide",
    question: "Can I pick my Guide?",
    answer:
      "Yes. Choose a specific Guide for a small surcharge, or pick “Any available” and the first eligible Guide on the job board accepts. Specific requests auto-release to the board if they are not accepted in time.",
  },
  {
    id: "no-show",
    question: "What if the Guide doesn't show up?",
    answer:
      "If they have not started within 15 minutes of the scheduled time, you can mark a no-show. You get a full refund or a free rebook. The Guide receives a strike; three strikes pause their account for review.",
  },
  {
    id: "boss-fail",
    question: "What if we don't beat the boss?",
    answer:
      "For fixed boss or objective services, you choose: one free retry session within 7 days, or a 50% refund.",
  },
  {
    id: "voice",
    question: "Can I talk on voice?",
    answer:
      "Yes. Voice is optional. You can prefer voice, stay text-only, or use Discord as an extra. In-app chat is always available. We block contact details and off-platform payment requests.",
  },
  {
    id: "timezones",
    question: "What timezones and server regions do you cover?",
    answer:
      "Guides are primarily based in the Philippines and Southeast Asia, with coverage across US, EU and Oceania hours. You book in your timezone. We also match preferred server regions for latency, especially on ARC Raiders.",
  },
  {
    id: "allowed",
    question: "Is this allowed by the game?",
    answer:
      "Playing in a squad or world with another player is normal multiplayer. We do not share accounts, use cheats, exploits or third-party tools. We are not affiliated with the game publishers.",
  },
  {
    id: "refunds",
    question: "How do refunds work?",
    answer:
      "Free cancel more than 12 hours before start. 50% store credit between 2 and 12 hours. No refund under 2 hours, except Guide no-shows and approved disputes. Raid gear loss is never refunded. See the refunds page for the full policy.",
  },
]

export const gameFaqs: Record<string, FaqItem[]> = {
  "arc-raiders": [
    faqs[0],
    {
      id: "embark",
      question: "What is an Embark ID and how do invites work?",
      answer:
        "Your Embark ID is name#tag. After you book, you share it on the order (encrypted, visible only to assigned Guides). The Guide sends a friend or party invite — or you invite them using the Embark ID shown on the order. We never need your Embark password.",
    },
    faqs[5],
    faqs[3],
    faqs[4],
    faqs[11],
  ],
  valheim: [
    faqs[0],
    faqs[1],
    faqs[2],
    faqs[8],
    faqs[11],
  ],
  enshrouded: [
    faqs[0],
    faqs[1],
    faqs[2],
    faqs[8],
    faqs[11],
  ],
}
