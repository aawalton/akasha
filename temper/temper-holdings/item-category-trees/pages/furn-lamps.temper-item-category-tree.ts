import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnLamps = {
  id: "01a05fcf-f7fe-7b26-a161-e3fd896ce13a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-lamps",
  title: "Lamps",
  parent: "furn-lighting",
  displayOrder: 5,
  furnitureSubcategoryIds: [119],
} as const satisfies TemperItemCategoryTree
