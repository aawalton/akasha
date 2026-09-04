import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnWells = {
  id: "01a05fcf-f81b-7717-85c3-1a9ee1ee78ca",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-wells",
  title: "Wells",
  parent: "furn-courtyard",
  displayOrder: 4,
  furnitureSubcategoryIds: [71],
} as const satisfies TemperItemCategoryTree
