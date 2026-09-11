import type { TemperCollectibleCategory } from "akasha/temper/catalog/temper-pursuits/temper-collectible-categories/temper-collectible-category.page-type.types.ts"

export const weaponStylesStaff = {
  id: "01a06165-916b-7002-a618-6d51b5798506",
  type: "temper-collectible-category",
  slug: "weapon-styles-staff",
  title: "Staff",
  parent: "weapon-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
