import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const recipeDiagram = {
  id: "01a05fcf-f836-7198-a088-fea16cadbd3f",
  type: "temper-item-category-tree",
  slug: "recipe-diagram",
  title: "Diagrams (Blacksmithing)",
  parent: "furnishing-recipes",
  displayOrder: 0,
  specializedItemTypes: [172],
} as const satisfies TemperItemCategoryTree
