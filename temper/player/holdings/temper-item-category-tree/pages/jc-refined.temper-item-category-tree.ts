import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const jcRefined = {
  id: "01a05fcf-f824-7c07-bce0-b96eb710f5f2",
  type: "page-type/temper-item-category-tree",
  slug: "jc-refined",
  title: "Refined Materials",
  parent: "temper-item-category-tree/jewelry-crafting",
  displayOrder: 2,
  itemTypes: [64],
} as const satisfies TemperItemCategoryTree
