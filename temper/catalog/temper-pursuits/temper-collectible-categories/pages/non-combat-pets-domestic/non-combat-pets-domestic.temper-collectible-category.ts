import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.types.ts"

export const nonCombatPetsDomestic = {
  id: "01a06165-916a-700b-9cd9-b1e9f4cca5b2",
  pageTypeSlug: "temper-collectible-category",
  type: "temper-collectible-category",
  slug: "non-combat-pets-domestic",
  title: "Domestic",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
