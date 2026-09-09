import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTrunks = {
  id: "01a05fcf-f816-7687-8fbe-7c7ad6f2acec",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-trunks",
  title: "Trunks",
  parent: "furn-suite",
  displayOrder: 7,
  furnitureSubcategoryIds: [48],
} as const satisfies TemperItemCategoryTree
