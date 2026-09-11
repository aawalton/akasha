import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const alchemy = {
  id: "01a05fcf-f7ba-7dbe-b214-607b88f60215",
  type: "temper-item-category-tree",
  slug: "alchemy",
  title: "Alchemy",
  parent: "crafting",
  displayOrder: 5,
} as const satisfies TemperItemCategoryTree
