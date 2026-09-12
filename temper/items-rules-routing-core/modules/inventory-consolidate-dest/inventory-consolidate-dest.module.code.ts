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
