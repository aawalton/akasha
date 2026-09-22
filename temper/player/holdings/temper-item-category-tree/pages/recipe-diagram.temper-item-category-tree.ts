import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeDiagram = {
  id: "01a05fcf-f836-7198-a088-fea16cadbd3f",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-diagram",
  title: "Diagrams (Blacksmithing)",
  parent: "temper-item-category-tree/furnishing-recipes",
  displayOrder: 0,
  specializedItemTypes: [172],
} as const satisfies TemperItemCategoryTree
