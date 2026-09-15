import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTraps = {
  id: "01a05fcf-f816-75ad-9d31-4eac9d49842c",
  type: "temper-item-category-tree",
  slug: "furn-traps",
  title: "Traps",
  parent: "furn-services",
  displayOrder: 14,
  furnitureSubcategoryIds: [182],
} as const satisfies TemperItemCategoryTree
