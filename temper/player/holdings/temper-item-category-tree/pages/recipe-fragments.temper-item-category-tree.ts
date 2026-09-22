import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeFragments = {
  id: "01a05fcf-f836-7647-ae5d-d8e3502abc5b",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-fragments",
  title: "Recipe Fragments",
  parent: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 0,
  specializedItemTypes: [104],
} as const satisfies TemperItemCategoryTree
