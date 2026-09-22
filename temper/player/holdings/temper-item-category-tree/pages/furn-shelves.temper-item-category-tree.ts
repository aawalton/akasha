import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnShelves = {
  id: "01a05fcf-f80d-7b9e-8c27-fec21b616699",
  type: "page-type/temper-item-category-tree",
  slug: "furn-shelves",
  title: "Shelves",
  parent: "temper-item-category-tree/furn-library",
  displayOrder: 3,
  furnitureSubcategoryIds: [59],
} as const satisfies TemperItemCategoryTree
