import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const nonCombatPetsInventory = {
  id: "01a06165-916a-700f-b6bb-8241d2fac6a2",
  type: "temper-collectible-category",
  slug: "non-combat-pets-inventory",
  title: "Inventory",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
