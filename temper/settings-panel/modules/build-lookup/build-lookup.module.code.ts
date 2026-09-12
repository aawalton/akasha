export function buildLookup(this: void, choices: readonly string[]): Record<string, number> {
  const lookup: Record<string, number> = {}
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i]
    if (choice !== undefined) {
      lookup[choice] = i
    }
  }
  return lookup
}
