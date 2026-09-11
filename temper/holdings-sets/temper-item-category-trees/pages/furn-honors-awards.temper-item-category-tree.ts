import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnHonorsAwards = {
  id: "01a05fcf-f7fa-7c2e-82f4-8494d13a8061",
  type: "temper-item-category-tree",
  slug: "furn-honors-awards",
  title: "Honors and Awards",
  parent: "furn-gallery",
  displayOrder: 3,
  furnitureSubcategoryIds: [147],
} as const satisfies TemperItemCategoryTree
