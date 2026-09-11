import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnFountains = {
  id: "01a05fcf-f7f8-7465-a3c7-8a07fe1d7961",
  type: "temper-item-category-tree",
  slug: "furn-fountains",
  title: "Fountains",
  parent: "furn-courtyard",
  displayOrder: 0,
  furnitureSubcategoryIds: [73],
} as const satisfies TemperItemCategoryTree
