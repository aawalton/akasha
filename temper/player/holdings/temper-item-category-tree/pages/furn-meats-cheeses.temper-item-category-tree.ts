import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMeatsCheeses = {
  id: "01a05fcf-f801-70ea-ac18-3329b3569db4",
  type: "page-type/temper-item-category-tree",
  slug: "furn-meats-cheeses",
  title: "Meats and Cheeses",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 9,
  furnitureSubcategoryIds: [154],
} as const satisfies TemperItemCategoryTree
