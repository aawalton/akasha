import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnFountains = {
  id: "01a05fcf-f7f8-7465-a3c7-8a07fe1d7961",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-fountains",
  title: "Fountains",
  parent: "furn-courtyard",
  displayOrder: 0,
  furnitureSubcategoryIds: [73],
} as const satisfies TemperItemCategoryTree
