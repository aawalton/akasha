import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPillows = {
  id: "01a05fcf-f807-7dc4-8e86-3c58af64da3f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-pillows",
  title: "Pillows",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 6,
  furnitureSubcategoryIds: [50],
} as const satisfies TemperItemCategoryTree
