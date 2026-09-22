import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTorture = {
  id: "01a05fcf-f815-7351-a158-60d836038249",
  type: "page-type/temper-item-category-tree",
  slug: "furn-torture",
  title: "Torture",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 7,
  furnitureSubcategoryIds: [76],
} as const satisfies TemperItemCategoryTree
