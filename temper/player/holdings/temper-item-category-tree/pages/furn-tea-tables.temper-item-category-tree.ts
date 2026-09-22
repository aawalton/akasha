import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTeaTables = {
  id: "01a05fcf-f813-7df6-9e8e-e2fe3ae3c7ae",
  type: "page-type/temper-item-category-tree",
  slug: "furn-tea-tables",
  title: "Tea Tables",
  parent: "temper-item-category-tree/furn-parlor",
  displayOrder: 6,
  furnitureSubcategoryIds: [58],
} as const satisfies TemperItemCategoryTree
