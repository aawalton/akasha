import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBoulders = {
  id: "01a05fcf-f7e9-7c9e-981c-62230732d9fd",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-boulders",
  title: "Boulders and Large Rocks",
  parent: "furn-conservatory",
  displayOrder: 1,
  furnitureSubcategoryIds: [151],
} as const satisfies TemperItemCategoryTree
