import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionRobe = {
  id: "01a05fcf-f7cf-7d02-afe1-7f90381a8f4d",
  type: "page-type/temper-item-category-tree",
  slug: "companion-robe",
  title: "Robe / Jerkin",
  parent: "temper-item-category-tree/companion-light",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
