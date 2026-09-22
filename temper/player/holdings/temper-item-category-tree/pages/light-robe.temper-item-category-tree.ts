import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightRobe = {
  id: "01a05fcf-f828-7972-90e0-1f2bdb3e09c9",
  type: "page-type/temper-item-category-tree",
  slug: "light-robe",
  title: "Robe / Jerkin",
  parent: "temper-item-category-tree/light-armor",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
