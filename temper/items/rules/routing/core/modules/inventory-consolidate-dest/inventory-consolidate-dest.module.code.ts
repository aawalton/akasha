export function isConsolidateDest(destination: string | undefined): boolean {
  if (destination === undefined) return false
  return (
    destination === "furniture-vault" ||
    destination === "guild-bank" ||
    destination.startsWith("guild-bank:") ||
    destination === "house-storage" ||
    destination.startsWith("house-storage:")
  )
}

export function isStorageCarrierMove(
  destination: string | undefined,
  fromSharedStorage: boolean
): boolean {
  if (isConsolidateDest(destination)) return true
  return fromSharedStorage && destination === "bank"
}

export function storageCarrierOf(
  characterPriority: readonly string[] | undefined
): string | undefined {
  return characterPriority?.[0]
}
