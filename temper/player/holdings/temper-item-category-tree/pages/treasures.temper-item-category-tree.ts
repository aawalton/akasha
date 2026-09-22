import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const treasures = {
  id: "01a05fcf-f845-7933-abc7-8e6c499962c4",
  type: "page-type/temper-item-category-tree",
  slug: "treasures",
  title: "Treasures",
  parent: "temper-item-category-tree/miscellaneous",
  displayOrder: 4,
} as const satisfies TemperItemCategoryTree
