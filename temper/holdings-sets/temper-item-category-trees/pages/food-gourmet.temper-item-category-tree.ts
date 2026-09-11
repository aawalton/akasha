import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const foodGourmet = {
  id: "01a05fcf-f7e2-7930-bb87-79e3428069f5",
  type: "temper-item-category-tree",
  slug: "food-gourmet",
  title: "Gourmet",
  parent: "food",
  displayOrder: 6,
  specializedItemTypes: [7],
} as const satisfies TemperItemCategoryTree
