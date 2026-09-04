import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const recipeBlueprint = {
  id: "01a05fcf-f835-78bf-ad9f-9dd7ed1b2e24",
  pageTypeSlug: "temper-item-category-tree",
  slug: "recipe-blueprint",
  title: "Blueprints (Woodworking)",
  parent: "furnishing-recipes",
  displayOrder: 2,
  specializedItemTypes: [177],
} as const satisfies TemperItemCategoryTree
