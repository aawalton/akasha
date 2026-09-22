import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const jcPlatings = {
  id: "01a05fcf-f823-7b75-83f7-06d49c917372",
  type: "page-type/temper-item-category-tree",
  slug: "jc-platings",
  title: "Platings",
  parent: "temper-item-category-tree/jewelry-crafting",
  displayOrder: 3,
  itemTypes: [65],
} as const satisfies TemperItemCategoryTree
