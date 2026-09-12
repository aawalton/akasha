export function charactersToPrune(
  storedCharacterIds: readonly string[],
  activeCharacterIds: readonly string[]
): string[] {
  if (activeCharacterIds.length === 0) return []

  const active = new Set<string>()
  for (const id of activeCharacterIds) active.add(id)

  const toPrune: string[] = []
  for (const id of storedCharacterIds) {
    if (!active.has(id)) toPrune.push(id)
  }
  return toPrune
}
