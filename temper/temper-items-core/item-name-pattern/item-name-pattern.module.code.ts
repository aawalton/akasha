interface NameToken {
  text: string
  negated: boolean
}

function parseItemNamePattern(pattern: string): readonly NameToken[] {
  const tokens: NameToken[] = []
  let i = 0
  const len = pattern.length

  while (i < len) {
    if (pattern[i] === " ") {
      i++
      continue
    }

    let negated = false
    if (pattern[i] === "-") {
      negated = true
      i++
      if (i >= len) break
    }

    if (pattern[i] === '"') {
      i++
      const start = i
      while (i < len && pattern[i] !== '"') {
        i++
      }
      const text = pattern.slice(start, i)
      if (i < len) i++
      if (text.length > 0) tokens.push({ text, negated })
      continue
    }

    const start = i
    while (i < len && pattern[i] !== " ") {
      i++
    }
    const text = pattern.slice(start, i)
    if (text.length > 0) tokens.push({ text, negated })
  }

  return tokens
}

export function itemNameMatchesPattern(itemName: string, pattern: string): boolean {
  const tokens = parseItemNamePattern(pattern)
  if (tokens.length === 0) return true
  const lowerName = itemName.toLowerCase()
  return tokens.every((t) => {
    const found = lowerName.includes(t.text.toLowerCase())
    return t.negated ? !found : found
  })
}
