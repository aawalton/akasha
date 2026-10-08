import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const recipeBlueprint = {
  id: "01a05fcf-f835-78bf-ad9f-9dd7ed1b2e24",
  type: "page-type/temper-item-category-tree",
  slug: "recipe-blueprint",
  title: "Blueprints (Woodworking)",
  parent: "temper-item-category-tree/furnishing-recipes",
  displayOrder: 2,
  specializedItemTypes: [177],
  createdAt: "2026-09-02T01:51:00.149Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
