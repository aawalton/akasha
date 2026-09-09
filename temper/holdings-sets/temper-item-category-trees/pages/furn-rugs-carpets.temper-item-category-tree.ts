import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnRugsCarpets = {
  id: "01a05fcf-f80b-775c-a7ef-b9e6cb7a33f1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-rugs-carpets",
  title: "Rugs and Carpets",
  parent: "furn-parlor",
  displayOrder: 3,
  furnitureSubcategoryIds: [52],
} as const satisfies TemperItemCategoryTree
