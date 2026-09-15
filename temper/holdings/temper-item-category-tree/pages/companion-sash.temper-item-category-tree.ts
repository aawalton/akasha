import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionSash = {
  id: "01a05fcf-f7d0-7e3f-8675-9e6789b7f388",
  type: "page-type/temper-item-category-tree",
  slug: "companion-sash",
  title: "Sash",
  parent: "companion-light",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
