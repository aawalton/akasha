const WORD_SEPARATOR = /[^\p{L}\p{N}]+/u

export const MINUTE_WORDS: readonly string[] = ["Sleep", "Rest"]

export const DAY_TURN_WORDS: readonly string[] = ["Sleep"]

function tokenize(value: string): readonly string[] {
  return value
    .toLowerCase()
    .split(WORD_SEPARATOR)
    .filter((token) => token !== "")
}

export function titleMatchesAnyWord(title: unknown, words: readonly unknown[]): boolean {
  if (typeof title !== "string") return false
  const titleTokens = new Set(tokenize(title))
  if (titleTokens.size === 0) return false
  for (const word of words) {
    if (typeof word !== "string") continue
    const wordTokens = tokenize(word)
    if (wordTokens.length === 0) continue
    if (wordTokens.every((token) => titleTokens.has(token))) return true
  }
  return false
}
