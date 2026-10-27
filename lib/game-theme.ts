export function gameAccentClass(slug: string): string {
  if (slug === "arc-raiders") return "game-arc"
  if (slug === "valheim") return "game-valheim"
  if (slug === "enshrouded") return "game-enshrouded"
  return "game-default"
}
