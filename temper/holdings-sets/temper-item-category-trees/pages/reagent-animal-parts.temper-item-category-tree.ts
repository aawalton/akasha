import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const reagentAnimalParts = {
  id: "01a05fcf-f833-729c-9b95-854e84d2a49f",
  type: "temper-item-category-tree",
  slug: "reagent-animal-parts",
  title: "Animal Parts",
  parent: "reagents",
  displayOrder: 2,
  specializedItemTypes: [152],
} as const satisfies TemperItemCategoryTree
