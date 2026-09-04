export interface ShoppingSettings {
  notAvailable: Record<string, number>
}

export function isShoppingSettings(value: unknown): value is ShoppingSettings {
  return (
    typeof value === "object" &&
    value !== null &&
    "notAvailable" in value &&
    typeof value.notAvailable === "object" &&
    value.notAvailable !== null
  )
}
