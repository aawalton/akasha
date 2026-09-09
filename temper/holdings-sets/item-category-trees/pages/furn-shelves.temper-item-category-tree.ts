import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnShelves = {
  id: "01a05fcf-f80d-7b9e-8c27-fec21b616699",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-shelves",
  title: "Shelves",
  parent: "furn-library",
  displayOrder: 3,
  furnitureSubcategoryIds: [59],
} as const satisfies TemperItemCategoryTree
