export type SeoCopy = {
  intro: string
  body: string
  imageSrc: string
  imageAlt: string
  prep?: string[]
  difficulty?: string
  typicalMinutes?: number
}

const VALUE = "No account sharing. Guides join on their own accounts."

export const gameSeoCopy: Record<string, SeoCopy> = {
  "arc-raiders": {
    intro:
      "Book a real Raider to squad up with you for extracts, quests, farms or a quieter third. They join your raid on their own account.",
    body: `ARC Raiders punishes solo greed. A second headset in the raid changes how you rotate, when you fight, and whether you leave with the quest item. Tagalong Guides play on their own accounts and join through a normal Embark invite — ${VALUE}

Bring your own loadout. Gear lost in a wipe is never refunded, and we will not promise a blueprint. What you buy is a calmer route, someone who has extracted the map this week, and a voice that tells you when to drop loot and leave. Escorts are priced per raid. Farming and open play-with time are hourly. New Raiders can book a two-hour onboarding that covers extracts, audio cues and inventory habits.

If you want a named player, pick them on the directory. If you want the next available, the job board takes the first eligible Guide. Either way, they never ask for your password.`,
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders raid artwork used to illustrate play-with squads",
  },
  valheim: {
    intro:
      "Book a Viking to help with a boss, a new biome, or a hall you actually want to live in. They join your world — never your login.",
    body: `Valheim bosses are less about a single mechanic and more about showing up prepared: food, resist mead, a clean arena, and a portal home. A Guide who has killed Bonemass this month will check those things before you pull. ${VALUE}

Biome escorts are for the nights you keep dying on the way to the next resource. Base sessions are slower on purpose — portals, defenses, a kitchen that works. We do not restore backups mid-build unless you stop the session first. Share a dedicated server, a join code, or a Steam invite. That is all we need.`,
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim landscape artwork used to illustrate co-op boss and biome sessions",
  },
  enshrouded: {
    intro:
      "Book a Flameborn for the next region, an Elixir Well, or a crafter hall. Guides join as guests on their own accounts.",
    body: `Enshrouded opens up when someone else is watching the shroud timer with you. Elixir Wells and Fell fights go faster with a second flame and a plan for the exit. ${VALUE}

Share a dedicated server plus guest password, or invite them to the world you are hosting. They will not take over your build or move your flame altar without asking. Region pushes are billed as escorts. Wells and named fights are fixed-price assists.`,
    imageSrc: "/games/enshrouded.jpg",
    imageAlt: "Enshrouded artwork used to illustrate Elixir Well and biome escorts",
  },
  minecraft: {
    intro:
      "Book a player for your Java or Bedrock world — survival, builds, farms, bosses or a supervised Family Session. They join your world on their own account.",
    body: `Minecraft sessions only work if edition, version and join method match. Java and Bedrock cannot play together unless you run a bridge; we match the edition you book. We do not host servers. You bring a Realm, a server, a friend world or a Java hosting mod. ${VALUE}

Build and farm work needs a world backup first. Hardcore deaths end the run and billed time stays charged. Family Sessions are the only way a minor can be in a session: an adult booker stays in-game, chat stays text-only inside the app, and only youth-cleared Guides can accept.

NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.`,
    imageSrc: "/games/minecraft.svg",
    imageAlt: "Original voxel landscape illustration for Minecraft play-with sessions",
  },
}

export const targetSeoCopy: Record<string, SeoCopy> = {
  "arc-raiders/maps/buried-city": {
    intro:
      "Book an extraction escort or map tour for Buried City. A Guide joins your raid on their own account and runs a quieter route with you.",
    body: `Buried City is tight streets, interior loot, and extracts that punish lingering. Players who queue it solo often die to audio they did not place — a door, a third squad on the roof, a late rotate when the timer is already loud. A play-with escort does not delete that risk. It gives you someone who has extracted the map this week and will say when to leave a crate on the floor.

Prep is simple: bring a kit you can afford to lose, share your Embark ID, and say whether you care more about the quest item or a full bag. The Guide will not drop you guns. They join as a squadmate. If a wipe is their disconnect or a clear route error, that raid is replaced. If you greed a fight after they call extract, the raid counts.

Typical escort length is one raid, about 25–40 minutes in the instance. Map tours are longer and talk more — loot rooms, roof lines, which extracts feel safer on your server region. Either way you stay at the keyboard. No account sharing, no remote access, no guaranteed blueprint.

After the session you should know two rotates you can run without a Guide. That is the point of paying a person instead of watching a video: they correct the habit while the raid is still live.`,
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders artwork illustrating a Buried City extraction escort",
    prep: ["Own loadout you can lose", "Embark ID ready", "Crossplay on if platforms differ"],
    difficulty: "High third-party pressure",
    typicalMinutes: 40,
  },
  "arc-raiders/maps/dam-battlegrounds": {
    intro:
      "Book Dam Battlegrounds help for an extract, a quest step, or a map tour. The Guide squads up on their own account.",
    body: `Dam Battlegrounds is open sightlines and long rotates. New Raiders bleed kits here because they treat every crate as mandatory. A Guide on an escort will pick a side of the dam, call when a fight is not yours, and keep the extract as the actual objective.

You still bring the kit. You still lose it if the raid goes wrong. What you buy is a second set of eyes and a player who has run the map enough to know which buildings are bait. Typical raid time is half an hour. Tours stretch that so you can learn the extracts by walking them instead of reading a list.

Share Embark ID. Enable crossplay if you are not on the same platform. Do not send a password. If you want the quest item more than loot, say that in the booking notes so the Guide does not linger in a contested room.

After two escorted raids you should be able to name your preferred side of the dam and the extract you will actually commit to. That is the skill that sticks when you queue alone later. If you would rather walk the map without a timer, book a map tour on the same page instead of an escort.`,
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders artwork illustrating Dam Battlegrounds squad play",
    prep: ["Budget loadout", "Quest notes if you have them", "Preferred extract side if you have one"],
    difficulty: "Open map, frequent third parties",
    typicalMinutes: 35,
  },
  "arc-raiders/maps/pendola-pass": {
    intro:
      "Book Pendola Pass help for Frozen Trail routes and extracts. A Guide joins your squad on their own account.",
    body: `Pendola Pass is the map people book when the Frozen Trail event is live and the new rooms are still unfamiliar. Flash-freeze timing and tighter extracts make it a poor place to learn alone. A Guide who has been running the pass will treat the event objective as the raid plan, not a side activity you remember at the door.

Escorts here cost a little more than the older maps because the instance is meaner and the event traffic is higher. You still bring your own kit. Lost gear is not refunded. Event assists can be booked as a hunt if you want a named ARC, or as a Frozen Trail squad if you want the seasonal route.

Tell us your server region. Latency on a new map is the difference between a clean extract and a late swing. The Guide never logs into your account and never promises the event drop.

If the event objective moved this week, write the current name in the order notes. Seasonal rooms change faster than this page. The Guide will confirm the live objective before ready-up so you are not running last patch’s loop. Bring a kit you can lose twice; event maps eat extras.`,
    imageSrc: "/games/arc-raiders.jpg",
    imageAlt: "ARC Raiders artwork illustrating Pendola Pass Frozen Trail escorts",
    prep: ["Event objective written down", "Region preference", "Kit you can lose"],
    difficulty: "Event traffic, harsh weather",
    typicalMinutes: 40,
  },
  "valheim/bosses/bonemass": {
    intro:
      "Book Bonemass help in Valheim. A Guide joins your world, checks food and poison resist, then fights with you.",
    body: `Bonemass is the swamp tax. People fail it because they walk in with the wrong food, no poison resist, and an arena that still has water and blobs in the corners. A Tagalong Guide will not skip that prep. The session starts with a look at your mead, your rest bonus, and whether the altar platform is actually dry.

Iron is useful. A blunt weapon is useful. A clean kiting ring is more useful than another stack of arrows you will panic-fire into the fog. The Guide plays on their own account and joins through your server, join code, or Steam invite. They will not take your character, and they will not “win the fight for you” from your keyboard.

If the first pull goes badly you still have the rest of the booked time to reset food and try again. Fixed boss assists include a free retry within seven days if the objective is not completed, or a 50% refund — your choice. Back up the world if you care about the nearby portal. After a kill, a good session portals home and banks the trophy instead of wandering into a crypt “real quick.”

Read the checklist on How to beat Bonemass if you want the prep in writing first. Then book the assist when you want a second Viking in the fog who will say when to drink and when to reset.`,
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim artwork illustrating a Bonemass boss assist",
    prep: ["Poison resist mead", "Swamp-tier food", "Dry arena and a portal home"],
    difficulty: "Poison and adds",
    typicalMinutes: 75,
  },
  "valheim/bosses/the-elder": {
    intro:
      "Book The Elder help in Valheim. A Guide joins your world, checks the fire arena, and fights with you.",
    body: `The Elder is the first boss that punishes a messy pull. Roots, fire, and a runebreaker who stands in the stumps will wipe a two-person group that still thinks Eikthyr rules apply. A Guide will ask whether you have a fire pit plan, whether the surrounding trees are already down, and whether you brought resist or just more wood arrows.

This is a good first boss-assist booking if you have never hired a player before. The fight is readable, the join methods are simple, and you will see how Tagalong works: they arrive on their own Viking, they do not touch your login, and they leave when the trophy is banked.

Typical time is about an hour including the walk from your portal. If you want the Black Forest escort as well, book the biome service separately so the boss clock stays on the altar.

Bring extra wood and a stack of food you can eat after a wipe. The Elder is a short fight when the arena is honest and a long night when it is not. A Guide will spend the first minutes on that honesty, then pull. Tell them if this is your first Elder so they do not skip the fire talk.`,
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim artwork illustrating The Elder boss fight with a Guide",
    prep: ["Finewood bow or better", "Clear trees around the altar", "Fire plan"],
    difficulty: "First real raid boss",
    typicalMinutes: 60,
  },
  "valheim/bosses/fader": {
    intro:
      "Book Fader help in the Ashlands. A Guide joins your world, checks the arena, and fights with you.",
    body: `Fader is late-game Valheim. If your Ashlands portal is a hope and a prayer, do not book this as your first session — book an Ashlands escort first and come back. A Fader assist assumes you can reach the altar without losing the cart, and that you understand the fight can still fail after a good prep.

The Guide will want to see your food, your flametal gear plan, and whether the arena has a place to reset. They join on their own character. They will not remote into your PC. They will not restore a death if you did not back the world up.

This is a longer, more expensive assist because the run-in is part of the work. Say in the notes if you already have the spawn cleared. That saves the first twenty minutes for the pull instead of the walk.

If you have never seen the Ashlands, book the biome escort first. Showing up undergeared wastes a Fader slot and your money. We would rather take the slower booking than fake a kill you cannot reach. Confirm a world backup and a portal you can actually use after a wipe.`,
    imageSrc: "/games/valheim.jpg",
    imageAlt: "Valheim artwork illustrating a late-game Fader assist",
    prep: ["Ashlands-ready food and armor", "Stable portal", "World backup"],
    difficulty: "Late game",
    typicalMinutes: 90,
  },
  "minecraft/farms/iron-farm": {
    intro:
      "Book an iron farm build on your Java or Bedrock world. The Guide designs for your edition and builds with you after you confirm a backup.",
    body: `Java and Bedrock iron farms are not the same machine. Village mechanics, golem spawn rules and redstone timing differ, so a design copied from the wrong edition wastes a session. Tell us your edition and version when you book. The Guide approved for that edition shows up on their own account and builds in your world — they never need your login.

You supply the materials or add Bring materials, which is billed hourly on top. Confirm the world backup before start. If something looks wrong, we stop and talk; we do not “fix it in creative” unless you ask to change the rules of the session.

A basic iron farm is a mid-tier job: villagers, workstations, a kill chamber that does not murder your frames. Complex trading halls are a different service line. After the session you should have a farm you can explain, not a black box you are afraid to touch. We are not an official Minecraft product and we are not associated with Mojang or Microsoft.

If villagers break after you log out, that is usually a bed or workstation move, not grief. Write the farm location in chat before the Guide leaves so you can find it again. Screenshots help if a dispute ever needs them.`,
    imageSrc: "/games/minecraft.svg",
    imageAlt: "Original voxel illustration for a Minecraft iron farm session",
    prep: ["World backup", "Edition and version", "Iron farm materials or Bring materials add-on"],
    difficulty: "Edition-specific redstone",
    typicalMinutes: 90,
  },
  "minecraft/bosses/ender-dragon": {
    intro:
      "Book Ender Dragon help. A Guide joins your Java or Bedrock world, helps prep, then fights the dragon with you.",
    body: `The dragon fight is a logistics problem disguised as a boss. Beds, slow falling, a way back through the portal, and a plan for crystals matter more than a sharp sword. A Guide will check those things and then stay in the fight with you. They join your server, Realm or hosted world on their own account.

Say whether this is a first kill or a farm reset. First kills need more prep talk. Resets can be tighter if you already have gear. We do not fly the dragon for you from your client. You stay at the keyboard. If you want End cities after the kill, book the Nether & End escort so the dragon assist stays on the island.

Back up the world. Dragon fights are messy. Character death on a hardcore world is a different service and is not refundable. Family Sessions cannot add voice. Standard dragon assists can.

If this is a first kill, say so. The Guide will spend more time on crystal order and less time on speed. If you already have elytra, say that too so the session does not turn into an End city tour you did not book. Beds, blocks and a way home still matter more than a named sword.`,
    imageSrc: "/games/minecraft.svg",
    imageAlt: "Original voxel illustration for a Minecraft Ender Dragon assist",
    prep: ["Beds or crystals plan", "Slow falling if you have it", "World backup"],
    difficulty: "Prep-heavy first kill",
    typicalMinutes: 75,
  },
  "enshrouded/events/elixir-well-kindlewastes": {
    intro:
      "Book Kindlewastes Elixir Well help. A Guide joins your world as a guest and runs the well with you.",
    body: `Kindlewastes wells are where Enshrouded groups start to wipe on the timer instead of the boss. Flame management, the exit, and not greed-looting while the shroud closes are the whole job. A Guide who has cleared this well will set a flame plan with you and treat the extract from the well as part of the objective.

They join as a guest — dedicated server plus password, or a friend invite to your hosted world. They will not move your flame altar. They will not take materials you did not offer. If the well fails because of a Guide mistake, you get the fixed-service choice: retry in seven days or half back.

Bring the region-appropriate flasks and tell us if this is your first well in the wastes. First wells take longer because the walk in is the scary part.

Write your join method on the order: server plus guest password, or a friend invite. Enshrouded guests who cannot enter waste the first ten minutes. The Guide will not move your altar to “make it easier” unless you ask in chat. Say if this is your first Kindlewastes well so they pace the walk, not just the boss.`,
    imageSrc: "/games/enshrouded.jpg",
    imageAlt: "Enshrouded artwork illustrating a Kindlewastes Elixir Well",
    prep: ["Kindlewastes-ready flasks", "Join method ready", "Flame checkpoint plan"],
    difficulty: "Late-region timer fight",
    typicalMinutes: 80,
  },
}

export const serviceSeoCopy: Record<string, { intro: string; body: string }> = {
  "arc-raiders-safe-extraction": {
    intro:
      "Book an ARC Raiders extraction escort. A Guide squads up on their own account and covers the extract with you.",
    body: `Pick the map. Pay per raid or buy a pack. You bring the kit; they bring the route. Lost loot is never refunded. Guide-error wipes are replaced. That is the whole product — a real player in your raid, not someone on your account.`,
  },
  "minecraft-build-together": {
    intro:
      "Book a Minecraft build session. The Guide builds with you in your world after you confirm a backup.",
    body: `Pick a style tag and an edition. The Guide matches Java or Bedrock and never needs your login. We do not supply official schematics. We do not grief. If you want farms instead of houses, book Farm & Redstone.`,
  },
}
