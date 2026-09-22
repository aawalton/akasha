import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const woodworking = {
  id: "01a05fcf-f849-717e-9084-18c2653846cc",
  type: "page-type/temper-item-category-tree",
  slug: "woodworking",
  title: "Woodworking",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 2,
} as const satisfies TemperItemCategoryTree
