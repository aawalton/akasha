import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionWeapons = {
  id: "01a05fcf-f7d1-7709-8027-add43b0b6546",
  type: "page-type/temper-item-category-tree",
  slug: "companion-weapons",
  title: "Weapons",
  parent: "temper-item-category-tree/companion",
  displayOrder: 0,
  traitTypeRange: [34, 42],
} as const satisfies TemperItemCategoryTree
