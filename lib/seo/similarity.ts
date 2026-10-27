function shingles(text: string, size = 5) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean)
  const grams = new Set<string>()
  for (let i = 0; i <= words.length - size; i += 1) {
    grams.add(words.slice(i, i + size).join(" "))
  }
  return grams
}

export function jaccardSimilarity(a: string, b: string) {
  const left = shingles(a)
  const right = shingles(b)
  if (left.size === 0 || right.size === 0) return 0
  let intersection = 0
  for (const gram of left) {
    if (right.has(gram)) intersection += 1
  }
  return intersection / (left.size + right.size - intersection)
}

export function findNearDuplicates(pages: { path: string; text: string; indexable: boolean }[], threshold = 0.7) {
  const flagged: { a: string; b: string; score: number }[] = []
  for (let i = 0; i < pages.length; i += 1) {
    for (let j = i + 1; j < pages.length; j += 1) {
      if (!pages[i].indexable || !pages[j].indexable) continue
      const score = jaccardSimilarity(pages[i].text, pages[j].text)
      if (score > threshold) flagged.push({ a: pages[i].path, b: pages[j].path, score })
    }
  }
  return flagged
}
