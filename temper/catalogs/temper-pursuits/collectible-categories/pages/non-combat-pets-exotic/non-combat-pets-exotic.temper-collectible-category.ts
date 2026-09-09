import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const nonCombatPetsExotic = {
  id: "01a06165-916a-700c-8260-c4e511ae3051",
  pageTypeSlug: "temper-collectible-category",
  slug: "non-combat-pets-exotic",
  title: "Exotic",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
