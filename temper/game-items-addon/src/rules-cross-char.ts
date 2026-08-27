export const CHARACTER_DESTINATION_PREFIX = "character:"

export function isVendorCrossCharDestination(destination: string | undefined): boolean {
  if (destination === undefined) return false
  if (
    destination.substring(0, CHARACTER_DESTINATION_PREFIX.length) !== CHARACTER_DESTINATION_PREFIX
  ) {
    return false
  }
  const charId = destination.substring(CHARACTER_DESTINATION_PREFIX.length)
  return charId !== tostring(GetCurrentCharacterId())
}
