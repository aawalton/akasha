import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeSketch = {
  id: "01a05fcf-f837-7188-aea5-e0e022b63d28",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-sketch",
  title: "Sketches (Jewelry Crafting)",
  parent: "temper-item-category-tree/furnishing-recipes",
  displayOrder: 6,
  specializedItemTypes: [178],
} as const satisfies TemperItemCategoryTree
