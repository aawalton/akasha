import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSuite = {
  id: "01a05fcf-f811-739d-8c04-ad0b84b7356e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-suite",
  title: "Suite",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 0,
  furnitureCategoryIds: [1],
} as const satisfies TemperItemCategoryTree
