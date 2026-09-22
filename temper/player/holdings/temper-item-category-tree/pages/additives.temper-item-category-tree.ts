import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const additives = {
  id: "01a05fcf-f7b9-796f-b25c-b843ce6fc1ee",
  type: "page-type/temper-item-category-tree",
  slug: "additives",
  title: "Additives",
  parent: "temper-item-category-tree/ingredients",
  displayOrder: 2,
  specializedItemTypes: [43, 47],
} as const satisfies TemperItemCategoryTree
