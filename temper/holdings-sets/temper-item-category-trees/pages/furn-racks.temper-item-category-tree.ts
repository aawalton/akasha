import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnRacks = {
  id: "01a05fcf-f80a-7ab0-90a4-5380fe5560d7",
  type: "temper-item-category-tree",
  slug: "furn-racks",
  title: "Racks",
  parent: "furn-structures",
  displayOrder: 6,
  furnitureSubcategoryIds: [112],
} as const satisfies TemperItemCategoryTree
