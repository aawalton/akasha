import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnPlants = {
  id: "01a05fcf-f808-71a2-95d7-c47a22890cb2",
  type: "temper-item-category-tree",
  slug: "furn-plants",
  title: "Plants",
  parent: "furn-conservatory",
  displayOrder: 10,
  furnitureSubcategoryIds: [108],
} as const satisfies TemperItemCategoryTree
