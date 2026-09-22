import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const potions = {
  id: "01a05fcf-f831-7324-a22d-c91221d0b896",
  type: "page-type/temper-item-category-tree",
  slug: "potions",
  title: "Potions",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 2,
  itemTypes: [7],
} as const satisfies TemperItemCategoryTree
