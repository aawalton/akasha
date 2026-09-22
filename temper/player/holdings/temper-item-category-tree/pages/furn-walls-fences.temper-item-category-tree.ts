import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWallsFences = {
  id: "01a05fcf-f81a-7f07-9d6e-a5367e573d07",
  type: "page-type/temper-item-category-tree",
  slug: "furn-walls-fences",
  title: "Walls and Fences",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 8,
  furnitureSubcategoryIds: [163],
} as const satisfies TemperItemCategoryTree
