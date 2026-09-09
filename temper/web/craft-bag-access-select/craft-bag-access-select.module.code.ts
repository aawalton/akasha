export type CraftBagAccessValue = "true" | "false" | "no-eso-plus-answer"

export function toCraftBagAccessValue(craftBagAccess: boolean | undefined): CraftBagAccessValue {
  if (craftBagAccess == null) return "no-eso-plus-answer"
  return craftBagAccess ? "true" : "false"
}

export function fromCraftBagAccessValue(value: CraftBagAccessValue): boolean | undefined {
  if (value === "no-eso-plus-answer") return undefined
  return value === "true"
}
