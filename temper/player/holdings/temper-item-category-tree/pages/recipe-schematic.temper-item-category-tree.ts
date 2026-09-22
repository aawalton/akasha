import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeSchematic = {
  id: "01a05fcf-f837-76fc-9ba3-beb5c18d1042",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-schematic",
  title: "Schematics (Enchanting)",
  parent: "temper-item-category-tree/furnishing-recipes",
  displayOrder: 4,
  specializedItemTypes: [174],
} as const satisfies TemperItemCategoryTree
