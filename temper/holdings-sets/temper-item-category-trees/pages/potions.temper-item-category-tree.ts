import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const potions = {
  id: "01a05fcf-f831-7324-a22d-c91221d0b896",
  type: "temper-item-category-tree",
  slug: "potions",
  title: "Potions",
  parent: "consumables",
  displayOrder: 2,
  itemTypes: [7],
} as const satisfies TemperItemCategoryTree
