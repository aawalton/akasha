import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const reagentAnimalParts = {
  id: "01a05fcf-f833-729c-9b95-854e84d2a49f",
  type: "page-type/temper-item-category-tree",
  slug: "reagent-animal-parts",
  title: "Animal Parts",
  parent: "temper-item-category-tree/reagents",
  displayOrder: 2,
  specializedItemTypes: [152],
} as const satisfies TemperItemCategoryTree
