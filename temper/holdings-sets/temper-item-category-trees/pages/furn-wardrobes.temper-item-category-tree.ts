import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnWardrobes = {
  id: "01a05fcf-f81a-7011-9c04-b59368b2f6f7",
  type: "temper-item-category-tree",
  slug: "furn-wardrobes",
  title: "Wardrobes",
  parent: "furn-suite",
  displayOrder: 8,
  furnitureSubcategoryIds: [47],
} as const satisfies TemperItemCategoryTree
