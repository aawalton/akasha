import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnPillows = {
  id: "01a05fcf-f807-7dc4-8e86-3c58af64da3f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-pillows",
  title: "Pillows",
  parent: "furn-suite",
  displayOrder: 6,
  furnitureSubcategoryIds: [50],
} as const satisfies TemperItemCategoryTree
