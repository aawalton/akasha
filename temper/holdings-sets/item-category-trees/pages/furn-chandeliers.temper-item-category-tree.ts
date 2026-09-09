import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnChandeliers = {
  id: "01a05fcf-f7ed-7e82-ad87-cfe11dd03b43",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-chandeliers",
  title: "Chandeliers",
  parent: "furn-lighting",
  displayOrder: 2,
  furnitureSubcategoryIds: [124],
} as const satisfies TemperItemCategoryTree
