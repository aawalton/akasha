import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const recipeSchematic = {
  id: "01a05fcf-f837-76fc-9ba3-beb5c18d1042",
  pageTypeSlug: "temper-item-category-tree",
  slug: "recipe-schematic",
  title: "Schematics (Enchanting)",
  parent: "furnishing-recipes",
  displayOrder: 4,
  specializedItemTypes: [174],
} as const satisfies TemperItemCategoryTree
