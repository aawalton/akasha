import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSupplies = {
  id: "01a05fcf-f811-7c9c-b926-726d129bfa29",
  type: "page-type/temper-item-category-tree",
  slug: "furn-supplies",
  title: "Supplies",
  parent: "temper-item-category-tree/furn-library",
  displayOrder: 4,
  furnitureSubcategoryIds: [62],
} as const satisfies TemperItemCategoryTree
