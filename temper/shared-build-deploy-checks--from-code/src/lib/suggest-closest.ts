// Duplicated from @infra/checks, which is leaving this repository.
//
// The temper build-deploy checks read temper addon source, which stays here, so these
// checks stay here too and need these helpers where they can reach them. The instructions
// repo already carries its own equivalents (tools/lib/parse-args.ts, suggest-closest.ts,
// check-workflow/error-message.ts, code-root.ts), so nothing is shared across the seam:
// each side holds the copy it reads.

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  const prev: number[] = new Array(b.length + 1)
  const curr: number[] = new Array(b.length + 1)
  for (let j = 0; j <= b.length; j++) prev[j] = j
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      const del = (prev[j] ?? 0) + 1
      const ins = (curr[j - 1] ?? 0) + 1
      const sub = (prev[j - 1] ?? 0) + cost
      curr[j] = Math.min(del, ins, sub)
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j] ?? 0
  }
  return prev[b.length] ?? 0
}

export function suggestClosest(
  input: string,
  candidates: readonly string[],
  maxDistance: number
): string | undefined {
  let best: { name: string; distance: number } | undefined
  for (const candidate of candidates) {
    const distance = levenshtein(input, candidate)
    if (distance > maxDistance) continue
    if (best === undefined || distance < best.distance) best = { name: candidate, distance }
  }
  return best?.name
}
